import Link from 'next/link';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function TagCard({ tag }) {
  return (
    <Card>
      <Link passHref href="/">
        {tag.label}
      </Link>
    </Card>
  );
}

TagCard.propTypes = {
  tag: PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
