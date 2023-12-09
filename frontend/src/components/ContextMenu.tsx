import React, { useRef, useEffect,useState } from 'react';
import ContexMenuIcon from '@assets/novaIcons/solid/ContexMenuIcon';


interface MenuItem {
  label: string;
  onClick: () => void;
  className?: string;
}

interface ContextMenuProps {
  // coords: { x: number, y: number };
  // visible: boolean;
  // setVisible: (visible: boolean) => void;
  menuItems: MenuItem[];
}


const ContextMenu: React.FC<ContextMenuProps> = ({ menuItems }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // event.preventDefault();
    setCoords({ x: event.clientX, y: event.clientY });
    setVisible(true);
  };

  const handleClick = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setVisible(false);
    }
  };

   useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      if (rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
        const x = coords.x;
        const y = coords.y - rect.height;
        setCoords({x, y });
      }
    }
  }, [visible]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <>
     <div id="context_menu" className='center text-white  ' onClick={handleContextMenu}>
            <ContexMenuIcon className='text-white hover:cursor-pointer'/>
    </div>
    <div ref={menuRef} style={{ top: `${coords.y}px`, left: `${coords.x}px` }} className={`z-10 fixed bg-lightBlack transition-all duration-300 ease-in-out transform rounded-xl border-2 border-[#2F3136] ${visible ? 'block' : 'hidden'}`}>
      {menuItems.map((item, index) => (
        <h1 key={index} className={item.className} onClick={() => {
          item.onClick();
          setVisible(false);
        }}>{item.label}</h1>
      ))}
    </div>
    </>
  );
}

export default ContextMenu;