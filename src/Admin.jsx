import React from 'react'

const Admin = () => {
  return (
    <div className='l-back'>
        <form className="login-form">
        <h3>Admin Login</h3>
        <input
          type="text"
          placeholder="admin name"
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="enter admin id"
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="enter password"
          className="form-input"
          required
        />
        <button type="submit" className="sbmt-btn">
            Login Here
        </button>
        </form>

    </div>
  )
}

export default Admin
