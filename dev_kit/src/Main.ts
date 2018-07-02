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
         *常用调用示例,不需要登录的在第一列
         * 
         */
        // 切换背景音乐调用示例
        let bgm_btn = eKit.createSprite({ x: 20, y: 20 });
        this.addChild(bgm_btn);
        let bgm_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        bgm_btn.addChild(bgm_btn_bg);
        bgm_btn.addChild(eKit.createText('切换音乐', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        bgm_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            Mp3.switchBgm('bgm_game');
        }, this);

        // 事件音乐调用示例
        let music_btn = eKit.createSprite({ x: 20, y: 100 });
        this.addChild(music_btn);
        let music_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        music_btn.addChild(music_btn_bg);
        music_btn.addChild(eKit.createText('调用事件音乐', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        music_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            Mp3.playEvent('hit');
        }, this);

        // 触发粒子特效
        let particle_btn = eKit.createSprite({ x: 20, y: 180 });
        this.addChild(particle_btn);
        let particle_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        particle_btn.addChild(particle_btn_bg);
        particle_btn.addChild(eKit.createText('触发粒子', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        particle_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {

            let system = new particle.GravityParticleSystem(RES.getRes('boom_png'), RES.getRes('boom_json'));
            system.start(50);
            this.addChild(system);

        }, this);

        // 清空按钮
        let clear_btn = eKit.createSprite({ x: 20, y: 260 });
        this.addChild(clear_btn);
        let clear_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        clear_btn.addChild(clear_btn_bg);
        clear_btn.addChild(eKit.createText('清空按钮', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        clear_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
            eKit.clearView(this, 0);
        }, this);

        // 显示banner广告,请先确保你的小游戏拥有流量主权限
        let banner_ad = null;
        let show_banner_ad_btn = eKit.createSprite({ x: 20, y: 340 });
        this.addChild(show_banner_ad_btn);
        let show_banner_ad_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        show_banner_ad_btn.addChild(show_banner_ad_btn_bg);
        show_banner_ad_btn.addChild(eKit.createText('显示BANNER广告', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        show_banner_ad_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
            // showBannerAd第一个参数填入广告id
            !banner_ad && (banner_ad = WxKit.showBannerAd(''));
        }, this);

        // 隐藏banner广告
        let hide_banner_ad_btn = eKit.createSprite({ x: 20, y: 420 });
        this.addChild(hide_banner_ad_btn);
        let hide_banner_ad_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        hide_banner_ad_btn.addChild(hide_banner_ad_btn_bg);
        hide_banner_ad_btn.addChild(eKit.createText('隐藏BANNER广告', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        hide_banner_ad_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
            banner_ad && typeof banner_ad.hide == 'function' && (banner_ad.hide(), banner_ad.destory(), banner_ad = null);
        }, this);

        // 显示视频广告
        let show_video_ad_btn = eKit.createSprite({ x: 20, y: 500 });
        this.addChild(show_video_ad_btn);
        let show_video_ad_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        show_video_ad_btn.addChild(show_video_ad_btn_bg);
        show_video_ad_btn.addChild(eKit.createText('显示视频广告', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        show_video_ad_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
            // showVideoAd第一个参数填入广告id
            WxKit.showVideoAd('',
                () => {
                    //成功回调
                    wx.showToast({ title: '观看广告成功', icon: 'success', image: null })
                },
                () => {
                    //失败回调
                    wx.showToast({ title: '观看广告失败', icon: null, image: null })
                });
        }, this);







        /**
         * 常用调用示例,需要登录的在第二列
         * 
         */

        // 登录调用示例
        let login_btn = eKit.createSprite({ x: 160, y: 20 });
        this.addChild(login_btn);
        let login_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        login_btn.addChild(login_btn_bg);
        login_btn.addChild(eKit.createText('调用登录', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        login_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {

            // 调用WxKit.login完成微信登陆授权操作，返回openId,token等数据;
            await WxKit.login();
            // console.log(UserData.getOpenId());
            wx.hideLoading();


            // 设置默认分享,需要登录后方可调用分享功能
            WxKit.setDefaultShare();
            WxKit.setOnShowRule();

        }, this);


        // 分享调用示例
        let share_btn = eKit.createSprite({ x: 160, y: 100 });
        this.addChild(share_btn);
        let btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        share_btn.addChild(btn_bg);
        share_btn.addChild(eKit.createText('调用分享', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { WxKit.shareGame('normalShare', '我就试试分享', '') }, this);

        // 调用开放数据域获取好友排行榜
        let friend_ranking_btn = eKit.createSprite({ x: 160, y: 180 });
        this.addChild(friend_ranking_btn);
        let friend_ranking_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        friend_ranking_btn.addChild(friend_ranking_btn_bg);
        friend_ranking_btn.addChild(eKit.createText('好友排行榜', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        friend_ranking_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
            let open_data: egret.Sprite = WxKit.linkOpenData({});
            this.addChild(open_data);
        }, this);



        // 播放背景音乐
        Mp3.loadEventSound();
        Mp3.switchBgm('bgm_default');
    }

}
