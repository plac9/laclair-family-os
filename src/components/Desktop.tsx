import type { DesktopIcon } from '../types';

interface DesktopProps {
  icons: DesktopIcon[];
}

export default function Desktop({ icons }: DesktopProps) {
  return (
    <div className="desktop">
      <div className="desktop-icons">
        {icons.map((icon) => (
          <div
            key={icon.id}
            className="desktop-icon"
            onClick={icon.onClick}
            onDoubleClick={icon.onClick}
          >
            <div className="icon-image">{icon.icon}</div>
            <div className="icon-label">{icon.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
