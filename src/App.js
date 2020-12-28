import React, { useState } from "react";
import DisplayComponent from "./components/DisplayComponent";
import BtnDisplayComponent from "./components/BtnDisplayComponent";

import "./App.css";

function App() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 59, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  let updatedMicroSecs = time.ms;
  let updatedSeconds = time.s;
  let updatedMinutes = time.m;
  let updatedHour = time.h;

  const run = () => {
    if (updatedMinutes === 60) {
      updatedHour++;
      updatedMinutes = 0;
    }
    if (updatedSeconds === 60) {
      updatedMinutes++;
      updatedSeconds = 0;
    }
    if (updatedMicroSecs === 100) {
      updatedSeconds++;
      updatedMicroSecs = 0;
    }

    updatedMicroSecs++;
    return setTime({
      ms: updatedMicroSecs,
      s: updatedSeconds,
      m: updatedMinutes,
      h: updatedHour,
    });
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  const resume = () => start();

  return (
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <DisplayComponent time={time} />
          <BtnDisplayComponent
            status={status}
            resume={resume}
            reset={reset}
            stop={stop}
            start={start}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
