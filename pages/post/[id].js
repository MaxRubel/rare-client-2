import { useRouter } from 'next/router';
import PostDeatil from '../../components/PostDetails';

export default function AuthorPostDetailView() {
  const router = useRouter();
  const { id } = router.query;
  return <PostDeatil postId={id} />;
}
