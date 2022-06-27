import { Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Users from './Users';

import './styles.css';
import PrivateRoute from 'components/PrivateRoute';
import Products from './Products';
import NewUsersList from './Users/NewUsersList';

const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <Switch>
          <PrivateRoute path="/admin/products">
            <Products />
          </PrivateRoute>
          <PrivateRoute path="/admin/categories">
            <h1>Category CRUD</h1>
          </PrivateRoute>
          <PrivateRoute path="/admin/users" roles={['ROLE_ADMIN']}>
            <Users />
          </PrivateRoute>
          <PrivateRoute path="/admin/new-users" roles={['ROLE_ADMIN']}>
            <NewUsersList />
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
