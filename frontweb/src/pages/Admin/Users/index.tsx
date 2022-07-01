import { Route, Switch } from 'react-router-dom';
import List from './List';

const Users = () => {
  return (
    <Switch>
      <Route path="/admin/users" exact>
        <List />
      </Route>
      <Route path="/admin/users/:usersId">
        <div>
          <h1>Formulário</h1>
        </div>
      </Route>
    </Switch>
  );
};

export default Users;
