import { createTaskModel } from "../../domain/models/task";
import { getDefaultStoryPoints } from "../../domain/services/storyPoints";

export const createTask = ({
    columns,
    title,
    createId,
    now = () => Date.now(),
}) => {
    const nextTitle = title.trim();

    if (!nextTitle || !columns.length) {
        return columns;
    }

    const newTask = createTaskModel({
        id: createId(),
        title: nextTitle,
        date: now(),
        points: getDefaultStoryPoints(),
        subtasks: [],
    });

    return columns.map((column, index) =>
        index === 0 ? { ...column, tasks: [...column.tasks, newTask] } : column,
    );
};
