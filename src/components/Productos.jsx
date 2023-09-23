import {useEffect} from 'react'
import Producto from './Producto'
//redux
import { useSelector, useDispatch } from 'react-redux'
import { getProductsAction } from '../actions/productoActions'

const Productos = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = () => dispatch( getProductsAction() );
    loadProducts();
  }, [])

  const products = useSelector(state => state.productos.productos);
  const error = useSelector(state => state.productos.error);

  return (
    <>
      <h2 className="text-center my-5">Listado de productos</h2>
      { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p> : null}
      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            products.length === 0 ? 'No hay productos' : (
              products.map(product => (
                <Producto key={product.id} product={product} />
              ))
            )
          }
        </tbody>
      </table>
    </>
  )
}

export default Productos