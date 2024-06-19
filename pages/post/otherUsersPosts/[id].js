import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PostCard from '../../../components/PostCard';
import { getPostByUserId } from '../../../api/postData';

export default function GetOtherUsersPosts() {
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getAllPosts = () => {
    getPostByUserId(id).then(setPosts);
  };
  console.warn(author);

  useEffect(() => {
    getAllPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
