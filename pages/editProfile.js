import NewUserForm from '../components/forms/NewUserForm';
import { useAuth } from '../utils/data/authContext';

export default function EditProfile() {
  const { user } = useAuth();

  return (<NewUserForm user={user} />);
}
