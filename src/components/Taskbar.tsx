import type { WindowState } from '../types';

interface TaskbarProps {
  windows: WindowState[];
  onWindowClick: (id: string) => void;
  showStartMenu: boolean;
  onStartClick: () => void;
  currentTime: Date;
  onShutdown: () => void;
}

export default function Taskbar({ windows, onWindowClick, showStartMenu, onStartClick, currentTime }: TaskbarProps) {
  return (
    <div className="taskbar">
      <button className={`start-button ${showStartMenu ? 'active' : ''}`} onClick={onStartClick}>
        <span className="start-icon">🏠</span>
        <span>Start</span>
      </button>
      
      <div className="taskbar-windows">
        {windows.map((window) => (
          <button
            key={window.id}
            className={`taskbar-window ${window.isMinimized ? 'minimized' : 'active'}`}
            onClick={() => onWindowClick(window.id)}
          >
            <span className="taskbar-window-icon">{window.icon}</span>
            <span className="taskbar-window-title">{window.title}</span>
          </button>
        ))}
      </div>

      <div className="system-tray">
        <div className="tray-icon">🔊</div>
        <div className="tray-icon">📶</div>
        <div className="clock">
          {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
        </div>
      </div>
    </div>
  );
}