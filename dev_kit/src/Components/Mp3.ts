class Mp3 {
    private static bgm = null;

    private static eventSoundList = null;
    // 静音标识
    public static mute = false;

    public static loadEventSound() {
        this.eventSoundList = SoundRes.eventSoundList.map((soundData) => {
            soundData['context'] = wx.createInnerAudioContext();
            soundData['context'].src = soundData.path;
            return soundData;
        })
    }

    public static switchBgm(bgm_name: string) {
        this.bgm && this.bgm.pause()
        this.eventSoundList.map((soundData) => {
            if (soundData.name == bgm_name) {
                this.bgm = soundData['context']
            }
        });
        console.log(this.bgm);
        this.bgm && (this.bgm.loop = true);
        this.bgm && !this.mute && this.bgm.play();
    }

    public static playBGM() {
        // return false;
        this.bgm && !this.mute && this.bgm.play();
    }

    public static stopBGM() {
        this.bgm && this.bgm.pause();
    }

    public static playEvent(event_name: string) {
        this.eventSoundList.map((soundData) => {
            if (soundData.name == event_name) {
                soundData['context'].stop();
                !this.mute && soundData['context'].play();
            }
        })
    }
}