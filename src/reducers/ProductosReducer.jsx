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

//cada reducer tiene su propio state
const initialState = {
    productos : [],
    error: false,
    loading: false,
    productoEliminar: null,
    productoEditar: null
}

export default function(state = initialState, action){
    switch (action.type) {
        case AGREGAR_PRODUCTO:
            return {
                ...state,
                loading: true
            }
            break;
        case AGREGAR_PRODUCTO_EXITO:
            return {
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
            break;
        case AGREGAR_PRODUCTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            break;
        case COMENZAR_DESCARGA_PRODUCTOS:
            return {
                ...state,
                loading: true,
                error: false
            }
            break;
        case COMENZAR_DESCARGA_PRODUCTOS_EXITO:
            return {
                ...state,
                productos: action.payload,
                loading: false,
                error: false
            }
            break;
        case COMENZAR_DESCARGA_PRODUCTOS_ERROR:
            return {
                ...state,
                productos: [],
                loading: false,
                error: true
            }
            break;
        case OBTENER_PRODUCTO_ELIMINAR:
            return {
                ...state,
                productoEliminar: action.payload
            }
            break;
        case PRODUCTO_ELIMINADO_EXITO:
            return {
                ...state,
                productos: state.productos.filter(producto => producto.id !== state.productoEliminar),
                productoEliminar: null
            }
            break;
        case PRODUCTO_ELIMINADO_ERROR:
            return {
                ...state,
                error: true,
                productoEliminar: null
            }
            break;
        case OBTENER_PRODUCTO_EDITAR:
            return {
                ...state,
                productoEditar: action.payload
            }
            break;
        case COMENZAR_EDICION_PRODUCTO:
            return {
                ...state,
                loading: true
            }
            break;
        case PRODUCTO_EDITADO_EXITO:
            return {
                ...state,
                loading: false,
                productoEditar: null,
                productos: state.productos.map(producto => producto.id === action.payload.id ? producto = action.payload : producto)
            }
            break;
        case PRODUCTO_EDITADO_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            }
            break;
        default:
            return state;
            break;
    }
}