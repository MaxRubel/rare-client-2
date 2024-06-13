/* eslint-disable import/no-extraneous-dependencies */
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Nav,
  Navbar,
}
  from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Logo from './rare.jpeg';

function AppNavBar({ token, setToken }) {
  const router = useRouter();

  const catManager = () => {
    router.push('/categoryManager');
  };
  const tagManager = () => {
    router.push('/tagManager');
  };
  const userPosts = () => {
    router.push('/userPosts');
  };
  const profilePage = () => {
    router.push('/profilePage');
  };

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container>
        <Image src={Logo} height="100px" width="100px" alt="Rare Logo" />
        <Link passHref href="/">
          <Navbar.Brand>
            <h2 className="title is-4"> Rare Publishing </h2>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Link href="/post/new" passHref>
            <Button id="add-btn">
              <FontAwesomeIcon icon={faPlus} fade style={{ color: '#74C0FC' }} /> Post
            </Button>
          </Link>
          <Nav className="me-auto">
            {token ? (
              <div className="btn-nav-row">
                <Button className="nav-button" onClick={userPosts}> My Posts </Button>
                <Button className="nav-button" onClick={profilePage}>My Profile</Button>
                <Button className="nav-button" onClick={catManager}>
                  Category Manager
                </Button>
                <Button className="nav-button" onClick={tagManager}>Tag Manager</Button>
              </div>
            ) : (
              ''
            )}

            {token ? (
              <div className="btn-nav-row">
                <Button
                  type="button"
                  className="nav-button"
                  style={{ marginLeft: '10px' }}
                  onClick={() => {
                    setToken('');
                    router.push('/login');
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link passHref href="/register">
                  <Nav.Link>Register</Nav.Link>
                </Link>
                <Link passHref href="/login">
                  <Nav.Link>Login</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

AppNavBar.propTypes = {
  token: PropTypes.string.isRequired,
  setToken: PropTypes.func.isRequired,
};
export default AppNavBar;
