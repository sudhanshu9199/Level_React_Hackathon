import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Redux/Slice/authSlice";
import { removeAuthData } from "../utils/authTokenStorage";

const useAuthActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    // 1. Clear Local Storage immediately
    removeAuthData();

    // 2. Reset Redux State
    dispatch(logoutUser());

    // 3. Navigate to Home or Login
    navigate("/");
  };

  return { logout };
};

export default useAuthActions;
