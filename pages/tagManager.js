import { useEffect, useState } from 'react';
import { getAllTags } from '../api/tags';
import TagForm from '../components/forms/TagForm';
import TagCard from '../components/TagCard';

export default function TagManager() {
  const [tags, setTags] = useState([]);
  const [key, setKey] = useState(0);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    getAllTags().then(setTags);
  }, [update]);

  const onUpdate = () => {
    setUpdate((preVal) => preVal + 1);
    setKey((preVal) => preVal + 1);
  };

  return (
    <>
      <div className="centered">
        <div className="page-grid-2-cat">
          <div>
            <TagForm onUpdate={onUpdate} key={key} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tags.map((tag) => (
              <TagCard tag={tag} key={tag.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
