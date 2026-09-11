import React from "react";
import he from "he";
import clsx from "clsx";

export default function QuizScreen() {
  const [quizData, setQuizData] = React.useState(null);
  const [guesses, setGuesses] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  function getQuiz() {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple",
    )
      .then((res) => res.json())
      .then((data) => {
        const shuffledQuestions = data?.results.map((question) => {
          const answers = [
            ...question.incorrect_answers,
            question.correct_answer,
          ];

          shuffle(answers);

          return {
            ...question,
            answers,
          };
        });
        setQuizData({
          ...data,
          results: shuffledQuestions,
        });
      });
  }
  React.useEffect(() => {
    getQuiz()
  }, []);

  // Source - https://stackoverflow.com/a/2450976
  // Posted by ChristopheD, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-09-05, License - CC BY-SA 4.0

  function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  const quizElements = quizData?.results.map((question, index) => {
    return (
      <section className="question" key={index}>
        <h2>{he.decode(question.question)}</h2>
        <section className="answers">
          {question.answers.map((answer) => {
            const guessedAnswer = guesses[`question-${index}`];
            const isCorrect = answer === question.correct_answer;
            const isGuessed = answer === guessedAnswer;
            const notGuessed = answer !== guessedAnswer;

            const classList = clsx({
              right: submitted && isCorrect,
              wrong: submitted && isGuessed && !isCorrect,
              notGuessed: submitted && notGuessed && !isCorrect,
            });

            return (
              <label key={answer} className={classList}>
                {he.decode(answer)}
                <input
                  disabled={submitted}
                  type="radio"
                  name={`question-${index}`}
                  className="radio"
                  value={answer}
                />
              </label>
            );
          })}
        </section>
      </section>
    );
  });

  function checkAnswers(formData) {
    if (submitted) {
      setQuizData(null);
      setGuesses({});
      setSubmitted(false);
      getQuiz();
      return;
    }
    const answers = Object.fromEntries(formData);
    setGuesses(answers);
    setSubmitted(true);
  }

  const score = quizData?.results.filter((question, index) => {
    return guesses[`question-${index}`] === question.correct_answer;
  }).length;

  return (
    <main className="quiz">
      <form action={checkAnswers}>
        {quizElements}
        <div className="scoreAndButton">
          {submitted && (
            <p>
              You scored {score}/{quizData.results.length} correct answers
            </p>
          )}
          <button type="submit" className="quiz-btn">
            {submitted ? "Play again" : "Check answers"}
          </button>
        </div>
      </form>
    </main>
  );
}
