import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../Redux/Slice/authSlice";

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(logoutUser());

        navigate('/');
    };
    return logout;
};
export  default useLogout;