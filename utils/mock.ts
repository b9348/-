
// SVG生成工具
const svgToDataUrl = (svgString: string) => {
  // 简单的Base64编码，适配大多数环境
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
};

// 自定义头像SVG - 新风格：扁平卡通插画风格
const AvatarSvgs = {
  // 用户：明亮黄底，潮流墨镜
  me: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <rect width="120" height="120" fill="#FCD34D"/>
    <circle cx="60" cy="65" r="32" fill="#FFE0B2"/>
    <path d="M28 65 L92 65 L92 50 C 92 40, 80 35, 60 35 C 40 35, 28 40, 28 50 Z" fill="#1F2937"/>
    <path d="M58 75 Q60 78 62 75" stroke="#D97706" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M35 55 L85 55 L85 68 L75 68 L75 60 L45 60 L45 68 L35 68 Z" fill="#111827"/>
    <rect x="40" y="58" width="10" height="4" rx="2" fill="#374151"/>
    <rect x="70" y="58" width="10" height="4" rx="2" fill="#374151"/>
  </svg>`,
  
  // AI：科技青底，发光机器人
  ai: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <rect width="120" height="120" fill="#0D9488"/>
    <rect x="30" y="35" width="60" height="50" rx="12" fill="#CCFBF1"/>
    <rect x="40" y="45" width="40" height="16" rx="4" fill="#115E59"/>
    <circle cx="50" cy="53" r="3" fill="#2DD4BF"/>
    <circle cx="70" cy="53" r="3" fill="#2DD4BF"/>
    <path d="M50 70 Q60 75 70 70" stroke="#115E59" stroke-width="3" fill="none" stroke-linecap="round"/>
    <line x1="60" y1="35" x2="60" y2="20" stroke="#CCFBF1" stroke-width="4"/>
    <circle cx="60" cy="15" r="5" fill="#FDE047"/>
    <circle cx="20" cy="60" r="6" fill="#CCFBF1"/>
    <circle cx="100" cy="60" r="6" fill="#CCFBF1"/>
  </svg>`,
  
  // PM：商务蓝底，偏分发型+眼镜
  pm: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <rect width="120" height="120" fill="#60A5FA"/>
    <circle cx="60" cy="70" r="30" fill="#FFEDD5"/>
    <path d="M60 40 C 40 40, 30 55, 30 70 L 30 55 C 30 30, 90 30, 90 60 L 90 70 C 90 55, 80 40, 60 40" fill="#1E3A8A"/>
    <g stroke="#1E40AF" stroke-width="2" fill="none">
        <circle cx="50" cy="70" r="9"/>
        <circle cx="70" cy="70" r="9"/>
        <line x1="59" y1="70" x2="61" y2="70"/>
    </g>
    <path d="M55 85 Q60 88 65 85" stroke="#EA580C" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,
  
  // UI：浪漫粉底，贝雷帽
  ui: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <rect width="120" height="120" fill="#F472B6"/>
    <circle cx="60" cy="65" r="28" fill="#FFE4E6"/>
    <path d="M25 50 Q 60 20, 95 50 C 95 60, 85 60, 85 50" fill="#BE185D"/>
    <rect x="58" y="15" width="4" height="10" fill="#BE185D"/>
    <circle cx="50" cy="65" r="3" fill="#831843"/>
    <circle cx="70" cy="65" r="3" fill="#831843"/>
    <path d="M56 75 Q60 78 64 75" stroke="#BE185D" stroke-width="2" fill="none"/>
    <path d="M30 90 Q 60 110, 90 90" stroke="#FBCFE8" stroke-width="8" stroke-linecap="round" fill="none"/>
  </svg>`
};

const avatars = {
  me: svgToDataUrl(AvatarSvgs.me),
  ai: svgToDataUrl(AvatarSvgs.ai),
  pm: svgToDataUrl(AvatarSvgs.pm),
  ui: svgToDataUrl(AvatarSvgs.ui)
};

// 模拟当前用户
export const currentUser = {
  id: "user_me",
  nickname: "访客",
  avatar: avatars.me,
  signature: "探索无限可能",
  level: 8
};

// 模拟联系人
export const contacts = [
  {
    id: "ai_bot",
    nickname: "Companion AI",
    avatar: avatars.ai, 
    signature: "我是你的智能助手，随时为你服务。",
    level: 99,
    phone: "400-888-8888",
    email: "ai@future.com",
    isBot: true
  },
  {
    id: "user_001",
    nickname: "产品经理",
    avatar: avatars.pm,
    signature: "需求永远在变，初心未改",
    level: 5,
    phone: "13800138000",
    email: "pm@company.com"
  },
  {
    id: "user_002",
    nickname: "UI 设计师",
    avatar: avatars.ui,
    signature: "像素级的极致追求",
    level: 6,
    phone: "13900139000",
    email: "design@company.com"
  }
];

// 模拟会话列表
export const conversations = [
  {
    id: "conv_000",
    contactId: "ai_bot",
    contactName: "Companion AI",
    contactAvatar: avatars.ai,
    lastMessage: "当然，我推荐《未来简史》...",
    lastTime: "刚刚",
    unreadCount: 1
  },
  {
    id: "conv_001",
    contactId: "user_001",
    contactName: "产品经理",
    contactAvatar: avatars.pm,
    lastMessage: "下周的版本需求我们需要再对一下",
    lastTime: "14:30",
    unreadCount: 2
  },
  {
    id: "conv_002",
    contactId: "user_002",
    contactName: "UI 设计师",
    contactAvatar: avatars.ui,
    lastMessage: "[图片] 新的切图已经上传了",
    lastTime: "昨天",
    unreadCount: 0
  }
];

// 模拟消息记录 (初始) - 对应 ai_bot 的对话
export const initialMessages = [
  {
    id: "msg_001",
    content: "给我推荐一本关于未来城市的书",
    images: [],
    senderId: "user_me",
    isSelf: true,
    timestamp: 1705731600000
  },
  {
    id: "msg_002",
    content: "当然，我推荐《未来简史》。它探索了人类的未来命运... \n这是一本极具前瞻性的著作。",
    images: [],
    senderId: "ai_bot",
    isSelf: false,
    timestamp: 1705731660000
  },
  {
    id: "msg_mixed_003",
    content: "你看，这就是书中的概念图，是不是很震撼？",
    images: ["https://picsum.photos/300/400?random=1"], // 使用随机图片服务暂代
    senderId: "ai_bot",
    isSelf: false,
    timestamp: 1705731720000
  },
  {
    id: "msg_004",
    content: "你觉得这本怎么样？",
    images: [],
    senderId: "ai_bot",
    isSelf: false,
    timestamp: 1705731730000
  }
];

export const getContactById = (id: string) => {
  return contacts.find(c => c.id === id) || contacts[0];
};
