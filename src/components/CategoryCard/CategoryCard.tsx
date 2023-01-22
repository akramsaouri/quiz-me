import { CategoryWithCount } from "@/models";
import Link from "next/link";
import { FC, ReactNode } from "react";
import styles from "./categoryCard.module.scss";

interface CategoryCardProps extends CategoryWithCount {
  icon: ReactNode;
}

const CategoryCard: FC<CategoryCardProps> = ({
  id,
  name,
  icon,
  questionCount,
}) => {
  return (
    <article className={styles.card}>
      <Link href={`/trivia/${id}`}>
        <div className={styles.content}>
          <h5 className={styles.heading}>
            <span className={styles.icon}>{icon}</span> <span>{name}</span>
          </h5>
          <p className={styles.info}>
            This category has over <span>{questionCount}</span> brainy
            challenging questions.
          </p>
        </div>
      </Link>
    </article>
  );
};

export default CategoryCard;
