import { useEffect, useState } from 'react';
import ProfileCard from '../components/userProfile';
import { getSingleUser } from '../utils/data/userData';

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userId = localStorage.getItem('auth_token');
    getSingleUser(userId).then((taco) => {
      setUser({ ...taco, id: String(taco.id) });
    });
  }, []);
  return (
    <div>
      <ProfileCard userObj={user} />
    </div>
  );
}

export default Profile;
