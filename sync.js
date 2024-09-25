import fs from "fs-extra"
import path from "path";
import config from "./config.js";

export default function syncToBlog(files, assets) {

    const output = path.resolve(config.blog.output)
    const metadatas = []

    files.forEach(file => {
        // sync content
        fs.outputFileSync(
            path.join(output, file.wikiLinkAbsPath + ".md"),
            file.markdownContent
        )

        // sync metadata.json
        metadatas.push({
            ...file,
            content: "",
            markdownContent: ""
        })

        // sync images
        if (file.images.length !== 0) {
            file.images.forEach(image => {
                const assetFile = assets.get(image.fileName)

                const assetPath = assetFile.path
                const saveTo = image.saveTo

                if (!fs.existsSync(saveTo)) {
                    if (assetPath) {
                        fs.copySync(assetPath, saveTo)
                    }
                }
            })
        }
    })

    fs.outputFileSync(
        path.join(output, "metadatas.json"),
        JSON.stringify(metadatas)
    )
}