export interface Feature {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  isNew?: boolean;
  comingSoon?: boolean;
  prompts?: string[];
  exampleImage?: string;
  link?: string; // For existing features that have a specific route
}

export interface SubCategory {
  name: string;
  features: Feature[];
}

export interface Category {
  name: string;
  description: string;
  subCategories: SubCategory[];
}

export const CATEGORIES: Category[] = [
  {
    name: "专业向",
    description: "主要面向专业设计师用户，比如对标的专业是建筑/景观/室内，或者是影视/游戏/动漫的一类用户。",
    subCategories: [
      {
        name: "建筑与空间设计",
        features: [
          { id: "city-analysis", name: "城市分析图", comingSoon: true },
          { id: "arch-analysis", name: "建筑分析图", comingSoon: true },
          { id: "arch-style-transfer", name: "建筑风格转换", comingSoon: true },
          { id: "sketch-to-render", name: "手绘转效果图", comingSoon: true },
          { id: "line-drawing", name: "线稿图", comingSoon: true },
          { id: "color-plan", name: "彩平图", comingSoon: true },
          { id: "axonometric", name: "轴测图", comingSoon: true },
          { id: "change-material", name: "改建筑材质", comingSoon: true },
          { id: "change-weather", name: "改建筑天气", comingSoon: true },
          { id: "change-env", name: "改建筑环境", comingSoon: true },
          { id: "day-night", name: "改建筑日夜景", comingSoon: true },
          { id: "landscape-analysis", name: "景观分析图", comingSoon: true },
          { id: "residential-plan", name: "居住区总平", comingSoon: true },
          { id: "interior-plan", name: "室内彩平", comingSoon: true },
          { id: "plan-to-3d", name: "总平转鸟瞰图/三维模型", comingSoon: true },
          { id: "interior-render", name: "室内效果图", comingSoon: true },
          { id: "render-to-elevation", name: "室内效果图转立面图", comingSoon: true },
          { id: "multi-angle", name: "一键生成多张不同角度效果图", comingSoon: true },
          { id: "gen-model", name: "生成模型", comingSoon: true },
          { id: "model-to-render", name: "模型转渲染图", comingSoon: true },
          { id: "interior-material", name: "室内材质替换", comingSoon: true },
          { id: "interior-light", name: "室内灯光变化", comingSoon: true },
        ],
      },
      {
        name: "科研绘图可视化",
        features: [
          { id: "paper-viz", name: "论文插图可视化/美化", comingSoon: true },
        ],
      },
      {
        name: "影视游戏",
        features: [
          { id: "scene-gen", name: "一键生成场景", comingSoon: true },
          { id: "action-change", name: "修改人物动作", comingSoon: true },
        ],
      },
      {
        name: "动漫",
        features: [
          { id: "anime-char", name: "动漫角色生成", comingSoon: true },
          { id: "product-style", name: "转不同产品风格", comingSoon: true },
          { id: "sketch-anime", name: "草图/线稿上色/动漫化", comingSoon: true },
          { id: "views-3-4", name: "三视图/四视图", comingSoon: true },
          { id: "change-bg-anime", name: "更换背景(动漫)", comingSoon: true },
          { id: "text-to-process", name: "文生产品制造流程", comingSoon: true },
        ],
      },
      {
        name: "平面排版/海报设计",
        features: [
          { id: "poster-design", name: "排版/海报设计", comingSoon: true },
        ],
      },
      {
        name: "渲染制作",
        features: [
          { id: "collage", name: "拼贴", comingSoon: true },
          { id: "coloring", name: "上色", comingSoon: true },
          { id: "material-lib", name: "材质库", comingSoon: true },
        ],
      },
    ],
  },
  {
    name: "实用向",
    description: "这款软件还主要面向小白用户，不做专业领域的用户，一般对普通人日常生活有小帮助的一款软件。",
    subCategories: [
      {
        name: "AI摄影/电商图片",
        features: [
          { id: "hd-upscale", name: "图片高清", comingSoon: true }, // Mapped existing?
          { id: "watermark-remove", name: "图片去水印", comingSoon: true },
          { id: "smart-edit", name: "智能修图/扩图", comingSoon: true },
          { id: "old-photo", name: "老照片修复/上色", comingSoon: true },
          { id: "clarify", name: "高清图片/图片清晰化", comingSoon: true },
          { id: "multi-merge", name: "多图融合", comingSoon: true },
          { id: "obj-replace", name: "物体替换", comingSoon: true },
          { id: "action-transfer", name: "人物动作迁移/生成", comingSoon: true },
        ],
      },
      {
        name: "高清/扩图/重绘",
        features: [
          { id: "hd-redraw", name: "高清/扩图/重绘", comingSoon: true },
        ]
      },
      {
        name: "转矢量/SVG",
        features: [
          { id: "hand-to-vec", name: "手写字转矢量", comingSoon: true },
          { id: "icon-gen", name: "图标/logo生成", comingSoon: true },
        ],
      },
      {
        name: "中文海报生成",
        features: [
          { id: "cn-poster", name: "中文海报生成", comingSoon: true },
        ]
      },
      {
        name: "PPT",
        features: [
          { id: "ppt-gen", name: "PPT", comingSoon: true },
        ]
      },
      {
        name: "头像/表情包",
        features: [
          { id: "avatar-style", name: "各种风格头像", comingSoon: true },
          { id: "emoji-gen", name: "表情包", comingSoon: true },
        ],
      },
      {
        name: "壁纸/插画",
        features: [
          { id: "wallpaper", name: "壁纸/插画", comingSoon: true },
        ]
      },
      {
        name: "写作/阅读",
        features: [
          { id: "writing", name: "写作/阅读", comingSoon: true },
        ]
      },
      {
        name: "视频/音频",
        features: [
          { id: "video-audio", name: "视频/音频", comingSoon: true },
        ]
      },
      {
        name: "换发型",
        features: [
          { id: "hairstyle", name: "换发型", comingSoon: true },
        ]
      },
      {
        name: "试穿衣服",
        features: [
          { id: "try-on", name: "试穿衣服", comingSoon: true },
        ]
      },
      {
        name: "旅行打卡/P图",
        features: [
          { id: "travel-photo", name: "旅行打卡/P图", comingSoon: true },
        ]
      },
      {
        name: "AI翻译/课程",
        features: [
          { id: "ai-course", name: "AI翻译/课程", comingSoon: true },
        ]
      },
      {
        name: "辅助英语学习/口语",
        features: [
          { id: "english-learn", name: "辅助英语学习/口语", comingSoon: true },
        ]
      },
      {
        name: "摄影/微头条/学习",
        features: [
          { id: "photo-learn", name: "摄影/微头条/学习", comingSoon: true },
        ]
      },
      {
        name: "小红书文案/写法",
        features: [
          { id: "xhs-copy", name: "小红书文案/写法", comingSoon: true },
        ]
      },
    ],
  },
  {
    name: "有趣向",
    description: "这类用法主要是面向好玩的小白用户，并没有什么实际的价值，可能只是为了有趣好玩，适合小白用户想体验这个模型强大的能力的初光。",
    subCategories: [
      {
        name: "有趣功能", // Grouping flat items
        features: [
          { id: "person-cartoon", name: "拟人化/漫改", comingSoon: true },
          { id: "multi-role", name: "多角色/合影/同框", comingSoon: true },
          { id: "creative-sky", name: "生成创意/蓝天/云朵", comingSoon: true },
          { id: "movie-poster", name: "生成电影/海报/封面", comingSoon: true },
          { id: "creative-avatar", name: "生成萌宠/头像", comingSoon: true },
        ],
      },
    ],
  },
];

// Keep the old list for reference if needed, or just rely on the new structure.
// We can map the 'nano-banana' feature to a prominent place or just keep it accessible via URL.
