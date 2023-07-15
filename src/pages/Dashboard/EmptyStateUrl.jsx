import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ShortUrlDataTable from './ShortUrlDataTable';


const EmptyStateUrl = (props) => {
    // Data
    const [myShortUrl, setMyShortUrl] = useState([]);
    const [itemsCount, setItemsCount] = useState(0)

    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {                           //Get Data of Short URL
        const fetchData = async () => {

            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/url?page=${page}`, {
                withCredentials: true
            })

            // response.data.page
            setMyShortUrl(response.data.items)          // Set Data to State
            setItemsCount(response.data.count)          // Total Count of items
            setTotalPages(response.data.pageCount)      // Set Total Page Count to State

            console.log(itemsCount, myShortUrl)
        }

        fetchData()
        
    }, [page])

    return (
        <>
            <div className="container d-flex flex-column align-items-center">
                {/* <p className='text-muted'>You don't have any short url</p> */}

                {/* Display Short URL Content in table */}
                {<ShortUrlDataTable /* data={myShortUrl} */ />}



                {/* -------------------------------------------------- */}

                {/* --------- Button to Create New Short URL ---------*/}
                <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => props.setShowUrlAddView(true)}
                >
                    Create New Url
                </button>
                {/* -------------------------------------------------- */}

            </div>
        </>
    )
}

export default EmptyStateUrl