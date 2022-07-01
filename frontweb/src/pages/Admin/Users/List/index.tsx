import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import GeneralFilter, { FilterData } from '../../GeneralFilter';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import { User } from 'types/user';
import UserCrudCard from '../UserCrudCard';

import './styles.css';

type ControlComponentsData = {
  activePage: number;
  filterData: FilterData;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<User>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { name: '', sort: 'desc' },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: FilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getUsers = useCallback(() => {
    const config: AxiosRequestConfig = {
      url: '/users',
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 3,
        name: controlComponentsData.filterData.name,
        sort: `id,${controlComponentsData.filterData.sort || 'desc'}`,
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="users-crud-container">
      <div className="users-crud-bar-container">
        <Link to="/admin/users/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>
        <GeneralFilter onSubmitFilter={handleSubmitFilter} />
      </div>

      <div className="row">
        {page?.content.map((user) => (
          <div key={user.id}>
            <UserCrudCard user={user} onDelete={getUsers} />
          </div>
        ))}
      </div>

      <Pagination
        forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default List;
