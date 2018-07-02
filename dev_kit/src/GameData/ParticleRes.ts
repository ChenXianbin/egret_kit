class partRes {
    // 定义事件音乐路径，Mp3.playEvent调用name即可播放对应path的音乐
    private static list = [
        { name: 'boom', texture_path: 'boom_png', texture: null, json_path: 'boom_json', json: null },
        { name: 'hit', texture_path: 'hit_png', texture: null, json_path: 'hit_json', json: null },
        { name: 'flame', texture_path: 'flame_png', texture: null, json_path: 'flame_json', json: null },
    ];

    public static initList() {
        this.list.map((res) => {
            res.texture = RES.getRes(res.texture_path);
            res.json = RES.getRes(res.json_path);
        })
    }

    public static getRes(name: string) {
        let result = { texture: null, json: null };
        this.list.map((res) => {
            if (res.name == name) {
                result = res;
            }
        });
        return result;
    }
}