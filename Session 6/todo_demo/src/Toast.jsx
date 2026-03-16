import { useState, useEffect, useCallback } from "react";
import "./Toast.css";

let showToastGlobal = () => {};

export function toast(message, type = "error") {
  showToastGlobal(message, type);
}

export default function Toast() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error");

  const dismiss = useCallback(() => {
    setLeaving(true);
    setTimeout(() => {
      setVisible(false);
      setLeaving(false);
    }, 300);
  }, []);

  const show = useCallback(
    (msg, toastType) => {
      setMessage(msg);
      setType(toastType);
      setLeaving(false);
      setVisible(true);
    },
    []
  );

  useEffect(() => {
    showToastGlobal = show;
  }, [show]);

  useEffect(() => {
    if (!visible || leaving) return;
    const timer = setTimeout(dismiss, 3000);
    return () => clearTimeout(timer);
  }, [visible, leaving, dismiss]);

  if (!visible) return null;

  const icon =
    type === "success" ? "✓" : type === "info" ? "i" : "!";

  return (
    <div className="toast-overlay" onClick={dismiss}>
      <div
        className={`toast-box toast-${type} ${leaving ? "toast-leave" : "toast-enter"}`}
        onClick={(e) => e.stopPropagation()}
        role="alert"
      >
        <span className="toast-icon">{icon}</span>
        <p className="toast-message">{message}</p>
      </div>
    </div>
  );
}
