import { AxiosRequestConfig } from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Category } from 'types/category';
import { requestBackend } from 'util/requests';

import './styles.css';

type Props = {
  category: Category;
  onDelete: Function;
};

const CategoryCrudCard = ({ category, onDelete }: Props) => {
  const handleDelete = (categoryId: number) => {
    if (!window.confirm('Tem certeza de que deseja deletar a categoria?')) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/categories/${categoryId}`,
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        onDelete();
        toast.info(`A categoria ${category.name} foi excluída.`);
      })
      .catch(() => {
        toast.error('Há produtos cadastrados essa categoria.');
      });
  };

  return (
    <div className="base-card category-crud-card">
      <div className="category-name-container">
        <span className="category-name">{category.name}</span>
      </div>
      <div className="category-crud-buttons-container">
        <button
          onClick={() => handleDelete(category.id)}
          className="btn btn-outline-danger category-crud-btn category-crud-delete-button"
        >
          EXCLUIR
        </button>
        <Link to={`/admin/categories/${category.id}`}>
          <button className="btn btn-outline-secondary category-crud-btn category-crud-update-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCrudCard;
