import './Loading.css'
import Spinner from '../../assets/netflix_spinner.gif'

const Loading = ({ fullScreen = false, label = 'Loading...' }) => {
  return (
    <div className={`loading ${fullScreen ? 'loading--fullscreen' : ''}`} role="status" aria-live="polite">
      <img src={Spinner} alt="" className="loading-spinner" />
      <span className="loading-label">{label}</span>
    </div>
  )
}

export default Loading
