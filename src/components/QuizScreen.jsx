import React from "react";
import he from "he";

export default function QuizScreen() {
  const [quizData, setQuizData] = React.useState(null);

  React.useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple",
    )
      .then((res) => res.json())
      .then((data) => setQuizData(data));
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
    const answersArr = [...question.incorrect_answers, question.correct_answer]
    shuffle(answersArr)
    console.log(answersArr)
    return (
      <section className="question" key={index}>
        <h2>{he.decode(question.question)}</h2>
        <section className="answers">
          <label>
            {he.decode(answersArr[0])}
            <input
              type="radio"
              name="answer"
              className="radio"
              value={answersArr[0]}
            />
          </label>

          <label>
            {he.decode(answersArr[1])}
            <input
              type="radio"
              name="answer"
              className="radio"
              value={he.decode(answersArr[1])}
            />
          </label>

          <label>
            {he.decode(answersArr[2])}
            <input
              type="radio"
              name="answer"
              className="radio"
              value={he.decode(answersArr[2])}
            />
          </label>

          <label>
            {he.decode(answersArr[3])}
            <input
              type="radio"
              name="answer"
              className="radio"
              value={he.decode(answersArr[3])}
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
