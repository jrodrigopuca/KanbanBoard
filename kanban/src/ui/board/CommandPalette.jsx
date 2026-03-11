const CommandPalette = ({
    activeCommandId,
    commands,
    isOpen,
    query,
    onClose,
    onQueryChange,
    onSelectNext,
    onSelectPrevious,
    onSubmit,
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="command-palette-backdrop"
            onClick={onClose}
        >
            <div
                aria-labelledby="command-palette-title"
                aria-modal="true"
                className="command-palette"
                onClick={(event) => event.stopPropagation()}
                role="dialog"
            >
                <div className="command-palette-header">
                    <div>
                        <p className="board-eyebrow">Quick actions</p>
                        <h2 id="command-palette-title">Command palette</h2>
                    </div>
                    <button
                        aria-label="Close command palette"
                        className="action-button subtle-button"
                        onClick={onClose}
                        type="button"
                    >
                        Close
                    </button>
                </div>

                <input
                    aria-label="Search commands"
                    autoFocus
                    aria-activedescendant={activeCommandId || undefined}
                    className="input-add command-palette-input"
                    onChange={(event) => onQueryChange(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "ArrowDown") {
                            event.preventDefault();
                            onSelectNext();
                        }

                        if (event.key === "ArrowUp") {
                            event.preventDefault();
                            onSelectPrevious();
                        }

                        if (event.key === "Enter") {
                            onSubmit();
                        }

                        if (event.key === "Escape") {
                            onClose();
                        }
                    }}
                    placeholder="Search commands or task names"
                    type="text"
                    value={query}
                />

                <div className="command-palette-list" role="listbox">
                    {commands.length > 0 ? (
                        commands.map((command, index) => (
                            <button
                                aria-label={`Run command ${command.label}`}
                                aria-selected={command.id === activeCommandId}
                                className={`command-palette-item ${
                                    command.id === activeCommandId ? "is-primary" : ""
                                }`}
                                id={command.id}
                                key={command.id}
                                onClick={command.action}
                                type="button"
                            >
                                <span className="command-palette-meta">
                                    {command.group}
                                </span>
                                <strong>{command.label}</strong>
                                {command.description && <span>{command.description}</span>}
                            </button>
                        ))
                    ) : (
                        <div className="command-palette-empty" role="status">
                            <p className="board-eyebrow">No matches</p>
                            <p>Try a task name, export action, or board shortcut.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;