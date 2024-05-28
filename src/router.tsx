import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, { loader as productsLoader, action as updateAvailabilityAction } from './views/Products'
import NewProducts, { action as newProductAction } from './views/NewProducts'
import EditProduct, { loader as editProductLoader, action as editProductAction } from './views/editProduct'
import { action as deleteProductDetails } from './components/ProductDetails'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true, //cargará en la página principal '/'
                element: <Products />,
                loader: productsLoader,
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevo',
                element: <NewProducts />,
                action: newProductAction
            },
            {
                path: 'productos/:id/edit', // ROA Pattern - Resource-oriented dessing
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'productos/:id/delete', // ROA Pattern - Resource-oriented dessing
                action: deleteProductDetails
            }
        ]
    }
])