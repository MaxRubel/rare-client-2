/* eslint-disable import/no-extraneous-dependencies */
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import { useAuth } from '../../utils/data/authContext';
import { signOut } from '../../utils/data/AuthManager';

function AppNavBar() {
  const { oAuthUser, user } = useAuth();
  const router = useRouter();

  const home = () => {
    router.push('/');
  };
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
  const reactionManager = () => {
    router.push('/reactionManager');
  };
  const userManager = () => {
    router.push('/userManager');
  };

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container>
        <div style={{ cursor: 'pointer' }}>
          <Image src={Logo} height="80px" width="80px" alt="Rare Logo" onClick={home} />
        </div>
        <Link passHref href="/">
          <div style={{ color: 'white', padding: '15px', cursor: 'pointer' }}>
            <h2 className="title is-4"> Rare Publishing </h2>
          </div>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Link href="/post/new" passHref>
            <Button id="add-btn" style={{ marginRight: '9px' }}>
              <FontAwesomeIcon icon={faPlus} fade style={{ color: '#74C0FC' }} /> Post
            </Button>
          </Link>
          <Nav className="me-auto">
            {user ? (
              <div className="btn-nav-row">
                <button type="button" className="nav-button" onClick={userPosts}> My Posts </button>
                <button type="button" className="nav-button" onClick={profilePage}>My Profile</button>
                <button type="button" className="nav-button" onClick={catManager}>
                  Category Manager
                </button>
                <button type="button" className="nav-button" onClick={tagManager}>Tag Manager</button>
                <button type="button" className="nav-button" onClick={reactionManager}>Reaction Manager</button>
                <button type="button" className="nav-button" onClick={userManager}>User Manager</button>
              </div>
            ) : (
              ''
            )}
            {oAuthUser ? (
              <div className="btn-nav-row">
                <Button
                  type="button"
                  className="btn btn-danger"
                  style={{ marginLeft: '10px' }}
                  onClick={signOut}
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
export default AppNavBar;
