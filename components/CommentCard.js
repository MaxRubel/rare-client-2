/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleUser } from '../api/users';

export default function CommentCard({ comment }) {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    getSingleUser(comment.author_id).then(setAuthor);
  }, []);

  return (
    <Card>
      <CardHeader>
        {author?.username}
      </CardHeader>
      <CardBody>
        {comment?.content}
      </CardBody>
    </Card>

  );
}

CommentCard.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author_id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};
