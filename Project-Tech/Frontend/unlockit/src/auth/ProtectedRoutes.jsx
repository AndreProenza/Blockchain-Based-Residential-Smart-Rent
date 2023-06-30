import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserEndpoint from '../endpoints/UserEndpoint';
import axios from "axios";
import Auth from '../auth/Auth';
import { Load } from '../pages/Load';
import { useSelector, useDispatch } from 'react-redux';
import { setUserLoginId } from '../features/userLoginSlice'

export default function ProtectedRoutes() {

    const isLoggedInUrl = UserEndpoint.isLoggedIn;
    const getUserIdUrl = UserEndpoint.getUserId;

    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const userLogin = useSelector((state) => state.userLogin);
    const dispatch = useDispatch();

    useEffect(() => {
        const isLoggedIn = async () => {
            try {
                const response = await axios.get(getUserIdUrl, Auth.authHeader());
                console.log("Status: ", response.status);
                if (response.status === 200) {
                    setLoggedIn(true);
                    dispatch(setUserLoginId(response.data.id));
                    //console.log("response: ", response.data);
                    console.log("userLogin.id: ", userLogin.id);
                }
                else {
                    setLoggedIn(false);
                }
            } catch (error) {
                console.log(error);
                setLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        isLoggedIn();

    }, [isLoggedInUrl, userLogin.id]);


    if (loading) {
        return <Load />;
    }

    return loggedIn ? <Outlet /> : <Navigate to="/" />;
}
