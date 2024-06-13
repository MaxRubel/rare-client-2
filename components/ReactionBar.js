/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
  createPostReaction, deletePostReaction, getReactionsOfPost, getUserReactionsOfPost,
} from '../api/postReactions';

export default function ReactionBar({ postId }) {
  const [hasReacted, setHasReacted] = useState(false);
  const [update, setUpdate] = useState(0);
  const [reactionNo, setReactionNo] = useState({
    1: 0, 2: 0, 3: 0, 4: 0,
  });
  const userId = localStorage.getItem('auth_token');

  const calculateReactions = (data) => {
    setReactionNo({
      1: 0, 2: 0, 3: 0, 4: 0,
    });
    for (let i = 0; i < data.length; i++) {
      switch (data[i].reaction_id) {
        case 1:
          setReactionNo((prevState) => ({
            ...prevState,
            1: (prevState[1]) + 1,
          }));
          break;
        case 2:
          setReactionNo((prevState) => ({
            ...prevState,
            2: (prevState[2]) + 1,
          }));
          break;
        case 3:
          setReactionNo((prevState) => ({
            ...prevState,
            3: (prevState[3]) + 1,
          }));
          break;
        case 4:
          setReactionNo((prevState) => ({
            ...prevState,
            4: (prevState[4]) + 1,
          }));
          break;
        default: break;
      }
    }
  };

  useEffect(() => {
    getReactionsOfPost(postId).then((data) => {
      setHasReacted(data.some((item) => item.user_id === Number(userId)));
      calculateReactions(data);
    });
  }, [update, postId]);

  const handleMakeNewPostReaction = (reaction) => {
    let reactionId;

    switch (reaction) {
      case 'love':
        reactionId = 1;
        break;
      case 'mindblown':
        reactionId = 2;
        break;
      case 'thinking':
        reactionId = 3;
        break;
      case 'anger':
        reactionId = 4;
        break;
      default:
        reactionId = 0;
    }

    const payload = {
      user_id: userId,
      post_id: postId,
      reaction_id: reactionId,
    };

    createPostReaction(payload).then(() => { setUpdate((preVal) => preVal + 1); });
  };

  const handleClick = (reaction) => {
    if (hasReacted) {
      getUserReactionsOfPost(postId, userId).then((data) => {
        deletePostReaction(data[0].id).then(() => {
          handleMakeNewPostReaction(reaction);
          setUpdate((preVal) => preVal + 1);
        });
      });
    } else {
      handleMakeNewPostReaction(reaction);
    }
  };

  return (
    <div className="reactions-button">
      <button
        type="button"
        className="reaction-button"
        onClick={() => {
          handleClick('love');
        }}
      >
        😍 <div className="smol-text">{reactionNo[1]}</div>
      </button>
      <button
        type="button"
        className="reaction-button"
        onClick={() => {
          handleClick('mindblown');
        }}
      >
        🤯 <div className="smol-text">{reactionNo[2]}</div>
      </button>
      <button
        type="button"
        className="reaction-button"
        onClick={() => {
          handleClick('thinking');
        }}
      >
        🤔 <div className="smol-text">{reactionNo[3]}</div>
      </button>
      <button
        type="button"
        className="reaction-button"
        onClick={() => {
          handleClick('anger');
        }}
      >
        🤬 <div className="smol-text">{reactionNo[4]}</div>
      </button>
    </div>
  );
}
