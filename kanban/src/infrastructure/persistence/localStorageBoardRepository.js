export const STORAGE_KEY = "localColumns";

export const createLocalStorageBoardRepository = ({
    storage,
    storageKey = STORAGE_KEY,
} = {}) => ({
    load() {
        if (!storage) {
            return null;
        }

        const serializedBoard = storage.getItem(storageKey);

        if (!serializedBoard) {
            return null;
        }

        return JSON.parse(serializedBoard);
    },
    save(columns) {
        if (!storage) {
            return;
        }

        storage.setItem(storageKey, JSON.stringify(columns));
    },
});
