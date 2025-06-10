import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import SimpleLoading from "./SimpleLoading";

describe("SimpleLoading", () => {
  it("renders loading text with correct style", () => {
    render(<SimpleLoading />);
    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveStyle("color: #FFF");
  });
});
