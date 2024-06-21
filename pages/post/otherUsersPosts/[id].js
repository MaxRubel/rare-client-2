import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Image } from 'react-bootstrap';
import PostCard from '../../../components/PostCard';
import { getPostByUserId } from '../../../api/postData';
import { getSingleUser } from '../../../api/users';

import { useAuth } from '../../../utils/data/authContext';
// eslint-disable-next-line import/no-named-as-default
import amISubscribed from '../../../api/subscriptions';

export default function GetOtherUsersPosts() {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(null);
  // const [subscription, setSubscription] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const { user } = useAuth();
  const getOtherUser = () => {
    getSingleUser(id).then((authorData) => {
      setAuthor(authorData);

      const payload = {
        uid: user.uid,
        author_id: authorData.id,
      };

      amISubscribed(payload).then((subscriptionData) => {
        setIsSubscribed(subscriptionData.is_subscribed);
      });
    });
  };

  const getAllPosts = () => {
    getPostByUserId(id).then(setPosts);
  };

  useEffect(() => {
    getOtherUser();
    getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubscribe = () => {
    // eslint-disable-next-line no-unused-vars
    const payload = {
      uid: user.uid,
      author_id: author.id,
    };

    if (isSubscribed) {
      // delete subscription
    } else {
      // create subscription
    }
  };

  return (
    <>
      <div className="user-profile-container">
        <div style={{ margin: '20px 0px' }}>
          <Button type="button" onClick={handleSubscribe}>
            {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
          </Button>
        </div>
        <Card style={{ width: '30rem', margin: '10px' }}>
          <Card.Body>
            <Image
              className="rounded-circle"
              style={{ width: '90px', height: '90px' }}
              alt="profile-img"
              src={author.profile_image_url}
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
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {posts?.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} setAuthor={setAuthor} />
        ))}
      </div>
    </>
  );
}
