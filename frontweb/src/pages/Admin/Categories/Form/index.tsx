import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';
import { Category } from 'types/category';

import './styles.css';

type UrlParams = {
  categoryId: string;
};

const Form = () => {
  const { categoryId } = useParams<UrlParams>();

  const isEditing = categoryId !== 'create';

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Category>();

  useEffect(() => {
    if (isEditing) {
      requestBackend({
        url: `/categories/${categoryId}`,
        withCredentials: true,
      }).then((response) => {
        const category = response.data as Category;
        setValue('name', category.name);
      });
    }
  }, [isEditing, categoryId, setValue]);

  const onSubmit = (formData: Category) => {
    const data = {
      ...formData,
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/categories/${categoryId}` : '/categories',
      data,
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        !isEditing
          ? toast.info('Categoria cadastrada com sucesso')
          : toast.info('Categoria atualizada com sucesso');
        history.push('/admin/categories');
      })
      .catch(() => {
        toast.error('Erro ao cadastrar categoria');
      });
  };

  const handleCancel = () => {
    history.push('/admin/categories');
  };

  return (
    <div className="container">
      <div className="base-card category-crud-form-card">
        <h1 className="category-crud-form-title">CADASTRAR UMA CATEGORIA</h1>

        <form className="category-crud-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="category-crud-input-container">
            <div className="row">
              <div className="col-lg-12 mb-3 mb-lg-0">
                <input
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Categoria"
                  name="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>
            </div>
          </div>
          <div className="category-crud-form-buttons-container">
            <button
              className="btn btn-outline-danger category-crud-form-btn category-crud-form-cancel-btn"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary category-crud-form-btn text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
