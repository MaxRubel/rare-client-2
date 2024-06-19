import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Image } from 'react-bootstrap';
import PostCard from '../../../components/PostCard';
import { getPostByUserId } from '../../../api/postData';
import { getSingleUser } from '../../../api/users';

export default function GetOtherUsersPosts() {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getOtherUser = () => {
    getSingleUser(id).then((authorData) => {
      setAuthor(authorData);
    });
  };

  const getAllPosts = () => {
    getPostByUserId(id).then(setPosts);
  };
  console.warn(author);

  useEffect(() => {
    getOtherUser();
    getAllPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="user-profile-container">
        <div style={{ margin: '20px 0px' }}>
          <Button type="button">
            Edit Profile
          </Button>
        </div>
        <Card style={{ width: '30rem', margin: '10px' }}>
          <Card.Body>
            <Image
              className="rounded-circle"
              style={{ maxWidth: '100px' }}
              alt="profile-img"
              // src={profileImageUrl}
            />
            <h2 className="full-name">{author.first_name} {author.last_name}</h2>
            <h5 className="card-text">@ {author.email}</h5>
            <h5 className="card-text">Bio: {author.bio}</h5>
            <p className="card-text text-center">Profile created on : {author.created_on}</p>
          </Card.Body>
        </Card>
      </div>
      <div
        id="user-tours-cards"
        className="d-flex flex-wrap"
        style={{ flexDirection: 'column', gap: '8px' }}
      >
        {posts?.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} setAuthor={setAuthor} />
        ))}
      </div>
    </>
  );
}
