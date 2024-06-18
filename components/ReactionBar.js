/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { getReactionsOfPost, postEmoji } from '../api/postReactions';
import { useAuth } from '../utils/data/authContext';
import addEmojiIcon from '../public/addEmoji';
import closeEmojiIcon from '../public/closeEmoji';

export default function ReactionBar({ postId }) {
  const [update, setUpdate] = useState(0);
  const [reactions, setReactions] = useState([]);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getReactionsOfPost(postId).then(setReactions);
  }, [postId, update]);

  const handleEmojiOpen = () => {
    setEmojiOpen((preVal) => !preVal);
  };

  const handleEmojiClick = (e) => {
    const payload = {
      user_id: user.uid,
      post_id: postId,
      emoji: e.emoji,
    };
    postEmoji(payload).then(() => {
      setUpdate((preval) => preval + 1);
      setEmojiOpen((preVal) => !preVal);
    });
  };

  const handleClickExitingEmoji = (emoji) => {
    const payload = {
      user_id: user.uid,
      post_id: postId,
      emoji,
    };
    postEmoji(payload).then(() => {
      setUpdate((preval) => preval + 1);
      if (emojiOpen) {
        setEmojiOpen((preVal) => !preVal);
      }
    });
  };
  return (
    <div className="reactions-container">
      <div className="reactions-button">
        <button className="clear-button" type="button" onClick={handleEmojiOpen}>
          {emojiOpen ? closeEmojiIcon : addEmojiIcon }
        </button>
        {reactions.map((reaction) => (
          <div key={reaction.reaction.id} className="centered" style={{ flexDirection: 'column' }}>
            <button
              className="clear-button"
              type="button"
              onClick={() => { handleClickExitingEmoji(reaction.reaction.image_url); }}
              style={{ fontSize: '30px' }}
            >{reaction.reaction.image_url}
            </button>
            <div style={{ fontSize: '14px' }}>{reaction.amount}</div>
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="absolute"><EmojiPicker onEmojiClick={handleEmojiClick} open={emojiOpen} /></div>
        <button type="button">
          +Custom Reaction
        </button>
      </div>
    </div>
  );
}
