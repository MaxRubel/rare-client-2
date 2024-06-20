/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { deleteComment } from '../api/comments';
import { useAuth } from '../utils/data/authContext';
import { getSingleUser } from '../api/users';

export default function CommentCard({
  id,
  authorId,
  content,
  onUpdate,
}) {
  const [commentAuthor, setCommentAuthor] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const deleteThisComment = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(id).then(() => onUpdate());
    }
  };

  const getCommentsAuthor = async (uid) => {
    try {
      const commentAuthorData = await getSingleUser(uid);
      setCommentAuthor(commentAuthorData);
    } catch (error) {
      console.error('Error fetching comment author:', error);
    }
  };

  useEffect(() => {
    getCommentsAuthor(authorId);
  }, [authorId]);

  return (
    <Card className="comment-card text-center">
      <Card.Body>
        <Card.Title className="comment-card-title">
          <div className="display-row">
            <div className="comment-user">
              <Card.Text>{content}</Card.Text>
            </div>
            <h6>Comment by: {commentAuthor.first_name} {commentAuthor.last_name}</h6>
          </div>
        </Card.Title>
        <br />
        <div>{(user.id === authorId) && (<Button className="delete-button btn-dark" variant="btn-dark" onClick={deleteThisComment}>Delete</Button>)}</div>
      </Card.Body>
      {(user.id === authorId) && (<Button className="view-edit-btn btn-dark" onClick={() => router.replace(`/comment/edit/${id}`)}>Edit</Button>)}
    </Card>
  );
}

CommentCard.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
