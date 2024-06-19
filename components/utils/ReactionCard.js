import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { postGif } from '../../api/postReactions';
import { useAuth } from '../../utils/data/authContext';

// inPost <bool> signifies that we are viewing this card from the Post Details Page

// updateReactionBar <func> updates the reaction bar on the Post page

// Post Id <string> is only valid when viewing this reaction on the Post page

export default function ReactionCard({
  reaction, inPost, postId, updateReactionBar,
}) {
  const { user } = useAuth();

  const handleClick = () => {
    if (inPost) {
      const payload = {
        user_id: user.uid,
        post_id: postId,
        reaction_id: reaction.id,
      };
      postGif(payload).then(() => {
        updateReactionBar();
      });
    }
  };

  return (
    <Card
      onClick={handleClick}
      className="reaction-card"
      style={{
        width: '8rem',
        height: '8rem',
        cursor: inPost ? 'pointer' : '',
      }}
    >

      <Card.Title style={{ margin: '0px', textAlign: 'center', paddingTop: '3px' }}>{reaction.label}</Card.Title>

      <Card.Body style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3px',
      }}
      >
        <Card.Img
          src={reaction.image_url}
          style={{
            objectFit: 'contain',
            height: '75px',
            width: '95px',
          }}
        />
      </Card.Body>
    </Card>
  );
}

ReactionCard.propTypes = {
  reaction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  inPost: PropTypes.bool,
  postId: PropTypes.string,
  updateReactionBar: PropTypes.func,
};

ReactionCard.defaultProps = {
  inPost: false,
  postId: null,
  updateReactionBar: null,
};
