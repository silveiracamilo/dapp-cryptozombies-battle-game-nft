import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import About from "./About";

describe("About", () => {
  beforeEach(() => {
    // vi.stubEnv("VITE_CRYPTOZOMBIES_BATTLE_CONTRACT_ADDRESS", "0xBattleAddress");
    // vi.stubEnv("VITE_CRYPTOZOMBIES_BATTLE_RANKING_CONTRACT_ADDRESS", "0xRankingAddress");
    // vi.stubEnv("VITE_CRYPTOZOMBIES_BATTLE_MARKET_CONTRACT_ADDRESS", "0xMarketAddress");
    
    render(<About />);
  });

  it("renders main title and paragraphs", () => {
    expect(screen.getByRole("heading", { level: 2, name: /About the Game/i })).toBeInTheDocument();
    expect(screen.getByText(/This game was born out of a desire for knowledge/i)).toBeInTheDocument();
    expect(screen.getByText(/The project is/i)).toBeInTheDocument();
    expect(screen.getByText(/small fees exist solely to cover server costs/i)).toBeInTheDocument();
  });

  it("renders external links with target _blank", () => {
    const links = screen.getAllByRole("link");
    links.forEach(link => {
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  // it("renders contract addresses as links with correct href", () => {
  //   expect(screen.getByText("0xBattleAddress")).toBeInTheDocument();
  //   expect(screen.getByText("0xRankingAddress")).toBeInTheDocument();
  //   expect(screen.getByText("0xMarketAddress")).toBeInTheDocument();

  //   expect(screen.getByText("0xBattleAddress").closest("a")).toHaveAttribute("href", expect.stringContaining("0xBattleAddress"));
  //   expect(screen.getByText("0xRankingAddress").closest("a")).toHaveAttribute("href", expect.stringContaining("0xRankingAddress"));
  //   expect(screen.getByText("0xMarketAddress").closest("a")).toHaveAttribute("href", expect.stringContaining("0xMarketAddress"));
  // });
});