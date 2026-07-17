import './Login.css'
import Logo from '../../assets/logo.png'
import Background from '../../assets/background_banner.jpg'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useApp()
  const [mode, setMode] = useState('signin')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isSignUp = mode === 'signup'
  const heading = isSignUp ? 'Sign Up' : 'Sign In'

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }

    if (isSignUp && !username.trim()) {
      setError('Please enter a username.')
      return
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      login()
      setLoading(false)
      navigate('/')
    }, 600)
  }

  return (
    <div className="login" style={{ backgroundImage: `linear-gradient(#0000007e, #0000007e), url(${Background})` }}>
      <Link to="/">
        <img src={Logo} className="login-logo" alt="Netflix" />
      </Link>

      <div className="login-form">
        <h1>{heading}</h1>

        {error && <p className="login-error" role="alert">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
          />
          <button type="submit" className="btn btn-danger" disabled={loading}>
            {loading ? 'Please wait...' : heading}
          </button>

          <div className="form-help">
            <label className="remember">
              <input type="checkbox" />
              Remember me
            </label>
            <button type="button" className="help-link">Need help?</button>
          </div>
        </form>

        <div className="form-change">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <button type="button" onClick={() => setMode('signin')}>Sign in</button>
            </p>
          ) : (
            <p>
              New to Netflix?{' '}
              <button type="button" onClick={() => setMode('signup')}>Sign up now</button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
