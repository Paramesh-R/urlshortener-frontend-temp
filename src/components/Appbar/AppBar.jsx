import React, { useState } from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const AppBar = ({ userEmail }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  console.log(userEmail)

  const logoutOnClick = () => {
    removeCookie("token")
    navigate("/sign-in");
    toast.success("User Logged Out")
  }


  return (
    <div className="appbar">
      <Navbar key={'lg'} expand='lg' className="bg-body-tertiary mb-3" bg="light">
        <Container fluid>
          <Navbar.Brand href="/"><img src="./assets/images/logo.png" alt="logo" width={'100px'} /> </Navbar.Brand>
          <Navbar.Text>
                  | Signed in as: <b>{userEmail}</b> 
                </Navbar.Text>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
               
                <Nav.Link href="/">Dashboard</Nav.Link>
                {/* <Nav.Link href="/profile">Profile</Nav.Link> */}

                {isLoggedIn
                  ? (<Nav.Link onClick={() => logoutOnClick()}>Logout</Nav.Link>)
                  : ("")
                }

                {/*  <NavDropdown
                  align={"end"}
                  title="Profile"
                  id={`offcanvasNavbarDropdown-expand-lg`}
                >
                  <NavDropdown.Item>
                    <Navbar.Text>
                      Signed in as: <b>{userEmail}</b>
                    </Navbar.Text>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>

                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
              {/* SEARCH
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

    </div>
  )
}

export default AppBar