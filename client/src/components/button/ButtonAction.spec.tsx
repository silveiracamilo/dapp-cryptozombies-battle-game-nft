import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, RenderResult, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import ButtonAction from "./ButtonAction";

vi.mock("./styles", () => ({
  ButtonActionStyled: ({ children, ...props }: any) => (
    <button {...props} data-testid="mock-button-action">
      {children}
    </button>
  ),
}));

describe("ButtonAction", () => {
  let component: RenderResult;
          
  beforeAll(() => {
    component = render(<ButtonAction>Click me</ButtonAction>);
  });

  it("renders children correctly", () => {
    expect(component.container).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("passes props to the styled button", () => {
    component.rerender(<ButtonAction type="link" disabled>Submit</ButtonAction>);
    const button = screen.getByTestId("mock-button-action");
    expect(button).toHaveAttribute("type", "link");
    expect(button).toBeDisabled();
  });
});
