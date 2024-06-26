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
import yoursEmoji from '../public/yoursEmoji.';

function PostCard({ postObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisPost = () => {
    if (window.confirm(`Delete ${postObj.title}?`)) {
      deletePost(postObj.id).then(() => onUpdate());
    }
  };

  return (
    <div className="post-styling">
      <div className="top-row_user-card">
        <div />
        <div>
          <h2>{postObj.title} </h2>
          <h5>By: {postObj.rare_user.first_name} {postObj.rare_user.last_name} </h5>
        </div>
        <div id="user-trophy" className="centered">
          {postObj.rare_user.uid === user.uid
         && (
         <div>
           {yoursEmoji} My Post!
         </div>
         )}
        </div>
      </div>
      <div>
        <h6 style={{ fontSize: '12pt' }}>Published: {postObj.publication_date}</h6>
      </div>
      <Card.Img
        src={postObj.image_url}
        alt={postObj.title}
        style={{ width: '200px', height: '200px', marginTop: '10px' }}
      />
      <Card.Body style={{
        marginTop: '18px',
        marginBottom: '12px',
        display: 'flex',
        gap: '15px',
      }}
      >
        {user.uid == postObj.rare_user?.uid ? (
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
          <Link href={`/post/${postObj.id}`} passHref>
            <Button id="view-btn">
              <FontAwesomeIcon icon={faEye} style={{ color: '#74C0FC' }} />
            </Button>
          </Link>
        )}
      </Card.Body>
    </div>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    title: PropTypes.string,
    publication_date: PropTypes.string,
    image_url: PropTypes.string,
    id: PropTypes.number,
    rare_user: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      bio: PropTypes.string,
      profile_img_url: PropTypes.string,
      email: PropTypes.string,
      uid: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
