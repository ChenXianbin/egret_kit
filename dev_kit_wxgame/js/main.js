var egret = window.egret;var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 推荐开发者通过这种方式封装平台逻辑，以保证整体结构的稳定
 * 由于不同平台的接口形式各有不同，白鹭推荐开发者将所有接口封装为基于 Promise 的异步形式
 */
var WxPlatform = (function () {
    function WxPlatform() {
        this.name = 'wxgame';
        this.header = {};
    }
    // 开放域获取好友排行
    WxPlatform.prototype.getFriendCloudStorage = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.getFriendCloudStorage({
                            keyList: ["socre", "date"],
                            success: function (res) {
                                console.log(res);
                                resolve(res);
                            },
                            fail: function (err) {
                                reject(err);
                            }
                        });
                    })];
            });
        });
    };
    // 开放域获取群组排行
    WxPlatform.prototype.getGroupCloudStorage = function (shareTicket) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.getGroupCloudStorage({
                            keyList: ["score", "date"],
                            success: function (res) {
                                // console.log(res.data);
                                var data = new Array();
                                if (res.data && res.data.length != 0) {
                                    res.data.forEach(function (item, index) {
                                        var kvData = Utils.transObj(item.KVDataList);
                                        if (Utils.isInTimeRange(kvData['date'])) {
                                            data.push({
                                                score: parseInt(kvData['score']),
                                                date: kvData['date'] || '',
                                                openId: item.openid,
                                                user: {
                                                    nickname: item.nickname,
                                                    avatar_url: item.avatarUrl
                                                }
                                            });
                                        }
                                    });
                                    data.sort(function (a, b) {
                                        var valueA = a['score'];
                                        var valueB = b['score'];
                                        return valueB - valueA;
                                    });
                                }
                                resolve(data);
                            },
                            fail: function (err) {
                                reject(err);
                            },
                            complete: function (res) {
                            },
                            shareTicket: shareTicket
                        });
                    })];
            });
        });
    };
    WxPlatform.prototype.setKVData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var dataList = [];
                        for (var key in data) {
                            dataList.push({ key: key, value: data[key] });
                        }
                        wx.setUserCloudStorage({
                            KVDataList: dataList,
                            success: function (res) {
                                resolve(res);
                            },
                            fail: function (err) {
                                reject(err);
                            }
                        });
                    })];
            });
        });
    };
    WxPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.showLoading({
                            title: '游戏加载中...',
                            mask: true
                        });
                        wx.login({
                            success: function (res) {
                                resolve(res);
                            }, fail: function (err) {
                                reject(err);
                            }
                        });
                    })];
            });
        });
    };
    WxPlatform.prototype.auth = function (jsCode, iv, encrytedData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var data = {
                            js_code: jsCode,
                            iv: iv,
                            encrypted_data: encrytedData
                        };
                        var that = _this;
                        wx.request({
                            url: Api.baseUrl + '/auth_login',
                            method: 'POST',
                            data: data,
                            success: function (res) {
                                that.header = {
                                    Authorization: res.data.token
                                };
                                wx.hideLoading();
                                resolve(res);
                            },
                            fail: function (err) {
                                reject(err);
                            }
                        });
                    })];
            });
        });
    };
    WxPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.getUserInfo({
                            success: function (res) {
                                var userInfo = res.userInfo;
                                var nickName = userInfo.nickName;
                                var avatarUrl = userInfo.avatarUrl;
                                var gender = userInfo.gender; //性别 0：未知、1：男、2：女
                                var province = userInfo.province;
                                var city = userInfo.city;
                                var country = userInfo.country;
                                userInfo.encryptedData = res.encryptedData;
                                userInfo.iv = res.iv;
                                resolve(userInfo);
                            }, fail: function (err) {
                                reject(err);
                            }
                        });
                    })];
            });
        });
    };
    WxPlatform.prototype.showAuthModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                wx.hideLoading();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        wx.showModal({
                            title: '提示',
                            content: '请您进行登陆授权',
                            showCancel: false,
                            cancelText: '',
                            confirmText: '去授权',
                            success: function (res) {
                                wx.openSetting({
                                    success: function (result) {
                                        resolve(result);
                                    },
                                    fail: function (err) {
                                        reject(err);
                                    }
                                });
                            },
                        });
                    })];
            });
        });
    };
    return WxPlatform;
}());
__reflect(WxPlatform.prototype, "WxPlatform", ["Platform"]);
if (!window.platform) {
    window.platform = new WxPlatform();
}
/**
 * 统一设置游戏所有配置参数，含版本号，参数地址等
 *
 */
var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.getBasicUrl = function () { return this.basicUrl; };
    ;
    GameConfig.getAppCode = function () { return this.appCode; };
    ;
    GameConfig.getVersion = function () { return this.version; };
    ;
    GameConfig.getShareTitle = function () { return this.shareTitle; };
    ;
    GameConfig.getShareImg = function () { return this.shareImg; };
    ;
    GameConfig.setStageWidthHeight = function (stage) { this.stageWidth = stage.stageWidth; this.stageHeight = stage.stageHeight; };
    GameConfig.getWidth = function () { return this.stageWidth; };
    ;
    GameConfig.getHeight = function () { return this.stageHeight; };
    ;
    // http通讯地址
    GameConfig.basicUrl = "https://pile-up.api.wxagame.com/api/v1";
    // 游戏自定义ID
    GameConfig.appCode = 1;
    // 游戏版本号
    GameConfig.version = "1.0.0";
    // 游戏基本分享标题
    GameConfig.shareTitle = "分享标题";
    // 游戏基本分享图片
    GameConfig.shareImg = "imgUrl";
    // 游戏基本宽
    GameConfig.stageWidth = 0;
    // 游戏基本高
    GameConfig.stageHeight = 0;
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
// 音频资源配置JSON
var SoundRes = (function () {
    function SoundRes() {
    }
    // 定义事件音乐路径，Mp3.playEvent调用name即可播放对应path的音乐
    SoundRes.eventSoundList = [
        { name: 'fail', path: 'resource/assets/mp3/fail.mp3' },
        { name: 'fall_down', path: 'resource/assets/mp3/fall_down.mp3' },
        { name: 'success', path: 'resource/assets/mp3/success.mp3' }
    ];
    // 定义背景音乐路径
    SoundRes.bgm = 'resource/assets/mp3/bgm.mp3';
    return SoundRes;
}());
__reflect(SoundRes.prototype, "SoundRes");
var Utils = (function () {
    function Utils() {
    }
    Utils.getNowDate = function () {
        return this.dateFtt(new Date(), "yyyy-MM-dd hh:mm:ss");
    };
    Utils.getWeekTime = function () {
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth();
        var d = now.getDate();
        var day = now.getDay();
        var weekStart = new Date(y, m, d - (day ? (day - 1) : 6));
        var weekEnd = new Date(y, m, d + (day ? (8 - day) : 1));
        Utils.dateRange = [this.dateFtt(weekStart), this.dateFtt(weekEnd)];
        return Utils.dateRange;
    };
    Utils.isInTimeRange = function (timeStr) {
        if (timeStr) {
            var recordTime = new Date(timeStr.replace(/-/g, '/')).getTime();
            return recordTime > this.dateRange[0] && recordTime < this.dateRange[1];
        }
        else {
            return false;
        }
    };
    Utils.transObj = function (kvData) {
        var res = {};
        kvData.map(function (data) {
            res[data.key] = data.value;
        });
        return res;
    };
    // 时间格式处理
    Utils.dateFtt = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒   
        };
        fmt || (fmt = "yyyy-MM-ddThh:mm:ss+00:00");
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    Utils.dateRange = [];
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
// baseUrl:http请求接口地址
var baseUrl = GameConfig.getBasicUrl();
// version:后台定义的游戏id
var app_code = GameConfig.getAppCode();
// app_code:后台定义的游戏版本号
var version = GameConfig.getVersion();
var Api = (function () {
    function Api() {
    }
    Api.post = function (url, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!Api.token) {
                            reject('token为空，请重新登陆');
                        }
                        var request = new egret.HttpRequest();
                        request.responseType = egret.HttpResponseType.TEXT;
                        request.open(url, egret.HttpMethod.POST);
                        request.setRequestHeader("Content-Type", "application/json");
                        request.setRequestHeader("Authorization", Api.token);
                        request.send(data);
                        request.addEventListener(egret.Event.COMPLETE, function (evt) {
                            var res = evt.currentTarget;
                            resolve(JSON.parse(res.response));
                        }, _this);
                        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (evt) {
                            reject(evt);
                        }, _this);
                    })];
            });
        });
    };
    Api.get = function (url, noToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!Api.token && !noToken) {
                            reject('token为空，请重新登陆');
                        }
                        var request = new egret.HttpRequest();
                        request.responseType = egret.HttpResponseType.TEXT;
                        request.open(url, egret.HttpMethod.GET);
                        request.setRequestHeader("Authorization", Api.token);
                        request.send();
                        request.addEventListener(egret.Event.COMPLETE, function (evt) {
                            var res = evt.currentTarget;
                            resolve(JSON.parse(res.response));
                        }, _this);
                        request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (evt) {
                            reject(evt);
                        }, _this);
                    })];
            });
        });
    };
    Api.getToken = function () {
        return this.token;
    };
    /**
     * uploadRecords 上传成绩，调用后返回true即上传成功，返回false即上传失败
     * @param  {} record_data
     */
    Api.uploadRecords = function (record_data) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = true;
                        return [4 /*yield*/, Api.post(Api.uploadRecordsPath, record_data).catch(function (e) {
                                result = false;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * getBestRecord 根据传入的时间范围，调用后返回传入时间范围内最佳成绩，如有错误，则返回null
     * @param  {} timeRange
     */
    Api.getBestRecord = function (timeRange) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        return [4 /*yield*/, Api.post(Api.bestRecordPath, timeRange).then(function (res) {
                                result = res;
                            }).catch(function (e) {
                                result = null;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * getRankings 调用后返回世界排行榜数据，如有错误，则返回null
     * @param  {} timeRange
     */
    Api.getRankings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        wx.showLoading({
                            title: '排行榜加载中...',
                            mask: true,
                            success: function () { },
                            fail: function () { },
                            complete: function () { }
                        });
                        return [4 /*yield*/, Api.get(Api.getRankingsPath).then(function (res) {
                                result = res;
                            }).catch(function (e) {
                                result = null;
                            })];
                    case 1:
                        _a.sent();
                        wx.hideLoading();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * getRankings 调用后返回分享图片链接，如有错误，则返回默认分享图地址
     * @param  {} timeRange
     */
    Api.getShareUrl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = '';
                        return [4 /*yield*/, Api.get(Api.getShareUrlPath).then(function (res) {
                                result = res.url;
                            }).catch(function (e) {
                                result = '';
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 查询socket用的地址，return{tunnelId,connectUrl}
     */
    Api.getTunnel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        return [4 /*yield*/, Api.get(Api.tunnelPath).then(function (res) {
                                result = res;
                            }).catch(function (e) {
                                result = null;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 事件埋点
     * @param  {number} event_type
     */
    Api.postEvent = function (event_type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (isNaN(event_type)) {
                    event_type = this.event_type.indexOf(event_type) + 1;
                }
                else if (!this.event_type[event_type]) {
                    event_type = 0;
                }
                if (event_type == 0) {
                    throw new Error('事件传值不是预设的值');
                }
                Api.post(Api.postEventPath, { event_type: event_type });
                return [2 /*return*/];
            });
        });
    };
    /**
     * 查询版本控制情况
     */
    Api.getConfiguration = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        return [4 /*yield*/, Api.get(Api.configurationsPath + '?version=' + version + '&app_code=' + app_code, true)
                                .then(function (res) { result = res[0]; })
                                .catch(function (err) { console.warn(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 登陆完成，获取token后调用以设置token
     * @param  {string} token
     */
    Api.setToken = function (token) {
        Api.token = token;
    };
    Api.baseUrl = baseUrl;
    // api地址
    Api.uploadRecordsPath = baseUrl + "/records";
    Api.bestRecordPath = baseUrl + "/best_record";
    Api.getRankingsPath = baseUrl + "/rankings";
    Api.getShareUrlPath = baseUrl + "/share_url";
    Api.getOpenIdPath = baseUrl + "/users";
    Api.postEventPath = baseUrl + "/events";
    Api.tunnelPath = baseUrl + "/tunnel";
    Api.configurationsPath = baseUrl + "/configurations";
    // 事件类型字段                打开     单人游戏       上传成绩        重玩      分享           结果群排名     排行榜榜群排名  重生  
    Api.event_type = ['open', 'singleGame', 'uploadScore', 'replay', 'normalShare', 'groupResult', 'groupRank', 'reborn'];
    return Api;
}());
__reflect(Api.prototype, "Api");
var Mp3 = (function () {
    function Mp3() {
    }
    Mp3.loadBgm = function () {
        var bgm = wx.createInnerAudioContext();
        bgm.loop = true;
        bgm.src = SoundRes.bgm;
        return bgm;
    };
    Mp3.loadEventSound = function () {
        return SoundRes.eventSoundList.map(function (soundData) {
            soundData['context'] = wx.createInnerAudioContext();
            soundData['context'].src = soundData.path;
            return soundData;
        });
    };
    Mp3.playBGM = function () {
        this.bgm.play();
    };
    Mp3.playEvent = function (event_name) {
        this.eventSoundList.map(function (soundData) {
            if (soundData.name == event_name) {
                soundData['context'].play();
            }
        });
    };
    Mp3.bgm = Mp3.loadBgm();
    Mp3.eventSoundList = Mp3.loadEventSound();
    return Mp3;
}());
__reflect(Mp3.prototype, "Mp3");
var Records = (function () {
    function Records() {
    }
    /**
     * 获取个人周最高成绩
     */
    Records.getWeekScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var weekTime, postData, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        weekTime = Utils.getWeekTime();
                        postData = {
                            user_id: UserData.getOpenId(),
                            start: weekTime[0],
                            end: weekTime[1]
                        };
                        record = 0;
                        return [4 /*yield*/, Api.getBestRecord(postData).then(function (res) { record = res['score']; })];
                    case 1:
                        _a.sent();
                        this.weekScore = record;
                        return [2 /*return*/, record];
                }
            });
        });
    };
    /**
     * 获取个人历史最高成绩
     */
    Records.getHistoryScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var postData, record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        postData = {
                            user_id: UserData.getOpenId(),
                            start: Utils.dateFtt(new Date(1970, 0, 1)),
                            end: Utils.dateFtt(new Date())
                        };
                        record = 0;
                        return [4 /*yield*/, Api.getBestRecord(postData).then(function (res) { record = res['score']; })];
                    case 1:
                        _a.sent();
                        this.historyScore = record;
                        return [2 /*return*/, record];
                }
            });
        });
    };
    /**
     * 网络刷新世界排行榜数据
     */
    Records.refreshWorldRanking = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = null;
                        return [4 /*yield*/, Api.getRankings().then(function (res) { result = res; })];
                    case 1:
                        _a.sent();
                        this.worldRankings = result;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * 获取世界排行榜数据
     */
    Records.getRankings = function () {
        return JSON.parse(JSON.stringify(this.worldRankings));
    };
    /**
     * 获取当前成绩
     */
    Records.getScore = function () {
        return this.score;
    };
    /**
     * 更新当前成绩
     */
    Records.updateScore = function (score) {
        this.score = score || 0;
    };
    /**
     * 更新当前游戏类型
     */
    Records.updateRecordType = function (record_type) {
        this.record_type = record_type || 0;
    };
    /**
     * 上传成绩，同时上传至腾讯云及自己服务器
     */
    Records.uploadScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var uploadData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadData = { score: (this.score || 0), record_type: (this.record_type || 1) };
                        // 若网络不好，上传自己服务器失败，则重新上传（后期需完善若超时规则）
                        return [4 /*yield*/, Api.uploadRecords(uploadData)
                                .then(function (result) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = !result;
                                        if (!_a) return [3 /*break*/, 2];
                                        return [4 /*yield*/, Records.updateScore()];
                                    case 1:
                                        _a = (_b.sent());
                                        _b.label = 2;
                                    case 2:
                                        _a;
                                        return [2 /*return*/];
                                }
                            }); }); })];
                    case 1:
                        // 若网络不好，上传自己服务器失败，则重新上传（后期需完善若超时规则）
                        _a.sent();
                        return [4 /*yield*/, WxKit.uploadScore(this.score || 0)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Api.postEvent('uploadScore')];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    // 玩家当前局成绩
    Records.score = 0;
    return Records;
}());
__reflect(Records.prototype, "Records");
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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createChildren, _this);
        return _this;
    }
    Main.prototype.createChildren = function () {
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        return [4 /*yield*/, RES.getResAsync("description_json")];
                    case 2:
                        result = _a.sent();
                        // 调用WxKit.login完成微信登陆授权操作，返回openId,token等数据;
                        return [4 /*yield*/, WxKit.login()];
                    case 3:
                        // 调用WxKit.login完成微信登陆授权操作，返回openId,token等数据;
                        _a.sent();
                        console.log(UserData.getOpenId());
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 2:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var _this = this;
        // 设置游戏参数内的默认舞台宽高
        GameConfig.setStageWidthHeight(this.stage);
        // 刷新版本控制数据
        VersionCtrl.refreshVersionCtrl();
        // 绘制背景
        var sky = eKit.createBitmapByName("bg_jpg", { width: GameConfig.getWidth(), height: GameConfig.getHeight(), x: 0, y: 0, touchEnabled: true });
        this.addChild(sky);
        /**
         *常用调用示例
         *
         */
        // 分享调用示例
        var share_btn = eKit.createSprite({ x: 20, y: 20 });
        this.addChild(share_btn);
        var btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        share_btn.addChild(btn_bg);
        share_btn.addChild(eKit.createText('调用分享', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { WxKit.shareGame('normalShare', '我就试试分享', 'get'); }, this);
        // 事件音乐调用示例
        var music_btn = eKit.createSprite({ x: 20, y: 100 });
        this.addChild(music_btn);
        var music_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        music_btn.addChild(music_btn_bg);
        music_btn.addChild(eKit.createText('调用音乐', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        music_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            Mp3.playEvent('success');
        }, this);
        // 分享重生调用示例
        var reborn_btn = eKit.createSprite({ x: 20, y: 180 });
        this.addChild(reborn_btn);
        var reborn_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        reborn_btn.addChild(reborn_btn_bg);
        reborn_btn.addChild(eKit.createText('调用重生', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        reborn_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            var reborn_result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, WxKit.rebornGame('我来试试重生', 'get')];
                    case 1:
                        reborn_result = _a.sent();
                        console.log('能否重生' + reborn_result);
                        return [2 /*return*/];
                }
            });
        }); }, this);
        // 获取最高成绩调用示例
        var get_hight_score_btn = eKit.createSprite({ x: 20, y: 260 });
        this.addChild(get_hight_score_btn);
        var get_hight_score_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        get_hight_score_btn.addChild(get_hight_score_btn_bg);
        get_hight_score_btn.addChild(eKit.createText('最高成绩', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        get_hight_score_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            var score;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Records.getHistoryScore()];
                    case 1:
                        score = _a.sent();
                        console.log('最高成绩:' + score);
                        return [2 /*return*/];
                }
            });
        }); }, this);
        // 世界排行榜
        var http_ranking_btn = eKit.createSprite({ x: 20, y: 340 });
        this.addChild(http_ranking_btn);
        var http_ranking_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        http_ranking_btn.addChild(http_ranking_btn_bg);
        http_ranking_btn.addChild(eKit.createText('网络排行榜', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        http_ranking_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            var ranking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Records.refreshWorldRanking()];
                    case 1:
                        ranking = _a.sent();
                        console.log(ranking);
                        console.log('done');
                        return [2 /*return*/];
                }
            });
        }); }, this);
        // 缓存排行榜
        var ranking_btn = eKit.createSprite({ x: 20, y: 420 });
        this.addChild(ranking_btn);
        var ranking_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        ranking_btn.addChild(ranking_btn_bg);
        ranking_btn.addChild(eKit.createText('缓存排行榜', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        ranking_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            var ranking;
            return __generator(this, function (_a) {
                ranking = Records.getRankings();
                console.log(ranking);
                console.log('done');
                return [2 /*return*/];
            });
        }); }, this);
        // 调用开放数据域获取好友排行榜
        var friend_ranking_btn = eKit.createSprite({ x: 20, y: 500 });
        this.addChild(friend_ranking_btn);
        var friend_ranking_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        friend_ranking_btn.addChild(friend_ranking_btn_bg);
        friend_ranking_btn.addChild(eKit.createText('好友排行榜', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        friend_ranking_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            var open_data;
            return __generator(this, function (_a) {
                open_data = WxKit.linkOpenData({});
                return [2 /*return*/];
            });
        }); }, this);
        // 调用Records.uploadScore上传成绩到自己服务器及腾讯云服务器
        // sky.addEventListener(egret.TouchEvent.TOUCH_TAP, async () => {
        //    await Records.uploadScore();
        // }, this);
        // 清空按钮
        var clear_btn = eKit.createSprite({ x: 20, y: 580 });
        this.addChild(clear_btn);
        var clear_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        clear_btn.addChild(clear_btn_bg);
        clear_btn.addChild(eKit.createText('清空按钮', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        clear_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                eKit.clearView(this, 0);
                return [2 /*return*/];
            });
        }); }, this);
        // 清空按钮
        var particle_btn = eKit.createSprite({ x: 20, y: 660 });
        this.addChild(particle_btn);
        var particle_btn_bg = eKit.createRect([0, 0, 120, 60], { beginFill: { color: 0x9988ff, alpha: 1 } }, { touchEnabled: true });
        particle_btn.addChild(particle_btn_bg);
        particle_btn.addChild(eKit.createText('触发粒子', { width: 120, height: 60, size: 20, textAlign: 'center', verticalAlign: 'middle' }));
        particle_btn_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { return __awaiter(_this, void 0, void 0, function () {
            var system;
            return __generator(this, function (_a) {
                system = new particle.GravityParticleSystem(RES.getRes('boom_01_png'), RES.getRes('boom_01_json'));
                system.start(50);
                this.addChild(system);
                return [2 /*return*/];
            });
        }); }, this);
        // 播放背景音乐
        Mp3.playBGM();
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
var Ws = (function () {
    function Ws() {
    }
    return Ws;
}());
__reflect(Ws.prototype, "Ws");
/**
   * WxKit为优化使用小游戏中常用的函数方法调用
   *
   */
var PLATFORM = new WxPlatform();
var WxKit = (function () {
    function WxKit() {
    }
    /**
     * 调用login完成getUserInfo版登陆操作
     */
    WxKit.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var code, userInfo, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        code = null;
                        userInfo = null;
                        result = null;
                        return [4 /*yield*/, PLATFORM.login()
                                .then(function (res) { code = res.code; })
                                .catch(function (err) { console.warn(err); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, PLATFORM.getUserInfo()
                                .then(function (res) { userInfo = JSON.parse(JSON.stringify(res)); })
                                .catch(function (err) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, WxKit.reAuth()
                                                .then(function (res) { userInfo = JSON.parse(JSON.stringify(res)); })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, PLATFORM.auth(code, userInfo.iv, userInfo.encryptedData)
                                .then(function (res) { result = JSON.parse(JSON.stringify(res)); })
                                .catch(function (err) { console.warn(err); })];
                    case 3:
                        _a.sent();
                        Api.setToken(result.data.token);
                        UserData.setUserData(result.data);
                        Api.postEvent('open');
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * getUserInfo授权失败时重新弹出需授权弹窗,若拒绝则继续弹出
     */
    WxKit.reAuth = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                wx.hideLoading();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        PLATFORM.showAuthModal()
                            .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!res.authSetting['scope.userInfo']) return [3 /*break*/, 2];
                                        return [4 /*yield*/, PLATFORM.getUserInfo().then(function (res) { resolve(res); })];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, WxKit.reAuth().then(function (res) { resolve(res); })];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
            });
        });
    };
    /**
     * 设置默认分享
     */
    WxKit.setDefaultShare = function () {
        wx.showShareMenu({
            withShareTicket: true,
            success: void (0),
            fail: void (0)
        });
        wx.onShareAppMessage(function () {
            return {
                title: GameConfig.getShareTitle(),
                imageUrl: GameConfig.getShareImg()
            };
        });
    };
    /**
     * @param  {string} type? type可能取值 ： groupRank(排行榜群排行) groupResult(结果页群排行) reborn(分享重生) normalShare(普通分享)
     * @param  {string} title?
     * @param  {string} imageUrl?
     */
    WxKit.shareGame = function (type, title, imageUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 不传type时，默认为普通分享
                        type || (type = 'normalShare');
                        // 不传title时，为默认title
                        title || (title = GameConfig.getShareTitle());
                        // 不传imageUrl时，为默认image
                        imageUrl || (imageUrl = GameConfig.getShareImg());
                        if (!(imageUrl == 'get')) return [3 /*break*/, 2];
                        return [4 /*yield*/, Api.getShareUrl()];
                    case 1:
                        imageUrl = _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, new Promise(function (resolve, reject) {
                            wx.shareAppMessage({
                                title: title,
                                imageUrl: imageUrl,
                                query: type.match('group') ? 'groupRank=1' : '',
                                success: function (res) {
                                    Api.postEvent(type);
                                    resolve(res);
                                },
                                fail: function (err) { resolve(null); }
                            });
                        })];
                }
            });
        });
    };
    /**
     * 分享重生调用
     * @param  {string} title
     * @param  {string} imgUrl?
     */
    WxKit.rebornGame = function (title, imgUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var reborn_result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reborn_result = false;
                        return [4 /*yield*/, WxKit.shareGame('reborn', title, imgUrl).then(function (res) { reborn_result = !!res; })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, reborn_result];
                }
            });
        });
    };
    WxKit.linkOpenData = function (message, width, height) {
        var basic = {
            isDisplay: "true",
            token: Api.getToken(),
            userInfo: UserData.getUserData()
        };
        for (var key in message) {
            basic[key] = message[key];
        }
        var open_data_container = new egret.Sprite();
        var openDataContext = wx.getOpenDataContext();
        var bitmapdata = new egret.BitmapData(window["sharedCanvas"]);
        bitmapdata.$deleteSource = false;
        var texture = new egret.Texture();
        texture._setBitmapData(bitmapdata);
        var bitmap;
        bitmap = new egret.Bitmap(texture);
        bitmap.width = width || GameConfig.getWidth();
        bitmap.height = height || GameConfig.getHeight();
        bitmap.name = "openData";
        open_data_container.addChild(bitmap);
        egret.startTick(function (timeStarmp) {
            egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
            bitmapdata.webGLTexture = null;
            return false;
        }, this);
        openDataContext.postMessage(basic);
        return open_data_container;
    };
    WxKit.uploadScore = function (score) {
        return __awaiter(this, void 0, void 0, function () {
            var week_record;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        week_record = 0;
                        return [4 /*yield*/, Records.getWeekScore().then(function (res) {
                                week_record = res;
                            })];
                    case 1:
                        _a.sent();
                        if (!(score >= week_record)) return [3 /*break*/, 3];
                        return [4 /*yield*/, PLATFORM.setKVData({ "score": score + '', "date": Utils.getNowDate() })
                                .then(function (res) { })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * 设置回到前台事件处理音频及群排行
     */
    WxKit.setOnShowRule = function () {
        wx.onShow(function () {
            Mp3.playBGM();
        });
    };
    return WxKit;
}());
__reflect(WxKit.prototype, "WxKit");
// 设置默认分享
WxKit.setDefaultShare();
WxKit.setOnShowRule();
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
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI", ["RES.PromiseTaskReporter"]);
/**
   * eKit为优化使用方法后的egret引擎常用函数调用，包括创建bitmap，text，shape等
   *
   */
var eKit = (function () {
    function eKit() {
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * @param  {string} name
     * @param  {Object} settings?
     */
    eKit.createSprite = function (settings) {
        var result = new egret.Sprite();
        if (settings) {
            for (var key in settings) {
                result[key] = settings[key];
            }
        }
        return result;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * @param  {string} name
     * @param  {Object} settings?
     */
    eKit.createBitmapByName = function (name, settings) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        if (settings) {
            for (var key in settings) {
                result[key] = settings[key];
            }
        }
        return result;
    };
    /**
     * 根据text创建TextField对象
     * @param  {string} text
     * @param  {Object} settings?
     */
    eKit.createText = function (text, settings) {
        var result = new egret.TextField();
        result.text = text;
        if (settings) {
            for (var key in settings) {
                result[key] = settings[key];
            }
        }
        return result;
    };
    /**
     * 异步根据URL获取头像
     * @param  {any=''} url
     * @param  {Object} settings?
     */
    eKit.createAvatar = function (url, settings) {
        if (url === void 0) { url = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!url) {
                            reject('无头像');
                        }
                        RES.getResByUrl(url, function (evt) {
                            var textTure = evt;
                            var bitmap = new egret.Bitmap(textTure);
                            if (settings) {
                                for (var key in settings) {
                                    bitmap[key] = settings[key];
                                }
                            }
                            resolve(bitmap);
                        }, _this, RES.ResourceItem.TYPE_IMAGE);
                    })];
            });
        });
    };
    /**
     * 根据参数绘制直线段
     * @param  {Array<any>} points
     * @param  {{beginFill?:{color:number} param
     * @param  {number}} alpha
     * @param  {{thickness?:number} lineStyle?
     * @param  {number} color?
     * @param  {number} alpha?
     * @param  {boolean} pixelHinting?
     * @param  {string} scaleMode?
     * @param  {string} caps?
     * @param  {string} joints?
     * @param  {number}}} miterLimit?
     * @param  {Object} settings?
     * @returns egret
     */
    eKit.createLine = function (points, param, settings) {
        var shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.moveTo(points[0][0], points[0][1]);
        points.map(function (point, index) {
            index > 0 && shp.graphics.lineTo(points[index][0], points[index][1]);
        });
        shp.graphics.endFill();
        if (settings) {
            for (var key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    };
    /**
     * 根据参数绘制矩形
     * @param  {Array<any>} points
     * @param  {{beginFill?:{color:number} param
     * @param  {number}} alpha
     * @param  {{thickness?:number} lineStyle?
     * @param  {number} color?
     * @param  {number} alpha?
     * @param  {boolean} pixelHinting?
     * @param  {string} scaleMode?
     * @param  {string} caps?
     * @param  {string} joints?
     * @param  {number}}} miterLimit?
     * @param  {Object} settings?
     * @returns egret
     */
    eKit.createRect = function (points, param, settings) {
        var shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.drawRect(points[0], points[1], points[2], points[3]);
        if (settings) {
            for (var key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    };
    /**
     * 根据参数绘制圆形
     * @param  {Array<any>} points
     * @param  {{beginFill?:{color:number} param
     * @param  {number}} alpha
     * @param  {{thickness?:number} lineStyle?
     * @param  {number} color?
     * @param  {number} alpha?
     * @param  {boolean} pixelHinting?
     * @param  {string} scaleMode?
     * @param  {string} caps?
     * @param  {string} joints?
     * @param  {number}}} miterLimit?
     * @param  {Object} settings?
     * @returns egret
     */
    eKit.createCircle = function (points, param, settings) {
        var shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.drawCircle(points[0], points[1], points[2]);
        if (settings) {
            for (var key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    };
    /**
     * 根据参数绘制圆弧路径
     * @param  {Array<any>} points
     * @param  {{beginFill?:{color:number} param
     * @param  {number}} alpha
     * @param  {{thickness?:number} lineStyle?
     * @param  {number} color?
     * @param  {number} alpha?
     * @param  {boolean} pixelHinting?
     * @param  {string} scaleMode?
     * @param  {string} caps?
     * @param  {string} joints?
     * @param  {number}}} miterLimit?
     * @param  {Object} settings?
     * @returns egret
     */
    eKit.createArc = function (points, param, settings) {
        var shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.drawArc(points[0], points[1], points[2], points[3], points[4], points[5]);
        if (settings) {
            for (var key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    };
    /**
     * 根据参数绘制圆角矩形
     * @param  {Array<any>} points
     * @param  {{beginFill?:{color:number} param
     * @param  {number}} alpha
     * @param  {{thickness?:number} lineStyle?
     * @param  {number} color?
     * @param  {number} alpha?
     * @param  {boolean} pixelHinting?
     * @param  {string} scaleMode?
     * @param  {string} caps?
     * @param  {string} joints?
     * @param  {number}}} miterLimit?
     * @param  {Object} settings?
     * @returns egret
     */
    eKit.createRoundRect = function (points, param, settings) {
        var shp = new egret.Shape();
        if (param.beginFill) {
            shp.graphics.beginFill(param.beginFill.color, param.beginFill.alpha);
        }
        if (param.lineStyle) {
            shp.graphics.lineStyle(param.lineStyle.thickness, param.lineStyle.color, param.lineStyle.alpha, param.lineStyle.pixelHinting, param.lineStyle.scaleMode, param.lineStyle.caps, param.lineStyle.joints, param
                .lineStyle.miterLimit);
        }
        shp.graphics.drawArc(points[0], points[1], points[2], points[3], points[4], points[5]);
        if (settings) {
            for (var key in settings) {
                shp[key] = settings[key];
            }
        }
        return shp;
    };
    /**
     * 传入一个DisplayObject，将其从其父元素上移除
     * @param  {egret.DisplayObject} children
     */
    eKit.removeChild = function (children) {
        if (children.parent) {
            children.parent.removeChild(children);
        }
    };
    /**
     * 清空显示容器内显示元素，可输入start防止索引号之前的元素被清空
     * @param  {egret.DisplayObjectContainer} displayObjectContainer
     * @param  {number} start?
     */
    eKit.clearView = function (displayObjectContainer, start) {
        isNaN(start) && (start = -1);
        while (displayObjectContainer.$children.length > start + 1) {
            displayObjectContainer.removeChildAt(start + 1);
        }
        return true;
    };
    return eKit;
}());
__reflect(eKit.prototype, "eKit");
var UserData = (function () {
    function UserData() {
    }
    UserData.getOpenId = function () {
        return this.openId;
    };
    UserData.getUserData = function () {
        return JSON.parse(JSON.stringify(this.userInfo));
    };
    UserData.setUserData = function (userData) {
        this.avatar_url = userData.avatar_url;
        this.openId = userData.id;
        this.nickname = userData.nickname;
        this.gender = userData.gender;
        this.userInfo = userData;
    };
    return UserData;
}());
__reflect(UserData.prototype, "UserData");
// 版本控制组件
var VersionCtrl = (function () {
    function VersionCtrl() {
    }
    /**
     * 调用refreshVersionCtrl重新获取
     */
    VersionCtrl.refreshVersionCtrl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, Api.getConfiguration()];
                    case 1:
                        _a.configuration = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VersionCtrl.queryConfig = function (key) {
        return this.configuration[key];
    };
    return VersionCtrl;
}());
__reflect(VersionCtrl.prototype, "VersionCtrl");
;window.Main = Main;