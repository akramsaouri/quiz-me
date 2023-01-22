import { FC, ReactNode } from "react";
import styles from "./summaryCard.module.scss";

interface SummaryCardProps {
  heading: string;
  children: ReactNode;
  icon: ReactNode;
}

const SummaryCard: FC<SummaryCardProps> = ({ icon, heading, children }) => {
  return (
    <article className={styles.card}>
      <h5 className={styles.heading}>
        <span className={styles.icon}>{icon}</span>
        <span>{heading}</span>
      </h5>
      <p className={styles.content}>{children}</p>
    </article>
  );
};

export default SummaryCard;
