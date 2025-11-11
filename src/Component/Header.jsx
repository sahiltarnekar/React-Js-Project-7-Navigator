import logo from '../assets/images/logo.jpeg'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaPlusCircle } from 'react-icons/fa'

const Header = () => {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <section id='navbar'>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
          <div className="container-fluid px-4 px-lg-5">
            <Link to='/' className="navbar-brand d-flex align-items-center float-animation">
              <img src={logo} alt="Logo" height="50" className='rounded-2 me-2' />
              <span className="fw-bold text-primary">Navigator</span>
            </Link>
            
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-center gap-3">
                <li className="nav-item">
                  <Link 
                    to='/' 
                    className={`nav-link d-flex align-items-center gap-2 ${isActive('/') && location.pathname !== '/addProduct' ? 'active' : ''}`}
                  >
                    <FaHome className="me-1" /> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to='/addProduct' 
                    className={`nav-link d-flex align-items-center gap-2 ${isActive('/addProduct') ? 'active' : ''}`}
                  >
                    <FaPlusCircle className="me-1" /> Add Product
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  )
}

export default Header
