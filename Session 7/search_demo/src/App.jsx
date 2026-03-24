import { useState } from "react";
import "./App.css";
import SearchPanel from "./SearchPanel";

const ARRAY_OPTIONS = [
  { label: "Tiny — 3 items", nums: [2, 5, 8] },
  { label: "Default — 9 items", nums: [-3, 0, 1, 4, 7, 9, 14, 18, 21] },
  { label: "With negatives — 8 items", nums: [-15, -9, -4, -1, 0, 3, 7, 12] },
  {
    label: "Large — 15 items",
    nums: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29],
  },
];

function makeInitialState(nums) {
  return {
    left: 0,
    right: nums.length - 1,
    mid: null,       // binary: current mid; linear: current pointer
    step: 0,
    status: "idle",  // "idle" | "searching" | "found" | "not-found"
    history: [],
  };
}

function logStateChange(action, prev, next) {
  console.groupCollapsed(`search:${action}`);
  console.log("before:", prev);
  console.log("after :", next);
  console.groupEnd();
}

export default function App() {
  const [mode, setMode] = useState("linear"); // "linear" | "binary" — start with brute force
  const [arrayIndex, setArrayIndex] = useState(1);
  const [targetRaw, setTargetRaw] = useState("7");
  const [target, setTarget] = useState(7);
  const [searchState, setSearchState] = useState(() =>
    makeInitialState(ARRAY_OPTIONS[1].nums)
  );
  const [snapshots, setSnapshots] = useState([]);

  const nums = ARRAY_OPTIONS[arrayIndex].nums;

  function resetAll(newNums) {
    setSnapshots([]);
    setSearchState((prev) => {
      const next = makeInitialState(newNums ?? nums);
      logStateChange("reset", prev, next);
      return next;
    });
  }

  // ── Mode toggle ───────────────────────────────────────────────────────────
  function handleModeChange(newMode) {
    setMode(newMode);
    resetAll();
  }

  // ── Array selector ────────────────────────────────────────────────────────
  function handleArrayChange(e) {
    const idx = Number(e.target.value);
    setArrayIndex(idx);
    setSnapshots([]);
    setSearchState((prev) => {
      const next = makeInitialState(ARRAY_OPTIONS[idx].nums);
      logStateChange("array-change", prev, next);
      return next;
    });
  }

  // ── Target input ──────────────────────────────────────────────────────────
  function handleTargetChange(e) {
    const raw = e.target.value;
    if (raw === "" || raw === "-") { setTargetRaw(raw); return; }
    if (!/^-?\d+$/.test(raw)) return;
    const parsed = parseInt(raw, 10);
    if (isNaN(parsed)) return;
    setTargetRaw(String(parsed));
    setTarget(parsed);
    setSnapshots([]);
    setSearchState((prev) => {
      const next = makeInitialState(nums);
      logStateChange("target-change", prev, next);
      return next;
    });
  }

  // ── Step ──────────────────────────────────────────────────────────────────
  function handleStep() {
    setSnapshots((prev) => [...prev, searchState]);

    if (mode === "linear") {
      setSearchState((prev) => {
        // In linear mode, `mid` holds the current pointer index.
        // When idle, start at 0.
        const current = prev.mid === null ? 0 : prev.mid;
        const value = nums[current];

        let decision, status, nextPointer;

        if (value === target) {
          decision = `nums[${current}] = ${value} = ${target} → found ✓`;
          status = "found";
          nextPointer = current;
        } else if (current >= nums.length - 1) {
          decision = `nums[${current}] = ${value} ≠ ${target} → not found`;
          status = "not-found";
          nextPointer = current;
        } else {
          decision = `nums[${current}] = ${value} ≠ ${target} → next →`;
          status = "searching";
          nextPointer = current + 1;
        }

        const historyEntry = {
          step: prev.step + 1,
          left: current,
          right: current,
          mid: current,
          midValue: value,
          decision,
          status,
        };

        const next = {
          ...prev,
          mid: nextPointer,
          step: prev.step + 1,
          status,
          history: [...prev.history, historyEntry],
        };

        logStateChange(`step-${next.step}`, prev, next);
        return next;
      });
    } else {
      // binary mode
      setSearchState((prev) => {
        const { left, right, history } = prev;
        const mid = left + Math.floor((right - left) / 2);
        const midValue = nums[mid];

        let decision, newLeft = left, newRight = right, status;

        if (midValue === target) {
          decision = `nums[${mid}] = ${midValue} = ${target} → found ✓`;
          status = "found";
        } else if (midValue < target) {
          newLeft = mid + 1;
          decision = `nums[${mid}] = ${midValue} < ${target} → left = ${newLeft}`;
          status = newLeft > right ? "not-found" : "searching";
        } else {
          newRight = mid - 1;
          decision = `nums[${mid}] = ${midValue} > ${target} → right = ${newRight}`;
          status = left > newRight ? "not-found" : "searching";
        }

        const historyEntry = { step: prev.step + 1, left, right, mid, midValue, decision, status };
        const next = {
          ...prev,
          left: newLeft,
          right: newRight,
          mid,
          step: prev.step + 1,
          status,
          history: [...history, historyEntry],
        };

        logStateChange(`step-${next.step}`, prev, next);
        return next;
      });
    }
  }

  // ── Move Back ─────────────────────────────────────────────────────────────
  function handleMoveBack() {
    if (snapshots.length === 0) return;
    const previous = snapshots[snapshots.length - 1];
    setSnapshots((prev) => prev.slice(0, -1));
    setSearchState(previous);
    logStateChange("move-back", searchState, previous);
  }

  // ── Reset ─────────────────────────────────────────────────────────────────
  function handleReset() { resetAll(); }

  // ── State preview (different fields per mode) ─────────────────────────────
  const statePreview = JSON.stringify(
    mode === "binary"
      ? { target, left: searchState.left, right: searchState.right, mid: searchState.mid, step: searchState.step, status: searchState.status }
      : { target, current: searchState.mid, step: searchState.step, status: searchState.status },
    null,
    2
  );

  const isLinear = mode === "linear";

  return (
    <main className="page-shell">
      <section className="panel hero-panel">
        <p className="eyebrow">Session 7 · Binary Search</p>
        <h1>Search Visualizer</h1>
        <p className="intro">
          {isLinear
            ? "Brute force: check every element from left to right. Feel how slow this gets on large arrays."
            : "Binary search: eliminate half the remaining array at each step. Yellow = current mid. Gray = eliminated."}
        </p>

        {/* Mode toggle */}
        <div className="mode-toggle" role="group" aria-label="Search mode">
          <button
            className={`mode-btn ${isLinear ? "mode-btn-active" : ""}`}
            onClick={() => handleModeChange("linear")}
          >
            Brute Force — O(n)
          </button>
          <button
            className={`mode-btn ${!isLinear ? "mode-btn-active" : ""}`}
            onClick={() => handleModeChange("binary")}
          >
            Binary Search — O(log n)
          </button>
        </div>

        {!isLinear && (
          <div className="rule-strip" aria-label="Core rules">
            <span>left = mid + 1</span>
            <span>right = mid - 1</span>
            <span>O(log n) steps</span>
          </div>
        )}

        {/* Array selector */}
        <div className="selector-row">
          <label className="field-label" htmlFor="array-select">Array</label>
          <select
            id="array-select"
            className="array-select"
            value={arrayIndex}
            onChange={handleArrayChange}
          >
            {ARRAY_OPTIONS.map((opt, i) => (
              <option key={i} value={i}>{opt.label}</option>
            ))}
          </select>
        </div>

        <SearchPanel
          nums={nums}
          searchState={searchState}
          mode={mode}
          onStep={handleStep}
          onMoveBack={handleMoveBack}
          onReset={handleReset}
          canMoveBack={snapshots.length > 0}
          target={target}
          targetRaw={targetRaw}
          onTargetChange={handleTargetChange}
        />
      </section>

      <aside className="panel inspector-panel">
        <div className="inspector-header">
          <p className="eyebrow">Debug view</p>
          <h2>State snapshot</h2>
        </div>
        <p className="inspector-copy">
          {isLinear
            ? "Watch current move right after each step. Try the large array to feel the O(n) cost."
            : "Watch left, right, and mid converge after each step. Compare step count to brute force."}
        </p>
        <pre className="state-preview">{statePreview}</pre>

        <div className="legend">
          <p className="legend-title">Legend</p>
          <div className="legend-item">
            <div className="legend-box legend-default"></div>
            <span>{isLinear ? "Not yet checked" : "In search space"}</span>
          </div>
          <div className="legend-item">
            <div className="legend-box legend-mid"></div>
            <span>{isLinear ? "Current check" : "Current mid"}</span>
          </div>
          <div className="legend-item">
            <div className="legend-box legend-found"></div>
            <span>Found</span>
          </div>
          <div className="legend-item">
            <div className="legend-box legend-eliminated"></div>
            <span>{isLinear ? "Already checked" : "Eliminated"}</span>
          </div>
        </div>

        {searchState.history.length > 0 && (
          <div className="history-section">
            <p className="history-title">
              Step History
              <span className="history-count">{searchState.step} step{searchState.step !== 1 ? "s" : ""}</span>
            </p>
            <div className="history-list">
              {searchState.history.map((entry) => (
                <div
                  key={entry.step}
                  className={`history-row ${
                    entry.status === "found" ? "history-row-found"
                    : entry.status === "not-found" ? "history-row-not-found"
                    : ""
                  }`}
                >
                  <span className="history-step">#{entry.step}</span>
                  {!isLinear && (
                    <span className="history-space">[{entry.left}..{entry.right}]</span>
                  )}
                  <span className="history-decision">{entry.decision}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </main>
  );
}
