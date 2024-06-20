/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Image } from 'react-bootstrap';
import { getSinglePost } from '../api/postData';
import { getSingleUser } from '../api/users';
import ReactionBar from './ReactionBar';
import CommentCard from './CommentCard';
import CommentForm from './forms/CommentForm';
import { getCommentsOfPost } from '../api/comments';
import { useAuth } from '../utils/data/authContext';

// eslint-disable-next-line react/prop-types
export default function PostDeatil({ postId }) {
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const { user } = useAuth();

  const getAllComments = () => {
    getCommentsOfPost(postId).then((data) => setComments(data));
  };

  useEffect(() => {
    getSinglePost(postId).then((data) => {
      setPost(data);
      getSingleUser(data.rare_user.uid).then((authorData) => {
        setAuthor(authorData);
      });
    });
    getAllComments();
  }, [postId]);

  return (
    <div className="post-container">
      <div className="centered">
        {/* margin left */}
      </div>

      {/* ----center-of-page--- */}
      <div className="post-details center-post">
        <div id="image-tags-and-reactions">
          <div style={{
            color: 'white',
            padding: '9px',
            textAlign: 'center',
          }}
          ><h1>{post?.title}</h1>
          </div>
          <div id="image-divider">
            <Image src={post?.image_url} alt="Post image" style={{ maxWidth: '800px' }} />
          </div>
          <div>
            <div className="flex-col-tags" style={{ color: 'white' }}>
              {post?.tags.map((tag) => (
                <div className="small-tag"> #{tag.tag} </div>
              ))}
            </div>
            <div style={{ marginTop: '15px' }}>
              <ReactionBar postId={postId} />
            </div>
          </div>
        </div>
        <div className="post-row">

          {/* ---go to the author page or my own profile?-- */}
          {user?.uid !== author?.uid ? (
            <Link passHref href={`/post/otherUsersPosts/${author.uid}`}>
              <div style={{ cursor: 'pointer' }}>
                {author?.first_name} {author?.last_name}
              </div>
            </Link>
          ) : (
            <Link passHref href="/userPosts">
              <div style={{ cursor: 'pointer', color: 'white' }}>
                {author?.first_name} {author?.last_name}
              </div>
            </Link>
          )}

        </div>
        <div className="post-content-post">
          <div className="posted-on-details" style={{ marginTop: '8px', display: 'flex' }}>
            posted on: {post?.publication_date}
          </div>
          <div style={{ marginTop: '20px' }}>{post?.content}</div>
        </div>
      </div>
      {/* ---end-of-center-of-page--- */}
      <div>
        <div className="post-comments">
          <h2 className="post-comment-title">Comments</h2>
          <CommentForm user={user} commentPostId={Number(postId)} onSubmit={getAllComments} />
          {comments.map((comment) => (
            <section key={`comment--${comment.id}`} className="view-comment">
              <CommentCard
                id={comment.id}
                content={comment.content}
                authorId={comment.author}
                onUpdate={getAllComments}
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
