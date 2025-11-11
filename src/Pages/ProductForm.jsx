import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import Header from '../Component/Header.jsx';
import Footer from '../Component/Footer.jsx';

const ProductForm = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const categories = ["Toy", "Electronics", "Fashion","Grocery","Cosmetic","Other"];
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  async function addData(data) {
    if (id == null) {
      await axios.post(`${import.meta.env.VITE_API_URL}/Products`, data)
      .then((res) => {
          Swal.fire({
            title: 'Success!',
            text: 'Product added successfully!',
            icon: 'success',
            confirmButtonColor: '#0d6efd',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            navigate("/");
          });
        })
        .catch((err) => console.log(err));
    } else {
        await axios.put(`${import.meta.env.VITE_API_URL}/Products/${id}`,data)
        .then((res)=>{
            Swal.fire({
              title: 'Success!',
              text: 'Product updated successfully!',
              icon: 'success',
              confirmButtonColor: '#0d6efd',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
              navigate('/');
            });
        })
        .catch(err => console.log(err))
    }
  }

  async function SingleProduct() {
    if (id) {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/Products/${id}`
      );
      setProduct(res.data);
      reset(res.data);
    }
  }

  useEffect(() => {
    if (id) {
      SingleProduct();
    }
  }, [id]);
  
  return (
    <>
      <Header />
      <div className="col-lg-6 m-auto mt-5 shadow p-5 rounded-3 modern-form glass-effect">
        <h1 className="text-capitalize text-center mb-4 gradient-text">{id ? 'Edit Product' : 'Add Products'}</h1>
        <form action="" onSubmit={handleSubmit(addData)}>
          <label htmlFor="image" className="form-label text-capitalize mb-2">
            product url
          </label>
          <input
            type="text"
            {...register("image")}
            className="form-control mb-2"
            placeholder="Enter URL"
            id="image"
            autoFocus
          />
          <label htmlFor="name" className="form-label text-capitalize mb-2">
            product name
          </label>
          <input
            type="text"
            {...register("product_name")}
            className="form-control mb-2"
            placeholder="Enter name"
            id="name"
          />
          <label htmlFor="category" className="form-label text-capitalize mb-2">
            product category
          </label>
          <select className="form-select mb-2" {...register("category")}>
            <option value="">-- Select Category</option>
            {categories.map((ele, index) => (
              <option key={index} value={ele} className="text-capitalize">
                {ele}
              </option>
            ))}
          </select>
          <label htmlFor="price" className="form-label text-capitalize mb-2">
            product price
          </label>
          <input
            type="text"
            {...register("price")}
            className="form-control mb-2"
            placeholder="Enter price"
            id="price"
          />
          <label htmlFor="date" className="form-label text-capitalize mb-2">
            product date
          </label>
          <input
            type="date"
            {...register("upload_date")}
            className="form-control mb-2"
            placeholder="Enter date"
            id="date"
          />
          <label htmlFor="desc" className="form-label text-capitalize mb-2">
            product description
          </label>
          <textarea
            type="text"
            {...register("description")}
            className="form-control mb-2"
            placeholder="Enter description"
            id="desc"
          />

          {id == null ? (
            <button className="btn btn-primary text-capitalize my-3 w-100 pulse-animation">
              Add Product
            </button>
          ) : (
            <button className="btn btn-warning text-capitalize my-3 w-100 pulse-animation">
              Update Product
            </button>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ProductForm;
