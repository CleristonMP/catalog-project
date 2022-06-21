import { AxiosRequestConfig } from 'axios';
import { Link } from 'react-router-dom';
import { User } from 'types/user';
import { requestBackend } from 'util/requests';

import './styles.css';

type Props = {
  user: User;
  onDelete: Function;
};

const UserCrudCard = ({ user, onDelete }: Props) => {
  const handleDelete = (userId: number) => {
    if (!window.confirm('Tem certeza de que deseja deletar o usuário?')) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/users/${userId}`,
      withCredentials: true,
    };

    requestBackend(config).then(() => {
      onDelete();
    });
  };

  return (
    <div className="base-card user-crud-card">
      <div className="user-crud-card-top-container">
        <h6>
          {user.firstName} {user.lastName}
        </h6>
        <span>{user.email}</span>
      </div>

      <div className="user-crud-card-buttons-container">
        <Link to={`/admin/users/${user.id}`}>
          <button className="btn btn-outline-secondary user-crud-card-button">
            EDITAR
          </button>
        </Link>
        <div>
          <button
            onClick={() => handleDelete(user.id)}
            className="btn btn-outline-danger user-crud-card-button"
          >
            EXCLUIR
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCrudCard;
