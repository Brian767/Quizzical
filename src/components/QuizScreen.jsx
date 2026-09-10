import React from "react";
import he from "he";

export default function QuizScreen() {
  const [quizData, setQuizData] = React.useState(null);
  const [guesses, setGuesses] = React.useState([]);

  React.useEffect(() => {
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
            return (
              <label>
                {he.decode(answer)}
                <input
                  type="radio"
                  name={`question-${index}`}
                  className="radio"
                  value={he.decode(answer)}
                />
              </label>
            );
          })}
        </section>
      </section>
    );
  });

  function checkAnswers(formData) {
    console.log(formData);
    const answers = Object.fromEntries(formData);
    setGuesses(answers);
    console.log(guesses);
  }

  return (
    <main className="quiz">
      <form action={checkAnswers}>
        {quizElements}
        <button type="submit" className="quiz-btn">
          Check answers
        </button>
      </form>
    </main>
  );
}
