import { useEffect, useState } from 'react';
import { getReactions } from '../api/reactions';
// create ReactionCard and import
import ReactionForm from '../components/forms/ReactionForm';
import ReactionCard from '../components/utils/ReactionCard';
import EmojiCard from '../components/EmojiCard';

export default function ReactionManager() {
  const [reacts, setReacts] = useState([]);
  const [key, setKey] = useState(0);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    getReactions()
      .then((data) => {
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
    <div className="centered" style={{ flexDirection: 'column' }}>
      <div style={{ marginTop: '25px' }}>
        <div>
          <ReactionForm onUpdate={onUpdate} key={key} />
        </div>
        <div>
          {reacts.length === 0 && <p>No reactions available</p>}
        </div>
      </div>

      {/* ------ Custom Reactions Container ---- */}
      <div id="emoji-container" className="centered" style={{ flexDirection: 'column', marginTop: '20px' }}>
        <h3>Homemade Reactions</h3>
        <div id="emoji-container" className="flex-box">
          {Array.isArray(reacts) && reacts.length > 0 && (
            reacts
              .filter((reaction) => reaction.label !== 'emoji')
              .map((reaction) => (
                <ReactionCard reaction={reaction} key={reaction.id} />
              ))
          )}
        </div>
      </div>

      {/* ------ Emoji Container ------*/}
      <div id="emoji-container" className="centered" style={{ flexDirection: 'column', marginTop: '20px' }}>
        <h3>Emojis</h3>
        <div id="emoji-container" className="flex-box">
          {Array.isArray(reacts) && reacts.length > 0 && (
            reacts
              .filter((reaction) => reaction.label === 'emoji')
              .map((reaction) => (
                <EmojiCard emoji={reaction.image_url} key={reaction.id} />
              ))
          )}
        </div>
      </div>

    </div>
  );
}
