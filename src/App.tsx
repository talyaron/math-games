import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./view/styles/index.scss";
import Multiplier, {
  MultiplierProps,
} from "./features/components/multiplier/Multiplier";

enum CorrectAnswer {
  TRUE = "נכון",
  FALSE = "שגוי",
  NONE = "",
}

function App() {
  const [count, setCount] = useState(0);
  const [multipliers, setMultipliers] = useState<Array<MultiplierProps>>(
    createMultipliers(0, 10)
  );
  const [multA, setMultA] = useState<MultiplierProps | false>(false);
  const [multB, setMultB] = useState<MultiplierProps | false>(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [correct, setCorrect] = useState<CorrectAnswer>(CorrectAnswer.NONE);
  const [total, setTotal] = useState<number>(0);
  const [turns, setTurns] = useState<number>(1);
  const [end, setEnd] = useState<boolean>(false);

  useEffect(()=>{
    if(turns>5){
      setEnd(true)
    }
  },[turns])

  function handleNewExercise() {
    setMultA(reandomNumber(multipliers));
    setMultB(reandomNumber(multipliers));
    setCorrect(CorrectAnswer.NONE);
  }

  function handleCheckAnswer(ev: any) {
    ev.preventDefault();
    if (multA && multB && multA.number * multB.number === answer) {
      setCorrect(CorrectAnswer.TRUE);
      setTotal(addToTotal(total, multA, multB));
    } else {
      setCorrect(CorrectAnswer.FALSE);
    }
    ev.target.reset();
    setTurns((trn) => trn + 1);
    if(turns>5){
      setEnd(true);
    }
  }

  function handlChangeAnswer(ev: any) {
    console.log(ev.target.valueAsNumber);
    if (isNaN(ev.target.valueAsNumber)) {
      setAnswer(null);
    } else {
      setAnswer(ev.target.valueAsNumber);
    }
  }

  return (
    <div className="app">
      <div className="wrapper">
        <h2>בחרו לפחות 4 כפולות</h2>
        <div className="multipliers">
          {multipliers.map((multiplier, i) => (
            <Multiplier
              key={`mlt-${i}`}
              multiplier={multiplier}
              setMultipliers={setMultipliers}
              multipliers={multipliers}
            />
          ))}
        </div>
        {!end ? (
          <>
            <h2>קבלו תרגיל</h2>
            <h3>
              ניקוד: {total} תרגיל מספר {turns}
            </h3>
            {multipliers.filter((mlt) => mlt.selected).length > 3 ? (
              <button onClick={handleNewExercise}>תרגיל חדש</button>
            ) : null}
            {multA && multB ? (
              <div>
                <span>
                  {multA.number} X {multB.number} ={" "}
                  <form onSubmit={handleCheckAnswer}>
                    <input type="number" onChange={handlChangeAnswer} />
                    {correct === CorrectAnswer.NONE ? (
                      <button>OK</button>
                    ) : null}
                  </form>
                </span>
              </div>
            ) : null}
            {correct}
          </>
        ) : (
          <div className="finsh">
          <h2>סיום</h2>
          <h2>ניקוד: {total}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

function createMultipliers(min: number, max: number) {
  try {
    const multipliers: MultiplierProps[] = [];
    for (let i = min; i <= max; i++) {
      multipliers.push({ number: i, selected: false, level: level(i) });
    }
    return multipliers;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function level(number: number) {
  if (number === 0 || number === 1 || number === 10) {
    return 1;
  } else if (number === 2 || number === 4) {
    return 2;
  } else if (number === 6 || number === 8 || number === 5 || number === 3) {
    return 3;
  } else if (number === 7 || number === 9) {
    return 4;
  } else {
    return 5;
  }
}

function reandomNumber(
  multipliers: MultiplierProps[]
): MultiplierProps | false {
  try {
    const selectedMultipliers = multipliers.filter((mlt) => mlt.selected);
    const randomMultiplier =
      selectedMultipliers[
        Math.floor(Math.random() * selectedMultipliers.length)
      ];
    return randomMultiplier;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function addToTotal(
  total: number,
  mul_a: MultiplierProps,
  mul_b: MultiplierProps
) {
  try {
    return (total += mul_a.level + mul_b.level);
  } catch (error) {
    console.error(error);
    return total;
  }
}
