import { useState, useEffect } from 'react';
import type { WindowState } from '../types';

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (id: string, x: number, y: number) => void;
}

export default function Window({ window, onClose, onMinimize, onMaximize, onFocus, onMove }: WindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-button')) return;
    setIsDragging(true);
    setDragOffset({ x: e.clientX - window.x, y: e.clientY - window.y });
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !window.isMaximized) {
        onMove(window.id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, window, dragOffset, onMove]);

  const style: React.CSSProperties = window.isMaximized ? {
    top: 0, left: 0, right: 0, bottom: '40px', width: '100%', height: 'calc(100% - 40px)', zIndex: window.zIndex
  } : {
    top: window.y, left: window.x, width: window.width, height: window.height, zIndex: window.zIndex
  };

  return (
    <div className={`window ${window.isMaximized ? 'maximized' : ''}`} style={style} onMouseDown={onFocus}>
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <div className="window-title">
          <span className="window-icon">{window.icon}</span>
          {window.title}
        </div>
        <div className="window-buttons">
          <button className="window-button minimize" onClick={onMinimize}>_</button>
          <button className="window-button maximize" onClick={onMaximize}>□</button>
          <button className="window-button close" onClick={onClose}>✕</button>
        </div>
      </div>
      <div className="window-body">{window.content}</div>
    </div>
  );
}