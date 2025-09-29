import ReactDOM from "react-dom";
import React from "react";

export default function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = "Conferma",
}) {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div>
      <h4>{title}</h4>
      <p>{content}</p>
      <div>
        <button onClick={onClose}>Annulla</button>
        <button onClick={onConfirm}>Conferma</button>
      </div>
    </div>,
    document.body
  );
}
