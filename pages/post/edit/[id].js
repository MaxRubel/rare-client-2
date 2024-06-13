import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import PostForm from '../../../components/forms/PostForm';

export default function EditPost() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSinglePost(id).then(setEditItem);
  }, [id]);

  return (<PostForm obj={editItem} setEditObj={setEditItem} />);
}
