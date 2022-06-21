import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import './styles.css';

export type UserFilterData = {
  name?: string;
  sort?: string;
};

type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: 'desc', label: 'Filtrar por Recentes' },
  { value: 'asc', label: 'Filtrar por Antigos' },
];

type Props = {
  onSubmitFilter: (data: UserFilterData) => void;
};

const UserFilter = ({ onSubmitFilter }: Props) => {
  const [selectOptions] = useState<OptionType[]>(options);
  const [selectedOption, setSelectedOption] = useState<OptionType>(options[0]);

  const { register, handleSubmit, setValue, getValues, control } =
    useForm<UserFilterData>();

  const onSubmit = (formData: UserFilterData) => {
    onSubmitFilter(formData);
  };

  const handleFormClear = () => {
    setValue('name', '');
    setValue('sort', '');
  };

  const handleChangeSort = (option: OptionType) => {
    setSelectedOption(option);

    setValue('sort', option.value);

    const obj: UserFilterData = {
      name: getValues('name'),
      sort: getValues('sort'),
    };

    onSubmitFilter(obj);
  };

  return (
    <div className="base-card user-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="user-filter-form">
        <div className="user-filter-name-container">
          <input
            {...register('name')}
            type="text"
            className={'form-control'}
            placeholder="Pesquisar Nome"
            name="name"
          />
          <button className="user-filter-search-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="user-filter-bottom-container">
          <div className="user-filter-category-container">
            <Controller
              name="sort"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectOptions}
                  placeholder="Filtrar"
                  classNamePrefix="user-filter-select"
                  onChange={(option) => handleChangeSort(option as OptionType)}
                  getOptionValue={(option: OptionType) => option.value}
                  getOptionLabel={(option: OptionType) => option.label}
                  value={selectedOption}
                />
              )}
            />
          </div>
          <button
            onClick={handleFormClear}
            className="btn btn-outline-secondary btn-user-filter-clear"
          >
            LIMPAR<span className="btn-user-filter-word"> FILTRO</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserFilter;
