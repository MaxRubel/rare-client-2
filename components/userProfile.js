import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import { useState } from 'react';
// import EditProfileForm from './forms/ProfileForm';

function ProfileCard({ userObj }) {
  const profileImageUrl = userObj.profile_image_url ? userObj.profile_image_url : 'https://lh3.googleusercontent.com/proxy/k13ownoZd1jRy2_rz1I0afpB9lbh2hWDJdm63i1xu11UlQ6dr37r190oCDRk6QdVtxeSxGJ4MQ-zzlxHiBxD3ZXwfxa7tZt79vn0Ajt8ZBltBTcFNhXnthq_Dc7k90DGZbZpiCw3t-oKvWnZBOIwyQUdNvjYzc_OdnFbvJTjM2XH';

  // const [editingProf, setEditingProf] = useState(false);

  return (
    <Card style={{ width: '30rem', margin: '10px' }}>
      <Card.Body>
        <Image
          className="rounded-circle"
          style={{ maxWidth: '100px' }}
          alt="profile-img"
          src={profileImageUrl}
        />
        <h2 className="full-name">{userObj.first_name} {userObj.last_name}</h2>
        <h5 className="card-text">@{userObj.username}</h5>
        <h5 className="card-text">Bio: {userObj.bio}</h5>
        <p className="card-text text-center">Profile created on : {userObj.created_on}</p>
        {/* {editingProf ? (
          <EditProfileForm user={userObj} onUpdate={onUpdate} />
        ) : (
          <Button variant="primary" onClick={() => setEditingProf(true)}>Edit Profile</Button>
        )} */}
      </Card.Body>
    </Card>
  );
}

ProfileCard.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    created_on: PropTypes.string,
    profile_image_url: PropTypes.string,
  }).isRequired,
};

export default ProfileCard;
