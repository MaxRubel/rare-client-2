import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createNewTag } from '../../api/tags';

export default function TagForm({ onUpdate }) {
  const [tag, setTag] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setTag(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTag({ tag }).then(() => {
      onUpdate();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="create-cat-form">
        Create a New Tag
        <input className="form-control" name="tag" onChange={handleChange} />
        <Button type="submit">Submit</Button>
      </Card>
    </form>
  );
}

TagForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
