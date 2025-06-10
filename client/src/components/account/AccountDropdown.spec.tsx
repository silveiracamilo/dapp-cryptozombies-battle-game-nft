import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, RenderResult, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import AccountDropdown from "./AccountDropdown";

vi.mock("@/context/auth/AuthContextProvider", () => ({
  useAuthContext: () => ({
    address: "0x1234567890abcdef",
  }),
}));

vi.mock("@/utils/formatter", () => ({
  addressFormat: (address: string) => `formatted-${address}`,
}));

describe("AccountDropdown", () => {
  let component: RenderResult;
          
  beforeAll(() => {
    component = render(<AccountDropdown />);
  });

  it("renders formatted address with wallet icon", () => {
    expect(component.container).toBeInTheDocument();
    expect(screen.getByText("formatted-0x1234567890abcdef")).toBeInTheDocument();
    const icon = screen.getByRole("img", { hidden: true });
    expect(icon).toBeInTheDocument();
  });

  it("renders Dropdown with empty menu items", () => {
    const dropdownButton = screen.queryByRole("button");
    expect(dropdownButton).not.toBeInTheDocument();
  });
});
