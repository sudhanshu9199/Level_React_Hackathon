import style from "./Register.module.scss";
import RegisterForm from "./RegisterForm";
const Register = () => {
  return (
    <div className={style.signupFullPage}>
      <div className={style.signupContainer}>
        <h2>Welcome</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
