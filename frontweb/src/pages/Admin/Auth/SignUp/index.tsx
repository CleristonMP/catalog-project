import './styles.css';

const SignUp = () => {
  return (
    <div className="base-card signup-card">
      <h1>Cadastre-se</h1>

      <form>
        <div className="mb-4">
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Nome"
            className="form-control base-input"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Sobrenome"
            className="form-control base-input"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="form-control base-input"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Senha"
            className="form-control base-input"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="ensure-password"
            id="ensure-password"
            placeholder="Confirme a senha"
            className="form-control base-input"
          />
        </div>
        <div className="signup-btns">
          <button type="submit" className="btn btn-primary btn-lg send-btn">
            Cadastrar
          </button>
          <button
            type="reset"
            className="btn btn-outline-danger btn-lg clean-btn"
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
