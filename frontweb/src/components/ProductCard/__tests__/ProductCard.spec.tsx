import { render, screen } from "@testing-library/react";
import { Product } from "types/product";
import ProductCard from "..";

test('should render ProductCard', () => {
    const product: Product = {
        name: 'Notebook Dell',
        price: 3499.99,
        imgUrl: 'https://img-url.example.com',
    } as Product;

    render(
        <ProductCard product={product} />
    );
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('3.499,99')).toBeInTheDocument();
});
