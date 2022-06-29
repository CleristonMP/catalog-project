import { Route, Switch } from 'react-router-dom';
import List from './List';

const Categories = () => {
  return (
    <Switch>
      <Route path="/admin/categories" exact>
        <List />
      </Route>
      <Route path="/admin/categories/:categoryId">
        <h1>Formulário</h1>
      </Route>
    </Switch>
  );
};

export default Categories;
