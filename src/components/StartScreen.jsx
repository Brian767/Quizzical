export default function StartScreen({setGameStarted}) {
  return (
    <main>
      <h1>Quizzical</h1>
      <h2>Some description if needed</h2>
      <button onClick={()=>setGameStarted(true)} className="start-btn">Start quiz</button>
    </main>
  );
}