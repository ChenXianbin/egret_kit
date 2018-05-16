/**
 * 取消一个先前通过调用 requestAnimationFrame 方法添加到计划中的动画帧请求
 */
declare function cancelAnimationFrame(requestID: number): void;

/**
 * 在下次进行重绘时执行。
 */
declare function requestAnimationFrame(callback: () => void): number;

/**
 * 可取消由 setTimeout() 方法设置的定时器。
 */
declare function clearTimeout(timeoutID: number): void;

/**
 * 可取消由 setInterval() 方法设置的定时器。
 */
declare function clearInterval(intervalID: number): void;

/**
 * 设定一个定时器，在定时到期以后执行注册的回调函数
 */
declare function setTimeout(callback: () => void, delay: number, rest: any): number;

/**
 * 设定一个定时器，按照指定的周期（以毫秒计）来执行注册的回调函数
 */
declare function setInterval(callback: () => void, delay: number, rest: any): number;

declare const wx: {
    /**
     * 创建一个画布对象。首次调用创建的是显示在屏幕上的画布，之后调用创建的都是离屏画布。
     */
    createCanvas(): Canvas;
    /**
     * 只有开放数据域能调用，获取主域和开放数据域共享的 sharedCanvas
     */
    getSharedCanvas(): Canvas;
    /**
     * 创建一个图片对象
     */
    createImage(): Image;
    /**
     * 获取一行文本的行高
     */
    getTextLineHeight(object: { fontStyle: string, fontWeight: string, fontSize: number, fontFamily: string, text: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): number;
    /**
     * 加载自定义字体文件
     */
    loadFont(path: string): string;
    /**
     * 可以修改渲染帧率。默认渲染帧率为 60 帧每秒。修改后，requestAnimationFrame 的回调频率会发生改变。
     */
    setPreferredFramesPerSecond(fps: number): void;
    /**
     * 退出当前小游戏
     */
    exitMiniProgram(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 返回小程序启动参数
     */
    getLaunchOptionsSync(): LaunchOption;
    /**
     * 监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
     */
    onHide(callback: () => void): void;
    /**
     * 取消监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。
     */
    offHide(callback: () => void): void;
    /**
     * 监听小游戏回到前台的事件
     */
    onShow(callback: () => void): void;
    /**
     * 取消监听小游戏回到前台的事件
     */
    offShow(callback: () => void): void;
    /**
     * 获取系统信息
     */
    getSystemInfo(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * wx.getSystemInfo 的同步版本
     */
    getSystemInfoSync(): SystemInfo;
    /**
     * 监听音频中断结束，在收到 onAudioInterruptionBegin 事件之后，小程序内所有音频会暂停，收到此事件之后才可再次播放成功
     */
    onAudioInterruptionEnd(callback: () => void): void;
    /**
     * 取消监听音频中断结束，在收到 onAudioInterruptionBegin 事件之后，小程序内所有音频会暂停，收到此事件之后才可再次播放成功
     */
    offAudioInterruptionEnd(callback: () => void): void;
    /**
     * 监听音频因为受到系统占用而被中断开始，以下场景会触发此事件：闹钟、电话、FaceTime 通话、微信语音聊天、微信视频聊天。此事件触发后，小程序内所有音频会暂停。
     */
    onAudioInterruptionBegin(callback: () => void): void;
    /**
     * 取消监听音频因为受到系统占用而被中断开始，以下场景会触发此事件：闹钟、电话、FaceTime 通话、微信语音聊天、微信视频聊天。此事件触发后，小程序内所有音频会暂停。
     */
    offAudioInterruptionBegin(callback: () => void): void;
    /**
     * 监听全局错误事件
     */
    onError(callback: () => void): void;
    /**
     * 取消监听全局错误事件
     */
    offError(callback: () => void): void;
    /**
     * 监听开始触摸事件
     */
    onTouchStart(callback: () => void): void;
    /**
     * 取消监听开始触摸事件
     */
    offTouchStart(callback: () => void): void;
    /**
     * 监听触点移动事件
     */
    onTouchMove(callback: () => void): void;
    /**
     * 取消监听触点移动事件
     */
    offTouchMove(callback: () => void): void;
    /**
     * 监听触摸结束事件
     */
    onTouchEnd(callback: () => void): void;
    /**
     * 取消监听触摸结束事件
     */
    offTouchEnd(callback: () => void): void;
    /**
     * 监听触点失效事件
     */
    onTouchCancel(callback: () => void): void;
    /**
     * 取消监听触点失效事件
     */
    offTouchCancel(callback: () => void): void;
    /**
     * 监听加速度数据，频率：5次/秒，接口调用后会自动开始监听，可使用 wx.stopAccelerometer 停止监听。
     */
    onAccelerometerChange(callback: () => void): void;
    startAccelerometer(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    stopAccelerometer(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 获取设备电量
     */
    getBatteryInfo(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * wx.getBatteryInfo 的同步版本
     */
    getBatteryInfoSync(): string;
    getClipboardData(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    setClipboardData(object: { data: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 监听罗盘数据，频率：5 次/秒，接口调用后会自动开始监听，可使用 wx.stopCompass 停止监听。
     */
    onCompassChange(callback: () => void): void;
    startCompass(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    stopCompass(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 获取网络类型
     */
    getNetworkType(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    onNetworkStatusChange(callback: () => void): void;
    getScreenBrightness(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    setKeepScreenOn(object: { keepScreenOn: boolean, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    setScreenBrightness(object: { value: number, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    vibrateShort(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    vibrateLong(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 获取全局唯一的文件管理器
     */
    getFileSystemManager(): FileSystemManager;
    /**
     * 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用；当用户点击“显示在聊天顶部”时，此接口可继续调用。
     */
    getLocation(object: { type: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地文件路径。
     */
    downloadFile(object: { url: string, header: Object, filePath: string, fail: (res: any) => void, complete?: (res: any) => void }): DownloadTask;
    /**
     * 发起网络请求。
     */
    request(object: { url: string, data: string | Object, header?: Object, method: string, dataType?: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): RequestTask;
    /**
     * 创建一个 WebSocket 连接。最多同时存在 2 个 WebSocket 连接。
     */
    connectSocket(object: { url: string, header: Object, method: string, protocols: any[], success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): SocketTask;
    /**
     * 关闭 WeSocket 连接
     */
    closeSocket(object: { code: number, reason: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 监听WebSocket 连接打开事件
     */
    onSocketOpen(callback: () => void): void;
    /**
     * 监听WebSocket 连接关闭事件
     */
    onSocketClose(callback: () => void): void;
    /**
     * 监听WebSocket 接受到服务器的消息事件
     */
    onSocketMessage(callback: () => void): void;
    /**
     * 监听WebSocket 错误事件
     */
    onSocketError(callback: () => void): void;
    /**
     * 通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
     */
    sendSocketMessage(object: { data: any[], success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 将本地资源上传到开发者服务器，客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data 。
     */
    uploadFile(object: { url: string, filePath: string, name: string, header: Object, formData: Object, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): UploadTask;
    /**
     * 通过 wx.login 接口获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用 wx.checkSession 接口检测当前用户登录态是否有效。登录态过期后开发者可以再调用 wx.login 获取新的用户登录态。
     */
    checkSession(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 调用接口获取登录凭证（code）进而换取用户登录态信息，包括用户的唯一标识（openid） 及本次登录的 会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成。
     */
    login(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    authorize(object: { scope: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 在无须用户授权的情况下，批量获取用户信息。该接口只在开放数据域下可用
     */
    createUserInfoButton(object: { type: string, text?: string, image?: string, style: any }): UserInfoButton;
    getUserInfo(object: { openIdList?: any[], lang?: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    getSetting(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    openSetting(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    getWeRunData(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 拉取当前用户所有同玩好友的托管数据。该接口只可在开放数据域下使用
     */
    getFriendCloudStorage(object: { keyList: any[], success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 在小游戏是通过群分享卡片打开的情况下，可以通过调用该接口获取群同玩成员的游戏数据。该接口只可在开放数据域下使用。
     */
    getGroupCloudStorage(object: { shareTicket: string, keyList: any[], success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 获取当前用户托管数据当中对应 key 的数据。该接口只可在开放数据域下使用
     */
    getUserCloudStorage(object: { keyList: any[], success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 删除用户托管数据当中对应 key 的数据。
     */
    removeUserCloudStorage(object: { keyList: any[], success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 对用户托管数据进行写数据操作，允许同时写多组 KV 数据。
     */
    setUserCloudStorage(object: { KVDataList: any[], success: (res: any) => void, fail?: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 获取开放数据域
     */
    getOpenDataContext(): OpenDataContext;
    /**
     * 监听主域发送的消息
     */
    onMessage(callback: (data: any) => void): void;
    getShareInfo(object: { shareTicket: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    hideShareMenu(object?: { success?: (res: any) => void, fail?: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 监听用户点击右上角菜单的“转发”按钮时触发的事件
     */
    onShareAppMessage(callback: () => void): void;
    /**
     * 取消监听用户点击右上角菜单的“转发”按钮时触发的事件
     */
    offShareAppMessage(callback: () => void): void;
    showShareMenu(object: { withShareTicket: boolean, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 主动拉起转发，进入选择通讯录界面。
     */
    shareAppMessage(object: { title?: string, imageUrl?: string, query?: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    updateShareMenu(object: { withShareTicket?: boolean, success?: (res: any) => void, fail?: (res: any) => void, complete?: (res: any) => void }): void;
    setEnableDebug(object: { enableDebug: boolean, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 清理本地数据缓存
     */
    clearStorage(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * wx.clearStorage 的同步版本
     */
    clearStorageSync(): void;
    /**
     * 从本地缓存中异步获取指定 key 的内容
     */
    getStorage(object: { key: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 异步获取当前storage的相关信息
     */
    getStorageInfo(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * wx.getStorage 的同步版本
     */
    getStorageSync(key: string): Object | string;
    /**
     * wx.getStorageInfo 的同步版本
     */
    getStorageInfoSync(): Object;
    /**
     * 从本地缓存中移除指定 key
     */
    removeStorage(object: { key: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * wx.removeStorage 的同步版本
     */
    removeStorageSync(key: string): void;
    /**
     * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容。
     */
    setStorage(object: { key: string, data: Object | string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * wx.setStorage 的同步版本
     */
    setStorageSync(key: string, data: Object | string): void;
    /**
     * 隐藏消息提示框
     */
    hideToast(object?: { success?: (res: any) => void, fail?: (res: any) => void, complete?: (res: any) => void }): void;
    hideLoading(object?: { success?: (res: any) => void, fail?: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 显示模态对话框
     */
    showModal(object: { title: string, content: string, showCancel?: boolean, cancelText: string, cancelColor?: string, confirmText: string, confirmColor?: string, success: (res: any) => void, fail?: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 显示消息提示框
     */
    showToast(object: { title: Object, icon: Object, image: Object, success?: (res: any) => void, fail?: (res: any) => void, complete?: (res: any) => void }): void;
    showLoading(object: { title: string, mask: boolean, success?: (res: any) => void, fail?: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 参数
     */
    showActionSheet(object: { itemList: any[], itemColor: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 隐藏键盘
     */
    hideKeyboard(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 监听键盘输入事件
     */
    onKeyboardInput(callback: () => void): void;
    /**
     * 取消监听键盘输入事件
     */
    offKeyboardInput(callback: () => void): void;
    /**
     * 监听用户点击键盘 Confirm 按钮时的事件
     */
    onKeyboardConfirm(callback: () => void): void;
    /**
     * 取消监听用户点击键盘 Confirm 按钮时的事件
     */
    offKeyboardConfirm(callback: () => void): void;
    /**
     * 监听监听键盘收起的事件
     */
    onKeyboardComplete(callback: () => void): void;
    /**
     * 取消监听监听键盘收起的事件
     */
    offKeyboardComplete(callback: () => void): void;
    /**
     * 显示键盘
     */
    showKeyboard(object: { defaultValue: string, maxLength: number, multiple: boolean, confirmHold: boolean, confirmType: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 动态设置通过右上角按钮拉起的菜单的样式。
     */
    setMenuStyle(object: { style: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 当在配置中设置 showStatusBarStyle 时，屏幕顶部会显示状态栏。此接口可以修改状态栏的样式。
     */
    setStatusBarStyle(object: { style: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 监听窗口尺寸变化事件
     */
    onWindowResize(callback: () => void): void;
    /**
     * 取消监听窗口尺寸变化事件
     */
    offWindowResize(callback: () => void): void;
    /**
     * 返回值
     */
    getUpdateManager(): UpdateManager;
    /**
     * 创建一个 Worker 线程，目前限制最多只能创建一个 Worker，创建下一个 Worker 前请调用 Worker.terminate
     */
    createWorker(): Worker;
    /**
     * 创建一个 InnerAudioContext 实例
     */
    createInnerAudioContext(): InnerAudioContext;
    getRecorderManager(): RecorderManager;
    /**
     * 从本地相册选择图片或使用相机拍照。
     */
    chooseImage(object: { count: number }): void;
    /**
     * 预览图片
     */
    previewImage(object: { current: string, urls: any[], success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    saveImageToPhotosAlbum(object: { filePath: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 创建视频
     */
    createVideo(object: { x: number, y: number, width: number, height: number, src: number, poster: number, initialTime: number, playbackRate: number, live: number, objectFit: number, controls: number, autoplay: number, loop: number, muted: number }): Video;
    /**
     * 获取性能管理器
     */
    getPerformance(): Performance;
    /**
     * 加快触发 JavaScrpitCore Garbage Collection（垃圾回收），GC 时机是由 JavaScrpitCore 来控制的，并不能保证调用后马上触发 GC。
     */
    triggerGC(): void;
    /**
     * 发起米大师支付
     */
    requestMidasPayment(object: { mode: string, env: number, offerId: string, currencyType: string, platform: string, buyQuantity: number, zoneId: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
}

declare interface Canvas {
    /**
     * 获取画布对象的绘图上下文
     */
    getContext(contextType: string, contextAttributes: { antialias: boolean, preserveDrawingBuffer: boolean, antialiasSamples: number }): RenderingContext;
    /**
     * 将当前 Canvas 保存为一个临时文件，并生成相应的临时文件路径。
     */
    toTempFilePath(object: { x: number, y: number, width: number, height: number, destWidth: number, destHeight: number, fileType: string, quality: number, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): string;
    /**
     * 把画布上的绘制内容以一个 data URI 的格式返回
     */
    toDataURL(): string;
    /**
     * Canvas.toTempFilePath 的同步版本
     */
    toTempFilePathSync(object: { x: number, y: number, width: number, height: number, destWidth: number, destHeight: number, fileType: string, quality: number }): void;
}

declare interface FileSystemManager {
    /**
     * 判断文件/目录是否存在
     */
    access(object: { path: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * FileSystemManager.access 的同步版本
     */
    accessSync(path: string): void;
    /**
     * 复制文件
     */
    copyFile(object: { srcPath: string, destPath: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * FileSystemManager.copyFile 的同步版本
     */
    copyFileSync(srcPath: string, destPath: string): void;
    /**
     * 获取该小程序下的 本地临时文件 或 本地缓存文件 信息
     */
    getFileInfo(object: { filePath: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 获取该小程序下已保存的本地缓存文件列表
     */
    getSavedFileList(object: { success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 创建目录
     */
    mkdir(object: { dirPath: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * FileSystemManager.mkdir 的同步版本
     */
    mkdirSync(dirPath: string): void;
    /**
     * 删除该小程序下已保存的本地缓存文件
     */
    removeSavedFile(object: { filePath: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 读取本地文件内容
     */
    readFile(object: { filePath: string, encoding: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 重命名文件，可以把文件从 oldPath 移动到 newPath
     */
    rename(object: { oldPath: string, newPath: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 删除目录
     */
    rmdir(object: { dirPath: Object, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 读取目录内文件列表
     */
    readdir(object: { dirPath: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * FileSystemManager.readdir 的同步版本
     */
    readdirSync(dirPath: string): string[];
    /**
     * FileSystemManager.rename 的同步版本
     */
    renameSync(oldPath: string, newPath: string): void;
    /**
     * FileSystemManager.rmdir 的同步版本
     */
    rmdirSync(dirPath: {}): void;
    /**
     * FileSystemManager.readFile 的同步版本
     */
    readFileSync(filePath: string, encoding: string): string[];
    /**
     * 保存临时文件到本地。此接口会移动临时文件，因此调用成功后，tempFilePath 将不可用。
     */
    saveFile(object: { tempFilePath: string, filePath: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 获取文件 Stats 对象
     */
    stat(object: { path: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): Stats;
    /**
     * FileSystemManager.saveFile 的同步版本
     */
    saveFileSync(tempFilePath: string, filePath: string): number;
    /**
     * FileSystemManager.stat 的同步版本
     */
    statSync(path: string): Stats;
    /**
     * 删除文件
     */
    unlink(object: { filePath: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 解压文件
     */
    unzip(object: { zipFilePath: string, targetPath: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * FileSystemManager.unlink 的同步版本
     */
    unlinkSync(filePath: string): void;
    /**
     * 写文件
     */
    writeFile(object: { filePath: string, data: any[], encoding: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * FileSystemManager.writeFile 的同步版本
     */
    writeFileSync(filePath: string, data: string | ArrayBuffer, encoding: string): void;
}

declare interface Stats {
    /**
     * 判断当前文件是否一个目录
     */
    isDirectory(): boolean;
    /**
     * 判断当前文件是否一个普通文件
     */
    isFile(): boolean;
}

declare interface DownloadTask {
    abort(): void;
    onProgressUpdate(callback: () => void): void;
}

declare interface RequestTask {
    abort(): void;
}

declare interface SocketTask {
    /**
     * 关闭 WebSocket 连接
     */
    close(object: { code: number, reason: string, success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
    /**
     * 监听WebSocket 连接打开事件
     */
    onOpen(callback: () => void): void;
    /**
     * 监听WebSocket 连接关闭事件
     */
    onClose(callback: () => void): void;
    /**
     * 监听WebSocket 错误事件
     */
    onError(callback: () => void): void;
    /**
     * 监听WebSocket 接受到服务器的消息事件
     */
    onMessage(callback: () => void): void;
    /**
     * 通过 WebSocket 连接发送数据
     */
    send(object: { data: any[], success: (res: any) => void, fail: (res: any) => void, complete?: (res: any) => void }): void;
}

declare interface UploadTask {
    abort(): void;
    onProgressUpdate(callback: () => void): void;
}

declare interface OpenDataContext {
    /**
     * 向开放数据域发送消息
     */
    postMessage(message: {}): void;
}

declare interface UpdateManager {
    /**
     * 应用更新包并重启
     */
    applyUpdate(): void;
    /**
     * 监听检查更新结果回调
     */
    onCheckForUpdate(callback: () => void): void;
    /**
     * 监听更新包下载成功回调
     */
    onUpdateReady(callback: () => void): void;
    /**
     * 监听更新包下载失败回调
     */
    onUpdateFailed(callback: () => void): void;
}

declare interface Worker {
    /**
     * 监听接收主线程/Worker 线程向当前线程发送的消息
     */
    onMessage(callback: () => void): void;
    /**
     * 向主线程/Worker 线程发送的消息。
     */
    postMessage(message: {}): void;
    /**
     * 结束当前 worker 线程，仅限在主线程 worker 对象上调用。
     */
    terminate(): void;
}

declare interface InnerAudioContext {
    /**
     * 销毁当前实例
     */
    destroy(): void;
    /**
     * 取消监听音频进入可以播放状态的事件
     */
    offCanplay(callback: () => void): void;
    /**
     * 监听音频暂停事件
     */
    onPause(callback: () => void): void;
    /**
     * 监听音频停止事件
     */
    onStop(callback: () => void): void;
    /**
     * 取消监听音频停止事件
     */
    offStop(callback: () => void): void;
    /**
     * 监听音频自然播放至结束的事件
     */
    onEnded(callback: () => void): void;
    /**
     * 取消监听音频自然播放至结束的事件
     */
    offEnded(callback: () => void): void;
    /**
     * 监听音频播放进度更新事件
     */
    onTimeUpdate(callback: () => void): void;
    /**
     * 监听音频播放事件
     */
    onPlay(callback: () => void): void;
    /**
     * 监听音频播放错误事件
     */
    onError(callback: () => void): void;
    /**
     * 取消监听音频暂停事件
     */
    offPause(callback: () => void): void;
    /**
     * 监听音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
     */
    onWaiting(callback: () => void): void;
    /**
     * 取消监听音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
     */
    offWaiting(callback: () => void): void;
    /**
     * 监听音频进行跳转操作的事件
     */
    onSeeking(callback: () => void): void;
    /**
     * 取消监听音频进行跳转操作的事件
     */
    offSeeking(callback: () => void): void;
    /**
     * 监听音频完成跳转操作的事件
     */
    onSeeked(callback: () => void): void;
    /**
     * 取消监听音频完成跳转操作的事件
     */
    offSeeked(callback: () => void): void;
    /**
     * 取消监听音频播放事件
     */
    offPlay(callback: () => void): void;
    /**
     * 取消监听音频播放进度更新事件
     */
    offTimeUpdate(callback: () => void): void;
    /**
     * 监听音频进入可以播放状态的事件
     */
    onCanplay(callback: () => void): void;
    /**
     * 取消监听音频播放错误事件
     */
    offError(callback: () => void): void;
    /**
     * 停止。停止后的音频再播放会从头开始播放。
     */
    pause(): void;
    /**
     * 播放
     */
    play(): void;
    /**
     * 跳转到指定位置，单位 s
     */
    seek(position: number): void;

    src: string;

    autoplay: boolean;

    loop: boolean;

    obeyMuteSwitch: boolean;

    duration: number;

    buffered: number;

    volume: number;
}

declare interface RecorderManager {
    /**
     * 监听录音暂停事件
     */
    onPause(callback: () => void): void;
    /**
     * 监听录音结束事件
     */
    onStop(callback: () => void): void;
    /**
     * 监听已录制完指定帧大小的文件事件。如果设置了 frameSize，则会回调此事件。
     */
    onFrameRecorded(callback: () => void): void;
    /**
     * 监听录音错误事件
     */
    onError(callback: () => void): void;
    /**
     * 监听录音开始事件
     */
    onStart(callback: () => void): void;
    /**
     * 暂停录音
     */
    pause(): void;
    /**
     * 继续录音
     */
    resume(): void;
    /**
     * 停止录音
     */
    stop(): void;
    /**
     * 开始录音
     */
    start(object: { duration: number, sampleRate: number, numberOfChannels: number, encodeBitRate: number, format: string, frameSize: number }): void;
}

declare interface Video {
    /**
     * 视频退出全屏
     */
    exitFullScreen(): Promise<Object>;
    /**
     * 取消监听视频暂停事件
     */
    offPause(callback: () => void): void;
    /**
     * 监听视频播放到末尾事件
     */
    onEnded(callback: () => void): void;
    /**
     * 取消监听视频播放到末尾事件
     */
    offEnded(callback: () => void): void;
    /**
     * 监听视频播放进度更新事件
     */
    onTimeUpdate(callback: () => void): void;
    /**
     * 取消监听视频播放进度更新事件
     */
    offTimeUpdate(callback: () => void): void;
    /**
     * 监听视频错误事件
     */
    onError(callback: () => void): void;
    /**
     * 取消监听视频错误事件
     */
    offError(callback: () => void): void;
    /**
     * 监听视频播放事件
     */
    onPlay(callback: () => void): void;
    /**
     * 监听视频暂停事件
     */
    onPause(callback: () => void): void;
    /**
     * 取消监听视频缓冲事件
     */
    offWaiting(callback: () => void): void;
    /**
     * 监听视频缓冲事件
     */
    onWaiting(callback: () => void): void;
    /**
     * 取消监听视频播放事件
     */
    offPlay(callback: () => void): void;
    /**
     * 暂停视频
     */
    pause(): Promise<Object>;
    /**
     * 播放视频
     */
    play(): Promise<Object>;
    /**
     * 视频全屏
     */
    requestFullScreen(): Promise<Object>;
    /**
     * 视频跳转
     */
    seek(time: number): Promise<Object>;
    /**
     * 停止视频
     */
    stop(): Promise<Object>;
}

declare interface Performance {
    /**
     * 可以获取当前时间以微秒为单位的时间戳
     */
    now(): number;
}


declare interface Image {
    /**
     * 图片的 URL
     */
    src: string;
    /**
    * 图片的真实宽度
    */
    width: number;
    /**
    * 图片的真实高度
    */
    height: number;
    /**
     * 图片的加载完成
     */
    onload: () => void;
}

declare class LaunchOption {
    /** 场景值*/
    scene: number;
    /** 启动参数*/
    query: Object;
    /** 当前小游戏是否被显示在聊天顶部*/
    isSticky: boolean;
    /** shareTicket*/
    shareTicket: string;
}

declare class SystemInfo {
    /** 手机品牌*/
    brand: string;
    /** 手机型号*/
    model: string;
    /**	设备像素比 */
    pixelRatio: number;
    /** 屏幕宽度*/
    screenWidth: number;
    /** 屏幕高度*/
    screenHeight: number;
    /** 可使用窗口宽度*/
    windowWidth: number;
    /** 可使用窗口高度*/
    windowHeight: number;
    /** 微信设置的语言*/
    language: string;
    /** 微信版本号*/
    version: string;
    /** 操作系统版本*/
    system: string;
    /** 客户端平台*/
    platform: string
    /** 用户字体大小设置。以“我-设置 - 通用 - 字体大小”中的设置为准，单位 px。*/
    fontSizeSetting: number;
    /** 客户端基础库版本*/
    SDKVersion: string;
    /** 性能等级*/
    benchmarkLevel: number;
    /** 电量，范围 1 - 100*/
    battery: number;
    /** wifi 信号强度，范围 0 - 4 */
    wifiSignal: number;
}

declare class Stats {
    /**
     * 文件的类型和存取的权限，对应 POSIX stat.st_mode
     */
    mode: string;
    /**
     * 文件大小，单位：B，对应 POSIX stat.st_size
     */
    size: number;
    /**
     * 文件最近一次被存取或被执行的时间，UNIX 时间戳，对应 POSIX stat.st_atime
     */
    lastAccessedTime: number;
    /**
    * 文件最后一次被修改的时间，UNIX 时间戳，对应 POSIX stat.st_mtime
    */
    lastModifiedTime: number;
}

/**
 * 通过 Canvas.getContext('2d') 接口可以获取 CanvasRenderingContext2D 对象。CanvasRenderingContext2D 实现了 HTML The 2D rendering context 定义的大部分属性、方法。通过 Canvas.getContext('webgl') 接口可以获取 WebGLRenderingContext 对象。 WebGLRenderingContext 实现了 WebGL 1.0 定义的所有属性、方法、常量。
 * 2d 接口支持情况
 * iOS/Android 不支持的 2d 属性和接口
 * globalCompositeOperation 不支持以下值： source-in source-out destination-atop lighter copy。如果使用，不会报错，但是将得到与预期不符的结果。
 * isPointInPath
 * WebGL 接口支持情况
 * iOS/Android 不支持的 WebGL 接
  */
declare interface RenderingContext { }

/**
 * 按钮
 */
declare interface UserInfoButton {
    destroy(): void;
    hide(): void;
    onTap(callback: (res) => void): void;
    offTap(callback: () => void): void;
    show(): void;
}