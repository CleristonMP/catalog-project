import { render, screen } from "@testing-library/react";
import ProductPrice from "..";

test('should render ProductPrice', () => {
    const price = 1200.30;

    render(
        <ProductPrice price={price} />
    );
    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('1.200,30')).toBeInTheDocument();
});
