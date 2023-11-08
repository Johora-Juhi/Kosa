import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../../components/loading/Loading';
import { useGetProductsQuery } from '../../../features/api/productSlice';
import Categories from '../Categories/Categories';
import Product from '../Product/Product';
import ShopCart from '../ShopCart/ShopCart';
import UpCommingProduct from '../UpCommingProduct/UpCommingProduct';
import './Products.css';
import { getcartItem } from '../../../features/cart/cartApi';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const Products = () => {
    const [upcommingProducts, setUpcommingProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const cartItem = useSelector(state => state.cartItem);
    const cartLength = (cartItem.cartItem.length);

    const cart = useSelector(state => state.cart);
    const cartDetails = cart.cart;

    let subTotal = 0;
    if (cartLength) {
        const eachProductQuantity = (cartItem.cartItem.map(c => (c.price * c.quantity)));
        subTotal = (eachProductQuantity.reduceRight((acc, cur) => acc + cur, 0)).toFixed(2);
    }
   
    const { data, isLoading } = useGetProductsQuery();
    const products = data;

    if (isLoading) {
        <Loading></Loading>
    }

    useEffect(() => {
        fetch('../../../upCommingProduct.JSON')
            .then(response => response.json())
            .then(data => setUpcommingProducts(data));
    }, [])
    useEffect(() => {
        fetch('../../../categories.JSON')
            .then(response => response.json())
            .then(data => setCategories(data));
    }, [])

    return (
        <div>
            <div className="products py-5">
                <div className="container">
                    <div className="row p-0 m-0">
                        {products?.length && <div className='show'>Showing 1-{products.length} of {products.length} results</div>}
                        <div className="col-lg-9 col-md-12 px-4">
                            <div className="proContainer">
                                {
                                    products?.map(product =>
                                        <Product
                                            key={product._id}
                                            product={product}
                                        ></Product>
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12 rightProducts">
                            {
                                cartLength > 0 &&
                                <h4 className='mb-4'>Cart</h4>
                            }
                            <div className='mb-5'>
                                {
                                    cartLength > 0 &&
                                    cartItem.cartItem.map(cart => <ShopCart
                                        key={cart._id}
                                        cart={cart}
                                    ></ShopCart>)
                                }
                                {
                                    cartLength > 0 &&
                                    <div className='d-flex justify-content-between'>
                                        <div className='subtotalStyle'>Subtotal :</div>
                                        <div className='subtotalStyle'>£{subTotal}</div>
                                    </div>
                                }
                                {
                                    cartLength > 0 &&
                                    <div style={{ color: "#fff" }} className='row gx-5 px-4 my-3'>
                                        <div className='col-6 bg-dark py-3 text-center fw-bold border border-white'>
                                            <Link to="/cart" className='py-2 px-2' style={{ color: "#fff", textDecoration: "none", letterSpacing: '1px' }} >View Cart</Link>
                                        </div>
                                        <div className='col-6 bg-dark py-3 text-center fw-bold border border-white' >
                                            <Link to="/checkout" className='py-2 px-2' style={{ color: "#fff", textDecoration: "none", letterSpacing: '1px' }} >Checkout</Link>
                                        </div>
                                    </div>
                                }
                            </div>
                            <h4>Upcomming Products</h4>
                            {
                                upcommingProducts.map(upcommingProduct =>
                                    <UpCommingProduct
                                        key={upcommingProduct.id}
                                        upcommingProduct={upcommingProduct}
                                    ></UpCommingProduct>
                                )
                            }
                            <h5>Categories</h5>
                            {
                                categories.map(category =>
                                    <Categories
                                        key={category.id}
                                        category={category}
                                    ></Categories>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;