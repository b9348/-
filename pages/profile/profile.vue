<template>
  <view class="container">
    <CustomNavBar title="个人中心" :transparent="true" />
    
    <view class="content-body">
        <view class="header-section">
            <view class="user-card" hover-class="hover-opacity">
              <view class="left">
                <image class="avatar" :src="userInfo.avatar" mode="aspectFill"></image>
                <view class="info">
                  <text class="name">{{ userInfo.nickname }}</text>
                  <text class="desc">ID: {{ userInfo.id }}</text>
                </view>
              </view>
              <view class="right">
                <view class="qr-btn">
                     <image class="qr-icon" :src="Icons.qr" mode="aspectFit"></image>
                </view>
              </view>
            </view>
        </view>
        
        <view class="menu-list">
          <view class="menu-item" hover-class="item-hover">
            <view class="icon-box" style="background-color: #EEF2FF;">
                <image class="menu-icon" :src="Icons.star" mode="aspectFit"></image>
            </view>
            <text class="title">我的收藏</text>
            <view class="arrow-box">
                <image class="arrow-icon" :src="Icons.arrowRight" mode="aspectFit"></image>
            </view>
          </view>
          <view class="menu-item" hover-class="item-hover">
            <view class="icon-box" style="background-color: #ECFDF5;">
                <image class="menu-icon" :src="Icons.image" mode="aspectFit"></image>
            </view>
            <text class="title">相册与视频</text>
            <view class="arrow-box">
                <image class="arrow-icon" :src="Icons.arrowRight" mode="aspectFit"></image>
            </view>
          </view>
          <view class="menu-item" hover-class="item-hover">
            <view class="icon-box" style="background-color: #FFFBEB;">
                <image class="menu-icon" :src="Icons.smile" mode="aspectFit"></image>
            </view>
            <text class="title">表情商店</text>
            <view class="arrow-box">
                <image class="arrow-icon" :src="Icons.arrowRight" mode="aspectFit"></image>
            </view>
          </view>
        </view>
        
        <view class="menu-list">
          <view class="menu-item" hover-class="item-hover">
            <view class="icon-box" style="background-color: #F3F4F6;">
                <image class="menu-icon" :src="Icons.settings" mode="aspectFit"></image>
            </view>
            <text class="title">设置</text>
            <view class="arrow-box">
                <image class="arrow-icon" :src="Icons.arrowRight" mode="aspectFit"></image>
            </view>
          </view>
        </view>
    </view>
    
    <CustomTabBar :current="1" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { currentUser } from '@/utils/mock';
import { Icons } from '@/utils/icons';
import CustomNavBar from '@/components/CustomNavBar.vue';
import CustomTabBar from '@/components/CustomTabBar.vue';

const userInfo = ref(currentUser);

onShow(() => {
    uni.hideTabBar();
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: var(--bg-color);
  background-image: radial-gradient(circle at 100% 0%, #E0F5EE 0%, transparent 40%);
}

.content-body {
    padding: 0 40rpx;
    padding-bottom: 200rpx; /* 底部预留 TabBar 空间 */
}

.header-section {
    margin-top: 20rpx;
    margin-bottom: 50rpx;
}

.user-card {
  background-color: var(--white);
  padding: 40rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 48rpx;
  box-shadow: var(--shadow-float);
  
  .left {
    display: flex;
    align-items: center;
    
    .avatar {
      width: 140rpx;
      height: 140rpx;
      border-radius: 40rpx;
      margin-right: 32rpx;
      border: 6rpx solid var(--bg-color);
      background-color: var(--primary-light);
    }
    
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      .name {
        font-size: 44rpx;
        font-weight: 800;
        color: var(--text-main);
        margin-bottom: 8rpx;
      }
      
      .desc {
        font-size: 26rpx;
        color: var(--text-secondary);
        background-color: #F7FAFC;
        padding: 4rpx 16rpx;
        border-radius: 12rpx;
        align-self: flex-start;
      }
    }
  }
  
  .right {
      .qr-btn {
          width: 80rpx;
          height: 80rpx;
          border-radius: 24rpx;
          background-color: #F7FAFC;
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
      }
      
      .qr-icon {
          width: 44rpx;
          height: 44rpx;
      }
  }
}

.menu-list {
  background-color: var(--white);
  border-radius: 48rpx;
  margin-bottom: 40rpx;
  padding: 16rpx;
  box-shadow: var(--shadow-md);
  
  .menu-item {
    padding: 24rpx;
    display: flex;
    align-items: center;
    border-radius: 32rpx;
    transition: background-color 0.2s;
    
    .icon-box {
      width: 90rpx;
      height: 90rpx;
      margin-right: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 32rpx;
      
      .menu-icon {
          width: 44rpx;
          height: 44rpx;
      }
    }
    
    .title {
      flex: 1;
      font-size: 34rpx;
      color: var(--text-main);
      font-weight: 600;
    }
    
    .arrow-box {
      width: 60rpx;
      height: 60rpx;
      border-radius: 20rpx;
      background-color: #F9FAFB;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .arrow-icon {
          width: 24rpx;
          height: 24rpx;
      }
    }
  }
}

.item-hover {
  background-color: #F8FAF9;
}
</style>