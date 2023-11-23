import { defineStore } from "pinia"

export const userinfo = defineStore("userinfo", {
    state: () => {

    },
    // 封装计算属性
    getters: {},
    // 封装业务逻辑
    actions: {}
})

export const musicInfo = defineStore("musicInfo", {
    state: () => {
        return {
            audioCtx: null,
            musicUrl: '',
            musicName: '',
            musicSinger: '',
            musicAlbum: '',
            musicImg: '',
            musicLrc: '',
            musicDuration: 0,
        }
    },
    getters: {

    },
    actions: {

    },
}
)
