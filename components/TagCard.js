import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function TagCard({ tag }) {
  return (
    <Card className="tag-card">
      {tag.tag}
    </Card>
  );
}

TagCard.propTypes = {
  tag: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
