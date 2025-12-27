<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
  // 隐藏原生TabBar，使用自定义组件
  uni.hideTabBar();
});
onShow(() => {
  console.log("App Show");
  uni.hideTabBar();
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss">
/* 定义全局变量 - 参照参考图 Companion AI 色系 */
:root {
  /* 主色调 - 清新薄荷绿 */
  --primary-color: #9DE4D0; 
  --primary-light: #E0F5EE;
  
  /* 强调色 - 暖杏色/米橙色 (用于发送方气泡、按钮) */
  --accent-color: #F8D8B6; 
  --accent-dark: #EBC090;

  /* 文字颜色 */
  --text-main: #2C3E38; /* 深灰绿，比纯黑更柔和 */
  --text-secondary: #748B83;
  --text-brown: #5D4037; /* 用于暖色背景上的文字 */

  /* 背景色 */
  --bg-color: #F4F9F8;
  --white: #FFFFFF;

  /* 阴影 - 更柔和弥散 */
  --shadow-sm: 0 4rpx 12rpx rgba(136, 175, 165, 0.1);
  --shadow-md: 0 8rpx 24rpx rgba(136, 175, 165, 0.15);
  --shadow-float: 0 16rpx 40rpx rgba(136, 175, 165, 0.2);
  
  /* 安全区域 */
  --safe-area-inset-bottom: env(safe-area-inset-bottom);
}

/* 全局样式 */
page {
  background-color: var(--bg-color);
  font-family: "PingFang SC", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  color: var(--text-main);
  height: 100%;
}

view, text, image, scroll-view, input, button {
  box-sizing: border-box;
}

/* 按钮点击态 */
.hover-opacity {
  opacity: 0.8;
  transform: scale(0.98);
  transition: all 0.1s;
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}
</style>