import {useDispatch, useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';
import {loadUser} from "../service/userAction";

const PrivateRoute = ({ children }) => {
    const { loading, isAuthenticated } = useSelector(state => state.user);

    return (
        <>
            {!loading && (
                !isAuthenticated ? <Navigate to="/login" /> : children
            )}
        </>
    );
};

export default PrivateRoute;