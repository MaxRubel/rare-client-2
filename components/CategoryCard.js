import Link from 'next/link';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function CategoryCard({ cat }) {
  return (
    <Card>
      <Link passHref href="/">
        {cat.label}
      </Link>
    </Card>
  );
}

CategoryCard.propTypes = {
  cat: PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
