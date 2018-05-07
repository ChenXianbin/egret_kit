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

        // 刷新版本控制数据
        VersionCtrl.refreshVersionCtrl();

        // 绘制背景
        let sky = eKit.createBitmapByName("bg_jpg", { width: GameConfig.getWidth(), height: GameConfig.getHeight(), x: 0, y: 0, touchEnabled: true });
        this.addChild(sky);


        /**
         *常用调用示例 
         * 
         */

        // 分享调用示例
        let share_btn = eKit.createSprite({ x: 20, y: 20 });
        this.addChild(share_btn);
        let btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        share_btn.addChild(btn_bg);
        share_btn.addChild(eKit.createText('调用分享', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { WxKit.shareGame('normalShare', '我就试试分享', 'get') }, this);

        // 事件音乐调用示例

        let music_btn = eKit.createSprite({ x: 20, y: 100 });
        this.addChild(music_btn);
        let music_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        music_btn.addChild(music_btn_bg);
        music_btn.addChild(eKit.createText('调用音乐', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        music_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            Mp3.playEvent('success')
        }, this);

        // 分享重生调用示例
        let reborn_btn = eKit.createSprite({ x: 20, y: 180 });
        this.addChild(reborn_btn);
        let reborn_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        reborn_btn.addChild(reborn_btn_bg);
        reborn_btn.addChild(eKit.createText('调用重生', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        reborn_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
            // 可根据reborn_result的布尔值判断是否重生成功
            let reborn_result = await WxKit.rebornGame('我来试试重生', 'get');
            console.log('能否重生' + reborn_result);
        }, this);

        // 获取最高成绩调用示例
        let get_hight_score_btn = eKit.createSprite({ x: 20, y: 260 });
        this.addChild(get_hight_score_btn);
        let get_hight_score_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        get_hight_score_btn.addChild(get_hight_score_btn_bg);
        get_hight_score_btn.addChild(eKit.createText('最高成绩', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        get_hight_score_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
            let score = await Records.getHistoryScore();
            console.log('最高成绩:' + score);
        }, this);

        // 世界排行榜
        let http_ranking_btn = eKit.createSprite({ x: 20, y: 340 });
        this.addChild(http_ranking_btn);
        let http_ranking_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        http_ranking_btn.addChild(http_ranking_btn_bg);
        http_ranking_btn.addChild(eKit.createText('网络排行榜', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        http_ranking_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
            // 网络请求更新世界排行榜
            let ranking = await Records.refreshWorldRanking();
            console.log(ranking);
            console.log('done');
        }, this);

        // 缓存排行榜
        let ranking_btn = eKit.createSprite({ x: 20, y: 420 });
        this.addChild(ranking_btn);
        let ranking_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        ranking_btn.addChild(ranking_btn_bg);
        ranking_btn.addChild(eKit.createText('缓存排行榜', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        ranking_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
            // 获取缓存的世界排行榜，可用于分页显示
            let ranking = Records.getRankings();
            console.log(ranking);
            console.log('done');
        }, this);


        // 调用开放数据域获取好友排行榜
        let friend_ranking_btn = eKit.createSprite({ x: 20, y: 500 });
        this.addChild(friend_ranking_btn);
        let friend_ranking_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        friend_ranking_btn.addChild(friend_ranking_btn_bg);
        friend_ranking_btn.addChild(eKit.createText('好友排行榜', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        friend_ranking_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
            let open_data:egret.Sprite = WxKit.linkOpenData({});
            // this.addChild(open_data);
        }, this);

        // 调用Records.uploadScore上传成绩到自己服务器及腾讯云服务器
        // sky.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
        //    await Records.uploadScore();
        // }, this);

        // 清空按钮
        let clear_btn = eKit.createSprite({ x: 20, y: 580 });
        this.addChild(clear_btn);
        let clear_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        clear_btn.addChild(clear_btn_bg);
        clear_btn.addChild(eKit.createText('清空按钮', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        clear_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
            eKit.clearView(this, 0);
        }, this);




        // 播放背景音乐
        Mp3.playBGM();

    }

}
