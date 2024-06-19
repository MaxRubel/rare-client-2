/* eslint-disable react/prop-types */
import { Card, Button, Form } from 'react-bootstrap';
import { patchUser } from '../api/users';

export default function UserCard({ user, onUpdate }) {
  // eslint-disable-next-line no-unused-vars
  const handleToggleActive = () => {
    const { id } = user;
    const payload = { ...user, active: !user.active };
    patchUser(payload, id).then(() => {
      onUpdate();
    });
  };
  return (
    <Card style={{ padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ color: 'black' }}>{user.first_name} {user.last_name}</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ marginRight: '10px' }}>{user.active ? 'Active' : 'Inactive'}</h3>
          <Form.Check
            type="switch"
            id={`active-switch-${user.id}`}
            label=""
            checked={user.active}
            onChange={handleToggleActive}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3 style={{ marginRight: '10px' }}>{user.is_staff ? 'Admin' : 'Author'}</h3>
          <Button variant={user.is_staff ? 'danger' : 'success'}>{user.is_staff ? 'Demotion' : 'Promotion'}</Button>
        </div>
      </div>
    </Card>
  );
}
