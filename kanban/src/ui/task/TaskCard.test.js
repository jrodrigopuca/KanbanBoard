import { describe, expect, test } from "vitest";
import { getTaskCardStyle } from "./TaskCard";

describe("getTaskCardStyle", () => {
    test("preserves the draggable transform and appends the visual drag treatment", () => {
        const style = {
            transform: "translate(24px, 48px)",
            transition: "transform 0.2s ease",
        };

        expect(getTaskCardStyle(style, true)).toEqual({
            ...style,
            transform: "translate(24px, 48px) rotate(1deg) scale(1.01)",
            zIndex: 6,
        });
    });

    test("returns the original style when the card is not being dragged", () => {
        const style = {
            transform: "translate(0px, 0px)",
        };

        expect(getTaskCardStyle(style, false)).toBe(style);
    });
});
