/* eslint-disable implicit-arrow-linebreak */
import firebase from 'firebase/app';
import 'firebase/auth';

const checkUser = (uid) =>
  new Promise((resolve, reject) => {
    fetch('http://localhost:8000/checkuser', {
      method: 'POST',
      body: JSON.stringify({
        uid,
      }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((resp) => resolve(resp.json()))
      .catch(reject);
  });

const loginUser = (user) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
    }),
  }).then((res) => res.json());

const registerUser = (newUser) =>
  fetch('http://localhost:8000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(newUser),
  }).then((res) => res.json());

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

// eslint-disable-next-line object-curly-newline
export { checkUser, signIn, signOut, registerUser, loginUser };
