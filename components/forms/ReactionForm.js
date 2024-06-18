import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createReaction } from '../../api/reactions';

export default function ReactionForm({ onUpdate }) {
  const [reactionData, setReactionData] = useState({
    label: '',
    image_url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReactionData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReaction(reactionData).then(() => {
      onUpdate();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="create-react-form">
        <h5>Create a New Reaction</h5>
        <input
          className="form-control"
          name="label"
          value={reactionData.label}
          onChange={handleChange}
          placeholder="Label"
        />
        <input
          className="form-control"
          name="image_url"
          value={reactionData.image_url}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <Button type="submit">Submit</Button>
      </Card>
    </form>
  );
}

ReactionForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};
