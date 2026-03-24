import { useEffect, useState } from "react";

function formatClock(date) {
  return new Intl.DateTimeFormat("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [stateDemoCount, setStateDemoCount] = useState(0);
  const [fakeAttemptCount, setFakeAttemptCount] = useState(0);
  const [renderTitleEnabled, setRenderTitleEnabled] = useState(false);
  const [renderWriteCount, setRenderWriteCount] = useState(0);
  const [effectTitleCount, setEffectTitleCount] = useState(0);
  const [effectLog, setEffectLog] = useState([]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
      console.log("planner: cleared live clock interval");
    };
  }, []);

  useEffect(() => {
    document.title = `Effect demo count: ${effectTitleCount}`;
  }, [effectTitleCount]);

  useEffect(() => {
    setEffectLog((prevLog) => [
      `useEffect synced document.title to ${effectTitleCount}`,
      ...prevLog,
    ].slice(0, 5));
  }, [effectTitleCount]);

  if (renderTitleEnabled) {
    document.title = `Render wrote title ${renderWriteCount}`;
  }

  const statePreview = JSON.stringify(
    {
      stateDemoCount,
      fakeAttemptCount,
      renderWriteCount,
      effectTitleCount,
      latestEffectLog: effectLog[0] ?? "none",
    },
    null,
    2
  );

  function handleFakeVariableClick() {
    setFakeAttemptCount((prevCount) => prevCount + 1);
  }

  function handleRealStateClick() {
    setStateDemoCount((prevCount) => prevCount + 1);
  }

  function handleRenderWriteClick() {
    setRenderWriteCount((prevCount) => prevCount + 1);
    setRenderTitleEnabled(true);
  }

  return (
    <main className="lesson-shell">
      <section className="lesson-panel">
        <p className="eyebrow">Session 8 · React useEffect</p>
        <h1>Why do we need hooks?</h1>
        <p className="intro">
          Students only need to understand two ideas today:
          `useState` helps React update the screen, and `useEffect` is the safe
          place for browser side effects.
        </p>

        <div className="rule-strip" aria-label="Core rules">
          <span>1. compare the wrong way and the right way</span>
          <span>2. click the buttons</span>
          <span>3. watch what changes on screen</span>
        </div>

        <section className="contrast-panel" aria-label="Why hooks matter">
          <article className="lesson-row">
            <div className="lesson-row-header">
              <p className="step-badge">Lesson 1</p>
              <div>
                <h2>Why not use a normal variable?</h2>
                <p className="contrast-copy">
                  Both buttons try to add `+1`. Only the right side updates the
                  number that the user can see.
                </p>
              </div>
            </div>

            <div className="comparison-grid">
              <div className="demo-card demo-card-bad">
                <p className="output-label">Wrong way</p>
                <h3>Normal variable only</h3>
                <div className="screen-box">
                  <p className="screen-title">What the student sees</p>
                  <p className="screen-number">0</p>
                  <p className="screen-note">This visible number never changes.</p>
                </div>
                <button className="contrast-action contrast-action-bad" onClick={handleFakeVariableClick} type="button">
                  Try wrong way
                </button>
                <p className="output-copy">
                  You clicked {fakeAttemptCount} time(s), but the screen is still `0`.
                </p>
              </div>

              <div className="demo-card demo-card-good">
                <p className="output-label">Right way</p>
                <h3>React state with `useState`</h3>
                <div className="screen-box">
                  <p className="screen-title">What the student sees</p>
                  <p className="screen-number">{stateDemoCount}</p>
                  <p className="screen-note">This visible number comes from React state.</p>
                </div>
                <button className="contrast-action contrast-action-good" onClick={handleRealStateClick} type="button">
                  Try right way
                </button>
                <p className="output-copy">
                  The screen changed because React re-rendered with new state.
                </p>
              </div>
            </div>

            <p className="takeaway">
              Key idea: `useState` matters because React updates the screen from state.
            </p>

            <div className="code-teaching">
              <div className="code-card">
                <p className="output-label">Easy code example</p>
                <h3>Wrong</h3>
                <pre className="lesson-code">{`let count = 0;

function clickWrong() {
  count = count + 1;
}

return <p>{count}</p>;`}</pre>
                <p className="output-copy">
                  The variable changes, but React is not using state to control the screen.
                </p>
              </div>

              <div className="code-card">
                <p className="output-label">Easy code example</p>
                <h3>Right</h3>
                <pre className="lesson-code">{`const [count, setCount] = useState(0);

function clickRight() {
  setCount(count + 1);
}

return <p>{count}</p>;`}</pre>
                <p className="output-copy">
                  Now React reads `count` from state, so the screen updates.
                </p>
              </div>
            </div>
          </article>

          <article className="lesson-row">
            <div className="lesson-row-header">
              <p className="step-badge">Lesson 2</p>
              <div>
                <h2>Where should browser side effects go?</h2>
                <p className="contrast-copy">
                  Look at your browser tab title. Both sides can change it, but
                  only the right side uses the correct React pattern.
                </p>
              </div>
            </div>

            <div className="comparison-grid">
              <div className="demo-card demo-card-bad">
                <p className="output-label">Wrong way</p>
                <h3>Change browser title inside render</h3>
                <div className="screen-box">
                  <p className="screen-title">Current count</p>
                  <p className="screen-number">{renderWriteCount}</p>
                  <p className="screen-note">
                    This writes directly to the browser title while rendering.
                  </p>
                </div>
                <button
                  className="contrast-action contrast-action-bad"
                  onClick={handleRenderWriteClick}
                  type="button"
                >
                  Do wrong way
                </button>
                <p className="output-copy">
                  The browser title changes, but the code is in the wrong place.
                </p>
              </div>

              <div className="demo-card demo-card-good">
                <p className="output-label">Right way</p>
                <h3>Change state, then sync in `useEffect`</h3>
                <div className="screen-box">
                  <p className="screen-title">Current count</p>
                  <p className="screen-number">{effectTitleCount}</p>
                  <p className="screen-note">
                    React changes state first. Then `useEffect` updates the browser title.
                  </p>
                </div>
                <button
                  className="contrast-action contrast-action-good"
                  onClick={() => setEffectTitleCount((prev) => prev + 1)}
                  type="button"
                >
                  Do right way
                </button>
                <p className="output-copy">
                  Same result, but now the side effect lives in the correct place.
                </p>
              </div>
            </div>

            <div className="log-panel">
              <p className="output-label">What just happened</p>
              <ul className="effect-log">
                {effectLog.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>

            <p className="takeaway">
              Key idea: `useEffect` is where React code talks to the browser after render.
            </p>

            <div className="code-teaching">
              <div className="code-card">
                <p className="output-label">Easy code example</p>
                <h3>Wrong</h3>
                <pre className="lesson-code">{`function App() {
  document.title = "Hello";

  return <div>Hi</div>;
}`}</pre>
                <p className="output-copy">
                  This changes browser stuff inside render. That is the wrong place.
                </p>
              </div>

              <div className="code-card">
                <p className="output-label">Easy code example</p>
                <h3>Right</h3>
                <pre className="lesson-code">{`function App() {
  useEffect(() => {
    document.title = "Hello";
  }, []);

  return <div>Hi</div>;
}`}</pre>
                <p className="output-copy">
                  `useEffect` runs after render, so browser side effects live in the correct place.
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="summary-panel">
          <div className="status-grid">
            <article className="status-card">
              <p className="status-label">Live clock</p>
              <p className="status-value">{formatClock(now)}</p>
              <p className="status-copy">This timer is a real `useEffect` with cleanup.</p>
            </article>

            <article className="status-card">
              <p className="status-label">One-line summary</p>
              <p className="status-value">UI reads state</p>
              <p className="status-copy">Browser side effects go in `useEffect`.</p>
            </article>
          </div>

          <pre className="state-preview">{statePreview}</pre>
        </section>
      </section>
    </main>
  );
}
