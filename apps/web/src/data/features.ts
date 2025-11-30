export interface Feature {
  id: string;
  name: string;
  description: string;
  icon: string;
  isNew?: boolean;
  prompts: string[];
  exampleImage?: string;
}

export const FEATURES: Feature[] = [
  {
    id: "angle-transform",
    name: "AI图片转角度",
    description: "智能调整图片角度和透视效果",
    icon: "i-mdi-rotate-3d-variant",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/ba398cf3-1063-4000-8cf2-1f0817783b6f.jpg",
    prompts: [
      "请将这张图片的角度调整为正面视角",
      "将图片旋转并校正透视角度",
      "调整图片为俯视角度",
      "转换为侧面视角",
      "校正图片倾斜角度",
    ],
  },
  {
    id: "object-6-views",
    name: "物体6视图",
    description: "生成物体的六个视角视图",
    icon: "i-mdi-cube-outline",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/002ba204-bc57-460e-a848-532ee393dfae.jpg",
    prompts: [
      "生成这个物体的六个视角视图",
      "请提供物体的全方位视图",
      "创建360度视图展示",
      "生成前后左右上下六个角度",
      "展示物体的完整视角",
    ],
  },
  {
    id: "nano-banana",
    name: "Nano Banana",
    description: "核心图片编辑功能入口",
    icon: "i-mdi-image-edit",
    isNew: true,
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/8ed138b6-61f9-42af-a59f-11e8de2ae461.jpg",
    prompts: [
      "使用Nano Banana编辑图片",
      "应用智能图片处理",
      "优化图片质量",
      "增强图片细节",
      "智能图片美化",
    ],
  },
  {
    id: "text-to-image",
    name: "AI文字生图",
    description: "根据文字描述生成图片",
    icon: "i-mdi-text-to-speech",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/77c77132-67c0-44d8-bbaa-7a6d30406fc4.jpg",
    prompts: [
      "根据描述「海边的日落」生成图片",
      "创建「futuristic cityscape」风格的图像",
      "生成「温馨的咖啡厅」场景",
      "绘制「科技感十足的办公室」",
      "创作「梦幻森林」主题图片",
    ],
  },
  {
    id: "single-image-edit",
    name: "单图智能修改",
    description: "智能修改单张图片的风格、内容等",
    icon: "i-mdi-image-filter-hdr",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/a8c2e714-71d9-4338-b764-b045b1d59f2a.jpg",
    prompts: [
      "将图片转换为油画风格",
      "增强图片色彩饱和度",
      "调整图片为黑白风格",
      "优化图片光线效果",
      "修复图片模糊问题",
    ],
  },
  {
    id: "multi-image-merge",
    name: "多图编辑/合并",
    description: "编辑和合并多张图片",
    icon: "i-mdi-image-multiple",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/7dea3a0d-6818-4c0c-aa75-bd1a995afb33.jpg",
    prompts: [
      "合并多张图片为拼图",
      "创建图片对比效果",
      "制作图片序列动画",
      "拼接全景图片",
      "组合多张产品图",
    ],
  },
  {
    id: "hd-upscale",
    name: "高清修复放大",
    description: "修复和放大图片，提升清晰度",
    icon: "i-mdi-image-size-select-large",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/26180bb3-3985-4443-b1fb-1034a7a0b836.jpg",
    prompts: [
      "将图片放大2倍并保持清晰",
      "修复老照片并提升分辨率",
      "增强图片细节清晰度",
      "放大图片至4K分辨率",
      "修复模糊图片",
    ],
  },
  {
    id: "product-fusion",
    name: "产品图融合",
    description: "融合产品图片，去除背景等",
    icon: "i-mdi-package-variant",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/3c172384-27cd-44b9-acb4-2686900f3fa9.jpg",
    prompts: [
      "去除产品图背景",
      "融合产品到新场景",
      "优化产品图光影",
      "调整产品图比例",
      "美化产品展示效果",
    ],
  },
  {
    id: "material-replace",
    name: "材质替换",
    description: "替换图片中的材质纹理",
    icon: "i-mdi-texture",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/0d2b69c2-16b1-4ea5-942e-25fd619ff582.jpg",
    prompts: [
      "将木质材质替换为金属",
      "更换墙面材质为大理石",
      "替换地板纹理",
      "改变家具材质",
      "调整物体表面质感",
    ],
  },
  {
    id: "facade-transfer",
    name: "建筑立面迁移",
    description: "迁移建筑立面到其他场景",
    icon: "i-mdi-office-building",
    isNew: true,
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/5ada89c7-a455-4e8e-b24f-57940391bfa9.jpg",
    prompts: [
      "将建筑立面应用到新场景",
      "迁移建筑风格到其他建筑",
      "复制建筑外观设计",
      "转换建筑立面风格",
      "融合建筑元素",
    ],
  },
  {
    id: "furniture-integration",
    name: "家具融入空间",
    description: "将家具融入特定空间场景",
    icon: "i-mdi-sofa",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/47fb878f-96ea-4dae-99cc-cef40fdfc398.jpg",
    prompts: [
      "将沙发融入客厅场景",
      "添加家具到空房间",
      "调整家具摆放位置",
      "匹配家具与空间风格",
      "优化家具光影效果",
    ],
  },
  {
    id: "image-cutout",
    name: "拷图/局部抠图",
    description: "智能抠图和局部图像提取",
    icon: "i-mdi-content-cut",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/8471634a-6a52-4e26-9145-f38e2fbc1dfc.jpg",
    prompts: [
      "抠出图片中的人物",
      "提取产品主体",
      "分离前景和背景",
      "精确抠出复杂边缘",
      "批量抠图处理",
    ],
  },
  {
    id: "soft-decoration",
    name: "软装拼贴渲染",
    description: "软装物品的拼贴和渲染",
    icon: "i-mdi-palette",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/478ed464-c07c-4d4c-8222-4e96777a4041.jpg",
    prompts: [
      "渲染软装搭配效果",
      "拼贴装饰元素",
      "优化软装色彩搭配",
      "生成软装方案",
      "调整软装布局",
    ],
  },
  {
    id: "object-replace",
    name: "物体替换/添加",
    description: "替换或添加图片中的物体",
    icon: "i-mdi-swap-horizontal",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/279804fb-29f7-400d-9b1c-2ae2745c99aa.jpg",
    prompts: [
      "替换图片中的物体",
      "添加新物体到场景",
      "移除不需要的物体",
      "调整物体大小和位置",
      "智能填充空白区域",
    ],
  },
  {
    id: "similar-generation",
    name: "相似图生成",
    description: "生成相似风格的图片",
    icon: "i-mdi-content-copy",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/f3074ec8-8291-4631-bd80-3521a619c27b.jpg",
    prompts: [
      "生成相似风格的图片",
      "创建系列化设计",
      "保持风格一致性",
      "批量生成相似图",
      "延续设计语言",
    ],
  },
  {
    id: "background-generation",
    name: "背景图生成",
    description: "生成或替换图片背景",
    icon: "i-mdi-image-area",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/80357535-f9e4-47ba-900b-fb2468cd4c68.jpg",
    prompts: [
      "生成自然风景背景",
      "替换为纯色背景",
      "创建渐变背景",
      "添加场景化背景",
      "优化背景虚化效果",
    ],
  },
  {
    id: "watermark-removal",
    name: "去除水印",
    description: "智能去除图片水印",
    icon: "i-mdi-water-off",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/256645d2-d05b-49b9-a2ee-7796abf67788.jpg",
    prompts: [
      "去除图片水印",
      "清除文字标记",
      "移除logo印记",
      "修复水印区域",
      "智能填充水印位置",
    ],
  },
  {
    id: "room-clear",
    name: "清空房间家具",
    description: "移除房间图片中的家具",
    icon: "i-mdi-home-outline",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/a40dfbd7-c0bc-4167-979c-85139a490c03.jpg",
    prompts: [
      "清空房间所有家具",
      "移除指定家具",
      "还原空房间效果",
      "保留房间结构",
      "生成空白空间",
    ],
  },
  {
    id: "image-to-video",
    name: "AI图生视频",
    description: "生成AI动画视频",
    icon: "i-mdi-video",
    isNew: true,
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/4cae6f1d-4b55-4133-b067-9896238b70f5.jpg",
    prompts: [
      "将图片转换为动画视频",
      "生成图片运动效果",
      "创建图片转场动画",
      "制作图片故事视频",
      "添加动态效果",
    ],
  },
  {
    id: "relight",
    name: "图片重新打光",
    description: "调整图片光线效果",
    icon: "i-mdi-lightbulb-on",
    exampleImage:
      "https://miaoda-site-img.cdn.bcebos.com/images/a05a410d-7539-44bf-bf4f-75ea3ff9b8f5.jpg",
    prompts: [
      "调整图片光线方向",
      "增强图片明暗对比",
      "添加戏剧性光效",
      "优化人像光线",
      "模拟自然光效果",
    ],
  },
];

