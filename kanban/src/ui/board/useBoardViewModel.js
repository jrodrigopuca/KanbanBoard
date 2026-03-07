import { useEffect, useState } from "react";
import { createColumn } from "../../application/use-cases/createColumn";
import { createTask } from "../../application/use-cases/createTask";
import { deleteColumn } from "../../application/use-cases/deleteColumn";
import { deleteTask } from "../../application/use-cases/deleteTask";
import {
    exportBoardAsCsv,
    exportBoardAsJson,
} from "../../application/use-cases/exportBoard";
import { loadBoard } from "../../application/use-cases/loadBoard";
import { moveTask } from "../../application/use-cases/moveTask";
import { renameColumn } from "../../application/use-cases/renameColumn";
import { saveBoard } from "../../application/use-cases/saveBoard";
import { updateTask } from "../../application/use-cases/updateTask";
import { createDefaultColumns } from "../../domain/models/board";
import { createBrowserId } from "../../domain/services/idGenerator";
import { triggerFileDownload } from "../../infrastructure/export/downloadFile";
import { createLocalStorageBoardRepository } from "../../infrastructure/persistence/localStorageBoardRepository";

const boardRepository = createLocalStorageBoardRepository({
    storage: typeof window === "undefined" ? null : window.localStorage,
});

const createInitialColumns = () =>
    createDefaultColumns({ createId: createBrowserId });

const initColumns = () =>
    loadBoard({
        boardRepository,
        createDefaultColumns: createInitialColumns,
    });

export const useBoardViewModel = () => {
    const [columns, setColumns] = useState(initColumns);
    const [newColumnInput, setNewColumnInput] = useState("");
    const [newTaskInput, setNewTaskInput] = useState("");
    const [columnPendingDelete, setColumnPendingDelete] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        saveBoard({
            boardRepository,
            columns,
        });
    }, [columns]);

    const handleUpdateTask = (taskId, content) => {
        setColumns((currentColumns) =>
            updateTask({
                columns: currentColumns,
                taskId,
                content,
            }),
        );
    };

    const showToast = ({ message, previousColumns = null }) => {
        setToast({
            id: Date.now(),
            message,
            previousColumns,
        });
    };

    const handleDeleteTask = (taskId) => {
        const taskToDelete = columns
            .flatMap((column) => column.tasks)
            .find((task) => task.id === taskId);

        setColumns(
            deleteTask({
                columns,
                taskId,
            }),
        );

        if (taskToDelete) {
            showToast({
                message: `Task ${taskToDelete.title} deleted.`,
                previousColumns: columns,
            });
        }

        if (selectedTaskId === taskId) {
            setSelectedTaskId(null);
        }
    };

    const handleDragEnd = (result) => {
        setColumns((currentColumns) =>
            moveTask({
                columns: currentColumns,
                result,
            }),
        );
    };

    const handleAddTask = () => {
        if (!newTaskInput.trim()) {
            return;
        }

        setColumns((currentColumns) =>
            createTask({
                columns: currentColumns,
                title: newTaskInput,
                createId: createBrowserId,
            }),
        );
        setNewTaskInput("");
    };

    const handleAddColumn = () => {
        if (!newColumnInput.trim()) {
            return;
        }

        setColumns((currentColumns) =>
            createColumn({
                columns: currentColumns,
                title: newColumnInput,
                createId: createBrowserId,
            }),
        );
        setNewColumnInput("");
    };

    const handleRenameColumn = (columnId, nextTitle) => {
        const result = renameColumn({
            columns,
            columnId,
            nextTitle,
        });

        if (!result.didRename) {
            return false;
        }

        setColumns(result.columns);

        return result.didRename;
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

        const deletedColumn = columns.find(
            (column) => column.id === columnPendingDelete.id,
        );

        setColumns(
            deleteColumn({
                columns,
                columnId: columnPendingDelete.id,
            }),
        );
        setColumnPendingDelete(null);

        if (deletedColumn) {
            showToast({
                message: `Column ${deletedColumn.title} deleted.`,
                previousColumns: columns,
            });
        }
    };

    const handleRestoreDefaultBoard = () => {
        setColumns(createInitialColumns());
        setColumnPendingDelete(null);
        setSelectedTaskId(null);
        setToast(null);
    };

    const handleOpenTaskDetails = (taskId) => {
        setSelectedTaskId(taskId);
    };

    const handleCloseTaskDetails = () => {
        setSelectedTaskId(null);
    };

    const handleExportJson = () => {
        triggerFileDownload({
            content: exportBoardAsJson({ columns }),
            fileName: "kanban-board.json",
            mimeType: "application/json;charset=utf-8",
        });

        showToast({
            message: "Board exported as JSON.",
        });
    };

    const handleExportCsv = () => {
        triggerFileDownload({
            content: exportBoardAsCsv({ columns }),
            fileName: "kanban-board.csv",
            mimeType: "text/csv;charset=utf-8",
        });

        showToast({
            message: "Board exported as CSV.",
        });
    };

    const handleDismissToast = () => {
        setToast(null);
    };

    const handleUndoToast = () => {
        if (!toast?.previousColumns) {
            setToast(null);
            return;
        }

        setColumns(toast.previousColumns);
        setToast(null);
    };

    const selectedTask = columns
        .flatMap((column) =>
            column.tasks.map((task) => ({
                ...task,
                columnId: column.id,
                columnTitle: column.title,
            })),
        )
        .find((task) => task.id === selectedTaskId);

    return {
        columns,
        newColumnInput,
        newTaskInput,
        columnPendingDelete,
        selectedTask,
        toast,
        setNewColumnInput,
        setNewTaskInput,
        handleUpdateTask,
        handleDeleteTask,
        handleDragEnd,
        handleAddTask,
        handleAddColumn,
        handleRenameColumn,
        handleRequestDeleteColumn,
        handleCloseDeleteModal,
        handleConfirmDeleteColumn,
        handleRestoreDefaultBoard,
        handleOpenTaskDetails,
        handleCloseTaskDetails,
        handleExportJson,
        handleExportCsv,
        handleDismissToast,
        handleUndoToast,
    };
};
