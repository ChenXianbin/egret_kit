/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
import { UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin, CleanPlugin } from 'built-in';
import { SubPackagePlugin } from './wxgame/subpackage'
import { WxgamePlugin } from './wxgame/wxgame';
import { CustomPlugin } from './myplugin';
import * as defaultConfig from './config';

const config: ResourceManagerConfig = {

    buildConfig: (params) => {

        const { target, command, projectName, version } = params;
        const outputDir = `../${projectName}_wxgame`;
        if (command == 'build') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource", 'stage1'] }),
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(),
                    // new ManifestPlugin({ output: 'manifest.js' })
                    new SubPackagePlugin({
                        // output为主包加载的资源manifest.js
                        output: 'manifest.js',

                        subPackages: [

                            ////////////////////////////////////////////////
                            // resource 资源分包使用,注意在resource文件夹下放一份空的game.js
                            // 需要做loading界面的资源，可以在wxgame项目下增加 preload 文件夹 放入资源，然后在EgretSubPackageLoading.js调用
                            {
                                root: "resource",
                                "includes": [],
                            }
                            ///////////////////////////////////////////////

                            ///////////////////////////////////////////////
                            //  JS代码分包示例，需要对应调整 game.json内 subpackages 配置项
                            //  目前微信在IOS端对于多个分包加载支持存在BUG待修复
                            //
                            // {
                            //     root: "subpackage",
                            //     "includes": [
                            //         "main.js",
                            //         "libs/modules/tween/tween.js",
                            //         "libs/modules/particle/particle.js",
                            //         "libs/modules/physics/physics.js"
                            //     ],
                            // }
                            ////////////////////////////////////////////////

                        ],
                        // verbose为true则开启文件路径输出调试
                        verbose: true
                    })
                ]
            }
        }
        else if (command == 'publish') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource", 'stage1'] }),
                    new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(),
                    new UglifyPlugin([{
                        sources: ["main.js"],
                        target: "main.min.js"
                    }
                    ]),
                    // new ManifestPlugin({ output: 'manifest.js' })
                    new SubPackagePlugin({
                        output: 'manifest.js',
                        subPackages: [
                            {
                                root: "resource",
                                "includes": [],
                            }
                        ]
                    })
                ]
            }
        }
        else {
            throw `unknown command : ${params.command}`;
        }
    },

    mergeSelector: defaultConfig.mergeSelector,

    typeSelector: defaultConfig.typeSelector
}



export = config;
