import React from "react";
import EditIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";

function BoardCard({ board, index, onSelect, onEdit, onDelete, onDoubleClick }) {
  if (!board) return null;

  const handleClick = () => {
    if (onSelect) onSelect(index);
  };

  const handleDoubleClick = (e) => {
    e.preventDefault();
    if (onDoubleClick) onDoubleClick(index);
  };

  return (
    <div
      className="board"
      data-board-index={index}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={(e) => {  
        if (e.key === "Enter") handleClick();
        if (e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          if (onDoubleClick) onDoubleClick(index);
        }
      }}
      style={{
        backgroundColor: board.color?.bg,
        border: `2px solid ${board.color?.border}`,
        color: board.color?.text,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderRadius: 8,
        cursor: "pointer",
        minHeight: 72,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{
          fontWeight: 700,
          fontSize: 16,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
        }}>
          {board.name || "Untitled Board"}
        </div>
        
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button
          className="iconBtn"
          onClick={(e) => {
            e.stopPropagation();
            if (onEdit) onEdit(index);
          }}
          aria-label={`Edit board ${board.name || index}`}
          title="Edit"
        >
          <EditIcon />
        </button>

        <button
          className="iconBtn"
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete(index);
          }}
          aria-label={`Delete board ${board.name || index}`}
          title="Delete"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default React.memo(BoardCard);
