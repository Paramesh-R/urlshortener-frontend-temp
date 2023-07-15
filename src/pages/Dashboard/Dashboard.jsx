import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CreateUrl from '../createUrl/CreateUrl';
import EmptyStateUrl from './EmptyStateUrl';

import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import AppBar from '../../components/Appbar/AppBar';
import ShortUrlDataTable from './ShortUrlDataTable';


const Dashboard = () => {

  const navigate = useNavigate();
  const [showUrlAddView, setShowUrlAddView] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [userEmail, setUserEmail] = useState("");
  function isTokenExpired(token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp < (Date.now() / 1000);

  }


  // ------------Validate TOKEN Expiration (USE EFFECT)---------
  useEffect(() => {

    
    if (cookies.token) {                      // token exists and expired -> SignIn
      if (isTokenExpired(cookies.token)) {
        navigate("/sign-in");
      }
      else{
        setUserEmail(jwtDecode(cookies.token).email)
      }
    } else {                                  // token does not exist -> SignIn
      console.log("No Token in Cookies");
      navigate("/sign-in");
    }
  }, [cookies.token])
  // -----------------------------------------------------------





  return (
    <>
      <div className="dashboard">
        <AppBar userEmail={userEmail}/>
        {
          !showUrlAddView
          && (<ShortUrlDataTable setShowUrlAddView={setShowUrlAddView} />)
        }
        {
          showUrlAddView &&
          (<CreateUrl setShowUrlAddView={setShowUrlAddView} />)
        }

      </div>
    </>
  )

}

export default Dashboard