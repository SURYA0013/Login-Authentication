
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Admin from './Admin'
import AdminDash from './components/AdminDash'
import UserDash from './components/UserDash'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/admindash' element={<AdminDash/>}/>
      <Route path='/userdash' element={<UserDash/>}></Route>
    </Routes>
    </>
  )
}

export default App