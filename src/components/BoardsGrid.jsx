import React from "react";
import BoardCard from "./BoardCard";

export default function BoardsGrid({
  boards,
  onSelect,
  onEdit,
  onDelete,
  onAdd,
  onDoubleClick, 
}) {
  return (
    <>
      <div className="boardsHeader">
        <button className="addBoardBtn" onClick={onAdd}>+ Add Board</button>
      </div>

      <div className="boards-container">
        {boards.map((b, i) => (
          <BoardCard
            key={i}
            board={b}
            index={i}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
            onDoubleClick={onDoubleClick}
          />
        ))}
      </div>
    </>
  );
}
