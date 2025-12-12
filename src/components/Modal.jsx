import React, { forwardRef } from "react";
import "../css/Dashboard.css";

const Modal = forwardRef(({ open, label, value, onChange, onCancel, onSave, error }, ref) => {
  if (!open) return null;

  return (
    <div className="modalOverlay" onMouseDown={onCancel}>
      <div className="modalBox" onMouseDown={(e) => e.stopPropagation()}>
        <h3>{label}</h3>

        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter name..."
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave();
            if (e.key === "Escape") onCancel();
          }}
        />

        {error && <div className="modalError">{error}</div>}

        <div className="modalBtns">
          <button onClick={onCancel} className="cancelBtn">Cancel</button>
          <button onClick={onSave} className="saveBtn">Save</button>
        </div>
      </div>
    </div>
  );
});

export default React.memo(Modal);
