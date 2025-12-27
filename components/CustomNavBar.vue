
<template>
  <view class="nav-bar-wrapper">
    <!-- 占位符，防止内容被遮挡 -->
    <view :style="{ height: navBarHeight + 'px' }"></view>
    
    <!-- 实际导航栏 -->
    <view class="nav-bar" :class="{ 'nav-transparent': transparent }" :style="{ height: navBarHeight + 'px', paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <!-- 返回按钮 -->
        <view v-if="showBack" class="left-action" @click="goBack">
          <view class="back-btn">
             <image class="icon" :src="Icons.back" mode="aspectFit"></image>
          </view>
        </view>
        
        <!-- 标题槽位 -->
        <view class="center-content">
            <text v-if="title" class="nav-title">{{ title }}</text>
            <slot name="center"></slot>
        </view>

        <!-- 右侧槽位 -->
        <view class="right-action">
            <slot name="right"></slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icons } from '@/utils/icons';

const props = defineProps({
  title: { type: String, default: '' },
  showBack: { type: Boolean, default: false },
  transparent: { type: Boolean, default: false },
  defaultBackUrl: { type: String, default: '/pages/index/index' } // 当无法返回上一页时的默认跳转路径
});

const statusBarHeight = ref(20);
const navBarHeight = ref(64);

// 获取系统信息以适配刘海屏
const systemInfo = uni.getSystemInfoSync();
statusBarHeight.value = systemInfo.statusBarHeight || 20;
// 胶囊按钮位置信息 (小程序端)
// #ifdef MP-WEIXIN
const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
navBarHeight.value = menuButtonInfo.bottom + 8;
// #endif
// #ifndef MP-WEIXIN
navBarHeight.value = statusBarHeight.value + 44;
// #endif

const goBack = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    uni.navigateBack();
  } else {
    // 页面栈只有一个页面，说明是直达或被重置，跳转到默认页（通常是首页）
    // 判断是否是 tabBar 页面，决定跳转方式
    const isTabBar = props.defaultBackUrl.includes('/index/index') || props.defaultBackUrl.includes('/profile/profile');
    
    if (isTabBar) {
        uni.switchTab({
            url: props.defaultBackUrl,
            fail: () => {
                // 容错：如果switchTab失败，尝试reLaunch
                uni.reLaunch({ url: props.defaultBackUrl });
            }
        });
    } else {
        uni.redirectTo({
            url: props.defaultBackUrl,
            fail: () => {
                 uni.reLaunch({ url: props.defaultBackUrl });
            }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-bar-wrapper {
    width: 100%;
    position: relative;
    z-index: 999;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--bg-color); /* 默认背景色，可透明 */
  z-index: 999;
  transition: background-color 0.3s;
  
  &.nav-transparent {
      background-color: transparent;
  }
}

.nav-content {
  height: 44px; /* 导航栏内容高度固定 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  position: relative;
}

.left-action {
  min-width: 60rpx;
  display: flex;
  align-items: center;
  z-index: 10;
  
  .back-btn {
    width: 72rpx;
    height: 72rpx;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
    
    .icon {
        width: 40rpx;
        height: 40rpx;
    }
  }
}

.center-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; /* 让点击穿透到左右两侧 */
  
  .nav-title {
    font-size: 34rpx;
    font-weight: 700;
    color: var(--text-main);
  }
}

.right-action {
  min-width: 60rpx;
  display: flex;
  justify-content: flex-end;
  z-index: 10;
}
</style>
