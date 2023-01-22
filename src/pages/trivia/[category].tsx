import { getTrivia } from "@/lib/opentdb";
import { Trivia } from "@/models";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

interface TriviaPageProps {
  trivias: Trivia[];
}

const TriviaPage: NextPage<TriviaPageProps> = ({ trivias }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const currentTrivia = trivias[currentIndex];

  const evaluateAnswer = (answer: string) => {
    if (answer === currentTrivia.correct_answer) {
      setCorrectAnswers((correctAnswers) => correctAnswers + 1);
    } else {
      setWrongAnswers((wrongAnswers) => wrongAnswers + 1);
    }
    setCurrentIndex((index) => index + 1);
  };

  const finished = currentIndex === trivias.length;

  return (
    <div>
      <div>
        <Link href={"/"}>Go back to categories</Link>
        {!finished && (
          <p>
            Question {currentIndex + 1}/{trivias.length}
          </p>
        )}
      </div>
      {finished ? (
        <div>
          <p>
            score: {correctAnswers}/{trivias.length}
          </p>
          <p>correct answers: {correctAnswers}</p>
          <p>wrong answers: {wrongAnswers}</p>
        </div>
      ) : (
        <div>
          <h1 dangerouslySetInnerHTML={{ __html: currentTrivia.question }} />
          <div>
            <button onClick={() => evaluateAnswer("False")}>false</button>
            <button onClick={() => evaluateAnswer("True")}>true</button>
          </div>
        </div>
      )}
    </div>
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
