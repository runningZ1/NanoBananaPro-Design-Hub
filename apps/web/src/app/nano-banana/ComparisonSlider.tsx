"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeftRight, Maximize2 } from 'lucide-react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, [isResizing]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none group cursor-col-resize bg-black"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 全屏查看按钮 */}
      <button
        onClick={toggleFullscreen}
        className={`absolute top-4 right-4 z-30 bg-white text-black px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-lg transition-opacity duration-300 ${
          isHovering || isFullscreen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Maximize2 size={14} />
        全屏查看
      </button>

      {/* Background Image (After / Processed) - 完整显示 */}
      <img
        src={afterImage}
        alt="编辑后"
        className="absolute top-0 left-0 w-full h-full object-contain"
        style={{ backgroundColor: '#000000' }}
      />

      {/* Foreground Image (Before / Original) - 通过父容器裁剪 */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{
          width: `${sliderPosition}%`,
          borderRight: '2px solid #3b82f6'
        }}
      >
        <img
          src={beforeImage}
          alt="原图"
          className="absolute top-0 left-0 w-full h-full object-contain"
          style={{
            width: containerRef.current ? `${(containerRef.current.clientWidth / sliderPosition) * 100}px` : '100vw',
            backgroundColor: '#000000'
          }}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 flex items-center justify-center z-20 transition-all duration-150"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
      >
        <div
          className={`w-12 h-12 bg-blue-500 border-4 border-white rounded-full shadow-2xl flex items-center justify-center text-white cursor-ew-resize transition-transform duration-200 ${
            isResizing || isHovering ? 'scale-110' : 'scale-100'
          }`}
        >
          <ArrowLeftRight size={20} strokeWidth={2.5} />
        </div>
      </div>

      {/* Labels - 只在非全屏模式显示 */}
      {!isFullscreen && (
        <>
          <div className="absolute top-4 left-4 bg-black/70 text-white text-sm px-3 py-1.5 rounded-lg backdrop-blur-sm pointer-events-none z-10 font-medium">
            原图
          </div>
          <div className="absolute top-4 right-4 bg-blue-500/90 text-white text-sm px-3 py-1.5 rounded-lg backdrop-blur-sm pointer-events-none z-10 font-medium mr-28">
            编辑后
          </div>
        </>
      )}
    </div>
  );
};
