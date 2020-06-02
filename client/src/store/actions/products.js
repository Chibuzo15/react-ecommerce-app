import * as actionTypes from './actions';
import axios from '../../axios';

export const getProductsSuccess = (products) => {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        products: products
    }
}

export const getProductsFailed = () => {
    return {
        type: actionTypes.GET_PRODUCTS_FAILED
    }
}

export function getProducts() {
    return dispatch => {
        axios.get('/api/products')
            .then(res => {
                console.log('products', res.data)
                const products = res.data.map(product => {
                    return {
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        desc: product.description,
                        image: product.image.url
                    }
                })
                dispatch(getProductsSuccess(products))

            })
            .catch((error) => {
                dispatch(getProductsFailed())
            })
    }
}

export const deleteProductSuccess = () => {
    return {
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
    }
}

export const deleteProductFailed = () => {
    return {
        type: actionTypes.DELETE_PRODUCT_FAILED
    }
}

export const deleteProduct = (id) => {
    return dispatch => {
        axios.delete(`/api/products/${id}`)
            .then(res => {
                dispatch(deleteProductSuccess())
            })
            .catch((error) => {
                dispatch(getProductsFailed())
            })
    }
}

export const addProductSuccess = (product) => {
    return {
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        product: product
    }
}

export const addProductsFailed = () => {
    return {
        type: actionTypes.ADD_PRODUCT_FAILED
    }
}

export const addProduct = (product) => {
    return dispatch => {
        axios.post('/api/products/', product)
            .then(res => {
                console.log('This is the response', res)
                let product = {
                    id: res.data._id,
                    name: res.data.name,
                    price: res.data.price,
                    desc: res.data.description
                }
                dispatch(addProductSuccess(product))
            })
            .catch((error) => {
                dispatch(addProductsFailed())
            })
    }
}

export const uploadProductImage = (image) => {
    return dispatch => {
        const formData = new FormData();
        formData.append('product_image', image); 
        const header = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post('/api/upload-image/', formData, header)
            .then(res => {
                console.log('response to upload', res)
                dispatch(uploadProductImageSuccess(res.data.url, res.data.image_id))
            })
            .catch((error) => {
                console.log('Error :', error)
                dispatch(uploadProductImageFailed(error))
            })
    }
}

export const uploadProductImageSuccess = (url, image_id) => {
    return {
        type: actionTypes.UPLOAD_PRODUCT_IMAGE_SUCCESS,
        url: url,
        image_id: image_id
    }
}

export const uploadProductImageFailed = (error) => {
    return {
        type: actionTypes.UPLOAD_PRODUCT_IMAGE_FAILED,
        error: error
    }
}
