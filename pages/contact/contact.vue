<template>
  <view class="profile-container">
    <!-- 自定义顶部导航 -->
    <CustomNavBar :transparent="true" :showBack="true" />
    
    <!-- 顶部背景 -->
    <view class="header-bg"></view>
    
    <view class="content-wrapper">
        <view class="card-content">
          <view class="user-header">
            <image class="avatar" :src="contact.avatar" mode="aspectFill"></image>
            <view class="info">
              <text class="nickname">{{ contact.nickname }}</text>
              <view class="tags">
                  <text class="tag id-tag">ID: {{ contact.id }}</text>
                  <text class="tag level-tag">Lv.{{ contact.level }}</text>
              </view>
            </view>
          </view>
          
          <view class="info-card">
            <view class="section-box">
                <text class="section-title">个性签名</text>
                <text class="section-text">{{ contact.signature || '这个人很懒，什么都没写' }}</text>
            </view>
            
            <view class="divider"></view>

            <view class="section-box">
                <text class="section-title">联系方式</text>
                <view class="info-row">
                    <view class="icon">
                        <image class="info-icon" :src="Icons.phone" mode="aspectFit"></image>
                    </view>
                    <text class="value">{{ contact.phone }}</text>
                </view>
                <view class="info-row">
                    <view class="icon">
                        <image class="info-icon" :src="Icons.mail" mode="aspectFit"></image>
                    </view>
                    <text class="value">{{ contact.email }}</text>
                </view>
            </view>
          </view>
          
          <button class="primary-btn" hover-class="btn-hover" @click="goBack">
              发消息
          </button>
        </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { getContactById } from '@/utils/mock';
import { Icons } from '@/utils/icons';
import CustomNavBar from '@/components/CustomNavBar.vue';

const contact = ref<any>({});

onLoad((options: any) => {
  if (options.id) {
    contact.value = getContactById(options.id);
  }
});

const goBack = () => {
    const pages = getCurrentPages();
    if (pages.length > 1) {
        uni.navigateBack();
    } else {
        uni.switchTab({ url: '/pages/index/index' });
    }
};
</script>

<style lang="scss" scoped>
.profile-container {
  min-height: 100vh;
  position: relative;
  background-color: var(--bg-color);
}

.header-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50vh;
    background: radial-gradient(circle at 50% 0%, #C4EFE5 0%, rgba(244, 249, 248, 0) 70%);
    z-index: 0;
}

.content-wrapper {
    position: relative;
    z-index: 2;
    padding-top: 100rpx;
}

.card-content {
  padding: 20rpx 40rpx;
}

.user-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60rpx;
  
  .avatar {
    width: 240rpx;
    height: 240rpx;
    border-radius: 80rpx; /* 方圆 */
    border: 10rpx solid rgba(255,255,255,0.8);
    box-shadow: var(--shadow-float);
    margin-bottom: 40rpx;
    background-color: var(--primary-light);
  }
  
  .info {
    text-align: center;
    
    .nickname {
      font-size: 52rpx;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 20rpx;
      display: block;
    }
    
    .tags {
        display: flex;
        gap: 20rpx;
        justify-content: center;
        
        .tag {
            font-size: 24rpx;
            padding: 8rpx 24rpx;
            border-radius: 24rpx;
            font-weight: 600;
        }
        
        .id-tag {
            background-color: rgba(255,255,255,0.6);
            color: var(--text-secondary);
        }
        
        .level-tag {
            background-color: var(--accent-color);
            color: var(--text-brown);
        }
    }
  }
}

.info-card {
    background: rgba(255,255,255,0.8);
    backdrop-filter: blur(10px);
    border-radius: 48rpx;
    padding: 40rpx;
    box-shadow: var(--shadow-sm);
    margin-bottom: 40rpx;
    
    .section-title {
        font-size: 26rpx;
        color: var(--text-secondary);
        margin-bottom: 20rpx;
        display: block;
        font-weight: 700;
        letter-spacing: 2rpx;
        text-transform: uppercase;
        opacity: 0.8;
    }
    
    .section-text {
        font-size: 34rpx;
        color: var(--text-main);
        line-height: 1.6;
        font-weight: 500;
    }
    
    .divider {
        height: 2rpx;
        background-color: rgba(0,0,0,0.05);
        margin: 40rpx 0;
    }
    
    .info-row {
        display: flex;
        align-items: center;
        padding: 20rpx 0;
        
        .icon {
            width: 70rpx;
            height: 70rpx;
            background-color: #F7FAFC;
            border-radius: 20rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 24rpx;
        }
        
        .info-icon {
            width: 32rpx;
            height: 32rpx;
        }
        
        .value {
            color: var(--text-main);
            font-weight: 600;
            font-size: 32rpx;
        }
    }
}

.primary-btn {
  background: var(--text-main); /* 使用深色作为主按钮，增加对比 */
  color: #fff;
  border-radius: 40rpx;
  font-size: 36rpx;
  font-weight: 600;
  height: 110rpx;
  line-height: 110rpx;
  box-shadow: var(--shadow-float);
  
  &::after { border: none; }
}

.btn-hover {
    transform: scale(0.98);
    opacity: 0.9;
}
</style>