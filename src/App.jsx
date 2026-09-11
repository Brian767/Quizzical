import React from "react";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import "./App.css";


function App() {
  const [gameStarted, setGameStarted] = React.useState(false)
  return  gameStarted? <QuizScreen/>:<StartScreen setGameStarted={setGameStarted} />;
}

export default App;
