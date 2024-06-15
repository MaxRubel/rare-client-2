/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable eqeqeq */
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faTrashCan, faEye } from '@fortawesome/free-solid-svg-icons';
import { deletePost } from '../api/postData';
import { useAuth } from '../utils/data/authContext';

function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card id="post-styling">
      <Card.Title>{postObj.title} Publication Date: {postObj.publication_date}</Card.Title>
      <Card.Img src={postObj.image_url} alt={postObj.title} style={{ minHeight: '300px ' }} />
      <Card.Body>
        { user.uid == postObj.rare_user.uid ? (
          <>
            <Link href={`/post/edit/${postObj.id}`} passHref>
              <Button id="edit-btn">
                <FontAwesomeIcon icon={faGear} spin style={{ color: '#74C0FC' }} />
              </Button>
            </Link>
            <Link href={`/post/${postObj.id}`} passHref>
              <Button id="view-btn">
                <FontAwesomeIcon icon={faEye} style={{ color: '#74C0FC' }} />
              </Button>
            </Link>
            <Button id="del-btn" onClick={deleteThisPost}>
              <FontAwesomeIcon icon={faTrashCan} style={{ color: '#74C0FC' }} />
            </Button>
          </>
        ) : (
          <Button id="view-btn">
            <FontAwesomeIcon icon={faEye} style={{ color: '#74C0FC' }} />
          </Button>
        )}
      </Card.Body>
    </Card>

  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    title: PropTypes.string,
    publication_date: PropTypes.string,
    image_url: PropTypes.string,
    rare_user: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
