/**
 * Types for Family OS
 */

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  content: string | React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  type: 'app' | 'folder' | 'file';
  onClick: () => void;
}

export interface MenuItem {
  label: string;
  onClick?: () => void;
  divider?: boolean;
  submenu?: MenuItem[];
}
