import { render, screen } from "@testing-library/react";
import ButtonIcon from "..";


test('ButtonIcon should render button with given test', () => {
    const text = 'Fazer login';
    render(
        <ButtonIcon text={text} />
    );
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByTestId('arrow')).toBeInTheDocument();
});
