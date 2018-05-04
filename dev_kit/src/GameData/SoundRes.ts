// 音频资源配置JSON

class SoundRes{
    // 定义事件音乐路径，Mp3.playEvent调用name即可播放对应path的音乐
    public static eventSoundList = [
        {name:'fail',path:'resource/assets/mp3/fail.mp3'},
        {name:'fall_down',path:'resource/assets/mp3/fall_down.mp3'},
        {name:'success',path:'resource/assets/mp3/success.mp3'}
    ];

    // 定义背景音乐路径
    public static bgm:string = 'resource/assets/mp3/bgm.mp3'
}