// import PropTypes from 'prop-types';
import { useAuth } from './authContext';
import Signin from '../../components/utils/Signin';
import NavBar from '../../components/nav/NavBar';
import NewUserForm from '../../components/forms/NewUserForm';

// eslint-disable-next-line no-unused-vars, react/prop-types
const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading, oAuthUser } = useAuth();

  // if user state is null, then show loader

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (oAuthUser && user?.active === false) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
      >
        <h1 style={{ color: 'red' }}>Sorry, your account has been disabled. Please contact an administrator for more information.</h1>
      </div>
    );
  }

  // what the user should see if they are logged in
  if (oAuthUser && user) {
    return (
      <>
        <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="container">
          {'valid' in user ? 'not a user' : <Component {...pageProps} />}
        </div>
      </>
    );
  }
  if (oAuthUser && user !== null) {
    return (
      <NewUserForm />
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;
