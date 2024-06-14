// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

import React, {
  createContext, //
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { firebase } from './client';
import { checkUser } from './AuthManager';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

const AuthProvider = (props) => {
  const [rareUser, setRareUser] = useState(null);
  const [oAuthUser, setOAuthUser] = useState(null);

  // there are two types of users:
  //        - oAuth (logged in with firebase auth)
  //        - rareUser (registered with rare/in the Django database)

  const updateUser = useMemo(
    () => (uid) => checkUser(uid).then((userData) => {
      setRareUser({ fbUser: oAuthUser, ...userData });
    }),
    [oAuthUser],
  );

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        setOAuthUser(fbUser);
        checkUser(fbUser.uid).then((userData) => {
          let userObj = {};
          if (!userData.uid) {
            userObj = null;
          } else {
            userObj = { fbUser, uid: fbUser.uid, ...userData };
          }
          setRareUser(userObj);
        });
      } else {
        setOAuthUser(false);
      }
    }); // creates a single global listener for auth state changed
  }, []);

  const value = useMemo(
    // https://reactjs.org/docs/hooks-reference.html#usememo
    () => ({
      rareUser,
      oAuthUser,
      updateUser,
      userLoading: oAuthUser === null,
      // as long as user === null, will be true
      // As soon as the user value !== null, value will be false
    }),
    [rareUser, oAuthUser, updateUser],
  );

  return <AuthContext.Provider value={value} {...props} />;
};
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
