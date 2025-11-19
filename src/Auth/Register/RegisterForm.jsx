import style from "./Register.module.scss";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { saveUser } from "../../utils/authStorage";
import { defaultValues } from "./formSchema";

const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
      const { email, username, password } = data;
      saveUser({ email, username, password });
      navigate('/auth/login');
  };
  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email address"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && (
        <span className={style.error}>{errors.email.message}</span>
      )}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        placeholder="Choose a username"
        {...register("username", { required: "Username is required" })}
      />
      {errors.username && (
        <span className={style.error}>{errors.username.message}</span>
      )}
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Minimum 6 characters" },
        })}
      />
      {errors.password && (
        <span className={style.error}>{errors.password.message}</span>
      )}

      <div className={style.checkpoint}>
        <input
          type="checkbox"
          id="agree"
          {...register("agree", { required: true })}
        />
        <label htmlFor="agree">
          I agree to the <Link>Terms of Service</Link> and{" "}
          <Link>Privacy Policy</Link>
        </label>
      </div>
      {errors.agree && (
        <span className={style.error}>You must agree before submitting</span>
      )}
      <button type="submit">Create Account</button>
      <p className={style.loginRedirect}>
        Already registered? <Link to="/auth/login">Login</Link>.
      </p>
    </form>
  );
};
export default RegisterForm;
