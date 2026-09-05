import React from "react";
import { nanoid } from "nanoid";

export default function QuizScreen() {
  const [quizData, setQuizData] = React.useState(null);

  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple",
    )
      .then((res) => res.json())
      .then((data) => setQuizData(data));
  }, []);

  const quizElements = quizData?.results.map((question, index) => {
    return (
      <section className="question" key={index}>
        <h2>{question.question}</h2>
        <section className="answers">
          <label>
            {question.correct_answer}
            <input
              type="radio"
              name="answer"
              className="radio"
              value={question.correct_answer}
            />
          </label>

          <label>
            {question.incorrect_answers[0]}
            <input
              type="radio"
              name="answer"
              className="radio"
              value={question.incorrect_answers[0]}
            />
          </label>

          <label>
            {question.incorrect_answers[1]}
            <input
              type="radio"
              name="answer"
              className="radio"
              value={question.incorrect_answers[1]}
            />
          </label>

          <label>
            {question.incorrect_answers[2]}
            <input
              type="radio"
              name="answer"
              className="radio"
              value={question.incorrect_answers[2]}
            />
          </label>
        </section>
      </section>
    );
  });
  return (
    <main className="quiz">
      <form>{quizElements}</form>
      <button className="quiz-btn">Check answers</button>
    </main>
  );
}
