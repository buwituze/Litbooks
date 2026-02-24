import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDebounce } from "../hooks/useDebounce";

describe("useDebounce", () => {
  it("should debounce value changes", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } },
    );

    expect(result.current).toBe("initial");

    // Change value
    rerender({ value: "updated", delay: 500 });

    // Value should not change immediately
    expect(result.current).toBe("initial");

    // Wait for debounce delay
    await waitFor(() => expect(result.current).toBe("updated"), {
      timeout: 600,
    });
  });
});
