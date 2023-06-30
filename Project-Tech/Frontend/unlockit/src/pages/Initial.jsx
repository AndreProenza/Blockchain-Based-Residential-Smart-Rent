import { DisplayInitial } from "../components/DisplayInitial";
import { NavigatorInitial } from "../components/NavigatorInitial";
import { useEffect, useState } from 'react';
import axios from "axios";
import UserEndpoint from '../endpoints/UserEndpoint';
import Auth from '../auth/Auth';
import { useNavigate } from 'react-router-dom';
import { Load } from '../pages/Load';

import '../components-css/DisplayInitial.css';

export const Initial = () => {

  const navigate = useNavigate();

  const isLoggedInUrl = UserEndpoint.isLoggedIn;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        if (Auth.getTokenFromSessionStorage() !== null) {
          const response = await axios.get(isLoggedInUrl, Auth.authHeader());
          console.log("Status: ", response.status);
          if (response.status === 200) {
            navigate("/search");
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    isLoggedIn();

  }, [isLoggedInUrl, navigate]);

  if (loading) {
    return <Load />;
  }

  return (
    <>
      <div className="banner">
        <NavigatorInitial />
        <DisplayInitial />
      </div>
    </>
  );
};