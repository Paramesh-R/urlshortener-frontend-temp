import React, { useState } from 'react'
import ModalCentered from '../../components/Modal/ModalCentered.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [reset_email, setReset_email] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(`${process.env.REACT_APP_SERVER_URL}/api/users/password/forgot_password`)
            const { data } = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/users/password/forgot_password`,
                { reset_email },
                { withCredentials: true }
            );
            console.log(data)
            setModalShow(true);
        } catch (error) {
            // alert(error)
            console.log()
            if (error.response.status === 404) {
                toast.error("User email does not exist", error);
            }
        }


    }

    return (
        <>
            <div className="container min-vh-100 d-flex align-items-center justify-content-center">

                <div className="row">
                    <div className="col">
                        <div className="card border-0 shadow rounded-3 my-5 " style={{ minWidth: "350px", minHeight: "400px" }}>
                            <div className="card-body">
                                {/* Logo */}
                                <div className="d-flex justify-content-center align-items-center p-4">
                                    <img
                                        src="../assets/images/logo.png"
                                        alt="logo"
                                        loading="lazy"
                                        className="w-4/5"
                                    />
                                </div>

                                {/* Heading */}
                                <h5 className="card-title text-center my-3 fw-light fs-3">
                                    Reset Password
                                </h5>

                                {/* Form - Reset Email */}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            name="email"
                                            value={reset_email}
                                            onChange={(event) => setReset_email(event.target.value)}
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Registered Email"
                                            required
                                        />
                                        <label htmlFor="floatingInput"><span className="text-muted">Registered Email</span></label>
                                    </div>



                                    <div className="d-grid m-4">
                                        <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Reset Password</button>
                                    </div>

                                </form>

                                {/* Sign In or Sign Up */}
                                <div className="m-3 text-center">
                                    <a href="/sign-in" className="text-secondary text-decoration-none "><small>Sign In</small></a>
                                    <span className='text-muted px-3'>|</span>
                                    <a href="/sign-up" className="text-secondary text-decoration-none "><small>Sign Up</small></a>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalCentered
                show={modalShow}
                onHide={() => { setModalShow(false); navigate("/sign-in"); }}
                modalTitle="Reset Email Sent."
                message="Reset link has been sent to the registered email."
            />
        </>
    )
}

export default ResetPassword