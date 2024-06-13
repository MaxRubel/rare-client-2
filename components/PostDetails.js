/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSinglePost } from '../api/postData';
import { getSingleUser } from '../api/users';
import ReactionBar from './ReactionBar';

// eslint-disable-next-line react/prop-types
export default function PostDeatil({ postId }) {
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});

  useEffect(() => {
    getSinglePost(postId).then((data) => {
      setPost(data);
      getSingleUser(data.user_id).then((authorData) => [
        setAuthor(authorData),
      ]);
    });
  }, [postId]);

  return (
    <div className="post-container">
      <div className="centered">
        margin
      </div>
      <div className="post-details center-post">
        <div><h1>{post?.title}</h1></div>
        <div>{post?.image}</div>
        <div className="post-row">
          <Link passHref href="/">
            <div style={{ cursor: 'pointer' }}>
              By: {author?.username}
            </div>
          </Link>
          <div>
            View Comments
          </div>
          <div>
            <ReactionBar postId={postId} />
          </div>
        </div>
        <div>{post?.content}</div>
      </div>
      <div className="centered">
        tags
      </div>
    </div>
  );
}
