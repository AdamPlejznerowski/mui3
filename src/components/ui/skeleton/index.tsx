import "./style.css";
import type { ComponentProps } from "react";

type SkeletonProps = ComponentProps<"div"> & {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
};

const Skeleton = ({
  width,
  height,
  circle = false,
  style,
  ...props
}: SkeletonProps) => {
  const customStyle: React.CSSProperties = {
    ...style,
    width: width,
    height: height,
  };

  return (
    <div
      mui-skeleton=""
      data-circle={circle}
      style={customStyle}
      {...props}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
