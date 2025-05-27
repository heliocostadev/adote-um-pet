import { useState, useContext } from "react";
import Input from "../../form/Input";
import { Link } from "react-router-dom";

import styles from "../../form/Form.module.css";

/* contexts */
import { Context } from "../../../context/UserContext";

function Login() {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user);
  };

  return (
    <section className={styles.form_container}>
      <h1>Fazer Login</h1>
      <p>
        Digite o seu e-mail e senha para <br /> fazer login
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleChange}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a senha"
          handleOnChange={handleChange}
        />
        <input type="submit" value="Continuar" />
      </form>

      <Link to="/register">
        <input type="button" value="Não possuo conta" />
      </Link>
    </section>
  );
}

export default Login;
