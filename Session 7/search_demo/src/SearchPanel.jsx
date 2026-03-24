// SearchPanel.jsx
//
// Renders the sorted array as colored boxes and the step controls.
//
// Box color rules:
//   - default (not yet touched): white
//   - eliminated (outside [left, right]): gray
//   - current mid: yellow
//   - found: green

export default function SearchPanel({
  nums,
  searchState,
  mode,
  onStep,
  onMoveBack,
  onReset,
  canMoveBack,
  target,
  targetRaw,
  onTargetChange,
}) {
  const { left, right, mid, status } = searchState;

  const isLinear = mode === "linear";

  function getBoxClass(index) {
    if (isLinear) {
      if (status === "found" && index === mid) return "box box-found";
      if (status === "not-found") return "box box-eliminated";
      if (mid !== null && index === mid) return "box box-mid";
      if (mid !== null && index < mid) return "box box-eliminated"; // already checked
      return "box";
    }
    // binary mode
    if (status === "found" && index === mid) return "box box-found";
    if (status === "not-found") return "box box-eliminated";
    if (mid !== null && index === mid) return "box box-mid";
    if (index < left || index > right) return "box box-eliminated";
    return "box";
  }

  const canStep = status === "idle" || status === "searching";
  const isLocked =
    status === "searching" || status === "found" || status === "not-found";

  return (
    <div className="search-panel-inner">
      <div className="array-row">
        {nums.map((num, index) => (
          <div key={index} className={getBoxClass(index)}>
            <span className="box-value">{num}</span>
            <span className="box-index">{index}</span>
            {mid !== null && index === mid && (
              <span className="box-label">mid</span>
            )}
            {index === left && !["found", "not-found"].includes(status) && (
              <span className="box-pointer box-pointer-left">L</span>
            )}
            {index === right && !["found", "not-found"].includes(status) && (
              <span className="box-pointer box-pointer-right">R</span>
            )}
          </div>
        ))}
      </div>

      <div className="controls">
        <div className="target-row">
          <label className="field-label" htmlFor="target-input">
            Target
          </label>
          {/* type="text" so negative numbers and no leading-zero bug */}
          <input
            id="target-input"
            className="target-input"
            type="text"
            inputMode="numeric"
            value={targetRaw}
            onChange={onTargetChange}
            disabled={isLocked}
            placeholder="e.g. -3"
          />
        </div>

        <div className="button-row">
          <button
            className="primary-button"
            onClick={onStep}
            disabled={!canStep}
          >
            {status === "idle" ? "Start" : "Next Step"}
          </button>
          <button
            className="back-button"
            onClick={onMoveBack}
            disabled={!canMoveBack}
          >
            ← Back
          </button>
          <button className="reset-button" onClick={onReset}>
            Reset
          </button>
        </div>
      </div>

      {status === "found" && (
        <div className="status-message status-found">
          Found {nums[mid]} at index {mid}
        </div>
      )}
      {status === "not-found" && (
        <div className="status-message status-not-found">
          Target {target} not found in array
        </div>
      )}
    </div>
  );
}
