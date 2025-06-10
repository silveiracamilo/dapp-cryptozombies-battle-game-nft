import { beforeAll, describe, expect, it } from 'vitest';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Zombie } from './Zombie';

describe("Zombie Component", () => {
    const dna = '6555859043139391';
    const dnaCat = '3333637044366099';
    let component: RenderResult;

    beforeAll(() => {
        component = render(<Zombie dna={dna} />);
    });
    
    it("should render", () => {
        expect(screen.getByRole('figure', { name: `zombie-${dna}` })).toBeInTheDocument();
    });

    it("should render dna", () => {
        expect(screen.getByText(`DNA: ${dna}`)).toBeInTheDocument();
    });
    
    it("should render all parts", () => {
        expect(screen.getByAltText('Pé esquerdo do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Pé direito do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Perna esquerda do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Perna direita do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Coxa esquerda do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Coxa direita do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Ombro direito do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Torso do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Camiseta do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Ombro esquerdo do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Antebraço esquerdo do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Antebraço direito do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Mão esquerda do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Mão direita do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Cabeça do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Olho do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Boca do zumbi')).toBeInTheDocument();
    });

    it("should render all parts the zombie cat", () => {
        component.rerender(<Zombie dna={dnaCat} />);

        expect(screen.getByAltText('Ombro direito do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Torso do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Pernas de gato do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Camiseta do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Ombro esquerdo do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Antebraço esquerdo do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Antebraço direito do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Mão esquerda do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Mão direita do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Cabeça do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Olho do zumbi')).toBeInTheDocument();
        expect(screen.getByAltText('Boca do zumbi')).toBeInTheDocument();
    });
});
