import { useEffect, useState } from 'react';
import ProfileCard from '../components/userProfile';
import { useAuth } from '../utils/data/authContext';
import { getSingleUser } from '../api/users';

function Profile() {
  const { user } = useAuth();

  const [userObj, setUserObj] = useState({});

  useEffect(() => {
    getSingleUser(user.id).then(setUserObj);
  }, [user]);
  return (
    <div>
      <ProfileCard userObj={userObj} />
    </div>
  );
}

export default Profile;
