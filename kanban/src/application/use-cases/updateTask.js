export const updateTask = ({ columns, taskId, content }) =>
    columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
            task.id === taskId
                ? {
                      ...task,
                      ...content,
                  }
                : task,
        ),
    }));
