import style from './login.module.scss';
import LoginForm from "./LoginForm";

const Login = () => {

  return (
    <div className={style.loginFullPage}>
      <div className={style.loginContainer}>
      <h2>Welcome Back</h2>
      <LoginForm />
      </div>
    </div>
  );
};

export default Login;
