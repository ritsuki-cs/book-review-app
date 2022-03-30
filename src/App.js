// import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Signup } from './routes/signup.js'
import { Login } from './routes/login.js'

function App() {
  return (
    <Router>
      <h1>Book Review</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
