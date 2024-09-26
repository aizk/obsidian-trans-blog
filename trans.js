import config from './config.js'
import path from "path";

let wikiLinkMap
export default function transMDFiles(mdFiles) {
    let newFiles = []
    wikiLinkMap = new Map()
    mdFiles.forEach(file => {
        // 文件冲突的时引用相对路径 it/regex/regex
        // 统一转小写匹配：因为在 obsidian 里面大小写不敏感，小写也可以引用大写文档，会因为大小写搜索不到文档
        const relatePath = path.relative(config.obsidian.vault, file.filePath)
        const wikiLinkAbsPath = relatePath.
        replace(/\.md$/, '').
        toLowerCase()

        const filename = path.basename(wikiLinkAbsPath)

        let newFile = {
            ...file,
            wikiLinkAbsPath,
            saveTo: path.join(path.resolve(config.blog.output), relatePath)
        }

        // build mapping
        // obsidian 不冲突时引用文件名、冲突时引用相对路径，都建上索引
        wikiLinkMap.set(wikiLinkAbsPath, newFile)
        wikiLinkMap.set(filename.toLowerCase(), newFile)

        newFile.markdownContent = transObsidianContent(newFile)

        newFiles.push(newFile)
    })

    return newFiles
}

export function transObsidianContent(file) {
    let content = file.content
    file.images = []

    // support <Hidden> Tag
    content = content.replace(/<Hidden>[\s\S]*?<\/Hidden>/g, '')

    const internalLinkRegex = /(!?)\[\[(.*?)\]\]/g;
    for (const match of content.matchAll(internalLinkRegex)) {
        // [
        // '![[tty.png]]',
        // '!',
        // 'tty.png',
        // ]
        // or
        // [
        //   '[[Regex]]',
        //   '',
        //   'Regex',
        // ]
        const matchText = match[0]
        const isEmbed = match[1] === "!";
        const ext = path.extname(match[2])
        const isWikiLink = ext === ""
        const isAsset = ext !== ""

        // ref md file
        if (isWikiLink) {
            let linkWikiPath = match[2]
            // handle alias: a/b|alias
            let hasAlias = false
            let aliasText = ""

            if (linkWikiPath.indexOf("|") > -1) {
                const s = linkWikiPath.split("|");
                hasAlias = true
                linkWikiPath = s[0];
                aliasText = s[1];
            }

            let finalName = hasAlias ? aliasText : linkWikiPath;

            // find link public file
            let find = false
            let matchSlug = ""

            const linkItem = wikiLinkMap.get(linkWikiPath.toLowerCase())
            if (linkItem) {
                if (linkItem.metadata.draft === false) {
                    find = true
                }
                matchSlug = linkItem.metadata.slug
            }

            if (find) {
                if (matchSlug !== "") {
                    content = content.replace(matchText, `[${finalName}](/post/${matchSlug})`)
                } else {
                    content = content.replace(matchText, `${finalName}`)
                }
            } else {
                content = content.replace(matchText, `${finalName}`)
            }
        }

        // ref image... asset
        // ![[xx.jpg|400]]
        if (isAsset) {
            let link = match[2]; // xx.ext|400

            if (link.split("|").length === 2) {
                link = link.split("|")[0]; // xx.ext
            }
            const saveTo = path.join(path.resolve(config.blog.imgDir), link)
            const name = path.basename(link, ext);

            const publicPath = path.join(config.blog.public, encodeURIComponent(link))
            content = content.replace(
                // `![[${originLink}]]`,
                matchText,
                `![${name}](${publicPath})`
            )

            file.images.push({
                fileName: link,
                saveTo,
                publicPath
            })
        }
    }

    return content
}