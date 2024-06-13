import PropTypes from 'prop-types';
// use ref allows creating mutable references that persist across renders
import { useRef, useState } from 'react';
import { updateUser } from '../../utils/data/userData';

function EditProfileForm({ user, onUpdate }) {
  const [bio, setBio] = useState(user.bio || '');
  const [profileImage, setProfileImage] = useState(user.profile_image_url || '');
  const bioRef = useRef();
  const profileImageRef = useRef();

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      bio: bioRef.current.value,
      profile_image_url: profileImageRef.current.value,
    };

    updateUser(updatedUser).then((res) => {
      onUpdate(res);
    });
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className="field">
        <label className="label" htmlFor="bio">Bio</label>
        <div className="control">
          <textarea id="bio" className="textarea" ref={bioRef} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell us about yourself..." />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="profileImage">Profile Image URL</label>
        <div className="control">
          <input id="profileImage" className="input" type="text" ref={profileImageRef} value={profileImage} onChange={(e) => setProfileImage(e.target.value)} placeholder="Enter profile image URL" />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

EditProfileForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditProfileForm;
