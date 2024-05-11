import axios from '../api/axios';
import useAuth from './useAuth';
const REFRESH_URL = 'users/token/refresh/';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.post(REFRESH_URL, {}, {
            withCredentials: true,
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.token);
            return { ...prev, token: response.data.access}
        });
        return response.data.access;
    }
    return refresh;
};

export default useRefreshToken;
