import { 
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    COMENZAR_DESCARGA_PRODUCTOS_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from "../types";
import clienteAxios from "../config/axios";

//Crear nuevos productos
export function crearNuevoProductoAction(product){
    return async dispatch => {
        dispatch( addProduct() );
        try {
            //insertar en la API
            await clienteAxios.post('/productos', product);
            //si todo sale bien, actualizar el state
            dispatch( addProductSuccess(product) );
            //alert
            alert('Producto agregado correctamente');
        }
        catch (error) {
            console.log(error);
            dispatch( addProductError(true) );
        }
    }
}

const addProduct = () => ({
    type: AGREGAR_PRODUCTO
})

//si el producto se guarda en la base de datos
const addProductSuccess = product => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: product
})

//si hubo un error
const addProductError = state => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: state
})

//funcion que obtiene los productos de la api
export function getProductsAction(){
    return async dispatch => {
        dispatch( getProducts() );
        try {
            const response = await clienteAxios.get('/productos');
            dispatch( getProductsSuccess(response.data) );
        } catch (error) {
            console.log(error);
            dispatch( getProductsError() );
        }
    }
}

const getProducts = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const getProductsSuccess = products => ({
    type: COMENZAR_DESCARGA_PRODUCTOS_EXITO,
    payload: products
})

const getProductsError = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

//selecciona y elimina el producto
export function deleteProductAction(id){
    return async dispatch => {
        dispatch( getProductDelete(id) );
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( deleteProductSuccess() );
        } catch (error) {
            console.log(error);
            dispatch( deleteProductError() );
        }
    }
}

const getProductDelete = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const deleteProductSuccess = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const deleteProductError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

//colocar producto en edicion
export function getProductEditAction(product){
    return dispatch => {
        dispatch( getProductEdit(product) );
    }
}

const getProductEdit = product => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: product
})

//Edita un registro en la api y state
export function editProductAction(product){
    return async dispatch => {
        dispatch( editProduct() );
        try {
            await clienteAxios.put(`/productos/${product.id}`, product);
            dispatch( editProductSuccess(product) );
        }catch (error){
            console.log(error);
            dispatch( editProductError() );
        }
    }
}

const editProduct = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
})

const editProductSuccess = product => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: product
})

const editProductError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})