import { AxiosRequestConfig } from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User } from 'types/user';
import { requestBackend } from 'util/requests';

import './styles.css';

type Props = {
  user: User;
  onDelete: Function;
};

const UserCrudCard = ({ user, onDelete }: Props) => {
  const handleDelete = (userId: number) => {
    if (!window.confirm('Tem certeza de que deseja deletar este usuário?')) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/users/${userId}`,
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        onDelete();
        toast.info(
          `O usuário ${user.firstName + ' ' + user.lastName} foi excluído.`
        );
      })
      .catch(() => {
        toast.error('Não foi possível excluir o usuário.');
      });
  };

  return (
    <div className="base-card user-crud-card">
      <div className="user-name-container">
        <span className="user-name">
          {user.firstName + ' ' + user.lastName}
        </span>
      </div>
      <div className="user-crud-buttons-container">
        <button
          onClick={() => handleDelete(user.id)}
          className="btn btn-outline-danger user-crud-btn user-crud-delete-button"
        >
          EXCLUIR
        </button>
        <Link to={`/admin/users/${user.id}`}>
          <button className="btn btn-outline-secondary user-crud-btn user-crud-update-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserCrudCard;
