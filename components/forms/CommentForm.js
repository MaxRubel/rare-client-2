import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createCommentForPost, updateComment } from '../../api/comments';

const initialState = {
  id: 0,
  content: '',
  author: 0,
  post: 0,
  created_on: '',
};

const CommentForm = ({
  user, obj, commentPostId, onSubmit,
}) => {
  const [currentComment, setCurrentComment] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (obj.id) {
      setCurrentComment({
        id: obj.id,
        author: obj.author,
        post: commentPostId,
        createdOn: obj.created_on,
        content: obj.content,
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const updatedComment = {
        id: obj.id,
        author: obj.author,
        content: currentComment.content,
        created_on: obj.created_on,
        post: obj.post,
      };
      updateComment(updatedComment)
        .then(() => router.push(`/post/${commentPostId}`));
    } else {
      const newcomment = {
        content: currentComment.content,
        post: commentPostId,
        author: user.id,
      };
      // eslint-disable-next-line no-undef
      createCommentForPost(user.id, commentPostId, newcomment).then(() => {
        setCurrentComment(initialState);
        onSubmit();
      }).catch(console.error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="comment-form-cont">
        <input type="text" name="content" className="input" placeholder="leave a comment" required value={currentComment.content} onChange={handleChange} />
        <Button className="edit-btn btn-dark" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

CommentForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    author: PropTypes.number,
    post: PropTypes.number,
    created_on: PropTypes.string,
  }),
  commentPostId: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
};

CommentForm.defaultProps = {
  obj: initialState,
  commentPostId: 0,
};

export default CommentForm;
