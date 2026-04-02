import "./style.css";
import type { ComponentProps, ReactNode } from "react";

type ContextMenuProps = ComponentProps<"div"> & {
  isOpen: boolean;
  position: { x: number; y: number };
  children: ReactNode;
};

const ContextMenu = ({ isOpen, position, children, ...props }: ContextMenuProps) => {
  if (!isOpen) return null;

  const style: React.CSSProperties = {
    top: `${position.y}px`,
    left: `${position.x}px`,
  };

  return (
    <div
      mui-context-menu=""
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default ContextMenu;
