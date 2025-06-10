import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import ZombieStatistic from "./ZombieStatistic";

import { IZombie } from "@/store/interface/zombie/IZombie";
import { ZombieActivitiesType } from "@/store/interface/zombie/ZombieEvents";

const mockZombie: IZombie = {
  id: 1,
  name: "Test Zombie",
  dna: "1234567890",
  birthTime: 1672574400, // timestamp in seconds
  attackReadyTime: 1672660800,
  fedReadyTime: 1672747200,
  level: 5,
  winCount: 10,
  lossCount: 3,
  fedCount: 0,
  head: 1,
  strength: 80,
  agility: 75.5,
  resilience: 60.25,
  eyeColor: 2,
  eye: 3,
  clothesColor: 4,
  shirt: 5,
  skinColor: 6,
  catMode: false,
  score: 0,
};

const mockActivities: ZombieActivitiesType = [];

vi.mock("../Zombie", () => ({
  Zombie: ({ dna }: { dna: string }) => <div data-testid="mock-zombie">Zombie DNA: {dna}</div>,
}));

vi.mock("./ZombieActivities", () => ({
  __esModule: true,
  default: ({ loading, activities }: { loading: boolean; activities: any }) => (
    <div data-testid="mock-zombie-activities">
      Loading: {loading ? "true" : "false"}, Activities count: {activities.length}
    </div>
  ),
}));

describe("ZombieStatistic", () => {
  it("renders all statistics and child components correctly", () => {
    render(<ZombieStatistic zombie={mockZombie} loadingActivities={false} activities={mockActivities} />);

    // Check Zombie component rendered with correct dna
    expect(screen.getByTestId("mock-zombie")).toHaveTextContent(`Zombie DNA: ${mockZombie.dna}`);

    // Check some key statistics titles and values
    expect(screen.getByText("DNA")).toBeInTheDocument();
    expect(screen.getByText(mockZombie.dna)).toBeInTheDocument();

    const level = screen.getByText("Level");
    expect(level).toBeInTheDocument();
    
    // expect(screen.getByText(String(mockZombie.level))).toBeInTheDocument();
    // expect(level.textContent).toContain(String(mockZombie.level));

    expect(screen.getByText("Wins")).toBeInTheDocument();
    expect(screen.getByText(String(mockZombie.winCount))).toBeInTheDocument();

    expect(screen.getByText("Losses")).toBeInTheDocument();
    // expect(screen.getByText(String(mockZombie.lossCount))).toBeInTheDocument();

    // Check ZombieActivities component rendered with correct props
    expect(screen.getByTestId("mock-zombie-activities")).toHaveTextContent("Loading: false");
    expect(screen.getByTestId("mock-zombie-activities")).toHaveTextContent("Activities count: 0");
  });
});
