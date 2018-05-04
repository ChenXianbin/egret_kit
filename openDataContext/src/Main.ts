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

        // 首次进入时，加载所需的静态图片资源
        StaticRes.loadPaths();

        // 初始化微信监听函数
        this.initReciver();
    }

    /**
     * 初始话微信主域信息监听函数
     */
    private initReciver() {
        wx.onMessage(async data => {
            // 赋值操作
            data.userInfo && (UserData.userInfo = data.userInfo);
            data.token && (UserData.token = data.token);
            UserData.shareTicket = data.shareTicket || '';

            if (data.isDisplay) {
                console.log('can display!')
            }
            // 决定查询的数据类型
            UserData.type = data.type || 'friend';
            let rankingData = null;
            switch (UserData.type) {
                //查询全部好友排行榜
                default:
                case 'friend':
                    await UserData.getFriendRanking().then(res=>{rankingData = res});
                    break;

                //查询相邻排行榜
                case 'neighbor':
                    await UserData.getNeighborFriend(1).then(res=>{rankingData = res});
                    break;

                // 查询群组数
                case 'group':
                    await UserData.getGroupRanking(UserData.shareTicket).then(res=>{rankingData = res});
                    break;

            }
            console.log('获取数据完成');
            console.log(rankingData);
        })
    }
}