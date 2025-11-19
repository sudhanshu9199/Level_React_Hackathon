import { useDispatch } from "react-redux";
import style from "./login.module.scss";
import { useForm } from "react-hook-form";
import { loginDefaultValues } from "./authSchema";
import { loginSuccess } from "../../Redux/Slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { findUserByEmail } from "../../utils/authStorage";
import { saveAuthData } from "../../utils/authTokenStorage";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: loginDefaultValues });

  const onSubmit = (data) => {
    const user = findUserByEmail(data.email);

    if(!user) {
      alert('User not found. Please register first.');
      return;
    }
    if (user.password !== data.password) {
      alert('Incorrect password!');
      return;
    }

    const userData = {
      name: user.username,
      email: user.email
    };
    const token = 'localStorageToken123'

    saveAuthData(userData, token);
    dispatch(
      loginSuccess({
        user: userData,
        token: token,
      })
    );
    alert('Login successful!');
    navigate('/products');
  };
  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div
        className={style.field}
        onClick={() => document.getElementById("email").focus()}
      >
        <label htmlFor="email">Email ID: </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          {...register("email", { required: "Email is required" })}
        />
      </div>
      {errors.email && <span className={style.error}>{errors.email.message}</span>}

      <div
        className={style.field}
        onClick={() => document.getElementById("password").focus()}
      >
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Minimum 6 characters" },
          })}
        />
      </div>
      {errors.password && (
        <span className={style.error}>{errors.password.message}</span>
      )}

      <button type="submit">Login</button>
      <p className={style.loginRedirect}>
        Don't have an account? <Link to="/auth/register">Register now</Link>.
      </p>
    </form>
  );
};

export default LoginForm;
