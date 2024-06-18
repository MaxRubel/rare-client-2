/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import {
  createPostReaction, deletePostReaction, getReactionsOfPost, getUserReactionsOfPost,
  postEmoji,
} from '../api/postReactions';
import { getSingleReaction } from '../api/reactions';
import { useAuth } from '../utils/data/authContext';

export default function ReactionBar({ postId }) {
  const [hasReacted, setHasReacted] = useState(false);
  const [update, setUpdate] = useState(0);
  const [reactions, setReactions] = useState([]);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getReactionsOfPost(postId).then((data) => {
      const promises = data
        .map((postReaction) => getSingleReaction(postReaction.id).then((data2) => ({ ...postReaction, content: data2.image_url })));

      Promise.all(promises).then((allReactions) => {
        setReactions(allReactions);
      });
    });
  }, [postId, update]);

  const handleEmojiOpen = () => {
    console.log(emojiOpen);
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
    });
  };

  return (
    <div className="reactions-container">
      <div className="reactions-button">
        {reactions.map((reaction) => (
          <div className="centered" style={{ flexDirection: 'column' }}>
            <div>{reaction.content}</div>
            <div style={{ fontSize: '14px' }}>{reaction.amount}</div>
          </div>
        ))}
      </div>
      <div>
        <EmojiPicker onEmojiClick={handleEmojiClick} open={emojiOpen} />
        <button type="button" onClick={handleEmojiOpen}>
          +Emoji
        </button>
        <button type="button">
          +Custom Reaction
        </button>
      </div>
    </div>
  );
}
