//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createChildren, this);
    }


    protected createChildren(): void {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json");

        // 调用WxKit.login完成微信登陆授权操作，返回openId,token等数据;
        await WxKit.login();
        console.log(UserData.getOpenId());



    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        // 设置游戏参数内的默认舞台宽高
        GameConfig.setStageWidthHeight(this.stage);

        let sky = eKit.createBitmapByName("bg_jpg", { width: GameConfig.getWidth(), height: GameConfig.getHeight(), x: 0, y: 0, touchEnabled: true });
        this.addChild(sky);


        // 分享调用示例
        // sky.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { WxKit.shareGame('normalShare', '我就试试分享', 'get') }, this);

        // 事件音乐调用示例
        // sky.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        //     Mp3.playEvent('success')
        // },this);

        // 分享重生调用示例
        // sky.addEventListener(egret.TouchEvent.TOUCH_TAP,async () => {
        //     // 可根据reborn_result的布尔值判断是否重生成功
        //      let reborn_result = await WxKit.rebornGame('我来试试重生','get');
        //      console.log('能否重生'+reborn_result);
        // }, this);

        // 获取周最高成绩调用示例
        // sky.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
        //     let score = await Records.getHistoryScore();
        //     console.log('done');
        // }, this);

        // 世界排行榜
        // sky.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
        //     // 网络请求更新世界排行榜
        //     let ranking = await Records.refreshWorldRanking();
        //     console.log(ranking);
        //     console.log('done');
        //     // 获取已缓存的排行榜数据
        //     let getRanking = Records.getRankings();
        //     getRanking.push('1');
        //     console.log(getRanking);
        //     console.log(Records.getRankings());
        // }, this);

        // 调用开放数据域获取好友排行榜
        // sky.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
        //     let open_data:egret.Sprite = WxKit.linkOpenData({});
        //     // this.addChild(open_data);
        // }, this);

        // 调用开放数据域获取好友排行榜
        sky.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
           await Records.uploadScore();
        }, this);


        VersionCtrl.refreshVersionCtrl();

        // 播放背景音乐
        Mp3.playBGM();

    }

}
