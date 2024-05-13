import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

const USERS_URL = 'users';

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axiosPrivate.post(`${USERS_URL}/logout/`, {}, {
                withCredentials: true,
            });
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout