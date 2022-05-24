import { render, screen, waitFor } from '@testing-library/react';
import Form from '../Form';
import { Router, useParams } from 'react-router-dom';
import history from 'util/history';
import userEvent from '@testing-library/user-event';
import { server } from './fixtures';
import selectEvent from 'react-select-event';
import { ToastContainer } from 'react-toastify';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

describe('Product for create tests', () => {
    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({ productId: 'create' });
    });

    test('should show toast and redirect when submit form correctly', async () => {
        render(
            <Router history={history}>
                <ToastContainer />
                <Form />
            </Router>
        );

        const nameInput = screen.getByTestId('name');
        const priceInput = screen.getByTestId('price');
        const imgUrlInput = screen.getByTestId('imgUrl');
        const descriptionInput = screen.getByTestId('description');
        const categoriesInput = screen.getByLabelText('Categorias');

        const submitButton = screen.getByRole('button', { name: /salvar/i });

        await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
        userEvent.type(nameInput, 'Computador');
        userEvent.type(priceInput, '5000.12');
        userEvent.type(imgUrlInput, 'https://example.com');
        userEvent.type(descriptionInput, 'Computador muito bom');

        userEvent.click(submitButton);

        await waitFor(() => {
            const toastElement = screen.getByText('Produto cadastrado com sucesso');
            expect(toastElement).toBeInTheDocument();
        });

        expect(history.location.pathname).toEqual('/admin/products');
    });

    test('should show 5 validation messages when just click submit', async () => {
        render(
            <Router history={history}>
                <Form />
            </Router>
        );

        const submitButton = screen.getByRole('button', { name: /salvar/i });

        userEvent.click(submitButton);

        await waitFor(() => {
            const messages = screen.getAllByText('Campo obrigatório');
            expect(messages).toHaveLength(5);
        });
    });

    test('should clear validation messages when filling out form correctly', async () => {
        render(
            <Router history={history}>
                <Form />
            </Router>
        );

        const submitButton = screen.getByRole('button', { name: /salvar/i });

        userEvent.click(submitButton);

        await waitFor(() => {
            const messages = screen.getAllByText('Campo obrigatório');
            expect(messages).toHaveLength(5);
        });

        const nameInput = screen.getByTestId('name');
        const priceInput = screen.getByTestId('price');
        const imgUrlInput = screen.getByTestId('imgUrl');
        const descriptionInput = screen.getByTestId('description');
        const categoriesInput = screen.getByLabelText('Categorias');

        await selectEvent.select(categoriesInput, ['Eletrônicos', 'Computadores']);
        userEvent.type(nameInput, 'Computador');
        userEvent.type(priceInput, '5000.12');
        userEvent.type(imgUrlInput, 'https://example.com');
        userEvent.type(descriptionInput, 'Computador muito bom');

        await waitFor(() => {
            const messages = screen.queryAllByText('Campo obrigatório');
            expect(messages).toHaveLength(0);
        });
    });
});
