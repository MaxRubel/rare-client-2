/* eslint-disable react/prop-types */
import {
  Card, Button, Form, Modal,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { patchUser, getAllUsers } from '../api/users';
import {
  createUserTypeChangeRequest, getALLUserTypeChangeRequests, updateUserTypeChangeRequest, deleteUserTypeChangeRequest,
} from '../api/user_type_change_request';
import { useAuth } from '../utils/data/authContext';

export default function UserCard({ userObject, onUpdate }) {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [userTypeChangeRequests, setUserTypeChangeRequests] = useState([]);
  const userId = user.id;
  const [showModal, setShowModal] = useState(false);
  console.warn('this is my user', user);

  useEffect(() => {
    getAllUsers().then(setUsers);
  },
  [onUpdate]);
  // eslint-disable-next-line no-unused-vars
  const handleToggleActive = () => {
    const { id } = userObject;
    const payload = { ...userObject, active: !userObject.active };
    patchUser(payload, id).then(() => {
      onUpdate();
    });
  };

  // create userObject_type_ change_request table
  const handlePromotion = () => {
    const payload = { modified_user_id: userObject.id, action: 'promotion', admin_one_id: userId };
    createUserTypeChangeRequest(payload).then(() => { onUpdate(); });
  };

  // eslint-disable-next-line no-unused-vars
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // create Function  confirm promotion
  const confirmPromotion = () => {
    userTypeChangeRequests.forEach((userType) => {
      if (userType.admin_one_id !== user.id && userObject.id === userType.modified_user_id) {
        console.log('I am clicking the right userObject', userObject.first_name);
        if (userType.admin_one_id && userType.action === 'promotion') console.log('I am getting the right table, Ready for the confirm promotion');
        const payload = { ...userType, admin_two_id: user.id };
        const userTypeId = userType.id;
        updateUserTypeChangeRequest(userTypeId, payload).then((respond) => {
          console.log('this is my respond', respond);
          deleteUserTypeChangeRequest(userTypeId);
          onUpdate();
        });
      } else {
        console.log('you are the same admin');
      }
    });
  };
  // 2 I need to also the logic if the userTypeRequest has admin_one_id and also if userTyRequest.action = 'promotion'
  // 1 I need to update the UserTypeChangeRequest
  // adding the admin_two_id into the table
  // update userObject.is_staff = true

  // create Function confirm demotion
  // 1 I need to update the UserTypeChangeRequest
  const confirmDemotion = () => {
    userTypeChangeRequests.forEach((userType) => {
      if (userType.admin_one_id !== user.id && userObject.id === userType.modified_user_id) {
        console.log('I am clicking the right userObject', userObject.first_name);
        if (userType.admin_one_id && userType.action === 'demotion') console.log('I am getting the right table, Ready for the confirm demotion');
        const payload = { ...userType, admin_two_id: user.id };
        const userTypeId = userType.id;
        updateUserTypeChangeRequest(userTypeId, payload).then((respond) => {
          console.log('this is my respond', respond);
          deleteUserTypeChangeRequest(userTypeId);
          onUpdate();
        });
      } else {
        console.log('you are the same admin');
      }
    });
  };
  const adminCount = users.filter((userAdmin) => userAdmin.is_staff).length;
  const handleDemotion = () => {
    if (adminCount <= 2) {
      setShowModal(true);
    } else {
      const payload = { modified_user_id: userObject.id, action: 'demotion', admin_one_id: userId };
      createUserTypeChangeRequest(payload).then(() => { onUpdate(); });
    }
  };

  useEffect(() => {
    getALLUserTypeChangeRequests().then((data) => {
      setUserTypeChangeRequests(data);
    });
  }, [onUpdate]);

  const pendingRequest = userTypeChangeRequests.find((request) => request.admin_one_id && request.modified_user_id === userObject.id);
  console.warn('this is my pending request', pendingRequest);

  // create variable approvedRequest
  // get all the userTypeChangeRequest with the find method
  // get request.admin_one_id && request.admin_two_id && request.modified_user_id === userObject.id

  let buttonText; let
    buttonAction;

  if (pendingRequest) {
    if (pendingRequest.action === 'promotion') {
      buttonText = 'Confirm Promotion';
      buttonAction = confirmPromotion;
    } else if (pendingRequest.action === 'demotion') {
      buttonText = 'Confirm Demotion';
      buttonAction = confirmDemotion;
    }
  } else if (userObject.is_staff) {
    buttonText = 'Demotion';
    buttonAction = handleDemotion;
  } else {
    buttonText = 'Promotion';
    buttonAction = handlePromotion;
  }

  return (
    <div>
      <Card style={{ padding: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: 'black' }}>{userObject.first_name} {userObject.last_name}</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ marginRight: '10px' }}>{userObject.active ? 'Active' : 'Inactive'}</h3>
            <Form.Check
              type="switch"
              id={`active-switch-${userObject.id}`}
              label=""
              checked={userObject.active}
              onChange={handleToggleActive}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h3 style={{ marginRight: '10px' }}>{userObject.is_staff ? 'Admin' : 'Author'}</h3>
            <Button
              variant={userObject.is_staff ? 'danger' : 'success'}
              onClick={buttonAction}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </Card>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'black' }}>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'black' }}>
          You need to promote another user to admin before you can demote this admin.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
