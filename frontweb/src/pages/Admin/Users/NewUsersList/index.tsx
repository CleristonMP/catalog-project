import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { NewUser } from 'types/new-user';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import UserFilter, { UserFilterData } from '../UserFilter';
import NewUserInforCard from './NewUserInfoCard';

import './styles.css';

type ControlComponentsData = {
  activePage: number;
  filterData: UserFilterData;
};

const NewUsersList = () => {
  const [page, setPage] = useState<SpringPage<NewUser>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { name: '', sort: 'asc' },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: UserFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getNewUsers = useCallback(() => {
    const config: AxiosRequestConfig = {
      url: '/new-user-control',
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 3,
        name: controlComponentsData.filterData.name,
        sort: `id,${controlComponentsData.filterData.sort}`,
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getNewUsers();
  }, [getNewUsers]);

  return (
    <div className="user-crud-container">
      <div className="user-crud-bar-container">
        <UserFilter onSubmitFilter={handleSubmitFilter} />
      </div>

      <div>
        {page?.content.map((newUser) => (
          <div key={newUser.id}>
            <NewUserInforCard newUser={newUser} onDelete={getNewUsers} />
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

export default NewUsersList;
