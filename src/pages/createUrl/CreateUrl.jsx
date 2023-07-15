import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Button, Form, InputGroup } from 'react-bootstrap'
import PageHead from '../../components/PageHead/PageHead'
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';
// import { useCookies } from 'react-cookie';
// import jwtDecode from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import copy from "copy-to-clipboard";

const CreateUrl = (props) => {

    // const navigate = useNavigate();
    // const [cookies, setCookie, removeCookie] = useCookies([]);

    const { userInfo } = useContext(UserContext);
    const user_id = userInfo?._id

    const [urlPayload, setUrlPayload] = useState({ "originalLink": "", "name": "" })
    const [shortUrl, setShortUrl] = useState("");

    const { originalLink, name } = urlPayload;

    /*   function isTokenExpired(token) {
          const decodedToken = jwtDecode(token);
          return decodedToken.exp < (Date.now() / 1000);
  
      } */

    const onInputChange = (e) => {
        setUrlPayload({ ...urlPayload, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            await axios
                .post(`${process.env.REACT_APP_SERVER_URL}/api/url`,
                    { ...urlPayload, createdBy: user_id },
                    { withCredentials: true }
                )
                .then(response => {

                    // Nano URL already Exist
                    if (response.status === 200) {
                        toast.success("Link already exists!")
                        setShortUrl(`${window.location.href}` + response.data.urlCode)
                    }

                    // New Nano URL Created
                    if (response.status === 201) {
                        toast.success(`Link created successfully`)
                        setShortUrl(`${window.location.href}` + response.data.newUrlData.urlCode)
                    }
                })
                .catch(error => {
                    console.log("Error");
                    toast.warning(error.response.status + " " + error.response.data.message) //TEST
                })
        } catch (error) {
            console.log("Handle Submit" + error)
        }

    }




    const copyToClipboard = () => {
        copy(shortUrl);
        toast.success(`URL copied to clipboard`);
    }



    return (
        <>
            {/* --------------------Page Header-------------------- */}
            <div className="container mt-2 px-0">
                <PageHead page_title={"Create a new short url"} />
            </div>
            {/* --------------------------------------------------- */}

            <div className="container mt-5 px-2">


                {/* ----------Form Container - Create New URL---------- */}
                <div className="container">

                    <Form id='addUrlForm' onSubmit={handleSubmit} >

                        {/* -----------Field Original URL----------- */}
                        <Form.Group className="mb-3" controlId="formUrl">
                            <Form.Label>Original url</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="https://example.com/..."
                                name='originalLink'
                                value={originalLink}
                                onChange={(e) => onInputChange(e)}
                                autoFocus
                                required
                            />
                        </Form.Group>
                        {/* ---------------------------------------- */}


                        {/* -------------Field URL Name------------- */}
                        <Form.Group className="mb-3" controlId="formUrlName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nano url"
                                name='name'
                                value={name}
                                onChange={(e) => onInputChange(e)}
                                autoFocus
                                required
                            />
                        </Form.Group>
                        {/* ---------------------------------------- */}



                        {/* -------Actions - Generate Short URL------- */}
                        <div className="d-flex flex-column g-3 justify-content-center align-items-center">

                            {/* -------Btn - Generate------- */}
                            <div className="p-2">
                                <Button
                                    variant="outline-primary"
                                    type='submit'
                                    form='addUrlForm'
                                >
                                    Generate a Short Url
                                </Button>
                            </div>
                            {/* ------------------------ */}

                            {/* -------Btn Cancel------- */}
                            <div className='p-2'>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => props.setShowUrlAddView(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                            {/* ------------------------ */}
                        </div>
                    </Form>
                </div>



                <br />


                {
                    Boolean(shortUrl)
                    &&
                    <>

                        <Form.Group /* as={Col} */ className='mb-5' md="4" controlId="validationCustomUsername">
                            <Form.Label><h3>Short Url</h3></Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="Short URL"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    value={shortUrl}
                                    readOnly
                                />

                                <button
                                    onClick={copyToClipboard}
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    id="button-addon2"
                                >
                                    <Icon icon="uil:copy" height="40" />
                                </button>
                            </InputGroup>
                        </Form.Group>

                    </>
                }
            </div>
        </>
    )
}

export default CreateUrl