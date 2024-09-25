import path from 'path'
import klaw from "klaw-sync"
import matter from 'gray-matter'
import fs from "fs-extra"

export default function getFiles(vault, dirs) {
    let mdFiles = []
    let assetsFiles = new Map()

    function fileFilter(item) {
        if (item.stats.isDirectory()) {
            return false
        }

        const filePath = item.path
        const ext = path.extname(filePath)
        if (ext === ".md") {
            const fileContent = fs.readFileSync(item.path, 'utf8')

            const {content, data} = matter(fileContent)
            if (data.slug === undefined) return false

            data.unixtime = data.date.getTime()

            mdFiles.push({
                filePath,
                fileName: path.basename(filePath),
                metadata: data,
                content,
            })
        } else {
            assetsFiles.set(path.basename(filePath), item)
        }

        return false
    }

    dirs.map(dir => {
        const dirPath = path.resolve(path.join(vault, dir))
        // get dir all public files
        klaw(dirPath, {
            filter: fileFilter,
            traverseAll: true
        })
    })

    return {
        mdFiles,
        assetsFiles
    }
}



