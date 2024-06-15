/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/data/authContext';
import { createNewUser, patchUser } from '../../api/users';
import { signOut } from '../../utils/data/AuthManager';

export default function NewUserForm({ user }) {
  const update = user?.id;

  const { oAuthUser, updateUser } = useAuth();

  const initValue = {
    first_name: '',
    last_name: '',
    bio: '',
    profile_image_url: '',
    email: '',
    uid: oAuthUser.uid,
  };

  const [formInput, setFormInput] = useState(initValue);
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      setFormInput(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((preVal) => ({ ...preVal, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!update) {
      console.log('create');
      createNewUser(formInput).then(() => {
        updateUser(oAuthUser.uid).then(() => {
          router.push('/');
        });
      });
    } else {
      patchUser(formInput, user.id).then(() => {
        updateUser(oAuthUser.uid).then(() => {
          router.push('/profilePage');
        });
      });
    }
  };

  return (
    <>
      {!user?.id && (
      <Button type="button" size="lg" className="btn-danger" onClick={signOut}>
        Sign Out
      </Button>
      )}
      <form className="new-user-form" onSubmit={handleSubmit}>
        {update ? (
          (<h1> Update your info:</h1>)
        ) : <h1> Shwelcome - Please Do This:</h1>}
        <div className="field">
          <label className="label" htmlFor="first_name">First Name</label>
          <div className="control">
            <input
              name="first_name"
              className="form-control"
              value={formInput.first_name}
              onChange={handleChange}
              placeholder="First name..."
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="last_name">Last Name</label>
          <div className="control">
            <input
              name="last_name"
              className="form-control"
              value={formInput.last_name}
              onChange={handleChange}
              placeholder="Last name..."
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="bio">Bio</label>
          <div className="control">
            <textarea
              name="bio"
              className="form-control"
              value={formInput.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="bio">Email</label>
          <div className="control">
            <textarea
              name="email"
              className="form-control"
              value={formInput.email}
              onChange={handleChange}
              placeholder="What is yo email..."
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="bio">Profile Photo:</label>
          <div className="control">
            <textarea
              name="profile_image_url"
              className="form-control"
              value={formInput.profile_image_url}
              onChange={handleChange}
              placeholder="Your profile photo link"
            />
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <div className="control">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
