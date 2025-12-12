import React, { useState, useEffect, useRef, useCallback } from "react";
import "../css/Dashboard.css";

import { generatePalette } from "../utils/generatePalette";
import useLocalStorageState from "../hooks/useLocalStorageState";

import Modal from "../components/Modal";
import BoardsGrid from "../components/BoardsGrid";
import BoardView from "../components/BoardView";

export default function Dashboard() {
  const loggedInUser = localStorage.getItem("loggedInUser") || "";
  const [user] = useState(loggedInUser);
  const [boards, setBoards] = useLocalStorageState(`boardsData_${user}`, []);
  const [selectedBoardIndex, setSelectedBoardIndex] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalLabel, setModalLabel] = useState("");
  const [modalValue, setModalValue] = useState("");
  const [modalError, setModalError] = useState("");
  const actionRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Keeping this in case you want to add mount-time logic later.
  }, []);

  useEffect(() => {
    if (modalOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    }
  }, [modalOpen]);

  const openModal = useCallback((label, actionFunc, initialValue = "") => {
    setModalLabel(label);
    setModalValue(initialValue);
    setModalError("");
    actionRef.current = actionFunc;
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    actionRef.current = null;
    setModalValue("");
    setModalLabel("");
    setModalError("");
  }, []);

  const submitModal = useCallback(() => {
    const trimmed = modalValue.trim();
    if (trimmed === "") {
      setModalError("Name cannot be empty");
      return;
    }

    if (typeof actionRef.current === "function") {
      try {
        actionRef.current(trimmed);
      } catch (err) {
        console.error("modal action error:", err);
        setModalError("An error occurred. Please try again.");
        return;
      }
    }

    closeModal();
  }, [modalValue, closeModal]);

  const addBoard = useCallback((name) => {
    setBoards((prev) => [...prev, { name, color: generatePalette(), lists: [] }]);
  }, [setBoards]);

  const editBoard = useCallback((boardIndex, name) => {
    setBoards((prev) => {
      const copy = [...prev];
      if (!copy[boardIndex]) return prev;
      copy[boardIndex] = { ...copy[boardIndex], name };
      return copy;
    });
  }, [setBoards]);

  const deleteBoard = useCallback((boardIndex) => {
    if (!window.confirm("Delete this board? This will remove all lists and cards.")) return;
    setBoards((prev) => {
      const copy = [...prev];
      copy.splice(boardIndex, 1);
      return copy;
    });

    setSelectedBoardIndex((i) => {
      if (i === boardIndex) return null;
      if (i > boardIndex) return i - 1;
      return i;
    });
  }, [setBoards]);

  const addList = useCallback((boardIndex, name) => {
    setBoards((prev) => {
      const copy = [...prev];
      const board = { ...copy[boardIndex] };
      board.lists = [...(board.lists || []), { name, color: generatePalette(), cards: [] }];
      copy[boardIndex] = board;
      return copy;
    });
  }, [setBoards]);

  const editList = useCallback((boardIndex, listIndex, name) => {
    setBoards((prev) => {
      const copy = [...prev];
      const board = { ...copy[boardIndex] };
      board.lists = [...(board.lists || [])];
      board.lists[listIndex] = { ...board.lists[listIndex], name };
      copy[boardIndex] = board;
      return copy;
    });
  }, [setBoards]);

  const deleteList = useCallback((boardIndex, listIndex) => {
    setBoards((prev) => {
      const copy = [...prev];
      const board = copy[boardIndex];
      if (!board) return prev;
      const lists = [...(board.lists || [])];
      if (!lists[listIndex]) return prev;
      const list = lists[listIndex];
      const cardCount = Array.isArray(list.cards) ? list.cards.length : 0;
      if (cardCount > 0) {
        window.alert("Cannot delete a list that contains cards. Remove all cards first.");
        return prev;
      }
      if (!window.confirm("Delete this list?")) return prev;
      const newLists = lists.filter((_, i) => i !== listIndex);
      copy[boardIndex] = { ...board, lists: newLists };
      return copy;
    });
  }, [setBoards]);

  const addCard = useCallback((boardIndex, listIndex, name) => {
    setBoards((prev) => {
      const copy = [...prev];
      const board = { ...copy[boardIndex] };
      const lists = [...(board.lists || [])];
      const list = { ...lists[listIndex] };
      list.cards = [...(list.cards || []), { name, color: generatePalette() }];
      lists[listIndex] = list;
      board.lists = lists;
      copy[boardIndex] = board;
      return copy;
    });
  }, [setBoards]);

  const editCard = useCallback((boardIndex, listIndex, cardIndex, name) => {
    setBoards((prev) => {
      const copy = [...prev];
      const board = { ...copy[boardIndex] };
      const lists = [...(board.lists || [])];
      const list = { ...lists[listIndex] };
      list.cards = [...(list.cards || [])];
      list.cards[cardIndex] = { ...list.cards[cardIndex], name };
      lists[listIndex] = list;
      board.lists = lists;
      copy[boardIndex] = board;
      return copy;
    });
  }, [setBoards]);

  const deleteCard = useCallback((boardIndex, listIndex, cardIndex) => {
    if (!window.confirm("Delete this card?")) return;
    setBoards((prev) => {
      const copy = [...prev];
      const board = { ...copy[boardIndex] };
      const lists = [...(board.lists || [])];
      const list = { ...lists[listIndex] };
      list.cards = [...(list.cards || [])];
      list.cards.splice(cardIndex, 1);
      lists[listIndex] = list;
      board.lists = lists;
      copy[boardIndex] = board;
      return copy;
    });
  }, [setBoards]);

  const onSelectBoard = useCallback((i) => setSelectedBoardIndex(i), []);
  const onAddBoardClick = useCallback(() => openModal("Add New Board", (val) => addBoard(val)), [openModal, addBoard]);

  const openBoard = useCallback((index) => {
    if (index == null) return;
    setSelectedBoardIndex(index);
  }, []);

  return (
    <div className="dashboard">
      <Modal
        ref={inputRef}
        open={modalOpen}
        label={modalLabel}
        value={modalValue}
        onChange={(v) => { setModalValue(v); if (modalError) setModalError(""); }}
        onCancel={closeModal}
        onSave={submitModal}
        error={modalError}
      />

      {selectedBoardIndex === null ? (
        <BoardsGrid
          boards={boards}
          onSelect={onSelectBoard}
          onEdit={(i) => openModal("Edit Board", (val) => editBoard(i, val), boards[i]?.name || "")}
          onDelete={deleteBoard}
          onAdd={onAddBoardClick}
          onDoubleClick={openBoard}
        />
      ) : (
        boards[selectedBoardIndex] && (
          <BoardView
            board={boards[selectedBoardIndex]}
            onBack={() => setSelectedBoardIndex(null)}
            onEditBoard={() => openModal("Edit Board", (val) => editBoard(selectedBoardIndex, val), boards[selectedBoardIndex]?.name || "")}
            onDeleteBoard={() => deleteBoard(selectedBoardIndex)}
            onEditList={(listIndex, name) => editList(selectedBoardIndex, listIndex, name)}
            onDeleteList={(listIndex) => deleteList(selectedBoardIndex, listIndex)}
            onAddList={(name) => addList(selectedBoardIndex, name)}
            onAddCard={(listIndex, name) => addCard(selectedBoardIndex, listIndex, name)}
            onEditCard={(listIndex, cardIndex, name) => editCard(selectedBoardIndex, listIndex, cardIndex, name)}
            onDeleteCard={(listIndex, cardIndex) => deleteCard(selectedBoardIndex, listIndex, cardIndex)}
            openModal={(label, action, initial = "") => openModal(label, action, initial)}
          />
        )
      )}
    </div>
  );
}
