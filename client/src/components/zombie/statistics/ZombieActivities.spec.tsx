import { describe, it, expect, beforeAll } from "vitest";
import { render, RenderResult, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import ZombieActivities from "./ZombieActivities";
import { ZombieEventTypes } from "@/store/interface/event/ZombieEvent";
import { ZombieActivitiesType } from "@/store/interface/zombie/ZombieEvents";

const mockActivities: ZombieActivitiesType = [
  {
    event: ZombieEventTypes.NewZombie,
    date: "2023-01-01T12:00:00Z",
    from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    zombieId: 1n,
    timestamp: 1672574400,
    name: 'Zombie1',
    dna: 6555859043139391,
  },
  {
    event: ZombieEventTypes.SaleZombie,
    date: "2023-01-02T12:00:00Z",
    price: 1000000000000000000n, // 1 ETH in wei
    seller: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    zombieId: 2n,
    timestamp: 1672660800,
  },
  {
    event: ZombieEventTypes.CancelSaleZombie,
    date: "2023-01-03T12:00:00Z",
    seller: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    zombieId: 3n,
    timestamp: 1672747200,
  },
  {
    event: ZombieEventTypes.BuyZombie,
    date: "2023-01-04T12:00:00Z",
    buyer: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    seller: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    zombieId: 4n,
    timestamp: 1672833600,
  },
];

describe("ZombieActivities", () => {
  let component: RenderResult;
          
  beforeAll(() => {
      component = render(<ZombieActivities loading={true} activities={[]} />);
  });

  it("renders component and loading spinner when loading is true", async () => {
    expect(component.container).toBeInTheDocument();
    expect(screen.getAllByTestId('spin-loading')[0]).toBeInTheDocument();
  });

  it("renders heading 'Activities' without spinner when loading is false", () => {
    component.rerender(<ZombieActivities loading={false} activities={[]} />);

    expect(screen.getByText("Activities")).toBeInTheDocument();
    expect(screen.getAllByTestId("spin-loading").length).toEqual(1);
  });

  it("renders timeline items for each activity", () => {
    component.rerender(<ZombieActivities loading={false} activities={mockActivities} />);
    expect(screen.getByText(/Birth by 0xf39Fd...92266/i)).toBeInTheDocument();
    expect(screen.getByText(/Sale 1.0 ETH by 0x70997...c79C8/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel Sale by 0x70997...c79C8/i)).toBeInTheDocument();
    expect(screen.getByText(/Buy by 0xf39Fd...92266/i)).toBeInTheDocument();
  });
});
