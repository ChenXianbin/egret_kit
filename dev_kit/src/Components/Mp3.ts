class Mp3 {
    private static bgm = Mp3.loadBgm();

    private static eventSoundList = Mp3.loadEventSound();

    private static loadBgm() {
        let bgm = wx.createInnerAudioContext();
        bgm.loop = true
        bgm.src = SoundRes.bgm;
        return bgm;
    }

    private static loadEventSound(){
        return SoundRes.eventSoundList.map((soundData)=>{
            soundData['context'] = wx.createInnerAudioContext();
            soundData['context'].src =  soundData.path;
            return soundData;
        })
    }

    public static playBGM() {
        this.bgm.play();
    }

    public static playEvent(event_name:string){
        this.eventSoundList.map((soundData)=>{
            if(soundData.name == event_name){
                soundData['context'].play();
            }
        })
    }
}