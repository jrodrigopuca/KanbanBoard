import BoardView from "./BoardView";
import { useBoardViewModel } from "./useBoardViewModel";

const BoardPage = () => {
    const viewModel = useBoardViewModel();

    return (
        <BoardView
            columns={viewModel.columns}
            newColumnInput={viewModel.newColumnInput}
            newTaskInput={viewModel.newTaskInput}
            columnPendingDelete={viewModel.columnPendingDelete}
            selectedTask={viewModel.selectedTask}
            setNewColumnInput={viewModel.setNewColumnInput}
            setNewTaskInput={viewModel.setNewTaskInput}
            onUpdateTask={viewModel.handleUpdateTask}
            onDeleteTask={viewModel.handleDeleteTask}
            onDragEnd={viewModel.handleDragEnd}
            onAddTask={viewModel.handleAddTask}
            onAddColumn={viewModel.handleAddColumn}
            onRenameColumn={viewModel.handleRenameColumn}
            onRequestDeleteColumn={viewModel.handleRequestDeleteColumn}
            onCloseDeleteModal={viewModel.handleCloseDeleteModal}
            onConfirmDeleteColumn={viewModel.handleConfirmDeleteColumn}
            onRestoreDefaultBoard={viewModel.handleRestoreDefaultBoard}
            onOpenTaskDetails={viewModel.handleOpenTaskDetails}
            onCloseTaskDetails={viewModel.handleCloseTaskDetails}
            onExportJson={viewModel.handleExportJson}
            onExportCsv={viewModel.handleExportCsv}
        />
    );
};

export default BoardPage;
