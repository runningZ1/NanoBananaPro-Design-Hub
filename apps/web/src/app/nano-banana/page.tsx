"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  ChevronLeft,
  Sparkles,
  Download,
  Share2,
  LayoutTemplate,
  SendHorizontal,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  Loader2,
  Palette,
  Wand2,
  Camera,
  Maximize2,
} from "lucide-react";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import Link from "next/link";

// 类型定义
type ViewMode = "compare" | "original" | "processed";

interface ImageState {
  original: string | null;
  processed: string | null;
}

interface PresetPrompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon: "palette" | "wand" | "camera";
}

// 预设提示词
const PRESETS: PresetPrompt[] = [
  {
    id: "dark-tech",
    title: "暗色科技风",
    description: "增加蓝色霓虹光效",
    prompt: "将这张产品图改成暗色科技风,增加蓝色霓虹光效",
    icon: "palette",
  },
  {
    id: "cyberpunk",
    title: "赛博朋克风格",
    description: "转成插画风格",
    prompt: "把人物照片转成赛博朋克插画风格",
    icon: "wand",
  },
  {
    id: "white-bg",
    title: "白色无影棚",
    description: "替换背景并提高清晰度",
    prompt: "把背景替换为白色无影棚,突出主体并提高清晰度",
    icon: "camera",
  },
];

export default function NanoBananaPage() {
  // 状态管理
  const [images, setImages] = useState<ImageState>({
    original: null,
    processed: null,
  });
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>("original");
  const [zoom, setZoom] = useState<number>(100);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 文件上传处理
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAspectRatio(null);
        setImages({ original: result, processed: null });
        setPrompt("");
        setViewMode("original");
        setError(null);

        const img = new Image();
        img.onload = () => {
          if (img.width && img.height) {
            setAspectRatio(img.width / img.height);
          }
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  // 图片处理
  const handleProcess = async () => {
    if (!images.original || !prompt) {
      setError("请先上传图片并输入编辑指令");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch("/api/nano-banana/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          referenceImage: images.original,
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = (await response.json()) as {
        url: string | null;
        base64: string | null;
        error?: string;
      };

      if (data.error) {
        throw new Error(data.error);
      }

      const imageUrl =
        data.url ??
        (data.base64 ? `data:image/png;base64,${data.base64}` : null);

      if (!imageUrl) {
        throw new Error("API 未返回图片 URL 或 base64 数据");
      }

      setImages((prev) => ({ ...prev, processed: imageUrl }));
      setViewMode("compare");
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失败,请稍后重试");
    } finally {
      setIsProcessing(false);
    }
  };

  // 下载处理
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = images.processed || images.original || "";
    link.download = `nano-banana-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const triggerUpload = () => fileInputRef.current?.click();

  const handlePresetClick = (preset: PresetPrompt) => {
    setPrompt(preset.prompt);
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">
            NB
          </div>
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            <ChevronLeft size={16} />
            返回首页
          </Link>
        </div>
        <h1 className="text-lg font-semibold text-gray-900">
          Nano Banana 图像编辑
        </h1>
        <div className="w-24"></div> {/* Spacer for balance */}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-y-auto z-20 shadow-sm">
          <div className="p-6 space-y-6">
            {/* Upload Section */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 mb-3">
                上传图片
              </h2>
              <div
                onClick={triggerUpload}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 group
                  ${images.original
                    ? "border-indigo-200 bg-indigo-50/50"
                    : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50"
                  }
                `}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                />

                {images.original ? (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={images.original}
                      className="w-full h-full object-cover"
                      alt="已上传"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-medium">
                        更换图片
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Upload size={20} />
                    </div>
                    <p className="text-sm text-gray-600 font-medium">
                      点击或拖拽上传
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      JPG, PNG, WEBP
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Suggested Prompts Section */}
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-indigo-600" />
                快速建议
              </h2>
              <div className="space-y-3">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetClick(preset)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 hover:shadow-md flex items-start gap-3
                      ${prompt === preset.prompt
                        ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                        : "border-gray-200 bg-white hover:border-indigo-300"
                      }
                    `}
                  >
                    <div
                      className={`mt-0.5 p-1.5 rounded-lg ${prompt === preset.prompt
                        ? "bg-indigo-200 text-indigo-700"
                        : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {preset.icon === "palette" && <Palette size={16} />}
                      {preset.icon === "wand" && <Wand2 size={16} />}
                      {preset.icon === "camera" && <Camera size={16} />}
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-medium ${prompt === preset.prompt
                          ? "text-indigo-900"
                          : "text-gray-900"
                          }`}
                      >
                        {preset.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                        {preset.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 mt-auto border-t border-gray-100 bg-gray-50/50">
            <div className="text-xs text-gray-400 text-center">
              Powered by Nano Banana 2
            </div>
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 flex flex-col relative bg-black">
          {/* Top Toolbar */}
          <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            {/* View Modes */}
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("compare")}
                disabled={!images.processed}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === "compare"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  }`}
              >
                对比
              </button>
              <button
                onClick={() => setViewMode("original")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === "original"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                原图
              </button>
              <button
                onClick={() => setViewMode("processed")}
                disabled={!images.processed}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${viewMode === "processed"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  }`}
              >
                结果
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center gap-2">
              {images.processed && (
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-semibold transition-colors"
                >
                  <Download size={14} />
                  导出图片
                </button>
              )}
            </div>
          </div>

          {/* Canvas Viewport */}
          <div className="flex-1 overflow-hidden relative flex items-center justify-center p-8 bg-black">
            {/* Image Container */}
            <div
              className="relative shadow-2xl rounded-sm overflow-hidden bg-black flex items-center justify-center"
            >
              {!images.original ? (
                <div className="flex flex-col items-center justify-center w-[800px] h-[600px] max-w-full max-h-[80vh] bg-gray-900 text-gray-300">
                  <ImageIcon size={64} strokeWidth={1} />
                  <p className="mt-4 font-medium">上传图片开始编辑</p>
                </div>
              ) : (
                <>
                  {/* Invisible Image to drive container size */}
                  <img
                    src={images.original}
                    alt="sizing-reference"
                    className="block max-w-5xl max-h-[80vh] opacity-0 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Actual Content Overlay */}
                  <div className="absolute inset-0">
                    {viewMode === "compare" && images.processed ? (
                      <ImageComparisonSlider
                        beforeImage={images.original}
                        afterImage={images.processed}
                        beforeAlt="原图"
                        afterAlt="编辑后"
                        className="w-full h-full"
                        beforeLabel={
                          <div className="bg-transparent text-white font-medium text-lg drop-shadow-md">
                            原图
                          </div>
                        }
                        afterLabel={
                          <div className="flex gap-2 pointer-events-auto">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-lg">
                              编辑后
                            </button>
                            <button className="bg-white hover:bg-gray-100 text-gray-900 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-lg flex items-center gap-1">
                              <Maximize2 size={14} />
                              全屏查看
                            </button>
                          </div>
                        }
                      />
                    ) : (
                      <img
                        src={
                          viewMode === "processed" && images.processed
                            ? images.processed
                            : images.original
                        }
                        alt="工作区"
                        className="w-full h-full object-contain block bg-black"
                      />
                    )}

                    {/* Floating Zoom Controls */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-4 shadow-lg z-10">
                      <button className="hover:text-gray-300">
                        <ZoomOut size={14} />
                      </button>
                      <span className="text-xs font-mono font-medium">
                        {zoom}%
                      </span>
                      <button className="hover:text-gray-300">
                        <ZoomIn size={14} />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Loading Overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-30 flex flex-col items-center justify-center">
                  <div className="relative">
                    <Loader2 size={40} className="text-indigo-600 animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles size={16} className="text-indigo-600 animate-pulse" />
                    </div>
                  </div>
                  <p className="mt-4 text-gray-900 font-medium animate-pulse">
                    AI 正在编辑图片...
                  </p>
                  <p className="text-xs text-gray-500 mt-1">这可能需要几秒钟</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Prompt Bar */}
          <div className="h-24 bg-white border-t border-gray-200 p-4 flex items-center justify-center z-20">
            <div className="w-full max-w-3xl flex gap-3">
              {/* Share/Like Placeholder */}
              <div className="flex gap-2">
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                  <Share2 size={20} />
                </button>
                <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                  <LayoutTemplate size={20} />
                </button>
              </div>

              {/* Main Input Area */}
              <div className="flex-1 relative group">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="描述想要的编辑效果 (例如: '移除背景', '改成科技风')..."
                  className="w-full h-12 pl-4 pr-32 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-sm text-gray-800 placeholder-gray-400"
                  onKeyDown={(e) => e.key === "Enter" && handleProcess()}
                />

                {/* Generate Button (Inside Input) */}
                <button
                  onClick={handleProcess}
                  disabled={!images.original || !prompt || isProcessing}
                  className={`absolute right-1 top-1 bottom-1 px-4 rounded-lg flex items-center gap-2 font-medium text-sm transition-all shadow-sm
                      ${!images.original || !prompt || isProcessing
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200"
                    }
                    `}
                >
                  {isProcessing ? "生成中..." : "生成"}
                  {!isProcessing && <SendHorizontal size={14} />}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm shadow-lg">
              ⚠ {error}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
