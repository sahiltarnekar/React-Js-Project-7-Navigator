import { FaWhatsapp, FaLinkedin, FaGithub, FaHeart } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer className='footer bg-dark text-light mt-auto mt-5'>
        <div className="container-fluid px-4 px-lg-5 py-4">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className='mb-2 mb-md-0 gradient-text'>
                © {currentYear} E-Commerce. All rights reserved.
              </p>
              <p className='text-muted small mb-0'>
                Developed with <FaHeart className='text-danger' /> by{' '}
                <a 
                  href="https://www.linkedin.com/in/mihir-vaghela-6a24a8242/" 
                  target='_blank' 
                  className='text-light text-decoration-none fw-bold'
                  rel="noopener noreferrer"
                >
                  @sahil tarnekar
                </a>
              </p>
            </div>
            <div className="col-12 col-md-6">
              <ul className='d-flex list-unstyled gap-4 justify-content-center justify-content-md-end m-0 align-items-center'>
                <li>
                  <a 
                    href="#" 
                    target='_blank' 
                    className="text-light fs-5 pulse-animation" 
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/in/sahil-tarnekar-0b2413307/" 
                    target='_blank' 
                    className="text-light fs-5 pulse-animation" 
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/sahiltarnekar" 
                    target='_blank' 
                    className="text-light fs-5 pulse-animation" 
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer> 
    </>
  )
}

export default Footer
