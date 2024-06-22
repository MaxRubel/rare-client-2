/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getAllSubscriptions } from '../api/subs';
import PostCard from './PostCard';
import { useAuth } from '../utils/data/authContext';

export default function ManageSubs() {
  const [subs, setSubs] = useState([]);

  const { user } = useAuth();

  const getAllSubs = () => {
    getAllSubscriptions(user.uid).then(setSubs);
  };

  useEffect(() => {
    getAllSubs();
  }, []);

  return (
    <div
      id="user-tours-cards"
      className="d-flex flex-wrap"
      style={{
        flexDirection: 'column',
        gap: '8px',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
      }}
    >
      {subs.map((sub) => (
        <PostCard key={sub.id} onUpdate={getAllSubs} />
      ))}
    </div>
  );
}
