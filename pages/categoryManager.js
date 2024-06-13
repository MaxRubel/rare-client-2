import { useEffect, useState } from 'react';
import { getAllCategories } from '../api/categories';
import CategoryCard from '../components/CategoryCard';
import CategoryForm from '../components/forms/CategoryForm';

export default function CategoryManager() {
  const [cats, setCats] = useState([]);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    getAllCategories().then(setCats);
  }, [update]);

  const onUpdate = () => {
    setUpdate((preVal) => preVal + 1);
  };

  return (
    <div className="centered">
      <div className="page-grid-2-cat">
        <div>
          {cats.map((cat) => (
            <CategoryCard cat={cat} key={cat.id} />
          ))}
        </div>
        <div>
          <CategoryForm onUpdate={onUpdate} />
        </div>
      </div>
    </div>
  );
}
