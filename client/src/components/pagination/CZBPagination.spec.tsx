import { describe, it, expect } from "vitest";
import { render, RenderResult, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import CZBPagination from "./CZBPagination";
import { beforeAll } from "vitest";

describe("CZBPagination", () => {
    let component: RenderResult;
        
    beforeAll(() => {
        component = render(<CZBPagination total={5} pageSize={10} />);
    });

    it("should render nothing when total is less than or equal to pageSize", () => {
        expect(component.container).toBeEmptyDOMElement();
    });

    it("should render pagination when total is greater than pageSize", () => {
        component.rerender(<CZBPagination total={20} pageSize={10} />);

        expect(screen.getByRole("navigation")).toBeInTheDocument();
        expect(screen.getByTitle('Previous Page')).toHaveAttribute('aria-disabled', 'true');
        expect(screen.getByTitle('1')).toBeInTheDocument();
        expect(screen.getByTitle('2')).toBeInTheDocument();
        expect(screen.getByTitle('Next Page')).toHaveAttribute('aria-disabled', 'false');
    });

    it("should have defaultCurrent as 1 and showSizeChanger as false", () => {
        component.rerender(<CZBPagination total={20} pageSize={10} />);

        expect(screen.getByTitle('1')).toHaveClass('ant-pagination-item-active');
        expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    });
});
