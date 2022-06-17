import { Link } from 'react-router-dom';
import './styles.css';

const Registered = () => {
  return (
    <div className="base-card registered-card">
      <h1>Registrado</h1>
      <p>
        A sua solicitação foi registrada com sucesso. Aguarde um dos nossos
        administradores autorizar seu acesso.
      </p>
      <p>
        Enquanto espera, aproveite para navegar em nosso{' '}
        <Link to="/products">Catálogo</Link>.
      </p>
    </div>
  );
};

export default Registered;
