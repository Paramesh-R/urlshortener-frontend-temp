import React from 'react'

const PageHeadLeft = ({ page_title }) => {
    return (
        <>
            < div className="d-flex justify-content-between w-100 flex-wrap py-5" >
                <div className="mb-3 mb-lg-0">
                    <div className="pagetitle">
                        <h2>{page_title ? page_title : "Page Title"}</h2>
                    </div>
                </div>
            </div >
        </>
    )
}

const PageHead = ({ page_title }) => {
    return (
        <>
            {/* <!------ Page header with logo and tagline------> */}
            <header className="py-2 rounded bg-light mb-4">
                <div className="container">
                    <div className="text-center my-1">
                        <h1 className="fw-bolder">{page_title ? page_title : "Page Title"}</h1>
                        <p className="lead mb-0"></p>
                    </div>
                </div>
            </header>
            {/* ------------------------------------------------- */}
        </>
    )
}

export default PageHead