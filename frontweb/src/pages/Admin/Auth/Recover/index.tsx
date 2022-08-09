import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { User, UserForm } from 'types/user';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';

import './styles.css';

const Recover = () => {
  const [user, setUser] = useState<User>();

  const history = useHistory();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<UserForm>();

  const onSubmit = (formData: UserForm) => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/recover/${formData.email}`,
      data: formData.email,
    };

    requestBackend(config)
      .then((response) => {
        setUser(response.data);
      })
      .finally(() => {
        setValue('password', '');
      });
  };

  const setNewPassword = (formData: UserForm) => {
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `/recover/${user?.id}`,
      data: {
        firstName: user?.firstName,
        lastName: user?.lastName,
        password: formData.password,
        roles: user?.roles,
      },
    };

    requestBackend(config)
      .then(() => {
        toast.info('Senha atualizada com sucesso');
        history.push('/admin');
      })
      .catch(() => {
        toast.error('Erro ao atualizar a senha');
      });
  };

  const handleCancel = () => {
    history.push('/admin');
  };

  return (
    <div className="base-card recover-card">
      <h1 className="recover-title">RECUPERAÇÃO</h1>

      {user ? (
        <form onSubmit={handleSubmit(setNewPassword)} className="recover-form">
          <div>
            <span>Usuário: {user.email}</span>
          </div>

          <div className="mb-4">
            <input
              {...register('password', {
                required: 'Campo obrigatório',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: '',
                },
              })}
              type="password"
              className={`form-control base-input ${
                errors.password ? 'is-invalid' : ''
              }`}
              placeholder="Digite a nova senha"
              name="password"
            />
            <div className="invalid-feedback d-block">
              {errors.password?.message}
            </div>
            <span
              className={
                errors.password ? 'text-danger' : 'password-pattern-advice'
              }
            >
              A senha deve ter pelo menos 8 caracteres e um número
            </span>
          </div>

          <div className="mb-4">
            <input
              {...register('passwordConfirmation', {
                required: 'Campo obrigatório',
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return password === value || 'As senhas devem ser iguais!';
                  },
                },
              })}
              type="password"
              className={`form-control base-input ${
                errors.passwordConfirmation ? 'is-invalid' : ''
              }`}
              placeholder="Repita aqui a nova senha"
              name="passwordConfirmation"
            />
            <div className="invalid-feedback d-block">
              {errors.passwordConfirmation?.message}
            </div>
          </div>

          <div className="signup-btns-container">
            <button
              className="btn btn-outline-danger signup-btn"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary text-white signup-btn">
              SALVAR
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="recover-form">
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
              className={`form-control base-input ${
                errors.email ? 'is-invalid' : ''
              }`}
              placeholder="Digite o e-mail cadastrado"
              name="email"
            />
            <div className="invalid-feedback d-block">
              {errors.email?.message}
            </div>
          </div>

          <div className="mb-4">
            <input
              {...register('emailConfirmation', {
                required: 'Campo obrigatório',
                validate: {
                  matchesPreviousEmail: (value) => {
                    const { email } = getValues();
                    return email === value || 'Os e-mails devem ser iguais.';
                  },
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido',
                },
              })}
              type="email"
              name="emailConfirmation"
              id="emailConfirmation"
              placeholder="Repita aqui o e-mail cadastrado"
              className="form-control base-input"
            />
            <div className="invalid-feedback d-block">
              {errors.emailConfirmation?.message}
            </div>
          </div>

          <div className="recover-btns-container">
            <button
              className="btn btn-outline-danger recover-btn"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary text-white recover-btn">
              ENVIAR
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Recover;
