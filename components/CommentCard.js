/* eslint-disable react-hooks/exhaustive-deps */
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
import { deleteComment } from '../api/comments';
import { useAuth } from '../utils/data/authContext';
import parseTime from '../utils/parseTime';

export default function CommentCard({
  id,
  content,
  author,
  onUpdate,
  published,
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
          <div
            className="comment-published-on"
            style={{
              fontSize: '10pt',
              color: 'lightgray',
            }}
          >
            posted on: {parseTime(published)}
          </div>
          <div>
            <Image
              src={author.profile_image_url}
              className="comments--profile-image"
            /> {author.first_name} {author.last_name}
          </div>
        </Card.Title>
        <div className="comment-content">
          {content}
        </div>
        <div>
          {(user.id === author.id) && (
          <Button
            className="view-edit-btn btn-dark"
            onClick={() => router.replace(`/comment/edit/${id}`)}
          >Edit
          </Button>
          )}
          {(user.id === author.id)
        && (
        <Button
          className="delete-button btn-dark"
          variant="btn-dark"
          onClick={deleteThisComment}
        >Delete
        </Button>
        )}
        </div>
      </Card.Body>
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
    profile_image_url: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  published: PropTypes.string.isRequired,
};
