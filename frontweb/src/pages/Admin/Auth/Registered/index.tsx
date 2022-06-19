import { Link } from 'react-router-dom';
import './styles.css';

type Props = {
  firstName: string;
  lastName: string;
  email: string;
};

const Registered = ({ firstName, lastName, email }: Props) => {
  return (
    <div className="base-card registered-card">
      <h1>Registrado</h1>
      <span className="registered-username">Usuário: {email}</span>
      <p>
        Parabéns, {firstName} {lastName}! A sua solicitação foi registrada com
        sucesso. Aguarde um dos nossos administradores autorizar seu acesso.
      </p>
      <p>
        Enquanto espera, aproveite para navegar em nosso{' '}
        <Link to="/products">Catálogo</Link>.
      </p>
    </div>
  );
};

export default Registered;
