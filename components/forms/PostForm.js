import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createPost, updatePost } from '../../api/postData';
import { getAllCategories } from '../../api/categories';
import getDate from '../postDate';
import { getAllTags } from '../../api/tags';

const initialState = {
  title: '',
  imageUrl: '',
  category: {},
  content: '',
  tagIds: [],
};

function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const router = useRouter();
  const userId = localStorage.getItem('auth_token');

  useEffect(() => {
    if (obj?.id) setFormInput({ ...obj, category: obj.category.id });
  }, [obj]);

  useEffect(() => {
    const prevTags = [];
    if (obj?.id) {
      obj.tags.forEach((tag) => {
        prevTags.push(tag.id);
      });
      setSelectedTags(prevTags);
    }
  }, [obj]);

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  useEffect(() => {
    getAllTags().then(setTags);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj?.id) {
      updatePost({ ...formInput, tags: selectedTags }).then(() => router.push('/'));
    } else {
      const payload = {
        ...formInput, user_id: userId, publicationDate: getDate(), tags: selectedTags,
      };
      createPost(payload).then(() => router.push('/'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj?.id ? 'Update' : 'Add a'} Post</h2>

        <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Post Image" className="mb-3">
          <Form.Control
            type="url"
            placeholder="Enter an image url"
            name="imageUrl"
            value={formInput.imageUrl}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="Category">
          <Form.Select
            aria-label="Category"
            name="category_id"
            onChange={handleChange}
            className="mb-3"
            value={formInput.category_id}
          >
            <option value="">Select applicable category</option>
            {
            categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.label}
              </option>
            ))
          }
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="Tags">
          <Form.Select
            aria-label="Tags"
            name="tagIds"
            onChange={handleChange}
            className="mb-3"
            value={formInput.tagIds}
          >
            <select multiple value={selectedTags} onChange={handleChange}>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>{tag.tag}</option>
              ))}
            </select>
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="Post Content" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Content"
            name="content"
            value={formInput.content}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Button variant="btn-small btn-secondary" type="submit">{obj?.id ? 'Update' : 'Create'} Post</Button>

      </Form>
    </>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.string,
    id: PropTypes.string,
    tags: PropTypes.forEach(
      PropTypes.shape({
        id: PropTypes.number,
        tag: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default PostForm;
