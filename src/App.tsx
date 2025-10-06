import { useState, useEffect } from 'react';
import type { WindowState, DesktopIcon } from './types';
import Window from './components/Window';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import './App.css';

function App() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (id: string, title: string, content: React.ReactNode, icon = '📄') => {
    const existing = windows.find(w => w.id === id);
    if (existing) {
      if (existing.isMinimized) {
        setWindows(windows.map(w => 
          w.id === id ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 } : w
        ));
        setHighestZIndex(highestZIndex + 1);
      } else {
        focusWindow(id);
      }
      return;
    }

    const newWindow: WindowState = {
      id,
      title,
      icon,
      content,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: 100 + windows.length * 30,
      y: 80 + windows.length * 30,
      width: 600,
      height: 400,
      zIndex: highestZIndex + 1
    };

    setWindows([...windows, newWindow]);
    setHighestZIndex(highestZIndex + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const focusWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: highestZIndex + 1 } : w
    ));
    setHighestZIndex(highestZIndex + 1);
  };

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, x, y } : w
    ));
  };

  const desktopIcons: DesktopIcon[] = [
    {
      id: 'about',
      name: 'About Us.txt',
      icon: '📝',
      type: 'file',
      onClick: () => openWindow('about', 'About Us', (
        <div className="window-content">
          <h2>👨‍👩‍👦 Welcome to Family OS!</h2>
          <p><strong>Version:</strong> 1.0 (Retro Edition)</p>
          <p><strong>System:</strong> Nostalgia-Based Interface</p>
          <br/>
          <h3>What This Is:</h3>
          <p>A fun retro operating system interface showcasing what a family website could be! Navigate like it's 1995, explore folders, and enjoy the nostalgic vibes.</p>
          <br/>
          <h3>Features:</h3>
          <ul>
            <li>🖥️ Draggable Windows</li>
            <li>📁 Folder Navigation</li>
            <li>🎮 Interactive Content</li>
            <li>⏰ Working Clock</li>
            <li>🏁 Start Menu</li>
            <li>🪟 Taskbar with Window Management</li>
          </ul>
          <br/>
          <p><em>"Experience the web... like it's 1995!"</em></p>
        </div>
      ), '📝')
    },
    {
      id: 'adventures',
      name: 'Adventures',
      icon: '🗺️',
      type: 'folder',
      onClick: () => openWindow('adventures', 'Family Adventures', (
        <div className="window-content">
          <h2>🗺️ Adventures & Activities</h2>
          <p><em>Explore our favorite activities and hobbies!</em></p>
          <br/>
          <div className="folder-grid">
            <div className="folder-item" onClick={() => openWindow('sports', 'Sports & Activities', (
              <div className="window-content">
                <h2>⚾ Sports Season 2024</h2>
                <p><strong>Spring League:</strong></p>
                <ul>
                  <li>Team: Lightning Bolts</li>
                  <li>Games Won: 12 of 18</li>
                  <li>Home Runs: 23</li>
                  <li>Best Play: Triple play vs. Thunder</li>
                  <li>MVP Award: Sarah Johnson</li>
                </ul>
                <br/>
                <p><strong>Summer Tournament:</strong></p>
                <ul>
                  <li>Placed 2nd in Regional Finals</li>
                  <li>Traveled to 5 different cities</li>
                  <li>Made 47 new friends</li>
                </ul>
              </div>
            ), '⚾')}>
              <span className="folder-icon">⚾</span>
              <span>Sports</span>
            </div>
            <div className="folder-item" onClick={() => openWindow('outdoors', 'Outdoor Adventures', (
              <div className="window-content">
                <h2>🥾 Hiking Adventures</h2>
                <p><strong>Mount Evergreen Trek:</strong></p>
                <ul>
                  <li>Date: July 4th Weekend</li>
                  <li>Distance: 8.3 miles</li>
                  <li>Elevation Gain: 2,450 ft</li>
                  <li>Weather: Sunny, 72°F</li>
                  <li>Wildlife Spotted: 3 deer, 12 chipmunks, 1 eagle</li>
                </ul>
                <br/>
                <p><strong>Sunset Lake Camping:</strong></p>
                <ul>
                  <li>3 nights under the stars</li>
                  <li>Caught 14 fish</li>
                  <li>Roasted 200+ marshmallows</li>
                  <li>Told countless ghost stories</li>
                </ul>
              </div>
            ), '🥾')}>
              <span className="folder-icon">🥾</span>
              <span>Outdoors</span>
            </div>
            <div className="folder-item" onClick={() => openWindow('projects', "Coding Projects", (
              <div className="window-content">
                <h2>💻 Programming Portfolio</h2>
                <p><strong>Snake Game Remake:</strong></p>
                <ul>
                  <li>Language: Python</li>
                  <li>Lines of Code: 450</li>
                  <li>Features: Power-ups, levels, high scores</li>
                  <li>Status: Complete and playable!</li>
                </ul>
                <br/>
                <p><strong>Weather Bot:</strong></p>
                <ul>
                  <li>Platform: Discord</li>
                  <li>Users: 127 active</li>
                  <li>Forecasts delivered: 3,400+</li>
                  <li>Accuracy: 94%</li>
                </ul>
                <br/>
                <p><strong>Next Up:</strong> Mobile app for tracking reading goals</p>
              </div>
            ), '💻')}>
              <span className="folder-icon">💻</span>
              <span>Projects</span>
            </div>
            <div className="folder-item" onClick={() => openWindow('recipes', 'Recipe Collection', (
              <div className="window-content">
                <h2>🍖 Famous BBQ Ribs</h2>
                <p><strong>Dry Rub Recipe:</strong></p>
                <ul>
                  <li>2 tbsp brown sugar</li>
                  <li>1 tbsp paprika</li>
                  <li>2 tsp black pepper</li>
                  <li>1 tsp garlic powder</li>
                  <li>1 tsp onion powder</li>
                  <li>1/2 tsp cayenne pepper</li>
                </ul>
                <br/>
                <p><strong>Instructions:</strong></p>
                <ul>
                  <li>Smoke at 225°F for 5 hours</li>
                  <li>Wrap in foil at hour 3</li>
                  <li>Brush with BBQ sauce last 30 min</li>
                  <li>Rest 10 minutes before serving</li>
                </ul>
                <br/>
                <p><em>Won 1st place at neighborhood cookoff 2023!</em></p>
              </div>
            ), '🍖')}>
              <span className="folder-icon">🍖</span>
              <span>Recipes</span>
            </div>
          </div>
        </div>
      ), '🗺️')
    },
    {
      id: 'games',
      name: 'Games',
      icon: '🎮',
      type: 'folder',
      onClick: () => openWindow('games', "Entertainment Setup", (
        <div className="window-content">
          <h2>🎮 Gaming & Entertainment</h2>
          <p><strong>Example Setup:</strong></p>
          <ul>
            <li>Modern Gaming Console</li>
            <li>Custom Gaming PC</li>
            <li>Large Display Monitor</li>
            <li>Quality Gaming Headset</li>
          </ul>
          <br/>
          <p><strong>Popular Games:</strong></p>
          <ul>
            <li>🎮 Sandbox Building Games</li>
            <li>🕹️ Action Adventure Titles</li>
            <li>🏎️ Racing Simulators</li>
            <li>🎯 Platformer Classics</li>
          </ul>
          <br/>
          <p><em>\"Level up your gaming experience!\"</em></p>
        </div>
      ), '🎮')
    },
    {
      id: 'contact',
      name: 'Contact.txt',
      icon: '📧',
      type: 'file',
      onClick: () => openWindow('contact', 'Contact Information', (
        <div className="window-content">
          <h2>📧 Get In Touch</h2>
          <p><strong>Website:</strong> example-family.com</p>
          <p><strong>Email:</strong> hello@example-family.com</p>
          <p><strong>Social:</strong> @examplefamily</p>
          <br/>
          <h3>About This Site</h3>
          <p>A retro-styled family website showcasing the possibilities of nostalgic web design</p>
          <p><em>Built with modern web technologies, styled like it's 1995!</em></p>
        </div>
      ), '📧')
    },
    {
      id: 'terminal',
      name: 'Terminal.exe',
      icon: '💻',
      type: 'app',
      onClick: () => openWindow('terminal', 'Terminal', (
        <div className="window-content">
          <h2>💻 Command Prompt</h2>
          <div style={{
            fontFamily: 'monospace',
            background: '#000',
            color: '#0f0',
            padding: '16px',
            borderRadius: '4px'
          }}>
            <p>C:\FAMILYOS&gt; dir</p>
            <p>&nbsp;</p>
            <p>Volume in drive C is FAMILYOS</p>
            <p>Directory of C:\FAMILYOS</p>
            <p>&nbsp;</p>
            <p>ABOUT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TXT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1,024&nbsp;&nbsp;10-05-25&nbsp;&nbsp;12:00p</p>
            <p>ADVENTURES&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DIR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10-05-25&nbsp;&nbsp;12:00p</p>
            <p>GAMES&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DIR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10-05-25&nbsp;&nbsp;12:00p</p>
            <p>CONTACT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TXT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;512&nbsp;&nbsp;10-05-25&nbsp;&nbsp;12:00p</p>
            <p>&nbsp;</p>
            <p>C:\FAMILYOS&gt; _</p>
          </div>
          <br/>
          <p><em>Authentic retro terminal experience!</em></p>
        </div>
      ), '💻')
    }
  ];

  return (
    <div className="os-container">
      <Desktop icons={desktopIcons} />
      
      {windows.filter(w => !w.isMinimized).map(window => (
        <Window
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onMove={updateWindowPosition}
        />
      ))}

      <Taskbar
        windows={windows}
        onWindowClick={(id) => {
          const w = windows.find(win => win.id === id);
          if (w?.isMinimized) {
            setWindows(windows.map(win => 
              win.id === id ? { ...win, isMinimized: false, zIndex: highestZIndex + 1 } : win
            ));
            setHighestZIndex(highestZIndex + 1);
          } else {
            focusWindow(id);
          }
        }}
        showStartMenu={showStartMenu}
        onStartClick={() => setShowStartMenu(!showStartMenu)}
        currentTime={currentTime}
        onShutdown={() => openWindow('shutdown', 'Shutdown Computer?', (
          <div className="window-content shutdown-dialog">
            <h2>⚠️ Are you sure?</h2>
            <p>This will close the Family OS.</p>
            <p><em>(Just kidding - this is a website!)</em></p>
            <br/>
            <p>But seriously, thanks for visiting! 😊</p>
            <br/>
            <button onClick={() => closeWindow('shutdown')} className="btn-primary">
              Cancel
            </button>
          </div>
        ), '⚠️')}
      />

      {showStartMenu && (
        <div className="start-menu">
          <div className="start-menu-header">Family OS</div>
          <div className="start-menu-item" onClick={() => setShowStartMenu(false)}>
            <span>📁</span> Programs
          </div>
          <div className="start-menu-item" onClick={() => setShowStartMenu(false)}>
            <span>📄</span> Documents
          </div>
          <div className="start-menu-item" onClick={() => setShowStartMenu(false)}>
            <span>🔍</span> Find
          </div>
          <div className="start-menu-item" onClick={() => setShowStartMenu(false)}>
            <span>⚙️</span> Settings
          </div>
          <div className="start-menu-divider"></div>
          <div className="start-menu-item" onClick={() => {
            openWindow('shutdown', 'Shutdown Computer?', (
              <div className="window-content shutdown-dialog">
                <h2>⚠️ Are you sure?</h2>
                <p>This will close the Family OS.</p>
                <p><em>(Just kidding - this is a website!)</em></p>
                <br/>
                <p>But seriously, thanks for visiting! 😊</p>
                <br/>
                <button onClick={() => closeWindow('shutdown')} className="btn-primary">
                  Cancel
                </button>
              </div>
            ), '⚠️');
            setShowStartMenu(false);
          }}>
            <span>⚠️</span> Shut Down
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
