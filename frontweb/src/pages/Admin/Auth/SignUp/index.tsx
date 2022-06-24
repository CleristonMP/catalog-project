import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { requestBackendNewUser } from 'util/requests';
import { useState } from 'react';
import Registered from '../Registered';
import { User } from 'types/user';

import './styles.css';

const SignUp = () => {
  const [newUserCardData, setNewUserCardData] = useState<User>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = (formData: User) => {
    const newUser = {
      ...formData,
      roles: [
        {
          id: 1,
          authority: '',
        },
      ],
    };

    requestBackendNewUser(newUser)
      .then((response) => {
        toast.info('Usuário cadastrado com sucesso');
        setNewUserCardData(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao cadastrar usuário');
      });
  };

  return !newUserCardData ? (
    <div className="base-card signup-card">
      <h1>Cadastre-se</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('firstName', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[a-zA-Z ]{2,30}$/,
                message: 'Nome inválido',
              },
            })}
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Nome"
            className="form-control base-input"
          />
          <div className="invalid-feedback d-block">
            {errors.firstName?.message}
          </div>
        </div>
        <div className="mb-4">
          <input
            {...register('lastName', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[a-zA-Z ]{2,30}$/,
                message: 'Nome inválido',
              },
            })}
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Sobrenome"
            className="form-control base-input"
          />
          <div className="invalid-feedback d-block">
            {errors.lastName?.message}
          </div>
        </div>
        <div className="mb-4">
          <input
            {...register('email', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="form-control base-input"
          />
          <div className="invalid-feedback d-block">
            {errors.email?.message}
          </div>
        </div>
        <div className="mb-4">
          <input
            {...register('password', {
              required: 'Campo obrigatório',
            })}
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            className="form-control base-input"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
        </div>

        {/* <div className="mb-4">
          <input
            type="password"
            name="ensure-password"
            id="ensure-password"
            placeholder="Confirme a senha"
            className="form-control base-input"
          />
          </div> */}

        <div className="signup-btns">
          <button type="submit" className="btn btn-primary btn-lg send-btn">
            Cadastrar
          </button>
          <button
            type="reset"
            className="btn btn-outline-danger btn-lg clean-btn"
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  ) : (
    <Registered
      email={newUserCardData.email}
      firstName={newUserCardData.firstName}
      lastName={newUserCardData.lastName}
    />
  );
};

export default SignUp;
