import Link from 'next/link';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ReactionCard({ reaction }) {
  if (!reaction) {
    return null;
  }

  return (
    <Card className="reaction-card" style={{ width: '8rem', height: '10rem' }}>
      <Link passHref href="/">
        <Card.Title>{reaction.label}</Card.Title>
      </Link>
      <Card.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card.Img
          src={reaction.image_url}
          style={{
            objectFit: 'cover',
            maxHeight: '100%',
            maxWidth: '100%',
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
};
