import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/data/authContext';
import CommentForm from '../../../components/forms/CommentForm';
import { getSingleComment } from '../../../api/comments';

export default function EditComment() {
  const { user } = useAuth();
  const router = useRouter();
  const commentId = router.query;
  const [updateComment, setUpdateComment] = useState({});
  const [postId, setPostId] = useState();

  useEffect(() => {
    getSingleComment(commentId.id).then(setUpdateComment);
    getSingleComment(commentId.id).then((data) => setPostId(data.post));
  }, [commentId]);

  return (
    <div>
      <h2>Edit Comment</h2>
      <CommentForm user={user} obj={updateComment} commentPostId={postId} onSubmit={console.warn('submit')} />
    </div>
  );
}
