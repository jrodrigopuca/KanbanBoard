import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import ColumnComponent from "./Column";
import "./styles.css";

// inicializa columnas
const initColumns = () => {
  const savedColumns = localStorage.getItem("localColumns");
  if (savedColumns) {
    return JSON.parse(savedColumns);
  }
  return [
    {
      id: uuidv4(),
      title: "TO DO",
      tasks: [
        { id: uuidv4(), title: "Hello", date: Date.now(), points: 1 },
        { id: uuidv4(), title: "World", date: Date.now(), points: 1 },
      ],
    },
    {
      id: uuidv4(),
      title: "PROGRESS",
      tasks: [],
    },
    {
      id: uuidv4(),
      title: "TEST",
      tasks: [],
    },
    {
      id: uuidv4(),
      title: "DONE",
      tasks: [],
    },

  ];
};

const Board = () => {
  const [columns, setColumns] = useState(initColumns);
  const [newColumnInput, setNewColumnInput] = useState("");
  const [newTaskInput, setNewTaskInput] = useState("");

  // guardar columnas ante un cambio
  useEffect(() => {
    localStorage.setItem("localColumns", JSON.stringify(columns));
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

    const newColumns = [...columns];

    // Movimiento dentro de la misma columna
    if (source.droppableId === destination.droppableId) {
      const column = newColumns.find((col) => col.id === source.droppableId);
      const [movedTask] = column.tasks.splice(source.index, 1);
      movedTask.date= Date.now();
      column.tasks.splice(destination.index, 0, movedTask);
    } else {
      // Movimiento entre columnas
      const sourceColumn = newColumns.find(
        (col) => col.id === source.droppableId
      );
      const destinationColumn = newColumns.find(
        (col) => col.id === destination.droppableId
      );
      const [movedTask] = sourceColumn.tasks.splice(source.index, 1);
      movedTask.date= Date.now();
      destinationColumn.tasks.splice(destination.index, 0, movedTask);
    }

    setColumns(newColumns);
  };

  const handleAddTask = () => {
    const newColumns = [...columns];
    const newTask = { title: newTaskInput, id: uuidv4(), date: Date.now(), points: 1};
    newColumns[0].tasks.push(newTask); // Agregar tarea a la primera columna
    setColumns(newColumns);
    setNewTaskInput("");
  };

  const handleAddColumn = () => {
    const newColumns = [...columns];
    const newColumn = { title: newColumnInput.toUpperCase(), id: uuidv4(), tasks: [] };
    newColumns.push(newColumn); // Agregar nueva columna
    setColumns(newColumns);
    setNewColumnInput("");
  };

  return (
    <>
      <div className="kanban-title">Kanban Board</div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-board">
          {columns.map((column) => (
            <ColumnComponent {...column} key={column.id} taskFunctions={taskFunctions}/>
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
    </>
  );
};
export default Board;
