import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createNewTag } from '../../api/tags';

export default function TagForm({ onUpdate }) {
  const [label, setLabel] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setLabel(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewTag({ label }).then(() => {
      onUpdate();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="create-cat-form">
        Create a New Tag
        <input className="form-control" name="label" onChange={handleChange} />
        <Button type="submit">Submit</Button>
      </Card>
    </form>
  );
}

TagForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
