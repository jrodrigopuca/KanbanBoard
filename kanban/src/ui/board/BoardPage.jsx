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
            columnPendingClear={viewModel.columnPendingClear}
            selectedTask={viewModel.selectedTask}
            toast={viewModel.toast}
            setNewColumnInput={viewModel.setNewColumnInput}
            setNewTaskInput={viewModel.setNewTaskInput}
            onUpdateTask={viewModel.handleUpdateTask}
            onDeleteTask={viewModel.handleDeleteTask}
            onDragEnd={viewModel.handleDragEnd}
            onAddTask={viewModel.handleAddTask}
            onAddColumn={viewModel.handleAddColumn}
            onRenameColumn={viewModel.handleRenameColumn}
            onRequestDeleteColumn={viewModel.handleRequestDeleteColumn}
            onRequestClearColumn={viewModel.handleRequestClearColumn}
            onCloseDeleteModal={viewModel.handleCloseDeleteModal}
            onConfirmDeleteColumn={viewModel.handleConfirmDeleteColumn}
            onCloseClearModal={viewModel.handleCloseClearModal}
            onConfirmClearColumn={viewModel.handleConfirmClearColumn}
            onRestoreDefaultBoard={viewModel.handleRestoreDefaultBoard}
            onOpenTaskDetails={viewModel.handleOpenTaskDetails}
            onCloseTaskDetails={viewModel.handleCloseTaskDetails}
            onExportJson={viewModel.handleExportJson}
            onExportCsv={viewModel.handleExportCsv}
            onDismissToast={viewModel.handleDismissToast}
            onUndoToast={viewModel.handleUndoToast}
        />
    );
};

export default BoardPage;
