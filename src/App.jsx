
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Admin from './Admin'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admin' element={<Admin/>}/>
    </Routes>
    </>
  )
}

export default App
