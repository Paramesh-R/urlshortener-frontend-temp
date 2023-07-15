import React from 'react'

const AuthMsg = ({ title, message }) => {
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
                                <h5 className="card-title text-center my-3 fw-light fs-3">{title ? title : "Welcome"}</h5>
                                <p className="lead text-center">{message ? message : " "}</p>


                                {/* BUTTON -> OK  */}

                                <div className="d-flex justify-content-center align-items-center">
                                    <div className="d-grid  w-5">
                                        <a className="btn btn-primary btn-login text-uppercase fw-bold" href='/'>OK</a>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthMsg