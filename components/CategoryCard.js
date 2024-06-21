import Link from 'next/link';
import {
  Card,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useAuth } from '../utils/data/authContext';

import { deleteCategory, updateCategory } from '../api/categories';

export default function CategoryCard({ cat, onUpdate }) {
  const [label, setLabel] = useState(cat.label);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    updateCategory(cat.id, { label })
      .then()
      .catch((err) => {
        console.error(err);
      });
    onUpdate();
    setShowModal(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(cat.id)
        .then(() => {
          onUpdate();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Card style={{ padding: '10px', margin: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {user && user.is_staff ? (
          <>
            <Button variant="link" onClick={handleEdit}>
              <AiFillEdit /> {/* Edit icon */}
            </Button>
            <Button variant="link" onClick={handleDelete}>
              <AiFillDelete /> {/* Delete icon */}
            </Button>
          </>
        ) : null}
        <Link passHref href="/">
          {cat.label}
        </Link>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }}>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label style={{ color: 'black' }}>Label</Form.Label>
              <Form.Control type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

CategoryCard.propTypes = {
  cat: PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
