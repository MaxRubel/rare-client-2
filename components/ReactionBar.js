/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { getReactionsOfPost, postEmoji } from '../api/postReactions';
import { useAuth } from '../utils/data/authContext';
import addEmojiIcon from '../public/addEmoji';
import closeEmojiIcon from '../public/closeEmoji';
import addCustomReaction from '../public/addCustomReaction';
import CustomReactionPicker from './CustomReactionPicker';
import ReactionCard from './utils/ReactionCard';

export default function ReactionBar({ postId }) {
  const [update, setUpdate] = useState(0);
  const [reactions, setReactions] = useState([]);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [customReactsOpen, setCustomReactsOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getReactionsOfPost(postId).then(setReactions);
  }, [postId, update]);

  const handleEmojiOpen = () => {
    if (!emojiOpen) {
      setCustomReactsOpen(false);
    }
    setEmojiOpen((preVal) => !preVal);
  };

  const updateReactionBar = () => {
    setUpdate((preval) => preval + 1);
    setEmojiOpen(false);
    setCustomReactsOpen(false);
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

  const handleCustomReactionOpen = () => {
    if (emojiOpen) {
      setEmojiOpen(false);
    }
    setCustomReactsOpen((preVal) => !preVal);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="clear-button" type="button" onClick={handleEmojiOpen}>
          {emojiOpen ? closeEmojiIcon : addEmojiIcon }
        </button>
        <button type="button" className="clear-button" onClick={handleCustomReactionOpen} style={{ paddingBottom: '4px' }}>
          {addCustomReaction}
        </button>

        {reactions
          .filter((reaction) => reaction.reaction.label === 'emoji')
          .map((filteredReaction) => (
            <div key={filteredReaction.reaction.id} className="centered" style={{ flexDirection: 'column' }}>
              <button
                className="clear-button"
                type="button"
                onClick={() => { handleClickExitingEmoji(filteredReaction.reaction.image_url); }}
                style={{ fontSize: '30px' }}
              >
                {filteredReaction.reaction.image_url}
              </button>
              <div style={{ fontSize: '14px' }}>{filteredReaction.amount}</div>
            </div>
          ))}
      </div>

      <div id="gifs" style={{ display: 'flex', justifyContent: 'center', minHeight: '170px' }}>
        {reactions
          .filter((reaction) => reaction.reaction.label !== 'emoji')
          .map((filteredReaction) => (
            <div key={filteredReaction.reaction.id} className="centered" style={{ flexDirection: 'column' }}>
              <button
                className="clear-button"
                type="button"
                onClick={() => { handleClickExitingEmoji(filteredReaction.reaction.image_url); }}
                style={{ fontSize: '30px', flexDirection: 'column' }}
              >
                <ReactionCard reaction={filteredReaction.reaction} />
                <div style={{ fontSize: '14px' }}>{filteredReaction.amount}</div>
              </button>
            </div>
          ))}
      </div>

      <div className="relative">
        <div className="absolute"><EmojiPicker onEmojiClick={handleEmojiClick} open={emojiOpen} /></div>
        <div className="absolute"><CustomReactionPicker updateReactionBar={updateReactionBar} postId={postId} open={customReactsOpen} /></div>
      </div>
    </div>
  );
}
