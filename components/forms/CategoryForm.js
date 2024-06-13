import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createNewCategory } from '../../api/categories';

export default function CategoryForm({ onUpdate }) {
  const [label, setLabel] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setLabel(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewCategory({ label }).then(() => {
      onUpdate();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="create-cat-form">
        Create a New Category
        <input className="form-control" name="label" onChange={handleChange} />
        <Button type="submit">Submit</Button>
      </Card>
    </form>
  );
}

CategoryForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
