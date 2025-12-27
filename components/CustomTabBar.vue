<template>
  <view class="tab-bar-container">
    <view class="tab-bar-body">
        <view 
            class="tab-item" 
            :class="{ 'active': current === 0 }"
            @click="switchTab(0, '/pages/index/index')"
        >
            <view class="icon-box">
                <image class="tab-icon" :src="current === 0 ? Icons.tabChat : Icons.tabChatInactive" mode="aspectFit"></image>
            </view>
            <text class="tab-text">消息</text>
        </view>

        <!-- 中间分割线装饰 -->
        <view class="divider"></view>

        <view 
            class="tab-item" 
            :class="{ 'active': current === 1 }"
            @click="switchTab(1, '/pages/profile/profile')"
        >
             <view class="icon-box">
                <image class="tab-icon" :src="current === 1 ? Icons.tabProfile : Icons.tabProfileInactive" mode="aspectFit"></image>
            </view>
            <text class="tab-text">我</text>
        </view>
    </view>
    <view class="safe-area-bottom"></view>
  </view>
</template>

<script setup lang="ts">
import { Icons } from '@/utils/icons';

const props = defineProps({
  current: { type: Number, default: 0 }
});

const switchTab = (index: number, path: string) => {
    if (props.current === index) return;
    uni.switchTab({ url: path });
};
</script>

<style lang="scss" scoped>
.tab-bar-container {
    position: fixed;
    bottom: 50rpx;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 9999;
    pointer-events: none; /* 外层透传点击 */
}

.tab-bar-body {
    pointer-events: auto;
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 50rpx;
    padding: 12rpx 16rpx;
    display: flex;
    align-items: center;
    box-shadow: 0 10rpx 40rpx rgba(44, 62, 56, 0.1);
    border: 2rpx solid rgba(255, 255, 255, 0.5);
    min-width: 320rpx;
}

.tab-item {
    display: flex;
    align-items: center;
    padding: 16rpx 32rpx;
    border-radius: 36rpx;
    transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
    
    .icon-box {
        margin-right: 12rpx;
        display: flex;
        align-items: center;
    }
    
    .tab-icon {
        width: 44rpx;
        height: 44rpx;
    }
    
    .tab-text {
        font-size: 28rpx;
        font-weight: 600;
        color: var(--text-secondary);
        transition: color 0.3s;
    }
    
    &.active {
        background-color: var(--primary-color);
        
        .tab-text {
            color: var(--text-main);
        }
    }
}

.divider {
    width: 2rpx;
    height: 30rpx;
    background-color: rgba(0,0,0,0.05);
    margin: 0 10rpx;
}

.safe-area-bottom {
    height: env(safe-area-inset-bottom);
    width: 100%;
}
</style>