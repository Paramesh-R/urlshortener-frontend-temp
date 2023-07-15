import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { formatISO9075 } from "date-fns";
import { toast } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom'

import axios from 'axios'
import copy from "copy-to-clipboard";

import './table.css';
import PageHead from '../../components/PageHead/PageHead'
import PaginationComp from '../../components/Pagination/PaginationComp';

const ShortUrlDataTable = (props) => {
    const [clicked, setClicked] = useState(false);
    const currentUrl = window.location.href;
    const [total_items, setTotal_items] = useState(0);
    const [myShortUrl, setMyShortUrl] = useState([]);

    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/url?page=${page}`, { withCredentials: true })
            .then(response => {
                setTotal_items(response.data.count)
                setMyShortUrl(response.data.items)
                setPage(response.data.page)
                setTotalPages(response.data.pageCount)
                console.log(response.data)

            })
            .catch(error => {
                console.log("UseEffect Error")
                console.log(error)
                if (error.message === "jwt expired") {
                    Navigate("/sign-in")
                }
            })

    }, [page])

    function wait() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/url?page=${page}`, { withCredentials: true })
            .then(response => {
                setTotal_items(response.data.count)
                setMyShortUrl(response.data.items)
                setPage(response.data.page)
                setTotalPages(response.data.pageCount)
                console.log(response.data)

            })
            .catch(error => {
                console.log("UseEffect Error")
                console.log(error)
                if (error.message === "jwt expired") {
                    Navigate("/sign-in")
                }
            })

    }, [clicked])


    const TableHeader = () => {
        return (
            <>
                {/* ------------------ Table Header ------------------ */}
                <thead>
                    <tr className="bg-light">
                        <th scope="col" width="5%">#</th>
                        <th scope="col" width="8%">Date</th>
                        <th scope="col" width="5%">Views</th>
                        <th scope="col" width="10%">Name</th>
                        <th scope="col" width="20%">Url</th>
                        <th scope="col" width="20%">Short URL</th>
                        <th scope="col" className="text-center" width="5%"><span>Action</span></th>
                    </tr>
                </thead>
                {/* -------------------------------------------------- */}
            </>
        )
    }

    const UrlRow = ({ item, index, item_no }) => {

        const copyToClipboard = (copy_data) => {
            copy(copy_data);
            toast.success(`URL copied to clipboard`);
        }

        const handleDelete = (id) => {

            // Delete Item 
            axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/url/${id}`, { withCredentials: true })
                .then(response => { console.log(response) })
                .catch(err => { console.log(err) })

            // Show item after Delete
            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/url?page=${page}`, { withCredentials: true })
                .then(response => {
                    setTotal_items(response.data.count)
                    setMyShortUrl(response.data.items)
                    setPage(response.data.page)
                    setTotalPages(response.data.pageCount)
                    console.log(response.data)
                })
                .catch(error => console.log(error))

        };


        return (
            <tr>

                {/* Column 1 - SNo */}
                <td> {item_no + 1} </td>

                {/* Column 2 - Date */}
                <td>
                    {formatISO9075(new Date(item.created_at), { representation: 'date' })}
                </td>

                {/* Column 3 - No of Views */}
                <td>
                    {item.visitCount}
                </td>

                {/* Column 4 - Url Name */}
                <td>
                    <i className="fa fa-check-circle-o green" />
                    <span className="ms-1">{item.name}</span>
                </td>

                {/* Column 5 - Original Url */}
                <td data-bs-toggle="tooltip" data-bs-placement="top" title={item.originalLink}>
                    {item.originalLink.length > 20 ? item.originalLink.slice(0, 20) + '...' : item.originalLink}
                </td>

                {/* Column 6 - Short Url */}
                <td>
                    <Link
                        to={currentUrl + item.urlCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-secondary '
                        onClick={() => { wait().then(() => { setClicked(!clicked); }) }}
                    >
                        {item.urlCode}
                    </Link>
                </td>

                {/* Column 7 - Actions */}
                <td className="text-center d-flex">

                    {/* Action - Copy URL */}
                    <button className='btn p-0' onClick={() => copyToClipboard(currentUrl + item.urlCode)}>
                        <Icon icon="radix-icons:copy" width="30" />
                    </button>

                    {/* Action - Delete Url */}
                    <button className="btn p-0" onClick={() => handleDelete(item._id)}>
                        <Icon icon="fluent:delete-24-regular" width="30" />
                    </button>

                </td>
            </tr>
        )
    }


    // PAGINATION Function
    function handlePageChange(value) {
        if (value === "&laquo;" || value === "... ") { setPage(1) }
        else if (value === "&lsaquo;") { if (page !== 1) { setPage(page - 1) } }
        else if (value === "&rsaquo;") { if (page !== totalPages) { setPage(page + 1) } }
        else if (value === "&raquo;" || value === " ...") { setPage(totalPages) }
        else { setPage(value) }
    }




    return (
        <>
            {/* --------------------Page Header-------------------- */}
            <div className="container mt-2 px-0">
                <PageHead page_title={"Dashboard"} />
            </div>
            {/* --------------------------------------------------- */}

            {/* ------------------------Show Short Url Data------------------------ */}
            <div className="container d-flex flex-column align-items-center">


                {/* No Short URLS */}
                {total_items === 0 && <h4 className="text-center pb-4">You don't have any short url</h4>}

                {/* Has Short URLs */}
                {total_items > 0 &&

                    <>
                        <div className="container mt-5 px-2">


                            {/* TODO - SEARCH */}
                            {/* 
                            <div className="mb-2 d-flex justify-content-between align-items-center">

                                <div className="position-relative">
                                    <span className="position-absolute search"><i className="fa fa-search"></i></span>
                                    <input className="form-control w-100" placeholder="Sea/rch by order#, name..." />
                                </div>

                                <div className="px-2">

                                    <span>Filters <i className="fa fa-angle-down"></i></span>
                                    <i className="fa fa-ellipsis-h ms-3"></i>
                                </div>

                            </div>
 */}
                            {/* -------------------------------------------------- */}

                            {/* ---------------------- TABLE DATA --------------------------- */}
                            <div className="table-responsive">
                                <table className="table table-responsive table-borderless">
                                    <TableHeader />
                                    <tbody>
                                        {
                                            myShortUrl.map(
                                                (item, index) => (
                                                    <UrlRow
                                                        item={item}
                                                        index={index}
                                                        key={index}
                                                        item_no={((page - 1) * 10) + index}
                                                    />
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* ------------------------------------------------------------ */}
                        </div>


                        {/* ---------- PAGINATION ---------- */}
                        <div className='pagination-container'>
                            <PaginationComp
                                totalPage={totalPages}
                                page={parseInt(page)}
                                limit={5}
                                sibling={1}
                                onPageChange={handlePageChange}
                            />
                        </div>
                        {/* ------------------------------- */}

                    </>
                }


                {/* --------- Button to Create New Short URL ---------*/}
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => props.setShowUrlAddView(true)}
                >
                    Create New Url
                </button>
                {/* -------------------------------------------------- */}
            </div >
        </>
    )


}




export default ShortUrlDataTable

