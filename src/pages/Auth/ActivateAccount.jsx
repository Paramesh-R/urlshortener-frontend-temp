import axios from 'axios';
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';




const ActivateAccount = () => {
    const { activationToken } = useParams();
    const [activationStatus, setActivationStatus] = useState('')
    const [isActivated, setIsActivated] = useState();

    useEffect(() => {
        // Make an API call to your backend server to activate the account
        // Pass the activation token as a parameter
        axios
            .post(`${process.env.REACT_APP_SERVER_URL}/api/users/activate/${activationToken}`)
            .then(response => response.data)
            .then(data => {
                console.log(data)
                // Handle the response from the server
                if (data.success) {
                    setActivationStatus('Account activated successfully!');
                    setIsActivated(true);
                } else {
                    setActivationStatus('Failed to activate account. Please try again.');
                    setIsActivated(false);
                }

            })
            .catch(error => {
                console.error('Error:', error);
                setActivationStatus('An error occurred. Please try again later.');
            });



    }, [activationToken]);
    
    console.log(activationStatus)

    /* return (
        <div>
            <h2>Account Activation</h2>
            <p>{activationToken ? activationToken : "None"}</p>
            <p>{activationStatus ? activationStatus : "None"}</p>
        </div>
        

    ); */

    /* activationStatus */
    return (
        <>
            {
                isActivated &&

                <div className="container d-flex flex-column gap-3 align-items-center justify-content-center min-vh-100">
                    <h1 className="display-6"><strong> Account Activated Successfully! </strong></h1>
                    <Icon icon="healthicons:happy-outline" color="#b2b2b2" height="130" />
                    <p className=' mx-auto w-75 text-center'>
                        Your account has been activated successfully.
                    </p>

                    <Link to={"/sign-in"} className="text-danger text-decoration-none blockquote ">Return to Sign In</Link>
                </div>
            }

            {
                !isActivated &&

                <div className="container d-flex flex-column gap-3 align-items-center justify-content-center min-vh-100">
                    <h1 className="display-6"><strong> Account Activation Failed! </strong></h1>
                    <Icon icon="icon-park-outline:emotion-unhappy" color="#b2b2b2" height="130" />
                    <p className=' mx-auto w-75 text-center'>
                        Activation token is invalid or has expired.
                    </p>

                    <Link to={"/sign-in"} className="text-danger text-decoration-none blockquote ">Return to Sign In</Link>
                </div>
            }
        </>
    );
}

export default ActivateAccount