import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Product from "../components/product"
import Spinner from "../components/spinner/spinner"
import Alert from "../components/alert"
import Pagination from "../components/pagination"
import { listProducts } from "../redux/actions/productActions"

const ProductListScreen = ({ match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1
  const productList = useSelector((state) => state.productList)

  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(match.path, pageNumber))
  }, [dispatch, match.path, pageNumber])

  return (
    <div className="product-page">
      <div className="product-page--wrapper">
        {loading && products.length === 0 ? (
          <Spinner />
        ) : error ? (
          <Alert>{error}</Alert>
        ) : (
          products.map((product) => {
            return <Product key={product._id} product={product} />
          })
        )}
      </div>

      <Pagination pages={pages} page={page} />
    </div>
  )
}

export default ProductListScreen
