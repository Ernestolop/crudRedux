import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//Actions de redux
import { crearNuevoProductoAction } from '../actions/productoActions'

const NuevoProducto = () => {

  //state del componente
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  //accder al state del store
  const loading = useSelector(state => state.productos.loading);
  const error = useSelector(state => state.productos.error);

  //utilizar use dispatch y te crea una funcion
  const dispatch = useDispatch();

  const addProduct = product => {
    dispatch( crearNuevoProductoAction(product) );
  }

  const handleSubmit = e => {
    e.preventDefault();
    //validar formulario
    if(name.trim() === '' || price <= 0){
      return;
    }
    
    //si no hay errores
    //crear el nuevo producto
    addProduct({
      name,
      price
    });

    //redireccionar
    navigate('/');
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {loading ? <p>Cargando...</p> : null}
            {error ? <p className='alert alert-danger p2 mt-4 text-center'>Hubo un error</p> : null}
            <form
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="productName">Nombre Producto</label>
                <input type="text" id="productName" className="form-control" placeholder="Nombre Producto" name='nombre' value={name} onChange={e => setName(e.target.value)}/>
              </div>
              <div className="form-group">
                <label htmlFor="productPrice">Precio</label>
                <input type="number" id="productPrice" className="form-control" placeholder="Precio Producto" name='precio' value={price} onChange={e => setPrice(Number(e.target.value))}/>
              </div>
              <input type="submit" value="Agregar" className='btn btn-primary font-weight-bold text-uppercase d-block w-100' />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProducto