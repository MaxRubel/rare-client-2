import { useEffect, useState } from 'react';
import UserCard from '../../components/UserCard';
import { getAllUsers } from '../../api/users';

function UserManager() {
  const [users, setUsers] = useState([]);

  const [update, setUpdate] = useState(0);

  useEffect(() => {
    getAllUsers().then(setUsers);
  },
  [update]);

  const onUpdate = () => {
    setUpdate((preVal) => preVal + 1);
  };

  return (
    <div className="centered" style={{ flexDirection: 'column' }}>
      <h1 style={{ textAlign: 'center', padding: '20px' }}>Users</h1>
      <div
        style={{
          width: '80%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(600px, 1fr))',
          gap: '20px',
        }}
      >
        {users.map((user) => (
          <UserCard key={user.id} user={user} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
}

export default UserManager;
