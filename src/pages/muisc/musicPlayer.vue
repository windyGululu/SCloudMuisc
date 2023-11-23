<template>
  <div class="musicPlayer">
    <!-- 头部 -->
    <header class="header">
      <view class="header-close" @click="onCloseClick()">
        <u-icon name="arrow-down" color="#fff" size="30"></u-icon>
      </view>
      <view class="header-title">音乐播放器</view>
      <view class="header-close" @click="onCloseClick()">
        <u-icon name="share-square" color="#fff" size="30"></u-icon>
      </view>
    </header>

    <div class="body">
      <!-- 背景图 -->
      <image v-if="lyricStatus" class="bg-image" src="../../static/music/music-bg.jpg" mode=""></image>

      <!-- TODO:歌词 -->
      <view v-if="!lyricStatus" class="lyric-container">
        <view class="lyric-wrapper">
          <view class="lyric-item" v-for="(item, index) in lyric" :key="index">
            <view class="lyric-item">{{ item }}
            </view>

          </view>
        </view>
      </view>

    </div>

    <footer class="footer">
      <!--TODO: 进度条 -->
      <div class="slider">
        <view class="slider-current">
          {{ currentTime }}
        </view>
        <!-- <u-slider class="slider-val1" block-size="12" :max="sliderMax" v-model="duration" @change="sliderChange" /> -->
        <u-slider class="slider-val" :max="duration" @changing="audioCtx.pause()" @change="sliderChange"
          v-model="currentTime"></u-slider>

        <view class="slider-duration">
          {{ duration }}
        </view>
      </div>

      <!-- 音乐控制 -->
      <div class="control">
        <view class="control-item" @click="onMusicNext('up')">
          <u-icon name="reload" color="#fff" size="30"></u-icon>
        </view>
        <view class="control-items">
          <view class="control-item" @click="onMusicNext('up')">
            <u-icon name="play-left-fill" color="#fff" size="30"></u-icon>
          </view>
          <view class="control-item control-circle" @click="onMusicPlay()">
            <u-icon name="pause-circle" v-show="payl" color="#fff" size="40"></u-icon>
            <u-icon name="play-circle" v-show="!payl" color="#fff" size="40"></u-icon>
          </view>
          <view class="control-item" @click="onMusicNext('next')">
            <u-icon name="play-right-fill" color="#fff" size="30"></u-icon>
          </view>
        </view>
        <view class="control-item" @click="onMusicNext('next')">
          <u-icon name="list-dot" color="#fff" size="30"></u-icon>
        </view>

      </div>

    </footer>


  </div>
</template>

<script>
import { musicInfo } from "@/store/index.js"
const musicInfoStore = musicInfo()

export default ({
  components: {},
  data() {
    return {
      payl: false,
      lyricStatus: true,
      audioCtx: null,
      currentTime: 0,
      duration: 0,

    }
  },
  setup() {

  },

  beforeMount() {
    console.log("onmounted");
    this.audioCtx = uni.createInnerAudioContext();
    let url = "../../static/testmusic/cs.flac"
    this.audioCtx.src = url;

    this.audioCtx.onTimeUpdate(() => {
      console.log("currentTime", this.audioCtx.currentTime);
      this.currentTime = this.audioCtx.currentTime;
      this.duration = this.audioCtx.duration;
    })
    this.audioCtx.onCanplay(() => {
      this.duration = this.audioCtx.duration;
    })

    // store musicinfo
    musicInfoStore.$patch({
      audioCtx: this.audioCtx,
    })


  },
  computed: {

  },
  methods: {

    // 返回上一页
    onCloseClick() {
      uni.navigateBack({
        delta: 1
      });
    },



    // 播放音乐
    onMusicPlay() {
      console.log("audioctx", this.audioCtx);
      if (!this.payl)
        this.audioCtx.play()

      else {
        this.audioCtx.pause()
      }

      console.log(this.audioCtx.currentTime);
      // this.currentTime = this.audioCtx.currentTime;


      this.payl = !this.payl;

    },

    // 滑动滚动条
    sliderChange() {
      this.audioCtx.currentTime = this.currentTime;
      if (this.payl) {
        this.audioCtx.play();
      }

    }

  },

  // 页面周期函数--监听页面加载
  onLoad() {

  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() { },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() { },
  // 页面周期函数--监听页面隐藏
  onHide() { },
  // 页面周期函数--监听页面卸载
  onUnload() { },
  // 页面处理函数--监听用户下拉动作
  // onPullDownRefresh() { uni.stopPullDownRefresh(); },
  // 页面处理函数--监听用户上拉触底
  // onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  // onPageScroll(event) {},
  // 页面处理函数--用户点击右上角分享
  // onShareAppMessage(options) {},
}) 
</script>

<style scoped>
.musicPlayer {
  background-color: bisque;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.header {
  padding-top: 10rpx;
  display: flex;
  justify-content: space-between;
}

.body {
  display: flex;
  justify-content: center;

}

.footer {
  /* height: 100rpx; */
  padding-bottom: 50rpx;
  background-color: cadetblue;

}

.slider {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.slider-val {
  width: 90%;
}

.control {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.control-item {
  display: inline-block;
}

.control-items {
  display: flex;
  align-items: center;
}

.control-circle {
  margin: 10px;
}


.lyric-container {
  height: 750rpx;
  overflow: hidden;
  overflow-y: scroll
}

.lyric-item {
  margin-top: 20rpx;
}
</style>