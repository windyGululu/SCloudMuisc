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
      <!-- 进度条 -->
      <div class="slider">
        <view class="slider-current">
          11:21
        </view>
        <slider class="slider-val" block-size="12" :max="sliderMax" :value="sliderCurrent" @change="sliderChange" />
        <view class="slider-duration">
          21:22
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

export default ({
  components: {},
  data() {
    return {
      payl: false,
      lyricStatus: true,
      lyric: [
        "無何化有 感物知春秋",
        "秋毫濡沫欲綢繆 搦管相留",
        "留骨攢峰 留容映水秀",
        "無何化有 感物知春秋",
        "秋毫濡沫欲綢繆 搦管相留",
        "留骨攒峰 留容映水秀",
        "無何化有 感物知春秋",
        "無何化有 感物知春秋",
        "秋毫濡沫欲綢繆 搦管相留",
        "留骨攢峰 留容映水秀",
        "無何化有 感物知春秋",
        "秋毫濡沫欲綢繆 搦管相留",
        "留骨攒峰 留容映水秀",
        "無何化有 感物知春秋",
        "無何化有 感物知春秋",
        "秋毫濡沫欲綢繆 搦管相留",
        "留骨攢峰 留容映水秀",
        "無何化有 感物知春秋",
        "秋毫濡沫欲綢繆 搦管相留",
        "留骨攒峰 留容映水秀",
        "無何化有 感物知春秋",
        "無何化有 感物知春秋",
        "秋毫濡沫欲綢繆 搦管相留",
        "留骨攢峰 留容映水秀",
        "無何化有 感物知春秋",
        "秋毫濡沫欲綢繆 搦管相留",
        "留骨攒峰 留容映水秀",
        "無何化有 感物知春秋",
        "無何化有 感物知春秋",
        "秋毫濡沫欲綢繆 搦管相留",
        "留骨攢峰 留容映水秀",
        "無何化有 感物知春秋",
        "秋毫濡沫欲綢繆 搦管相留",
        "留骨攒峰 留容映水秀",
        "無何化有 感物知春秋",
        "無何化有 感物知春秋",
        "秋毫濡沫欲綢繆 搦管相留",
        "留骨攢峰 留容映水秀",
        "無何化有 感物知春秋",
        "秋毫濡沫欲綢繆 搦管相留",
        "留骨攒峰 留容映水秀",
        "無何化有 感物知春秋",
      ],
    }
  },
  computed: {},
  methods: {
    onCloseClick() {
      uni.navigateBack({
        delta: 1
      });
    },

  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() { },
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

  justify-content: center;
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