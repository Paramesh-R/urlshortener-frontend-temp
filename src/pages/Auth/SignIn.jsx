import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ModalCentered from "../../components/Modal/ModalCentered.jsx";
import { useCookies } from "react-cookie";
import { UserContext } from "../../UserContext";





const SignIn = () => {
    const navigate = useNavigate();
    const { setUserInfo } = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);


    const initialData = { email: "", password: "", remember: false, };
    const [modalShow, setModalShow] = useState(false);

    /* Login Payload */
    const [loginPayload, setLoginPayload] = useState(initialData);
    const { email, password } = loginPayload;


    // Handle Email and Password fields onChange events
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setLoginPayload({ ...loginPayload, [name]: value, });
    };

    const handleError = (err) => toast.error(err);

    const handleSuccess = (msg) => toast.success(msg);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`${process.env.REACT_APP_SERVER_URL}/api/users/login`)
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/api/users/login`,
                { ...loginPayload },
                { withCredentials: true }
            );
            console.log(data);


            // Validate User VERIFIED Account
            if (!data.user.verified) return signOut_RedirectToSignIn();

            const { success, message } = data;
            setUserInfo(data.user)
            console.log("message");
            console.log(message);

            if (success) {
                handleSuccess()
                setTimeout(() => { navigate("/", 1000) })
            } else {
                handleError()
            }

        } catch (error) {
            console.log("\n Error - SignIn : " + error);
            toast.error(error.response.data.message)
            console.log(error);                      //TEST
        }

        setLoginPayload(initialData);

    }

    const signOut_RedirectToSignIn = () => {
        removeCookie("token");
        setModalShow(true);

    }


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
                                {/* ________________________ */}

                                {/* Title */}
                                <h5 className="card-title text-center my-3 fw-light fs-3">Sign In</h5>

                                {/* Form */}
                                <form onSubmit={handleSubmit}>

                                    {/* Field - User Email */}
                                    <div className="form-floating mb-3">
                                        <input
                                            className="form-control" id="floatingInput" placeholder="Email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            required
                                            onChange={(e) => handleOnChange(e)}
                                        />
                                        <label htmlFor="floatingInput"><span className="text-muted">Email</span></label>
                                    </div>
                                    {/* ________________________ */}

                                    {/* Field - User Password */}
                                    <div className="form-floating mb-3">
                                        <input
                                            className="form-control" id="floatingPassword" placeholder="Password"
                                            type="password"
                                            name="password"
                                            value={password}
                                            required
                                            onChange={(e) => handleOnChange(e)}
                                        />
                                        <label htmlFor="floatingPassword"><span className="text-muted">Password</span></label>
                                    </div>
                                    {/* ________________________ */}

                                    {/* Link - Reset Password */}
                                    <div className="m-3 text-center">
                                        <a href="/reset-password" className="text-secondary text-decoration-none "><small>Forgot password?</small></a>
                                    </div>
                                    {/* ________________________ */}


                                    {/* Button Sign In */}
                                    <div className="d-grid">
                                        <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign in</button>
                                    </div>
                                    {/* ________________________ */}

                                </form>

                                {/* Link - New User Registration */}
                                <div className="m-3 text-center text-muted">
                                    <small>
                                        New User? <Link to={"/sign-up"} className="text-muted">Sign up</Link>
                                    </small>
                                </div>
                                {/* ________________________ */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* VERTICALLY CENTERED MODEL */}
            <ModalCentered
                show={modalShow}
                onHide={() => { setModalShow(false); navigate("/sign-in"); }}
                modalTitle="Activate your account."
                message="Please follow the instructions in the email to verify your account."
            />
            {/* ________________________ */}
        </>
    )
}

export default SignIn