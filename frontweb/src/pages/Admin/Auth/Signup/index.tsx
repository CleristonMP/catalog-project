import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserForm } from 'types/user';
import { requestBackend } from 'util/requests';

import './styles.css';

const Signup = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserForm>();

  const onSubmit = (formData: UserForm) => {
    const data = {
      ...formData,
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
    };

    requestBackend(config).then((response) => {
      history.push('/admin');
    });
  };

  const handleCancel = () => {
    history.push('/admin');
  };

  return (
    <div className="base-card signup-card">
      <h1 className="signup-title">CADASTRO</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <div className="mb-4">
          <input
            {...register('firstName', {
              required: 'Campo obrigatório',
            })}
            type="text"
            className={`form-control base-input ${
              errors.firstName ? 'is-invalid' : ''
            }`}
            placeholder="Nome"
            name="firstName"
          />
          <div className="invalid-feedback d-block">
            {errors.firstName?.message}
          </div>
        </div>

        <div className="mb-4">
          <input
            {...register('lastName', {
              required: 'Campo obrigatório',
            })}
            type="text"
            className={`form-control base-input ${
              errors.lastName ? 'is-invalid' : ''
            }`}
            placeholder="Sobrenome"
            name="lastName"
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
            className={`form-control base-input ${
              errors.email ? 'is-invalid' : ''
            }`}
            placeholder="E-mail"
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
            placeholder="Repita aqui o E-mail"
            className="form-control base-input"
          />
          <div className="invalid-feedback d-block">
            {errors.emailConfirmation?.message}
          </div>
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
            placeholder="Senha"
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
              errors.password ? 'is-invalid' : ''
            }`}
            placeholder="Repita aqui a Senha"
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
    </div>
  );
};

export default Signup;
