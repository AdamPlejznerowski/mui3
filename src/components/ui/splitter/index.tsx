import "./style.css";
import { useState, useRef, useCallback, type ComponentProps, type ReactNode } from "react";

type SplitterProps = ComponentProps<"div"> & {
  children: [ReactNode, ReactNode]; // Force exactly two elements (left and right panels)
  initialWidth?: number;
  minWidth?: number;
  maxWidth?: number;
};

const Splitter = ({
  children,
  initialWidth = 280,
  minWidth = 150,
  maxWidth = 500,
  ...props
}: SplitterProps) => {
  const [leftWidth, setLeftWidth] = useState(initialWidth);
  const isResizing = useRef(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none"; // Block text selection while dragging
  }, []);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  }, []);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (!isResizing.current) return;

      // Calculating the new width based on the mouse position
      let newWidth = e.clientX;

      // Keeping track of min/max limits
      if (newWidth < minWidth) newWidth = minWidth;
      if (newWidth > maxWidth) newWidth = maxWidth;

      setLeftWidth(newWidth);
    },
    [minWidth, maxWidth]
  );

  // Attaching listeners to the entire window (document) so that the mouse does not "run away" when moving quickly
  useCallback(() => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResizing);
    
    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing])();

  return (
    <div mui-splitter-container="" {...props}>
      <div mui-splitter-left="" style={{ width: `${leftWidth}px` }}>
        {children[0]}
      </div>
      
      {/* Drag strap */}
      <div mui-splitter-gutter="" onMouseDown={startResizing} />

      <div mui-splitter-right="">
        {children[1]}
      </div>
    </div>
  );
};

export default Splitter;
