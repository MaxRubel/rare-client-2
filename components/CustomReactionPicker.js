import { useEffect, useRef, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getReactions } from '../api/reactions';
import ReactionCard from './utils/ReactionCard';

// eslint-disable-next-line no-unused-vars, react/prop-types
export default function CustomReactionPicker({ open, postId, updateReactionBar }) {
  const arrayRef = useRef([]);
  const [cReactions, setCReactions] = useState([]);

  useEffect(() => {
    getReactions().then((data) => {
      const filtered = data.filter((item) => item.label !== 'emoji');
      setCReactions(filtered);
      arrayRef.current = filtered;
    });
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    const arrToSearch = [...arrayRef.current];
    const filtered = arrToSearch.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
    setCReactions(filtered);
  };

  return (
    <Card className="custom-reaction-picker" style={{ display: open ? 'flex' : 'none' }}>
      <div style={{ marginBottom: '12px' }}>
        <input className="form-control" placeholder="Search" onChange={handleSearch} />
      </div>
      <div className="reactions-container">
        {cReactions.map((reaction) => (
          <ReactionCard updateReactionBar={updateReactionBar} inPost postId={postId} reaction={reaction} key={reaction.id} />
        ))}
      </div>
    </Card>
  );
}
