
<template>
  <view class="container">
    <!-- 自定义顶部导航 -->
    <CustomNavBar :transparent="true">
        <template #center>
            <!-- 首页不显示中间标题，而是留空 -->
        </template>
        <template #right>
             <!-- 机器人头像作为右上角入口 -->
             <view class="bot-entry" hover-class="hover-opacity">
                 <image class="bot-avatar" :src="aiAvatar" mode="aspectFill"></image>
             </view>
        </template>
    </CustomNavBar>
    
    <!-- 顶部渐变背景 -->
    <view class="header-bg"></view>

    <!-- 页面内容主体 -->
    <view class="page-content">
        <!-- 大标题区域 -->
        <view class="title-area">
          <text class="app-name">Companion AI</text>
          <view class="subtitle">与你的智能助手对话</view>
        </view>

        <!-- 搜索栏 -->
        <view class="search-wrapper">
          <view class="search-box">
            <image class="search-icon" :src="Icons.search" mode="aspectFit"></image>
            <input class="search-input" type="text" placeholder="搜索对话..." placeholder-class="placeholder-style"/>
          </view>
        </view>

        <!-- 会话列表 -->
        <scroll-view scroll-y class="chat-list-scroll">
          <view class="chat-list">
            <view 
              v-for="(item, index) in listData" 
              :key="item.id" 
              class="chat-item"
              hover-class="chat-item-hover"
              @click="goToChat(item)"
            >
              <view class="avatar-container">
                <image class="avatar" :src="item.contactAvatar" mode="aspectFill"></image>
                <view v-if="item.unreadCount > 0" class="badge">
                  {{ item.unreadCount > 99 ? '99+' : item.unreadCount }}
                </view>
              </view>
              
              <view class="content">
                <view class="header">
                  <text class="name">{{ item.contactName }}</text>
                  <text class="time">{{ item.lastTime }}</text>
                </view>
                <view class="footer">
                  <text class="message">{{ item.lastMessage }}</text>
                </view>
              </view>
            </view>
            
            <!-- 列表底部垫高，防止被悬浮TabBar遮挡 -->
            <view style="height: 180rpx;"></view>
          </view>
        </scroll-view>
    </view>
    
    <!-- 自定义底部导航 -->
    <CustomTabBar :current="0" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onPullDownRefresh, onReachBottom, onShow } from '@dcloudio/uni-app';
import { conversations, contacts } from '@/utils/mock';
import { Icons } from '@/utils/icons';
import CustomNavBar from '@/components/CustomNavBar.vue';
import CustomTabBar from '@/components/CustomTabBar.vue';

const listData = ref([...conversations]);
const aiAvatar = contacts.find(c => c.id === 'ai_bot')?.avatar || contacts[0].avatar;

onShow(() => {
    uni.hideTabBar();
});

// 下拉刷新
onPullDownRefresh(() => {
  setTimeout(() => {
    listData.value = [...conversations]; 
    uni.stopPullDownRefresh();
    uni.showToast({ title: '已更新', icon: 'none' });
  }, 1000);
});

// 上拉加载
onReachBottom(() => {
    // 简单演示
});

const goToChat = (item: any) => {
  item.unreadCount = 0;
  uni.navigateTo({
    url: `/pages/chat/chat?id=${item.contactId}&name=${item.contactName}`
  });
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: var(--bg-color);
  position: relative;
  display: flex;
  flex-direction: column;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 500rpx;
  background: linear-gradient(180deg, #A7EAD7 0%, rgba(244, 249, 248, 0) 100%);
  z-index: 0;
  pointer-events: none;
}

.page-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
}

.title-area {
    padding: 20rpx 40rpx;
    margin-top: 10rpx;
    
    .app-name {
        font-size: 56rpx;
        font-weight: 800;
        color: var(--text-main);
        display: block;
        letter-spacing: -1rpx;
    }
    
    .subtitle {
        font-size: 28rpx;
        color: var(--text-secondary);
        margin-top: 8rpx;
        opacity: 0.8;
    }
}

.bot-entry {
    width: 80rpx;
    height: 80rpx;
    background: white;
    border-radius: 50%;
    padding: 6rpx;
    box-shadow: var(--shadow-sm);
    
    .bot-avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: var(--primary-light);
    }
}

.search-wrapper {
  padding: 30rpx 40rpx;
  
  .search-box {
    background-color: rgba(255, 255, 255, 0.7);
    height: 100rpx;
    border-radius: 40rpx;
    display: flex;
    align-items: center;
    padding: 0 40rpx;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s;
    backdrop-filter: blur(5px);
    
    &:active {
      background-color: #fff;
      transform: scale(0.99);
    }
    
    .search-icon {
      width: 36rpx;
      height: 36rpx;
      margin-right: 24rpx;
      opacity: 0.8;
    }
    
    .search-input {
      flex: 1;
      height: 100%;
      font-size: 32rpx;
      color: var(--text-main);
    }
  }
}

.chat-list-scroll {
  flex: 1;
  height: 0; 
}

.chat-list {
  padding: 0 30rpx;
}

.chat-item {
  display: flex;
  padding: 36rpx;
  background-color: #ffffff;
  border-radius: 40rpx;
  margin-bottom: 24rpx;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s;
  align-items: center;
  
  &.chat-item-hover {
    transform: scale(0.98);
    box-shadow: none;
    background-color: #F8FAF9;
  }
  
  .avatar-container {
    position: relative;
    margin-right: 32rpx;
    flex-shrink: 0;
    
    .avatar {
      width: 120rpx;
      height: 120rpx;
      border-radius: 40rpx;
      background-color: var(--primary-light);
    }
    
    .badge {
      position: absolute;
      top: -8rpx;
      right: -8rpx;
      background-color: #FF7D7D;
      color: white;
      font-size: 22rpx;
      min-width: 44rpx;
      height: 44rpx;
      border-radius: 22rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 6rpx solid #fff;
      font-weight: 800;
    }
  }
  
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    height: 110rpx;
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 12rpx;
      
      .name {
        font-size: 36rpx;
        font-weight: 700;
        color: var(--text-main);
      }
      
      .time {
        font-size: 24rpx;
        color: var(--text-secondary);
        font-weight: 500;
        opacity: 0.8;
      }
    }
    
    .footer {
      .message {
        font-size: 28rpx;
        color: var(--text-secondary);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-weight: 400;
      }
    }
  }
}
</style>
