import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Component/Header.jsx'
import Footer from '../Component/Footer.jsx'

const AllProduct = () => {
  const [product, setProduct] = useState([])
  
  async function fetchData() {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/Products`)
    setProduct(res.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="bright-theme">
      <Header />
      <div className="container p-0 mt-5 mb-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4 gradient-text">All Products</h1>
            <p className="mb-0 fw-bold">Total Products: {product.length}</p>
          </div>
        </div>
      
        <div className="row g-4 mt-3">
          {(product).map((ele, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4" key={index}>
              <div className="card modern-card h-100 shadow-sm">
                <img
                  src={ele.image || '/src/assets/images/placeholder.svg'}
                  alt={ele.product_name || 'Product Image'}
                  className="card-img-top product-img"
                  onError={(e) => {
                    e.target.src = '/src/assets/images/placeholder.svg'
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h3 className="card-title h5">{ele.product_name}</h3>
                  <p className="card-text text-muted">{ele.category}</p>
                  <p className="card-text fw-bold text-primary fs-5">${ele.price}</p>
                  <p className="card-text flex-grow-1">{ele.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AllProduct


