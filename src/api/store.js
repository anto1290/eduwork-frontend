import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/authReducer'
import { productListReducer } from './reducers/productReducer';
import { tagsListReducer } from './reducers/tagsReducer';
import { cartReducer } from './reducers/cartReducer';
import { categoryListReducer } from './reducers/categoryReducer';

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    productList: productListReducer,
    tagsList: tagsListReducer,
    category: categoryListReducer,
    cart: cartReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const cartItemsFromStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    cart: cartItemsFromStorage,
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store