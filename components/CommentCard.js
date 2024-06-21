/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { deleteComment } from '../api/comments';
import { useAuth } from '../utils/data/authContext';

export default function CommentCard({
  id,
  content,
  author,
  onUpdate,
}) {
  const { user } = useAuth();
  const router = useRouter();
  const deleteThisComment = () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="comment-card text-center">
      <Card.Body>
        <Card.Title className="comment-card-title">
          <div className="display-row">
            <div className="comment-user">
              <Card.Text>{content}</Card.Text>
            </div>
            <h6>Comment by: {author.first_name} {author.last_name}</h6>
          </div>
        </Card.Title>
        <br />
        <div>{(user.id === author.id) && (<Button className="delete-button btn-dark" variant="btn-dark" onClick={deleteThisComment}>Delete</Button>)}</div>
      </Card.Body>
      {(user.id === author.id) && (<Button className="view-edit-btn btn-dark" onClick={() => router.replace(`/comment/edit/${id}`)}>Edit</Button>)}
    </Card>
  );
}

CommentCard.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
