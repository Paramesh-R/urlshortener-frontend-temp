import jwtDecode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const [cookies, setCookie, removeCookie] = useCookies([]);

    function isTokenExpired(token) {
        if (cookies.token) {
            const decodedToken = jwtDecode(cookies.token);
            return decodedToken.exp < (Date.now() / 1000);
        } else {
            return false;
        }
    }

    return isTokenExpired ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoutes