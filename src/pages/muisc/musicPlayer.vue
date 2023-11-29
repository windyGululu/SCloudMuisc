<template>
  <div class="musicPlayer">
    <!-- 头部 -->
    <header class="header">
      <view class="header-close" @click="onCloseClick()">
        <u-icon name="arrow-down" color="#fff" size="30"></u-icon>
      </view>
      <view class="header-title">{{ payl }}音乐播放器</view>
      <view class="header-close" @click="onCloseClick()">
        <u-icon name="share-square" color="#fff" size="30"></u-icon>
      </view>
    </header>

    <div class="body">
      <!-- 背景图 -->
      <image v-if="!lyricStatus" class="bg-image" src="../../static/music/music-bg.jpg" mode=""></image>

      <!-- TODO:歌词 -->
      <view class="lyric-container">
        <view class="lyric-wrapper">
          <view class="lyric-item" v-for="(item, index) in lyric" :data-index='index' key="index">
            {{ item.words }}{{ item.time }}
          </view>
        </view>
      </view>

    </div>

    <footer class="footer">
      <!-- 进度条 -->
      <div class="slider">
        <up-text class="slider-current" :text="fnDateMinuteMethod(currentTime)"></up-text>
        <u-slider class="slider-val" step="1" :max="duration" @changing="audioCtx.pause()" @change="sliderChange"
          v-model="currentTime"></u-slider>
        <up-text class="slider-duration" :text="fnDateMinuteMethod(duration)"></up-text>
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

<script setup>
// import { musicInfo } from "@/store/index.js"
// const musicInfoStore = musicInfo()
import { fnDateMinute } from "@/utils/index.js"
import axios from "axios";

// import { toRaw } from '@vue/reactivity'
// import { ref, reactive, watch, onMounted } from 'vue'
import { ref, onMounted } from 'vue'



console.log("setup");
let payl = ref(false)

let lyricStatus = ref(true)
let audioCtx = ref(null)
let currentTime = ref(0)
let duration = ref(0)
let lyric = ref([])

const isOpen = onMounted(() => {
  audioCtx = uni.createInnerAudioContext();
  let url = "../../static/testmusic/cs.flac"
  audioCtx.src = url;
  showLrc()


  audioCtx.onCanplay(() => {
    duration.value = audioCtx.duration;
  })

  audioCtx.onTimeUpdate(() => {
    currentTime.value = audioCtx.currentTime;
    duration.value = audioCtx.duration;
    // 滚动歌词
    // 匹配歌词
    for (let i = 0; i < lyric.length; i++) {
      if (currentTime > (parseInt(lyric[i].time))) {
        // const index =  $refs.lyric[i].dataset.index1
        // console.log("index", index);
        // if (i === parseInt(index)) {
        //   console.log("currenttime");
        //    lyricIndex = i
        //    $refs.lyricUL.style.transform = `translateY(${170 - (30 * (i + 1))}px)`
        // }
      }
    }

  })

}
)
// 返回上一页
const onCloseClick = () => {
  uni.navigateBack({
    delta: 1
  });

}

// 格式化时间
//响应式中使用外部方法需要在data或method中声明
const fnDateMinuteMethod = (params) => {
  return fnDateMinute(params);
}


// 播放音乐
const onMusicPlay = () => {
  // console.log("audioctx",  audioCtx);
  if (!payl.value)
    audioCtx.play()
  else {
    audioCtx.pause()
  }
  payl.value = !payl.value;
  console.log(payl);
}



// 跳转到进度条制定位置
const sliderChange = () => {
  audioCtx.seek(parseInt(currentTime.value));
  if (payl.value) {
    audioCtx.play();
  }

}

const ParseLrc = (lrc) => {
  var lines = lrc.split('\n');
  var result = []; // 歌词对象数组
  for (var i = 0; i < lines.length; i++) {
    var lineStr = lines[i];
    var lineParts = lineStr.split(']');
    var timeStr = lineParts[0].substring(1);
    var timeParts = timeStr.split(':');

    var obj = {
      time: +timeParts[0] * 60 + +timeParts[1],
      words: lineParts[1],
    };
    result.push(obj);
  }
  return result;

}


const readLrc = async (url) => {

  let result = await axios.get(url)
  return result.data
}


const showLrc = async () => {
  let url = "../../static/testmusic/cs.lrc"
  lyric.value = await readLrc(url)
  lyric.value = ParseLrc(lyric.value)

}



// // 页面周期函数--监听页面加载
// onLoad() {

// },
// // 页面周期函数--监听页面初次渲染完成
// onReady() { },
// // 页面周期函数--监听页面显示(not-nvue)
// onShow() { },
// // 页面周期函数--监听页面隐藏
// onHide() { },
// // 页面周期函数--监听页面卸载
// onUnload() { },
// // 页面处理函数--监听用户下拉动作
// // onPullDownRefresh() { uni.stopPullDownRefresh(); },
// // 页面处理函数--监听用户上拉触底
// // onReachBottom() {},
// // 页面处理函数--监听页面滚动(not-nvue)
// // onPageScroll(event) {},
// // 页面处理函数--用户点击右上角分享
// // onShareAppMessage(options) {},

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
  justify-content: space-around;
  align-items: center;
}

.slider-val {
  width: 80%;
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

.lyric-wrapper {
  text-align: center;
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