import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, RenderResult, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import CardButtonAction from "./CardButtonAction";

vi.mock("./styles", () => ({
  CardButtonActionStyled: ({ children, ...props }: any) => (
    <button {...props} data-testid="mock-card-button-action">
      {children}
    </button>
  ),
}));

describe("CardButtonAction", () => {
  let component: RenderResult;
          
  beforeAll(() => {
    component = render(<CardButtonAction>Click me</CardButtonAction>);
  });

  it("renders children correctly", () => {
    expect(component.container).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("passes props to the styled button", () => {
    component.rerender(<CardButtonAction type="primary" disabled>Submit</CardButtonAction>);
    const button = screen.getByTestId("mock-card-button-action");
    expect(button).toHaveAttribute("type", "primary");
    expect(button).toBeDisabled();
  });
});
