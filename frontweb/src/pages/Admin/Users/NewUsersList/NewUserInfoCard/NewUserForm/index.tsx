import { AxiosRequestConfig } from 'axios';
import { NewUser } from 'types/new-user';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { User } from 'types/user';
import { useForm } from 'react-hook-form';

import './styles.css';

type Props = {
  newUser: NewUser;
  onDelete: Function;
};

const NewUserForm = ({ newUser, onDelete }: Props) => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = (formData: User) => {
    const data = {
      ...formData,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      roles: [
        {
          id: 1,
        },
      ],
    };

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/users',
      data,
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        requestBackend({
          url: `/new-user-control/${newUser.id}`,
          method: 'DELETE',
          withCredentials: true,
        }).then(() => {
          onDelete();
        });
        toast.info('Usuário cadastrado com sucesso');
        history.push('/admin/users');
      })
      .catch(() => {
        toast.error('Erro ao cadastrar usuário');
      });
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 mt-lg-4 col-lg-6 mb-3 mb-xl-4 new-user-input-container">
          <input
            {...register('password', {
              required: 'Campo obrigatório',
            })}
            type="password"
            className={`form-control base-input ${
              errors.password ? 'is-invalid' : ''
            }`}
            placeholder="Senha"
            name="password"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>

        <div className="mt-4 new-user-button-container">
          <button
            className="btn btn-outline-danger me-md-4"
            onClick={handleCancel}
          >
            CANCELAR
          </button>
          <button className="btn btn-primary text-white">SALVAR</button>
        </div>
      </form>
    </div>
  );
};

export default NewUserForm;
