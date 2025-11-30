export interface ViewAngle {
  id: string;
  title: string;
  subtitle: string;
  promptHint: string;
}

export const VIEW_ANGLES: ViewAngle[] = [
  {
    id: "front",
    title: "正面视角",
    subtitle: "展示整体结构与比例",
    promptHint:
      "生成物体的正面视角，清晰表现主体结构、材质与尺度比例，背景保持柔和且不过度抢眼。",
  },
  {
    id: "back",
    title: "背面视角",
    subtitle: "展现背部结构与细节",
    promptHint:
      "生成物体的背面视角，重点表现背部造型、连接结构与纹理细节，光线柔和。",
  },
  {
    id: "left",
    title: "左侧视角",
    subtitle: "突出侧面厚度与线条",
    promptHint:
      "生成物体的左侧视角，强调轮廓线条与厚度关系，可适度加入阴影表现体积感。",
  },
  {
    id: "right",
    title: "右侧视角",
    subtitle: "与左侧形成对称对比",
    promptHint:
      "生成物体的右侧视角，维持与左侧一致的材质与光线设置，呈现结构一致性。",
  },
  {
    id: "top",
    title: "俯视视角",
    subtitle: "观察平面布局",
    promptHint:
      "生成物体的俯视视角，从上方观察整体布局与形状比例，背景保持纯净。",
  },
  {
    id: "bottom",
    title: "仰视视角",
    subtitle: "展示底部结构",
    promptHint:
      "生成物体的仰视视角，强调底部结构、脚撑或支撑部位，适当提升对比度便于识别。",
  },
];

