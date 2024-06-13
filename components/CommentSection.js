import { useEffect, useState } from 'react';
import getCommentsOfPost from '../api/comments';
import CommentCard from './CommentCard';

export default function CommentSection() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsOfPost(1).then(setComments);
  }, []);
  return (
    <div>
      <div id="header" className="centered"><h1>Comments</h1></div>
      <div className="comments-container">{comments.map((comment) => (<CommentCard comment={comment} key={comment.id} />))}</div>
    </div>
  );
}
