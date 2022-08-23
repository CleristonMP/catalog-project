import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Category } from 'types/category';
import { Product } from 'types/product';
import { requestBackend, uploadFile } from 'util/requests';
import { toast } from 'react-toastify';
import { ReactComponent as ExclamationCircle } from '../../../../assets/images/exclamation-circle.svg';

import './styles.css';

type UrlParams = {
  productId: string;
};

const Form = () => {
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>(new File([], ''));
  const [imgError, setImgError] = useState<boolean>(false);

  const { productId } = useParams<UrlParams>();

  const isEditing = productId !== 'create';

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues,
    control,
  } = useForm<Product>();

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);

  useEffect(() => {
    if (isEditing) {
      requestBackend({ url: `/products/${productId}` }).then(
        async (response) => {
          const product = response.data as Product;

          setValue('name', product.name);
          setValue('price', product.price);
          setValue('description', product.description);
          setValue('categories', product.categories);
          setValue('imgUrl', product.imgUrl);

          const imageFile = getImageAsFile(product.imgUrl, product.name);
          imagePreview(await imageFile);

          const dt = new DataTransfer();
          dt.items.add(await imageFile);
          const fileList: FileList = dt.files;
          setValue('img', fileList);
        }
      );
    }
  }, [isEditing, productId, setValue]);

  const getImageAsFile = async (url: string, fileName: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const image = event.target.files[0];
    if (
      !['image/jpeg', 'image/png'].includes(image.type) ||
      image.size > 5000000
    ) {
      setImgError(true);
      return;
    }
    setImgError(false);
    setError('img', { message: '' });
    setSelectedFile(image);
    imagePreview(image);
    setValue('imgUrl', URL.createObjectURL(image));
  };

  const imagePreview = (image: File) => {
    document
      .querySelector('#output')
      ?.setAttribute('src', URL.createObjectURL(image));
  };

  const formSumission = (formData: Product) => {
    const data = {
      ...formData,
      price: String(formData.price).replace(',', '.'),
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/products/${productId}` : '/products',
      data,
      withCredentials: true,
    };

    requestBackend(config)
      .then(() => {
        toast.info('Produto cadastrado com sucesso');
        history.push('/admin/products');
      })
      .catch((err) => {
        toast.error('Erro ao cadastrar o produto');
      });
  };

  const onSubmit = (formData: Product) => {
    if (selectedFile.size) {
      uploadFile(selectedFile)
        .then((response) => {
          formData.imgUrl = response.data.uri;
        })
        .finally(() => {
          formSumission(formData);
        });
    } else {
      formSumission(formData);
    }
  };

  const handleCancel = () => {
    history.push('/admin/products');
  };

  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>

        <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="margin-bottom-30">
                <input
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="Nome do Produto"
                  name="name"
                  data-testid="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>

              <div className="margin-bottom-30">
                <label htmlFor="categories" className="d-none">
                  Categorias
                </label>
                <Controller
                  name="categories"
                  rules={{ required: true }}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={selectCategories}
                      classNamePrefix="product-crud-select"
                      isMulti
                      getOptionLabel={(category: Category) => category.name}
                      getOptionValue={(category: Category) =>
                        String(category.id)
                      }
                      inputId="categories"
                    />
                  )}
                />
                {errors.categories && (
                  <div className="invalid-feedback d-block">
                    Campo obrigatório
                  </div>
                )}
              </div>

              <div className="margin-bottom-30">
                <Controller
                  name="price"
                  rules={{
                    required: 'Campo obrigatório',
                  }}
                  control={control}
                  render={({ field }) => (
                    <CurrencyInput
                      placeholder="Preço"
                      className={`form-control base-input ${
                        errors.price ? 'is-invalid' : ''
                      }`}
                      disableGroupSeparators={true}
                      value={field.value}
                      onValueChange={field.onChange}
                      data-testid="price"
                    />
                  )}
                />

                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>

              <div className="margin-bottom-30 upload-img-ctr">
                <input
                  {...register('imgUrl', { required: 'Campo obrigatório' })}
                  type="text"
                  name="imgUrl"
                  data-testid="imgUrl"
                  className="d-none"
                />
                <img id="output" alt={getValues('name')} />
                <label htmlFor="image" className="upload-img-btn btn">
                  {isEditing ? 'TROCAR IMAGEM' : 'ADICIONAR IMAGEM'}
                </label>
                <input
                  {...register('img')}
                  accept="image/*"
                  type="file"
                  onChange={handleFileSelect}
                  className={`form-control base-input ${
                    errors.img ? 'is-invalid' : ''
                  }`}
                  name="img"
                  id="image"
                />
                <div className="upload-img-info">
                  <span
                    className={
                      imgError ? 'alert-danger text-uppercase fw-bold d-flex flex-wrap justify-content-center' : ''
                    }
                  >
                    {imgError ? <ExclamationCircle width={30} height={30} /> : <></>} As imagens devem ser JPG
                    ou PNG e não devem ultrapassar 5 mb.
                  </span>
                </div>
                <div className="invalid-feedback d-block">
                  {errors.imgUrl?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <textarea
                  rows={10}
                  {...register('description', {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control base-input h-auto ${
                    errors.description ? 'is-invalid' : ''
                  }`}
                  placeholder="Descrição"
                  name="description"
                  data-testid="description"
                />
                <div className="invalid-feedback d-block">
                  {errors.description?.message}
                </div>
              </div>
            </div>
          </div>
          <div className="product-crud-buttons-container">
            <button
              className="btn btn-outline-danger product-crud-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-primary product-crud-button text-white">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
