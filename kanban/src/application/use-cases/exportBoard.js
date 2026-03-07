import {
    getSubtaskProgress,
    normalizeSubtasks,
} from "../../domain/services/subtasks";
import {
    getPriorityLabel,
    normalizeLabels,
    normalizePriority,
} from "../../domain/services/taskMetadata";

const escapeCsvValue = (value) => {
    const normalizedValue = `${value ?? ""}`;

    if (
        normalizedValue.includes(",") ||
        normalizedValue.includes("\n") ||
        normalizedValue.includes('"')
    ) {
        return `"${normalizedValue.replaceAll('"', '""')}"`;
    }

    return normalizedValue;
};

const flattenBoardTasks = (columns = []) =>
    columns.flatMap((column) =>
        column.tasks.map((task) => {
            const normalizedLabels = normalizeLabels(task.labels);
            const normalizedSubtasks = normalizeSubtasks(task.subtasks);
            const progress = getSubtaskProgress(normalizedSubtasks);
            const priority = normalizePriority(task.priority);

            return {
                columnId: column.id,
                columnTitle: column.title,
                taskId: task.id,
                taskTitle: task.title,
                description: task.description || "",
                priority,
                priorityLabel: getPriorityLabel(priority),
                points: task.points ?? "",
                labels: normalizedLabels.join(" | "),
                subtasksCompleted: progress.completed,
                subtasksTotal: progress.total,
                subtasks: normalizedSubtasks
                    .map(
                        (subtask) =>
                            `${subtask.completed ? "[x]" : "[ ]"} ${subtask.title}`,
                    )
                    .join(" | "),
                updatedAt: task.date ? new Date(task.date).toISOString() : "",
            };
        }),
    );

export const exportBoardAsJson = ({
    columns,
    now = () => new Date().toISOString(),
}) =>
    JSON.stringify(
        {
            exportedAt: now(),
            columns,
        },
        null,
        2,
    );

export const exportBoardAsCsv = ({ columns }) => {
    const rows = flattenBoardTasks(columns);
    const headers = [
        "columnId",
        "columnTitle",
        "taskId",
        "taskTitle",
        "description",
        "priority",
        "priorityLabel",
        "points",
        "labels",
        "subtasksCompleted",
        "subtasksTotal",
        "subtasks",
        "updatedAt",
    ];

    const csvRows = rows.map((row) =>
        headers.map((header) => escapeCsvValue(row[header])).join(","),
    );

    return [headers.join(","), ...csvRows].join("\n");
};
