import { Route, Switch } from 'react-router-dom';
import List from './List';

const Users = () => {
  return (
    <Switch>
      <Route path="/admin/users" exact>
        <List />
      </Route>
      <Route path="/admin/users/:userId">
        <h1>Form</h1>
      </Route>
    </Switch>
  );
};

export default Users;
