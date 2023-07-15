import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChangePassword = () => {

    const navigate = useNavigate();
    const { resetToken } = useParams();
    const [resetPasswordPayload, setResetPasswordPayload] = useState({ resetToken, password: "", confirmPassword: "" })
    console.log(resetPasswordPayload)

    const handleSubmit = async (ev) => {

        ev.preventDefault();

        // throw Error when Password does not match
        if (resetPasswordPayload.password !== resetPasswordPayload.confirmPassword) {
            toast.error(`Password does not match`)
            return true;
        }

        // throw Error when Password length is less than 8
        if (resetPasswordPayload.password.length < 8) {
            toast.error(`Password must be minimum 8 characters`)
            return true;
        }

        await axios
            .post(
                `${process.env.REACT_APP_SERVER_URL}/api/users/password/reset/${resetToken}`,
                { ...resetPasswordPayload },
                { withCredentials: true }
            )
            .then(
                function (response) {
                    // Handle successful response
                    if (response.data.success === true) {
                        toast.success(response.message);
                        setTimeout(() => { navigate("/sign-in"); }, 1000);
                    }
                }
            )
            .catch(
                function (error) {


                    if (error.response.status === 404) {
                        return toast.error("User email does not exist", error)
                    }
                    toast.error(error.response.data)
                    setTimeout(() => { navigate("/sign-in"); }, 1000);
                }
            )


    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setResetPasswordPayload({
            ...resetPasswordPayload,
            [name]: value,
        });
    };

    return (
        <>

            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="row">
                    <div className="col mx-auto">
                        <div className="card border-0 shadow rounded-3 my-5 " style={{ minWidth: "350px", minHeight: "400px" }}>
                            <div className="card-body p-4 p-sm-5">

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
                                <h5 className="card-title text-center my-3 fw-light fs-3">New Password</h5>

                                {/* FORM - Sign Up */}
                                <form onSubmit={handleSubmit}>


                                    {/* -----------------Password 1----------------- */}
                                    <div className="form-floating mb-3">
                                        <input
                                            className="form-control"
                                            id="floatingPassword1"
                                            placeholder="Password"
                                            type="password"
                                            name="password"
                                            value={resetPasswordPayload.password}
                                            required
                                            onChange={(event) => handleOnChange(event)}
                                        />
                                        <label htmlFor="floatingPassword">
                                            <span className="text-muted">
                                                Enter New Password
                                            </span>
                                        </label>
                                    </div>
                                    {/* -------------------------------------------- */}

                                    {/* -----------------Password 2----------------- */}
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="floatingconfirmPassword"
                                            placeholder="Password"
                                            name="confirmPassword"
                                            value={resetPasswordPayload.confirmPassword}
                                            onChange={(event) => handleOnChange(event)}
                                        />
                                        <label htmlFor="floatingPassword">
                                            <span className="text-muted"
                                            >Re-Enter Password
                                            </span>
                                        </label>
                                    </div>
                                    {/* -------------------------------------------- */}

                                    {/* <div className="m-3 text-center">
                                        <a href="javascript(void)" className="text-secondary text-decoration-none "><small>Forgot password?</small></a>
                                    </div> */}

                                    {/* --------- BUTTON - UPDATE PASSWORD --------- */}
                                    <div className="d-grid">
                                        <button

                                            className='btn btn-login text-uppercase fw-bold btn-primary'
                                            disabled={(resetPasswordPayload.password === "" || resetPasswordPayload.confirmPassword === "")}
                                            type="submit"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                    {/* -------------------------------------------- */}
                                </form>

                                <div className="m-3 text-center text-muted">
                                    <small>
                                        Existing User? <Link to={"/sign-in"} className="text-muted">Sign In</Link>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword