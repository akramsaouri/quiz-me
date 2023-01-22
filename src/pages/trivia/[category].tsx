import Button from "@/components/Button";
import ProgressBar from "@/components/ProgressBar";
import SummaryCard from "@/components/SummaryCard";
import CheckIcon from "@/icons/CheckIcon";
import PercentIcon from "@/icons/PercentIcon";
import ThumbsDownIcon from "@/icons/ThumbsDownIcon";
import ThumbsUPIcon from "@/icons/ThumbsUPIcon";
import TimesIcon from "@/icons/TimesIcon";
import TwitterIcon from "@/icons/TwitterIcon";
import { getTrivia } from "@/lib/opentdb";
import { Trivia } from "@/models";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Trivia.module.scss";

interface TriviaPageProps {
  trivias: Trivia[];
}

const TriviaPage: NextPage<TriviaPageProps> = ({ trivias }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [answer, setAnswer] = useState({
    answer: "",
    correctAnswer: "",
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const currentTrivia = trivias[currentIndex];
  const timeoutID = useRef(null);
  const finished = currentIndex === trivias.length;

  useEffect(() => {
    return () => {
      // @ts-expect-error fix Timeout issue
      clearTimeout(timeoutID.current);
    };
  }, []);

  const evaluateAnswer = (answer: string) => {
    if (answer === currentTrivia.correct_answer) {
      setCorrectAnswers((correctAnswers) => correctAnswers + 1);
    } else {
      setWrongAnswers((wrongAnswers) => wrongAnswers + 1);
    }
    setAnswer({
      answer,
      correctAnswer: currentTrivia.correct_answer,
    });
    setShowFeedback(true);
    // @ts-expect-error fix Timeout issue
    timeoutID.current = setTimeout(() => {
      setShowFeedback(false);
      setCurrentIndex((index) => index + 1);
    }, 700);
  };

  const buttonVariant = (possibleAnswer: string) => {
    if (showFeedback) {
      if (possibleAnswer === answer.correctAnswer) {
        return "success";
      }
    }
    return "primary";
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Link href="/" className={styles.goBackLink}>
          Change category
        </Link>
        <span className={styles.category}>{trivias[0].category}</span>
      </div>
      {finished ? (
        <div className={styles.score}>
          <div className={styles.summary}>
            <SummaryCard heading="Score" icon={<PercentIcon />}>
              {(correctAnswers / trivias.length) * 100}%
            </SummaryCard>
            <SummaryCard
              heading="Number of correct answers"
              icon={<CheckIcon />}
            >
              {correctAnswers}
            </SummaryCard>
            <SummaryCard heading="Number of wrong answers" icon={<TimesIcon />}>
              {wrongAnswers}
            </SummaryCard>
          </div>
          <div className={styles.share}>
            <Button icon={<TwitterIcon />}>Share results on twitter</Button>
          </div>
        </div>
      ) : (
        <>
          <ProgressBar value={(currentIndex / trivias.length) * 100} />
          <p
            className={styles.question}
            dangerouslySetInnerHTML={{ __html: currentTrivia.question }}
          />
          <div className={styles.buttons}>
            <Button
              onClick={() => evaluateAnswer("False")}
              icon={<TimesIcon />}
              disabled={showFeedback}
              variant={buttonVariant("False")}
            >
              False
            </Button>
            <Button
              onClick={() => evaluateAnswer("True")}
              icon={<CheckIcon />}
              disabled={showFeedback}
              variant={buttonVariant("True")}
            >
              True
            </Button>
          </div>
          {showFeedback && (
            <div className={styles.feedback}>
              {answer.answer === answer.correctAnswer ? (
                <ThumbsUPIcon />
              ) : (
                <ThumbsDownIcon />
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default TriviaPage;

export const getServerSideProps: GetServerSideProps<TriviaPageProps> = async ({
  query,
}) => {
  const { data } = await getTrivia(query.category as string);
  if (data.response_code !== 0 || data.results.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      trivias: data.results,
    },
  };
};
