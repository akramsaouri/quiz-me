import { FC } from "react";
import styles from "./progressBar.module.scss";

export interface ProgressBarProps {
  value: number;
  min?: number;
  max?: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ value, min = 0, max = 100 }) => {
  const innerStyle: React.CSSProperties = {};
  innerStyle.width = `${value}%`;
  if (min > 0) {
    innerStyle.minWidth = `${min}%`;
  }
  if (max < 100) {
    innerStyle.maxWidth = `${max}%`;
  }
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      className={styles.track}
    >
      <div className={styles.bar} style={innerStyle} />
    </div>
  );
};

export default ProgressBar;
