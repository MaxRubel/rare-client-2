/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Image } from 'react-bootstrap';
import { getSinglePost } from '../api/postData';
import { getSingleUser } from '../api/users';
import ReactionBar from './ReactionBar';
import TagCard from './TagCard';

// eslint-disable-next-line react/prop-types
export default function PostDeatil({ postId }) {
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    getSinglePost(postId).then((data) => {
      setPost(data);
      getSingleUser(data.rare_user_id).then((authorData) => [
        setAuthor(authorData),
      ]);
    });
  }, [postId]);

  return (
    <div className="post-container">
      <div className="centered">
        {/* margin */}
      </div>
      <div className="post-details center-post">
        <div><h1>{post?.title}</h1></div>
        <Image src={post?.image_url} alt="Post image" />
        <div style={{ marginTop: '15px' }}>
          <ReactionBar postId={postId} />
        </div>
        <div className="post-row">
          <Link passHref href="/userPosts">
            <div style={{ cursor: 'pointer' }}>
              By: {author?.first_name} {author?.last_name}
            </div>
          </Link>
          <div>
            View Comments
          </div>
        </div>
        <div className="post-content-post">
          <div className="posted-on-details">
            posted on: {post?.publication_date}
          </div>
          <div style={{ marginTop: '20px' }}>{post?.content}</div>
        </div>
      </div>
      <div className="flex-col-tags">
        {post?.tags.map((tag) => (
          <TagCard tag={tag} key={tag.id} />
        ))}
      </div>
    </div>
  );
}
