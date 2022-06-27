import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { NewUser } from 'types/new-user';
import { requestBackend } from 'util/requests';
import NewUserForm from './NewUserForm';

import './styles.css';

type Props = {
  newUser: NewUser;
  onDelete: Function;
};

const NewUserInforCard = ({ newUser, onDelete }: Props) => {
  const [newUserForm, setNewUserForm] = useState<NewUser>();

  const handleClick = () => {
    setNewUserForm(newUser);
  };

  const handleDelete = (userId: number) => {
    if (
      !window.confirm('Tem certeza de que deseja rejeitar este novo usuário?')
    ) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/new-user-control/${userId}`,
      withCredentials: true,
    };

    requestBackend(config).then(() => {
      onDelete();
    });
  };

  return !newUserForm ? (
    <div className="base-card new-user-info-card">
      <div className="new-user-info-content">
        <div className="top-info-container">
          <div className="info-container mb-2 mb-sm-0">
            <span className="text-muted">Nome: </span>
            <span className="h6 me-sm-3">{newUser.firstName}</span>
          </div>
          <div className="info-container mb-2 mb-sm-0">
            <span className="text-muted">Sobrenome: </span>
            <span className="h6">{newUser.lastName}</span>
          </div>
        </div>
        <div className="info-container mb-2 mb-sm-0 mt-sm-2 mt-md-0">
          <span className="text-muted">E-mail: </span>
          <span className="h6">{newUser.email}</span>
        </div>
      </div>

      <div className="new-user-info-buttons-container">
        <button
          onClick={handleClick}
          className="btn btn-primary text-white me-md-4"
        >
          ACEITAR
        </button>

        <button
          onClick={() => handleDelete(newUser.id)}
          className="btn btn-outline-danger"
        >
          EXCLUIR
        </button>
      </div>
    </div>
  ) : (
    <NewUserForm newUser={newUser} onDelete={onDelete} />
  );
};

export default NewUserInforCard;
