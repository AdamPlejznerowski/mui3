import { useState, useEffect, useCallback } from 'react';

interface MenuPosition {
  x: number;
  y: number;
}

export const useContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<MenuPosition>({ x: 0, y: 0 });

  const handleContextMenu = useCallback((event: MouseEvent) => {
    // Block the default browser engine/browser system menu
    event.preventDefault();
    
    setIsOpen(true);
    setPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    // Close the menu when the user clicks anywhere else
    document.addEventListener('click', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, [closeMenu]);

  return {
    isOpen,
    position,
    handleContextMenu,
    closeMenu,
  };
};
