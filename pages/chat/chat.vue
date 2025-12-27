
<template>
  <view class="chat-container">
    <!-- 背景渐变 -->
    <view class="bg-gradient"></view>
    
    <!-- 自定义顶部导航 -->
    <CustomNavBar :title="pageTitle" :showBack="true" :transparent="true">
        <template #right>
            <view class="more-btn" @click="goToContact(contactInfo.id)">
                <image class="icon-img" :src="Icons.more" mode="aspectFit"></image>
            </view>
        </template>
    </CustomNavBar>

    <!-- 聊天内容区域 -->
    <scroll-view 
      class="msg-list" 
      scroll-y 
      :scroll-into-view="scrollIntoView"
      :scroll-with-animation="true"
      @click="hideKeyboard"
      enable-back-to-top
    >
      <view class="msg-padding-top"></view>
      
      <view class="msg-item" v-for="(msg, index) in messages" :key="msg.id" :id="'msg-' + msg.id">
        <!-- 时间戳 -->
        <view class="timestamp" v-if="shouldShowTime(index)">
          <text class="time-text">{{ formatTime(msg.timestamp) }}</text>
        </view>
        
        <view class="msg-body" :class="{ 'msg-self': msg.isSelf, 'msg-other': !msg.isSelf }">
          <!-- 头像 -->
          <view class="avatar-wrapper" @click="goToContact(msg.isSelf ? 'me' : contactInfo.id)">
            <image 
              class="avatar" 
              :src="msg.isSelf ? currentUser.avatar : contactInfo.avatar" 
              mode="aspectFill"
            ></image>
          </view>
          
          <view class="content-wrapper">
            <!-- 统一气泡容器：处理图文混合 -->
            <view class="bubble mix-bubble">
                <!-- 文本部分 -->
                <view v-if="msg.content" class="text-part">
                    <text user-select>{{ msg.content }}</text>
                </view>
                
                <!-- 图片部分 -->
                <view v-if="msg.images && msg.images.length > 0" class="image-part" :class="{ 'has-text': !!msg.content }">
                    <image 
                        v-for="(img, imgIndex) in msg.images"
                        :key="imgIndex"
                        :src="img" 
                        mode="widthFix" 
                        class="msg-img"
                        @click="previewImage(img)"
                    ></image>
                </view>
            </view>
            
            <!-- 互动按钮 (仅对方显示) -->
            <view v-if="!msg.isSelf" class="feedback-actions">
               <view 
                    class="action-btn" 
                    :class="{ 'active': msg.feedback === 'up' }"
                    @click="toggleFeedback(msg, 'up')"
                >
                   <image class="action-icon" :src="msg.feedback === 'up' ? Icons.thumbUpActive : Icons.thumbUp" mode="aspectFit"></image>
               </view>
               <view 
                    class="action-btn"
                    :class="{ 'active': msg.feedback === 'down' }"
                    @click="toggleFeedback(msg, 'down')"
                >
                   <image class="action-icon" :src="msg.feedback === 'down' ? Icons.thumbDownActive : Icons.thumbDown" mode="aspectFit"></image>
               </view>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 底部垫高，防止内容被输入框遮挡 -->
      <view id="msg-bottom" style="height: 180rpx;"></view>
    </scroll-view>

    <!-- 底部悬浮输入区 -->
    <view class="input-area" :style="{ bottom: inputBottom + 'px' }">
      <view class="input-panel">
        
        <!-- 图片暂存/预览区域 -->
        <scroll-view 
            v-if="stagedImages.length > 0" 
            scroll-x 
            class="image-staging-area"
        >
            <view class="staging-list">
                <view v-for="(img, idx) in stagedImages" :key="idx" class="staged-item">
                    <image :src="img" mode="aspectFill" class="thumb"></image>
                    <view class="close-badge" @click="removeStagedImage(idx)">×</view>
                </view>
            </view>
        </scroll-view>

        <!-- 输入控制栏 -->
        <view class="input-row">
            <input 
              class="input-box" 
              type="text" 
              confirm-type="send" 
              v-model="inputText" 
              :adjust-position="false"
              cursor-spacing="20"
              placeholder="发送消息..."
              placeholder-class="input-placeholder"
              @focus="onInputFocus"
              @blur="onInputBlur"
              @confirm="sendMessage"
            />
            
            <view class="action-right">
                <view class="icon-btn camera-btn" @click="chooseImage">
                  <image class="icon-img" :src="Icons.camera" mode="aspectFit"></image>
                </view>
                <view 
                    class="send-btn" 
                    :class="{ 'disabled': !canSend }"
                    @click="sendMessage"
                >
                  <image class="icon-img" :src="Icons.send" mode="aspectFit"></image>
                </view>
            </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { initialMessages, currentUser, getContactById } from '@/utils/mock';
import { Icons } from '@/utils/icons';
import CustomNavBar from '@/components/CustomNavBar.vue';

// 状态定义
const messages = ref<any[]>([]);
const inputText = ref('');
const stagedImages = ref<string[]>([]); // 暂存的图片
const scrollIntoView = ref('');
const contactInfo = ref<any>({});
const inputBottom = ref(0);
const pageTitle = ref('');

// 是否可发送
const canSend = computed(() => {
    return inputText.value.trim().length > 0 || stagedImages.value.length > 0;
});

onLoad((options: any) => {
  const { id, name } = options;
  if (name) {
    pageTitle.value = name;
  }
  
  // 默认为 Bot
  const targetId = id || 'ai_bot';
  contactInfo.value = getContactById(targetId);
  
  // 模拟加载初始数据
  messages.value = JSON.parse(JSON.stringify(initialMessages));
  
  // 确保初始加载完滚动到底部
  setTimeout(() => {
     scrollToBottom();
  }, 300);
});

// 格式化时间
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// 是否显示时间
const shouldShowTime = (index: number) => {
  if (index === 0) return true;
  const current = messages.value[index].timestamp;
  const prev = messages.value[index - 1].timestamp;
  return current - prev > 5 * 60 * 1000;
};

// 滚动到底部
const scrollToBottom = () => {
  // 先重置，确保 scroll-into-view 属性发生变化
  scrollIntoView.value = '';
  nextTick(() => {
    // 延时设置，保证 DOM 渲染完成
    setTimeout(() => {
      scrollIntoView.value = 'msg-bottom';
    }, 100);
  });
};

// 发送消息（支持图文混合）
const sendMessage = () => {
  if (!canSend.value) return;
  
  const content = inputText.value;
  const imgs = [...stagedImages.value]; // 复制一份
  
  const newMsg = {
    id: 'msg_' + Date.now(),
    content: content,
    images: imgs,
    senderId: currentUser.id,
    isSelf: true,
    timestamp: Date.now()
  };
  
  messages.value.push(newMsg);
  
  // 清空输入和暂存区
  inputText.value = '';
  stagedImages.value = [];
  
  scrollToBottom();
  
  // 模拟自动回复
  setTimeout(() => {
    mockAutoReply(content, imgs.length > 0);
  }, 1000 + Math.random() * 1000);
};

// 选择图片并暂存
const chooseImage = () => {
  uni.chooseImage({
    count: 4, // 允许一次选多张
    sourceType: ['album', 'camera'],
    success: (res) => {
      // 将选择的图片添加到暂存区，而不是直接发送
      stagedImages.value.push(...res.tempFilePaths);
    }
  });
};

// 移除暂存图片
const removeStagedImage = (index: number) => {
    stagedImages.value.splice(index, 1);
};

// 模拟自动回复
const mockAutoReply = (userMsg: string, hasImage: boolean) => {
  let replyText = "收到。";
  let replyImages: string[] = [];

  if (contactInfo.value.isBot) {
      if (hasImage) {
          replyText = "这张图很有意思！它让我想起了未来的城市规划概念。";
      } else {
          replyText = `关于 "${userMsg}"，推荐阅读《未来简史》。`;
          // 随机带个图
          if (Math.random() > 0.7) {
              replyImages = ["https://picsum.photos/300/400?random=2"];
          }
      }
  } else {
      replyText = "好的，稍后回复你。";
  }

  const replyMsg = {
    id: 'reply_' + Date.now(),
    content: replyText,
    images: replyImages,
    senderId: contactInfo.value.id,
    isSelf: false,
    timestamp: Date.now()
  };
  messages.value.push(replyMsg);
  scrollToBottom();
  
  // 播放系统提示音震动
  uni.vibrateShort({ success: () => {} });
};

// 切换点赞/点踩状态
const toggleFeedback = (msg: any, type: 'up' | 'down') => {
  // 如果点击已选中的状态，则取消（设为null）
  if (msg.feedback === type) {
    msg.feedback = null;
  } else {
    // 否则设置为对应状态（互斥）
    msg.feedback = type;
    uni.vibrateShort({ success: () => {} }); // 震动反馈
  }
};

const previewImage = (url: string) => {
  uni.previewImage({
    urls: [url] // 真实场景应该收集当前会话所有图片
  });
};

const goToContact = (id: string) => {
  if (id === 'me') {
    uni.switchTab({ url: '/pages/profile/profile' });
  } else {
    uni.navigateTo({ url: `/pages/contact/contact?id=${id}` });
  }
};

const onInputFocus = (e: any) => {
  // 简单适配键盘高度 - H5中通常由浏览器处理，App可能需要
  // inputBottom.value = e.detail.height; 
};

const onInputBlur = () => {
  inputBottom.value = 0;
};

const hideKeyboard = () => {
  uni.hideKeyboard();
};
</script>

<style lang="scss" scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  background-color: var(--primary-light); 
}

/* 顶部渐变背景 */
.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #A7EAD7 0%, #E9F6F2 40%, #FDF6EC 100%);
  z-index: 0;
  pointer-events: none;
}

.more-btn {
    width: 72rpx;
    height: 72rpx;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .icon-img {
        width: 44rpx;
        height: 44rpx;
    }
}

.msg-list {
  flex: 1;
  position: relative;
  z-index: 1;
  height: 0;
}

.msg-padding-top {
  height: 30rpx;
}

.timestamp {
  display: flex;
  justify-content: center;
  padding: 30rpx 0;
  
  .time-text {
    background-color: rgba(255,255,255,0.4);
    color: var(--text-secondary);
    font-size: 22rpx;
    padding: 6rpx 24rpx;
    border-radius: 20rpx;
    backdrop-filter: blur(4px);
  }
}

.msg-item {
  padding: 10rpx 40rpx;
  margin-bottom: 30rpx;
  animation: slideIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(30rpx); }
  to { opacity: 1; transform: translateY(0); }
}

.msg-body {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  
  .avatar-wrapper {
      flex-shrink: 0;
  }

  .avatar {
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
    background-color: #fff;
    border: 4rpx solid rgba(255,255,255,0.6);
    box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.05);
  }
  
  /* 对方消息 (左侧) */
  &.msg-other {
    .content-wrapper {
      margin-left: 24rpx;
      align-items: flex-start;
      
      .mix-bubble {
        background-color: var(--white);
        color: var(--text-main);
        border-radius: 8rpx 40rpx 40rpx 40rpx;
        box-shadow: var(--shadow-sm);
      }
    }
  }
  
  /* 自己消息 (右侧) */
  &.msg-self {
    flex-direction: row-reverse;
    
    .content-wrapper {
      margin-right: 24rpx;
      align-items: flex-end;
      
      .mix-bubble {
        background-color: var(--accent-color); /* 暖杏色 */
        color: var(--text-brown);
        border-radius: 40rpx 8rpx 40rpx 40rpx;
        box-shadow: 0 4rpx 12rpx rgba(246, 214, 173, 0.3);
      }
    }
  }
}

.content-wrapper {
  max-width: 72%;
  display: flex;
  flex-direction: column;
  
  /* 混合消息气泡 */
  .mix-bubble {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    .text-part {
        padding: 24rpx 32rpx;
        font-size: 32rpx;
        line-height: 1.6;
        word-break: break-all;
        letter-spacing: 0.5rpx;
    }
    
    .image-part {
        padding: 8rpx;
        display: flex;
        flex-direction: column;
        gap: 8rpx;
        
        &.has-text {
            padding-top: 0; /* 如果上面有字，去掉顶部padding */
        }
        
        .msg-img {
            width: 100%;
            max-width: 400rpx;
            border-radius: 24rpx;
            display: block;
        }
    }
  }
  
  .feedback-actions {
    display: flex;
    margin-top: 16rpx;
    gap: 24rpx;
    padding-left: 10rpx;
    
    .action-btn {
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        background-color: rgba(255,255,255,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        
        .action-icon {
            width: 32rpx;
            height: 32rpx;
        }
        
        &:active { transform: scale(0.9); }
        
        &.active {
            background-color: var(--white);
            transform: scale(1.1);
            box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
        }
    }
  }
}

/* 输入区域 - 悬浮胶囊样式 */
.input-area {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 0 40rpx;
  padding-bottom: calc(40rpx + env(safe-area-inset-bottom));
  pointer-events: none; /* 让点击穿透空白区域 */
  transition: bottom 0.3s;
}

.input-panel {
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 48rpx; 
  box-shadow: var(--shadow-float);
  border: 2rpx solid rgba(255, 255, 255, 0.8);
  overflow: hidden;
  
  /* 图片暂存区样式 */
  .image-staging-area {
      width: 100%;
      white-space: nowrap;
      background-color: rgba(240, 245, 245, 0.5);
      border-bottom: 1rpx solid rgba(0,0,0,0.05);
      
      .staging-list {
          padding: 20rpx;
          display: flex;
          align-items: center;
      }
      
      .staged-item {
          position: relative;
          margin-right: 20rpx;
          flex-shrink: 0;
          
          .thumb {
              width: 120rpx;
              height: 120rpx;
              border-radius: 16rpx;
              border: 2rpx solid #fff;
          }
          
          .close-badge {
              position: absolute;
              top: -10rpx;
              right: -10rpx;
              width: 36rpx;
              height: 36rpx;
              background-color: #FF6B6B;
              color: white;
              border-radius: 50%;
              text-align: center;
              line-height: 34rpx;
              font-size: 24rpx;
              font-weight: bold;
              border: 2rpx solid #fff;
              z-index: 2;
          }
      }
  }

  .input-row {
      display: flex;
      align-items: center;
      padding: 16rpx 20rpx 16rpx 40rpx;
      
      .input-box {
        flex: 1;
        height: 80rpx;
        font-size: 32rpx;
        color: var(--text-main);
      }
      
      :deep(.input-placeholder) {
        color: #B0BDB9;
      }
      
      .action-right {
          margin-left: 20rpx;
          display: flex;
          align-items: center;
          
          .icon-btn, .send-btn {
              width: 88rpx;
              height: 88rpx;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
          }
          
          .icon-img {
              width: 44rpx;
              height: 44rpx;
          }
          
          .camera-btn {
              background-color: transparent;
          }
          
          .send-btn {
              background-color: var(--accent-color);
              box-shadow: 0 4rpx 12rpx rgba(248, 216, 182, 0.5);
              transform: rotate(-10deg);
              transition: all 0.2s;
              
              &.disabled {
                  background-color: #E0E0E0;
                  box-shadow: none;
                  filter: grayscale(1);
              }
              
              &:active:not(.disabled) { transform: scale(0.9) rotate(-10deg); }
              
              .icon-img { 
                  width: 36rpx;
                  height: 36rpx;
                  margin-right: -4rpx; 
                  margin-top: 4rpx;
              }
          }
      }
  }
}
</style>
