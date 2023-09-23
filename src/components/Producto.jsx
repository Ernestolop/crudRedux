import { Link, useNavigate } from 'react-router-dom'
//redux
import { useDispatch } from 'react-redux'
import { deleteProductAction, getProductEditAction } from '../actions/productoActions'

const Producto = ({product}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  //confirmar si desea eliminarlo
  const confirmDeleteProduct = id => {
    //preguntar al usuario
    if(window.confirm('¿Estas seguro que deseas eliminar este producto?')){
      //pasarlo al action
      dispatch( deleteProductAction(id) );
    }
  }

  //funcion que redirige de forma programada
  const redirectEdit = product => {
    dispatch( getProductEditAction(product) );
    navigate(`/productos/editar/${product.id}`)
  }



  return (
    <tr>
        <td>{product.name}</td>
        <td><span className="font-weight-bold">$ {product.price}</span></td>
        <td className="acciones">
            <button className="btn btn-primary mr-2" type='button' onClick={() => redirectEdit(product)}>Editar</button>
            <button onClick={() => confirmDeleteProduct(product.id)} type="button" className="btn btn-danger">Eliminar</button>
        </td>
    </tr>
  )
}

export default Producto