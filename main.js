import config from './config.js'
import path from 'path'
import getFiles from './file.js'
import transMDFiles from './trans.js'
import syncToBlog from "./sync.js";

function main() {
    let vault = path.resolve(config.obsidian.vault)
    config.obsidian.vault = vault

    const { mdFiles, assetsFiles } = getFiles(vault, config.obsidian.dirs)

    const files = transMDFiles(mdFiles)

    syncToBlog(files, assetsFiles)
}

main()