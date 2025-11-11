import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrOverview } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { VscEditorLayout } from "react-icons/vsc";
import { RiEdit2Fill } from "react-icons/ri";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useForm } from "react-hook-form";
import { Modal } from "bootstrap/dist/js/bootstrap.min";
import Swal from 'sweetalert2'
import Header from '../Component/Header.jsx'
import Footer from '../Component/Footer.jsx'

const Home = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [single, setSingle] = useState({});

  const { register, handleSubmit, reset } = useForm();

  //   Function for Fetch All Products
  async function fetchData() {
    const ProductData = await axios.get(`${import.meta.env.VITE_API_URL}/Products`);
    setProduct(ProductData.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  //   Function For Delete Products with SweetAlert2
  async function trashProduct(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this product?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${import.meta.env.VITE_API_URL}/Products/${id}`);
        const UpdatedProduct = product.filter((ele) => {
          return ele.id !== id;
        });
        setProduct(UpdatedProduct);
        
        Swal.fire({
          title: 'Deleted!',
          text: 'Product has been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });

        const notify = () =>
          toast.error("Product Deleted..!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        notify();
      }
    });
  }

  //Function for Fetch Single Produst and Send to Form
  async function SingleProduct(id) {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/Products/${id}`
    );
    setSingle(res.data);
    reset(res.data);
  }

  //Function for Update Product in Modal
  async function editProduct(data) {
    await axios
      .put(`${import.meta.env.VITE_API_URL}/Products/${single.id}`, data)
      .then((res) => {
        window.location.reload();
        toast.success("Product Updated..!");
      })
      .catch((err) => console.log(err));
  }

  // Handle Add Product Click with SweetAlert2
  const handleAddProductClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Add New Product',
      text: 'Ready to add a new product?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, Add Product!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/addProduct');
      }
    });
  }

  return (
    <>
      <Header/>

      <div className="container p-0">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4 gradient-text">Our Products</h1>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="mb-0 fw-bold">Total Products: {product.length}</p>
              <Link to="addProduct" onClick={handleAddProductClick} className="btn btn-primary modern-btn pulse-animation">
                Add Product
              </Link>
            </div>
          </div>
        </div>
        
        <div className="row g-4">
            {product.map((ele,index) => (
              <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6" key={index}>
                <div className="card modern-card h-100 shadow-sm">
                  <img 
                    src={ele.image || '/src/assets/images/placeholder.svg'} 
                    alt={ele.product_name || 'Product Image'} 
                    className="card-img-top product-img"
                    onError={(e) => {
                      e.target.src = '/src/assets/images/placeholder.svg';
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h3 className="card-title h5">{ele.product_name}</h3>
                    <p className="card-text text-muted">{ele.category}</p>
                    <p className="card-text fw-bold text-primary fs-5">${ele.price}</p>
                    <p className="card-text flex-grow-1">{ele.description}</p>
                    
                    <div className="btn-group mt-auto" role="group">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => navigate(`/single-product/${ele.id}`)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={()=>{trashProduct(ele.id)}}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-outline-warning btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {SingleProduct(ele.id);}}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => {navigate(`/addProduct/${ele.id}`);}}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>

      <Footer/>

      {/* Modal */}
      <div className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Product
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={handleSubmit(editProduct)}>
                <label htmlFor="image" className="form-label text-capitalize">
                  Product image/URl
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  {...register("image")}
                  id="image"
                />
                <label htmlFor="name" className="form-label text-capitalize">
                  Product name
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  {...register("product_name")}
                  id="name"
                />
                <label htmlFor="price" className="form-label text-capitalize">
                  Product price
                </label>
                <input
                  type="text"
                  className="form-control mb-2"
                  {...register("price")}
                  id="price"
                />
                <label
                  htmlFor="description"
                  className="form-label text-capitalize"
                >
                  description
                </label>
                <textarea
                  type="text"
                  className="form-control mb-2"
                  {...register("description")}
                  id="description"
                />

                <button className="btn btn-primary w-100">Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Tostify */}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default Home;
