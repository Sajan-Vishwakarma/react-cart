import Product from './Product'

import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../CartContext';

const Products = () => {
    // const {name} = useContext(CartContext);

    const [products,setProducts] = useState([]);

    // fetch data from api created in rest-api
    useEffect(() => {
        fetch(`/api/products`)
        .then( response => response.json())
        .then( products => {
            setProducts(products);
        });
    }, []);

    return (
        <div className="container mx-auto pb-24">
            <h1 className="text-lg font-bold my-8"> Products </h1>
            <div className="grid grid-cols-5 my-8 gap-24">
                {
                    products.map( (product) => {
                        // here product={} is a prop which is a property 
                        // which will be aquired in Product.js in Product function
                        return <Product key={product._id} product={product}/>;
                    })
                }
            </div>
        </div>
    )
};

export default Products;