import { Link } from 'react-router-dom';
import './styles.css';

type Props = {
  count: number;
};

const NewUserRequestCard = ({ count }: Props) => {
  return (
    <div className="base-card flex-sm-row new-request-user-card">
      <div className="d-flex align-items-center mb-2 mb-sm-0">
        <h6 className="me-sm-2">Requisições de novos usuários: </h6>
        <span className="new-request-counter">{count}</span>
      </div>
      <Link to={'/admin/new-users'}>
        <button className="btn btn-primary text-white">AVALIAR</button>
      </Link>
    </div>
  );
};

export default NewUserRequestCard;
