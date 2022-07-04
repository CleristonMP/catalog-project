import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';
import { Role, User } from 'types/user';
import Select from 'react-select';

import './styles.css';

const options: Role[] = [
  { id: 1, authority: 'Operador' },
  { id: 2, authority: 'Admin' },
];

type UrlParams = {
  userId: string;
};

const Form = () => {
  const { userId } = useParams<UrlParams>();

  const isEditing = userId !== 'create';

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
  } = useForm<User>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({
        url: `/users/${userId}`,
        withCredentials: true,
      }).then((response) => {
        const user = response.data as User;

        setValue('firstName', user.firstName);
        setValue('lastName', user.lastName);
        setValue('email', user.email);
        setValue('emailConfirmation', user.email);
        const customRoles = user.roles.map((role) => ({
          id: role.id,
          authority: role.authority === 'ROLE_ADMIN' ? 'Admin' : 'Operador',
        }));

        setValue('roles', customRoles);
        console.log(user);
      });
    }
  }, [isEditing, userId, setValue]);

  const onSubmit = (formData: User) => {
    const data = formData;

    console.log(data);

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/users/${userId}` : '/users',
      data,
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        !isEditing
          ? toast.info('Usuário cadastrado com sucesso')
          : toast.info('Usuário atualizado com sucesso');
        history.push('/admin/users');
      })
      .catch(() => {
        toast.error('Erro ao cadastrar usuário');
      });
  };

  const handleCancel = () => {
    history.push('/admin/users');
  };

  return (
    <div className="container">
      <div className="base-card user-crud-form-card">
        <h1 className="user-crud-form-title">CADASTRAR UM USUÁRIO</h1>

        <form className="user-crud-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="user-crud-inputs-container">
            <div className="row">
              <div className="col-lg-6 mb-3 mb-xl-3">
                <input
                  {...register('firstName', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.firstName ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome do Usuário"
                  name="firstName"
                />
                <div className="invalid-feedback d-block">
                  {errors.firstName?.message}
                </div>
              </div>

              <div className="col-lg-6 mb-3">
                <input
                  {...register('lastName', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.lastName ? 'is-invalid' : ''
                  }`}
                  placeholder="Sobrenome do Usuário"
                  name="lastName"
                />
                <div className="invalid-feedback d-block">
                  {errors.lastName?.message}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 mb-3 mb-xl-3">
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

              <div className="col-lg-6 mb-3 mb-xl-3">
                <input
                  {...register('emailConfirmation', {
                    required: 'Campo obrigatório',
                    validate: {
                      matchesPreviousEmail: (value) => {
                        const { email } = getValues();
                        return (
                          email === value || 'Os e-mails devem ser iguais.'
                        );
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
            </div>

            <div className="row">
              <div className="col-lg-6 mb-3 mb-xl-3">
                <input
                  {...register(
                    'password',
                    !isEditing
                      ? {
                          required: 'Campo obrigatório',
                          pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            message: '',
                          },
                        }
                      : {}
                  )}
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
              <div className="col-lg-6 mb-3 mb-xl-3">
                <input
                  {...register(
                    'passwordConfirmation',
                    !isEditing
                      ? {
                          required: 'Campo obrigatório',
                          validate: {
                            matchesPreviousPassword: (value) => {
                              const { password } = getValues();
                              return (
                                password === value ||
                                'As senhas devem ser iguais!'
                              );
                            },
                          },
                        }
                      : {}
                  )}
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
            </div>
            <div className="row">
              <div className="col-lg-6 mb-3 mb-xl-3">
                <label htmlFor="roles" className="d-none">
                  Funções
                </label>
                <Controller
                  name="roles"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={options}
                      classNamePrefix="user-crud-select"
                      isMulti
                      placeholder="Funções"
                      getOptionValue={(role: Role) => String(role.id)}
                      getOptionLabel={(role: Role) => role.authority}
                      inputId="Roles"
                    />
                  )}
                />
                {errors.roles && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="user-crud-form-btns-container">
            <button
              className="btn btn-outline-danger user-form-button user-form-cancel-btn"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary user-form-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
