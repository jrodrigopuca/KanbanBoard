export const DEFAULT_PRIORITY = "medium";

export const TASK_PRIORITY_OPTIONS = [
    { value: "low", label: "Low priority" },
    { value: "medium", label: "Medium priority" },
    { value: "high", label: "High priority" },
];

export const normalizePriority = (priority = DEFAULT_PRIORITY) => {
    const nextPriority = `${priority}`.trim().toLowerCase();

    return TASK_PRIORITY_OPTIONS.some((option) => option.value === nextPriority)
        ? nextPriority
        : DEFAULT_PRIORITY;
};

export const normalizeLabels = (labels = []) => {
    if (Array.isArray(labels)) {
        return labels
            .map((label) => `${label}`.trim())
            .filter(Boolean)
            .filter(
                (label, index, collection) =>
                    collection.indexOf(label) === index,
            );
    }

    return `${labels}`
        .split(",")
        .map((label) => label.trim())
        .filter(Boolean)
        .filter(
            (label, index, collection) => collection.indexOf(label) === index,
        );
};

export const getPriorityLabel = (priority) =>
    TASK_PRIORITY_OPTIONS.find(
        (option) => option.value === normalizePriority(priority),
    )?.label || "Medium priority";
