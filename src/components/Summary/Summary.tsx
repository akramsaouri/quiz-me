import CheckIcon from "@/icons/CheckIcon";
import PercentIcon from "@/icons/PercentIcon";
import TimesIcon from "@/icons/TimesIcon";
import { FC } from "react";
import SummaryCard from "../SummaryCard";
import styles from "./summary.module.scss";

interface SummaryProps {
  correctAnswers: number;
  wrongAnswers: number;
  questionCount: number;
}

const Summary: FC<SummaryProps> = ({
  correctAnswers,
  questionCount,
  wrongAnswers,
}) => {
  const score = correctAnswers / questionCount;
  return (
    <div className={styles.summary}>
      <SummaryCard heading="Score" icon={<PercentIcon />}>
        {score * 100}%{score === 1 && <span>Perfect score</span>}
      </SummaryCard>
      <SummaryCard heading="Number of correct answers" icon={<CheckIcon />}>
        {correctAnswers}
      </SummaryCard>
      <SummaryCard heading="Number of wrong answers" icon={<TimesIcon />}>
        {wrongAnswers}
      </SummaryCard>
    </div>
  );
};

export default Summary;
