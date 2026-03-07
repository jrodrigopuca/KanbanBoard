import {
    DEFAULT_PRIORITY,
    normalizeLabels,
    normalizePriority,
} from "../services/taskMetadata";
import { normalizeSubtasks } from "../services/subtasks";

export const createTaskModel = ({
    id,
    title,
    date,
    points = 1,
    description = "",
    priority = DEFAULT_PRIORITY,
    labels = [],
    subtasks = [],
}) => ({
    id,
    title,
    date,
    points,
    description,
    priority: normalizePriority(priority),
    labels: normalizeLabels(labels),
    subtasks: normalizeSubtasks(subtasks),
});
