import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'


const RedirectFailed = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Oops!</span> Short Url is removed.</p>
                <p className="lead">
                    The Short url you’re looking for doesn’t exist.
                </p>
                <Link to="/" className=" btn btn-danger">Go Home</Link>
            </div>
        </div >

    )
}

const Redirecting = () => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="text-center">
                    <h1 className="display-1 fw-bold">Redirecting...</h1>
                </div>
            </div >
        </>
    )
}

const RedirectShortUrl = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { shortUrl } = useParams()

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/url/${shortUrl}`)
            .then(response => { window.open(response.data.sourceUrl, '_self') })
            .catch(err => { console.log(err); setIsLoading(false); }
            )
    })

    if (isLoading) {
        return <Redirecting />;
    } else {
        return <RedirectFailed />;
    }
}

export default RedirectShortUrl