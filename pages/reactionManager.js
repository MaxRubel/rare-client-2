import { useEffect, useState } from 'react';
import { getReactions } from '../api/reactions';
// create ReactionCard and import
import ReactionForm from '../components/forms/ReactionForm';
import ReactionCard from '../components/utils/ReactionCard';

export default function ReactionManager() {
  const [reacts, setReacts] = useState([]);
  const [key, setKey] = useState(0);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    getReactions()
      .then((data) => {
        console.log('Setting reactions:', data); // Debug line
        setReacts(data);
      })
      .catch((error) => {
        console.error('Error fetching reactions:', error); // Error handling
      });
  }, [update]);

  const onUpdate = () => {
    setUpdate((preVal) => preVal + 1);
    setKey((preVal) => preVal + 1);
  };

  return (
    <div className="centered">
      <div className="page-grid-2-cat">
        <div>
          <ReactionForm onUpdate={onUpdate} key={key} />
        </div>
        <div>
          {Array.isArray(reacts) && reacts.length > 0 ? (
            reacts.map((reaction) => (
              <ReactionCard reaction={reaction} key={reaction.id} />
            ))
          ) : (
            <p>No reactions available</p>
          )}
        </div>
      </div>
    </div>
  );
}
