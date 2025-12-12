// src/components/BoardView.jsx
import React from "react";
import EditIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function BoardView({
  board,
  onBack,
  onEditBoard,
  onDeleteBoard,
  onEditList,
  onDeleteList,
  onAddList,
  onAddCard,
  onEditCard,
  onDeleteCard,
  openModal
}) {
  if (!board) return null;

  return (
    <>
      <div className="top-bar">
        <button className="backBtn" onClick={onBack}>⬅ Back</button>
        <div className="topBarCenter">
          <h2 className="boardTitleInline">{board.name}</h2>
        </div>

        <div className="boardTopActions">
          <button onClick={onEditBoard}>Edit Board</button>
          <button onClick={onDeleteBoard}>Delete Board</button>
        </div>
      </div>

      <div className="lists-wrapper">
        <div className="lists-row">
          {board.lists.map((list, listIndex) => (
            <div
              key={listIndex}
              className="list"
              style={{
                backgroundColor: list.color?.bg,
                border: `2px solid ${list.color?.border}`,
                color: list.color?.text,
              }}
            >
              <div className="listHeader">
                <h3 className="listTitle">{list.name}</h3>

                <div className="listActions">
                  <button
                    className="iconBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal("Edit List", (val) => onEditList(listIndex, val), list.name);
                    }}
                    aria-label="Edit list"
                  >
                    <EditIcon />
                  </button>

                  <button
                    className="iconBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteList(listIndex);
                    }}
                    aria-label="Delete list"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </div>

              <div className="cardsContainer">
                {list.cards.map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="card"
                    style={{
                      backgroundColor: card.color?.bg,
                      border: `1px solid ${card.color?.border}`,
                      color: card.color?.text,
                    }}
                  >
                    <div className="cardContent">{card.name}</div>
                    <div className="cardActions">
                      <button
                        className="iconBtn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal("Edit Card", (val) => onEditCard(listIndex, cardIndex, val), card.name);
                        }}
                        aria-label="Edit card"
                      >
                        <EditIcon />
                      </button>

                      <button
                        className="iconBtn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteCard(listIndex, cardIndex);
                        }}
                        aria-label="Delete card"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="addCardFloating" onClick={() => openModal("Add Card", (val) => onAddCard(listIndex, val))}>
                +
              </button>
            </div>
          ))}

          <button className="addListFloating" onClick={() => openModal("Add List", (val) => onAddList(val))}>
            + Add List
          </button>
        </div>
      </div>
    </>
  );
}
