import error from '../assets/images/error.png'
import { Link } from 'react-router-dom'
import Header from '../Component/Header.jsx'
import Footer from '../Component/Footer.jsx'

const Error = () => {
  return (
    <>
      <Header />
      <div className="container-fluid px-4 py-5">
        <div className="col-lg-6 m-auto text-center shadow mt-5 rounded-2 p-5 modern-error">
            <img src={error} alt="Error" className='error-img' />
            <h1 className='text-capitalize fw-bolder pb-4 mt-4'>page not found</h1>
            <Link to="/" className="btn btn-primary btn-lg">
              Go Back Home
            </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Error
