export const createBrowserId = () =>
    window.crypto?.randomUUID?.() ??
    `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
