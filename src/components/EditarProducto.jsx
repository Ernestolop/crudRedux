import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Redux
import { useSelector, useDispatch } from 'react-redux'
import { editProductAction } from '../actions/productoActions'

const EditarProducto = () => {

  //producto a editar
  const product = useSelector(state => state.productos.productoEditar);

  //state del componente
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if(name.trim() === '' || price <= 0){
      return;
    }
    dispatch( editProductAction({
      id: product.id,
      name,
      price
    }) );
    navigate('/');
  }

  
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="productName">Nombre Producto</label>
                <input type="text" id="productName" className="form-control" placeholder="Nombre Producto" name='nombre' value={name} onChange={e => setName(e.target.value)}/>
              </div>
              <div className="form-group">
                <label htmlFor="productPrice">Precio</label>
                <input type="number" id="productPrice" className="form-control" placeholder="Precio Producto" name='precio' value={price} onChange={e => setPrice(e.target.value)} />
              </div>
              <input type="submit" value="Guardar Cambios" className='btn btn-primary font-weight-bold text-uppercase d-block w-100' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarProducto