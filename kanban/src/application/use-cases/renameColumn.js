export const renameColumn = ({ columns, columnId, nextTitle }) => {
    const title = nextTitle.trim().toUpperCase();

    if (!title) {
        return {
            columns,
            didRename: false,
        };
    }

    return {
        columns: columns.map((column) =>
            column.id === columnId ? { ...column, title } : column,
        ),
        didRename: true,
    };
};
