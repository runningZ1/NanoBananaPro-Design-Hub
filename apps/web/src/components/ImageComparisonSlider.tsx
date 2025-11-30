'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface ImageComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: React.ReactNode;
  afterLabel?: React.ReactNode;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ImageComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  beforeAlt = 'Before image',
  afterAlt = 'After image',
  className = '',
  style,
}: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPosition(percentage);
    },
    []
  );

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp, onTouchMove]);

  // ResizeObserver to track container width for inner image sizing
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const handleInteractionStart = (clientX: number) => {
    setIsDragging(true);
    handleMove(clientX);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none group cursor-ew-resize ${className}`}
      onMouseDown={(e) => handleInteractionStart(e.clientX)}
      onTouchStart={(e) => handleInteractionStart(e.touches[0].clientX)}
      style={{ aspectRatio: '16/9', ...style }}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={afterAlt}
        className="absolute top-0 left-0 w-full h-full object-contain bg-black"
        draggable={false}
      />

      {/* After Label */}
      {afterLabel && (
        <div className="absolute top-4 right-4 z-10 pointer-events-none">
          {afterLabel}
        </div>
      )}

      {/* Before Image (Foreground - Width Masked) */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden border-r-2 border-blue-500"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="absolute top-0 left-0 h-full object-contain bg-black max-w-none"
          draggable={false}
          style={{
            width: containerWidth ? `${containerWidth}px` : '100%',
          }}
        />

        {/* Before Label */}
        {beforeLabel && (
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            {beforeLabel}
          </div>
        )}
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-transparent cursor-ew-resize z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 border-4 border-white rounded-full shadow-2xl flex items-center justify-center text-white transition-transform duration-200 hover:scale-110">
          <ArrowLeftRight size={20} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}
