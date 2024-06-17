import { UserCard } from "../../components/UserCard"
import { useEffect, useState } from "react"
import { getAllUsers,patchUser } from "../../api/users"
function UserManager(){
const [users, setUsers] = useState([])
const [key, setKey] = useState(0)

const[update, setUpdate] = useState(0)

useEffect(() => {
  getAllUsers().then(setUsers)
}
,[update])

const onUpdate = () => {
  setUpdate((preVal) => preVal + 1);
  setKey((preVal) => preVal + 1);
}

function handleToggleActive(user){
  const {id} = user
  const payload = {active: !user.active}
  patchUser( payload, id).then(() => {
    console.log('User updated')
  })
}

return(
  <div>
    <h1 style={{textAlign: 'center', padding: '20px'}}>Users</h1>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(600px, 1fr))', gap: '20px'}}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onUpdate={onUpdate} />
      ))}
    </div>
  </div>
)
}

export default UserManager
