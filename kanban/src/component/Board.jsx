import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import ColumnComponent from "./Column";
import "./styles.css";

const STORAGE_KEY = "localColumns";
const createId = () =>
  window.crypto?.randomUUID?.() ??
  `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const createDefaultColumns = () => [
  {
    id: createId(),
    title: "TO DO",
    tasks: [
      { id: createId(), title: "Hello", date: Date.now(), points: 1 },
      { id: createId(), title: "World", date: Date.now(), points: 1 },
    ],
  },
  {
    id: createId(),
    title: "PROGRESS",
    tasks: [],
  },
  {
    id: createId(),
    title: "TEST",
    tasks: [],
  },
  {
    id: createId(),
    title: "DONE",
    tasks: [],
  },
];

// inicializa columnas
const initColumns = () => {
  try {
    const savedColumns = localStorage.getItem(STORAGE_KEY);

    if (savedColumns) {
      const parsedColumns = JSON.parse(savedColumns);

      if (Array.isArray(parsedColumns)) {
        return parsedColumns;
      }
    }
  } catch (error) {
    console.error("Unable to load board data from localStorage.", error);
  }

  return createDefaultColumns();
};

const Board = () => {
  const [columns, setColumns] = useState(initColumns);
  const [newColumnInput, setNewColumnInput] = useState("");
  const [newTaskInput, setNewTaskInput] = useState("");
  const [columnPendingDelete, setColumnPendingDelete] = useState(null);

  // guardar columnas ante un cambio
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
    } catch (error) {
      console.error("Unable to save board data to localStorage.", error);
    }
  }, [columns]);

  const taskFunctions = {
    onEdit: (id, {...content})=>{
      const updatedColumns = columns.map(column => ({
        ...column,
        tasks: column.tasks.map(task => {
          if (task.id === id) {
            return {
              ...task,
              ...content
            };
          }
          return task;
        })
      }));
      setColumns(updatedColumns);
    },
    onDelete: (id)=>{
      const updatedColumns = columns.map(column => ({
        ...column,
        tasks: column.tasks.filter(task => task.id !== id)
      }));
      setColumns(updatedColumns);
    }
  }


  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const newColumns = columns.map((column) => ({
      ...column,
      tasks: [...column.tasks],
    }));

    const sourceColumn = newColumns.find((col) => col.id === source.droppableId);
    const destinationColumn = newColumns.find(
      (col) => col.id === destination.droppableId
    );

    if (!sourceColumn || !destinationColumn) {
      return;
    }

    const [movedTask] = sourceColumn.tasks.splice(source.index, 1);

    if (!movedTask) {
      return;
    }

    const updatedTask = {
      ...movedTask,
      date: Date.now(),
    };

    destinationColumn.tasks.splice(destination.index, 0, updatedTask);

    setColumns(newColumns);
  };

  const handleAddTask = () => {
    const title = newTaskInput.trim();

    if (!title || !columns.length) {
      return;
    }

    const newTask = { title, id: createId(), date: Date.now(), points: 1 };

    setColumns((currentColumns) =>
      currentColumns.map((column, index) =>
        index === 0
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
    setNewTaskInput("");
  };

  const handleAddColumn = () => {
    const title = newColumnInput.trim().toUpperCase();

    if (!title) {
      return;
    }

    const newColumn = { title, id: createId(), tasks: [] };

    setColumns((currentColumns) => [...currentColumns, newColumn]);
    setNewColumnInput("");
  };

  const handleRenameColumn = (columnId, nextTitle) => {
    const title = nextTitle.trim().toUpperCase();

    if (!title) {
      return false;
    }

    setColumns((currentColumns) =>
      currentColumns.map((column) =>
        column.id === columnId ? { ...column, title } : column
      )
    );

    return true;
  };

  const handleRequestDeleteColumn = (columnId) => {
    const columnToDelete = columns.find((column) => column.id === columnId);

    if (!columnToDelete || columns.length <= 1) {
      return;
    }

    setColumnPendingDelete({
      id: columnToDelete.id,
      title: columnToDelete.title,
      taskCount: columnToDelete.tasks.length,
    });
  };

  const handleCloseDeleteModal = () => {
    setColumnPendingDelete(null);
  };

  const handleConfirmDeleteColumn = () => {
    if (!columnPendingDelete) {
      return;
    }

    setColumns((currentColumns) =>
      currentColumns.filter((column) => column.id !== columnPendingDelete.id)
    );
    setColumnPendingDelete(null);
  };

  return (
    <>
      <div className="kanban-title">Kanban Board</div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-board">
          {columns.map((column) => (
            <ColumnComponent
              {...column}
              key={column.id}
              canDeleteColumn={columns.length > 1}
              onDeleteColumn={handleRequestDeleteColumn}
              onRenameColumn={handleRenameColumn}
              taskFunctions={taskFunctions}
            />
          ))}
        </div>
      </DragDropContext>

      <div className="form-board">
        <div className="add-task">
          <input
            className="input-add"
            type="text"
            placeholder="New Task"
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTask();
              }
            }}
          />
          <button className="action-button" disabled={!newTaskInput} onClick={handleAddTask}>+T</button>
        </div>

        <div className="add-column">
          <input
            type="text"
            className="input-add"
            placeholder="New Column"
            value={newColumnInput}
            onChange={(e) => setNewColumnInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddColumn();
              }
            }}
          />
          <button className="action-button" disabled={!newColumnInput}  onClick={handleAddColumn}>+C</button>
        </div>
      </div>

      {columnPendingDelete && (
        <div className="modal-overlay" role="presentation">
          <div
            aria-labelledby="delete-column-title"
            aria-modal="true"
            className="confirmation-modal"
            role="dialog"
          >
            <h2 id="delete-column-title">Delete column {columnPendingDelete.title}?</h2>
            <p>
              This action will remove the column and permanently delete all its
              cards ({columnPendingDelete.taskCount}).
            </p>
            <div className="modal-actions">
              <button className="action-button" onClick={handleCloseDeleteModal} type="button">
                Cancel
              </button>
              <button className="action-button danger-button" onClick={handleConfirmDeleteColumn} type="button">
                Delete column
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Board;
