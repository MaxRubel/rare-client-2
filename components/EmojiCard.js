import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function EmojiCard({ emoji }) {
  return (
    <Card style={{ fontSize: '22px' }}>
      {emoji}
    </Card>
  );
}

EmojiCard.propTypes = {
  emoji: PropTypes.string.isRequired,
};
