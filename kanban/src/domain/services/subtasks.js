import { createSubtaskModel } from "../models/subtask";

export const normalizeSubtasks = (subtasks = []) => {
    if (!Array.isArray(subtasks)) {
        return [];
    }

    return subtasks
        .map((subtask, index) => {
            if (typeof subtask === "string") {
                const title = subtask.trim();

                return title
                    ? createSubtaskModel({
                          id: `legacy-subtask-${index}`,
                          title,
                      })
                    : null;
            }

            if (!subtask || typeof subtask !== "object") {
                return null;
            }

            const title = `${subtask.title || ""}`.trim();

            if (!title) {
                return null;
            }

            return createSubtaskModel({
                id: subtask.id || `subtask-${index}`,
                title,
                completed: subtask.completed,
            });
        })
        .filter(Boolean);
};

export const getSubtaskProgress = (subtasks = []) => {
    const normalizedSubtasks = normalizeSubtasks(subtasks);
    const completedCount = normalizedSubtasks.filter(
        (subtask) => subtask.completed,
    ).length;

    return {
        total: normalizedSubtasks.length,
        completed: completedCount,
    };
};
