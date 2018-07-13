class Mp3 {
    private static bgm = null;

    private static eventSoundList = null;
    // 静音标识
    public static mute = false;

    // 初始化音轨
    public static loadEventSound() {
        this.eventSoundList = SoundRes.eventSoundList.map((soundData) => {
            if (!soundData['cnt']) {
                soundData['context'] = wx.createInnerAudioContext();
                soundData['context'].src = soundData.path;
                return soundData;
            } else {
                let obj = { name: soundData.name, soundArr: [] };
                for (let i = 0, l = soundData['cnt']; i < l; i++) {
                    let res = {};
                    res['context'] = wx.createInnerAudioContext();
                    res['context'].src = soundData.path;
                    obj['soundArr'].push(res);
                }
                return obj;
            }

        });
    }

    // 切换背景音乐
    public static switchBgm(bgm_name: string) {
        this.bgm && this.bgm.pause()
        this.eventSoundList.map((soundData) => {
            if (soundData.name == bgm_name) {
                if (soundData['context']) {
                    this.bgm = soundData['context'];
                } else {
                    this.bgm = soundData['soundArr'][0]['context'];
                }
            }
        });
        this.bgm && (this.bgm.loop = true);
        this.bgm && !this.mute && this.bgm.play();
    }

    //播放背景音乐
    public static playBGM() {
        this.bgm && !this.mute && this.bgm.play();
    }

    // 停止背景音乐
    public static stopBGM() {
        this.bgm && this.bgm.pause();
    }

    // 播放事件音效
    public static playEvent(event_name: string) {
        this.eventSoundList.map((soundData) => {
            if (soundData.name == event_name) {
                if (soundData['context']) {
                    !this.mute && soundData['context'].play();
                } else {
                    let target = soundData['soundArr'][0];
                    soundData['soundArr'].push(soundData['soundArr'].shift());
                    !this.mute && target['context'].play();
                }

            }
        })
    }
}