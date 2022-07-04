import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import './styles.css';

export type FilterData = {
  name?: string;
  sort?: string;
};

export type OptionType = {
  value: string;
  label: string;
};

const options: OptionType[] = [
  { value: 'desc', label: 'Filtrar por Recentes' },
  { value: 'asc', label: 'Filtrar por Antigos' },
];

type Props = {
  onSubmitFilter: (data: FilterData) => void;
};

const GeneralFilter = ({ onSubmitFilter }: Props) => {
  const [selectOptions] = useState<OptionType[]>(options);
  const [selectedOption, setSelectedOption] = useState<OptionType>(options[0]);

  const { register, handleSubmit, setValue, getValues, control } =
    useForm<FilterData>();

  const onSubmit = (formData: FilterData) => {
    onSubmitFilter(formData);
  };

  const handleFormClear = () => {
    setValue('name', '');
    setValue('sort', options[0].value);
    setSelectedOption(options[0]);
  };

  const handleChangeSort = (option: OptionType) => {
    setSelectedOption(option);

    setValue('sort', option.value);

    const obj: FilterData = {
      name: getValues('name'),
      sort: getValues('sort'),
    };

    onSubmitFilter(obj);
  };

  return (
    <div className="base-card filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="filter-form">
        <div className="filter-name-container">
          <input
            {...register('name')}
            type="text"
            className={'form-control'}
            placeholder="Pesquisar Nome"
            name="name"
          />
          <button className="filter-search-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="filter-bottom-container">
          <div className="filter-sort-container">
            <Controller
              name="sort"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectOptions}
                  placeholder="Filtrar"
                  classNamePrefix="filter-select"
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
            className="btn btn-outline-secondary btn-filter-clear"
          >
            LIMPAR <span className="btn-filter-word">FILTRO</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralFilter;
