import * as path from 'path';

const manifest = {
    initial: [],
    game: []
}

type SubPackagePluginOptions = {

    output: string,

    subPackages: {
        root: string,
        includes: string[]
    }[],

    verbose?: boolean
}

export class SubPackagePlugin {

    private verboseInfo: { filename: string, new_file_path: string }[] = [];

    constructor(private options: SubPackagePluginOptions) {

    }

    async onFile(file: plugins.File) {
        const filename = file.relative;
        // console.log("the_file", filename, filename.split("\\").join('/'));
        const extname = path.extname(filename);
        if (extname == ".js") {
            const basename = path.basename(filename);
            let new_file_path = "js/" + basename.substr(0, basename.length - file.extname.length) + file.extname;

            let isSubPackage = false;
            if (this.options.subPackages) {
                this.options.subPackages.forEach(function (item) {
                    if (item.includes) {
                        item.includes.forEach(function (item2) {
                            let trans_filename = filename.split("\\").join('/')
                            if (item2 == trans_filename) {
                                // console.log('match_includes', trans_filename);
                                new_file_path = item.root + "/js/" + basename.substr(0, basename.length - file.extname.length) + file.extname;
                                isSubPackage = true;
                            }
                        });
                    }
                });
            }
            if (this.options.verbose) {
                console.log(`SubPackagePlugin: ${filename} isSubPackage: ${isSubPackage}`);
            }

            file.path = path.join(file.base, new_file_path);

            if (!isSubPackage) {
                const relative = file.relative.split("\\").join('/');
                if (file.origin.indexOf('libs/') >= 0) {
                    manifest.initial.push(relative);
                }
                else {
                    manifest.game.push(relative);
                }
            }

            if (this.options.verbose) {
                this.verboseInfo.push({ filename, new_file_path })
            }
        }
        return file;
    }
    async onFinish(pluginContext: plugins.CommandContext) {
        const output = this.options.output;
        const extname = path.extname(output);
        let contents = '';
        switch (extname) {
            case ".json":
                contents = JSON.stringify(manifest, null, '\t');
                break;
            case ".js":
                contents = manifest.initial.concat(manifest.game).map((fileName) => `require("${fileName}")`).join("\n")
                break;
        }
        pluginContext.createFile(this.options.output, new Buffer(contents));
        if (this.options.subPackages) {
            const self = this;
            this.options.subPackages.forEach(function (item) {
                let gameJS = "";
                // 配置的文件必须存在
                gameJS = item.includes.map((file) => {
                    const extname = path.extname(file);
                    console.log('extname', extname);
                    let return_location = ''
                    switch (extname) {
                        case '.js':
                            return_location = `require("js/${path.basename(file)}")`
                            break;
                        case '.png':
                        case '.jpg':
                        case '.json':
                            return_location = `require("assets/${path.basename(file)}")`
                            break;
                    }
                    return return_location
                }).join("\n");
                console.log('output', gameJS);
                pluginContext.createFile(path.join(item.root, "game.js"), new Buffer(gameJS));
            });
        }
        if (this.options.verbose) {
            this.verboseInfo.forEach((item) => {
                console.log(`SubPackagePlugin: ${item.filename} => ${item.new_file_path}`);
            });
        }
    }
}