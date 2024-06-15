import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/forms.css';

import ViewDirectorBasedOnUserAuthStatus from '../utils/data/ViewDirector';
import { AuthProvider } from '../utils/data/authContext';

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {' '}
      {/* gives children components access to user and auth methods */}
      <ViewDirectorBasedOnUserAuthStatus
        // if status is pending === loading
        // if status is logged in === view app
        // if status is logged out === sign in page
        component={Component}
        pageProps={pageProps}
      />
    </AuthProvider>
  );
}

export default MyApp;
