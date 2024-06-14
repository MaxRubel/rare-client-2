// import PropTypes from 'prop-types';
import { useAuth } from './authContext';
import Signin from '../../components/utils/Signin';
import NavBar from '../../components/nav/NavBar';
import NewUserForm from '../../components/forms/NewUserForm';

// eslint-disable-next-line no-unused-vars, react/prop-types
const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { rareUser, userLoading, oAuthUser } = useAuth();
  // if user state is null, then show loader

  if (userLoading) {
    return <div>Loading...</div>;
  }

  // what the user should see if they are logged in
  if (oAuthUser && rareUser) {
    return (
      <>
        <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="container">
          {'valid' in rareUser ? 'not a user' : <Component {...pageProps} />}
        </div>
      </>
    );
  }
  if (oAuthUser && !rareUser) {
    return (
      <NewUserForm />
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;
