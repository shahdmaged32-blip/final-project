
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../Api/api'
import '../styles/UpdateProducts.css'

export default function UpdateProducts () {
  const { id } = useParams()

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')

  useEffect(
    function () {
      async function fetchProduct () {
        try {
          const response = await api.get(`/products/${id}`)
          setTitle(response.data.title)
          setPrice(response.data.price)
          setCategory(response.data.category)
        } catch (error) {
          console.log(error)
        }
      }

      fetchProduct()
    },
    [id]
  )

  async function updateProduct (event) {
    event.preventDefault()

    try {
      const response = await api.put(`/products/${id}`, {
        title,
        price,
        category
      })

      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='update-container'>
      <div className='update-card'>

        {/* Header */}
        <div className='update-header'>
          <div className='update-icon'>
            <i className='bi bi-pencil-square'></i>
          </div>

          <h2>Update Product</h2>
          <p>Edit your product information easily</p>
        </div>

        {/* Form */}
        <form onSubmit={updateProduct}>

          <div className='update-input-group'>
            <label>
              <i className='bi bi-box-seam me-2'></i>
              Product Title
            </label>

            <input
              type='text'
              className='form-control'
              placeholder='Enter product title'
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </div>

          <div className='update-input-group'>
            <label>
              <i className='bi bi-currency-dollar me-2'></i>
              Product Price
            </label>

            <input
              type='number'
              className='form-control'
              placeholder='Enter product price'
              value={price}
              onChange={event => setPrice(event.target.value)}
            />
          </div>

          <div className='update-input-group'>
            <label>
              <i className='bi bi-tags me-2'></i>
              Product Category
            </label>

            <input
              type='text'
              className='form-control'
              placeholder='Enter product category'
              value={category}
              onChange={event => setCategory(event.target.value)}
            />
          </div>

          <button type='submit' className='update-btn'>
            <i className='bi bi-check-circle me-2'></i>
            Update Product
          </button>

        </form>

      </div>
    </div>
  )
}
