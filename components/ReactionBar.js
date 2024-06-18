/* eslint-disable no-unused-vars */
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

  // useEffect(() => {
  //   getReactionsOfPost(postId).then((data) => {
  //     setHasReacted(data.some((item) => item.user_id === Number(userId)));
  //     calculateReactions(data);
  //   });
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [update, postId]);

  useEffect(() => {
    getReactionsOfPost(postId)
      .then((data) => console.log(data));
  }, [postId]);

  // const handleClick = (reaction) => {
  //   if (hasReacted) {
  //     getUserReactionsOfPost(postId, userId).then((data) => {
  //       deletePostReaction(data[0].id).then(() => {
  //         handleMakeNewPostReaction(reaction);
  //         setUpdate((preVal) => preVal + 1);
  //       });
  //     });
  //   } else {
  //     handleMakeNewPostReaction(reaction);
  //   }
  // };

  return (
    <div className="reactions-button">
      <button
        type="button"
        className="reaction-button"
        onClick={() => {
          // handleClick('love');
        }}
      >
        😍 <div className="smol-text">{reactionNo[1]}</div>
      </button>
      <button
        type="button"
        className="reaction-button"
        onClick={() => {
          // handleClick('mindblown');
        }}
      >
        🤯 <div className="smol-text">{reactionNo[2]}</div>
      </button>
      <button
        type="button"
        className="reaction-button"
        onClick={() => {
          // handleClick('thinking');
        }}
      >
        🤔 <div className="smol-text">{reactionNo[3]}</div>
      </button>
      <button
        type="button"
        className="reaction-button"
        onClick={() => {
          // handleClick('anger');
        }}
      >
        🤬 <div className="smol-text">{reactionNo[4]}</div>
      </button>
    </div>
  );
}
