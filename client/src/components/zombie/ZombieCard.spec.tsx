import { beforeAll, describe, expect, it, vi } from "vitest";
import { render, RenderResult, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import ZombieCard from "./ZombieCard";

const zombieMock = {
    id: 0,
    name: "Camilao",
    dna: "6555859043139391",
    score: 0,
    birthTime: 1749390523,
    level: 1,
    attackReadyTime: 1749390523,
    fedReadyTime: 1749390523,
    winCount: 0,
    lossCount: 0,
    fedCount: 0,
    head: 3,
    eye: 1,
    shirt: 2,
    skinColor: 324,
    eyeColor: 154,
    clothesColor: 46,
    catMode: false,
    strength: 91,
    agility: 93.90625,
    resilience: 63.9390869140625
};

vi.mock('@/context/app/AppContextProvider', () => {
    return {
        useAppContext: () => ({
            totalAttackVictoryToGetReward: 10,
            totalFedToGetReward: 10,
        }),
    };
});

describe('ZombieCard', () => {
    let component: RenderResult;
    
    beforeAll(() => {
        component = render(<ZombieCard zombie={zombieMock} />);
    });

    it('should render component with zombie data', () => {
        expect(screen.getByRole('figura', { name: `zombie-card-${zombieMock.dna}` })).toBeInTheDocument();
        expect(screen.getByText(`${zombieMock.id} # ${zombieMock.name}`)).toBeInTheDocument();
        expect(screen.getByText(`Level: ${zombieMock.level} | Score: ${zombieMock.score}`)).toBeInTheDocument();
        expect(screen.getByText('Strength:')).toBeInTheDocument();
        expect(screen.getByText('Agility:')).toBeInTheDocument();
        expect(screen.getByText('Resilience:')).toBeInTheDocument();
        expect(screen.getAllByText('Win').length).toBeGreaterThan(0);
        expect(screen.getAllByText('Fed').length).toBeGreaterThan(0);
    });

    it('should not render Win and Fed progress bars when showWinAndFed is false', () => {
        component.rerender(<ZombieCard zombie={zombieMock} showWinAndFed={false} />);
        
        expect(screen.queryByText('Win')).not.toBeInTheDocument();
        expect(screen.queryByText('Fed')).not.toBeInTheDocument();
    });

    it('should render nothing when zombie prop is not provided', () => {
        component.rerender(<ZombieCard zombie={undefined as any} />);
        
        expect(component.container).toBeEmptyDOMElement();
    });
});
