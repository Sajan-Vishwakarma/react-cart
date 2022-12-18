import { useState } from "react";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { CartContext } from "../CartContext";


const Product = ( props ) => {
    
    /* props contains all the passed data/info
    we passed info of product so destructuring it 
    and displaying dynamic data */
    
    const { product } = props;
    const [pizzaPrice, setPizzaPrice] = useState(product.price);
    const [pizzaSize, setPizzaSize] = useState(product.size);

    /* how to change state using single button i.e size button
        function setSize() {        
            setPizzaSize( prevPizzaSize => {
                let currPizzaPrice = pizzaPrice;
                if( prevPizzaSize == 'M') {
                    prevPizzaSize = 'L';
                    currPizzaPrice += product.price*0.10;
                }
                else if( prevPizzaSize == 'L') {
                    prevPizzaSize = 'S';
                    currPizzaPrice -= product.price*0.20;
                }
                else if( prevPizzaSize == 'S') {
                    prevPizzaSize = 'M';
                    currPizzaPrice += product.price*0.10;
                }
                setPizzaPrice(currPizzaPrice);
                return prevPizzaSize;
            });
        }; */

    function increasePizzaSize(){
        setPizzaSize( prevPizzaSize => {
            let currPizzaPrice = pizzaPrice;
            if( prevPizzaSize == 'M') {
                prevPizzaSize = 'L';
                currPizzaPrice += product.price*0.10;
            }
            else if( prevPizzaSize == 'S') {
                prevPizzaSize = 'M';
                currPizzaPrice += product.price*0.10;
            }
            setPizzaPrice(currPizzaPrice);
            return prevPizzaSize;
        });
    };

    function decreasePizzaSize(){
        setPizzaSize( prevPizzaSize => {
            let currPizzaPrice = pizzaPrice;
            if( prevPizzaSize == 'M') {
                prevPizzaSize = 'S';
                currPizzaPrice -= product.price*0.10;
            }
            else if( prevPizzaSize == 'L') {
                prevPizzaSize = 'M';
                currPizzaPrice -= product.price*0.10;
            }
            setPizzaPrice(currPizzaPrice);
            return prevPizzaSize;
        });
    };

    const [isAdding,setIsAdding] = useState(false);

    const { cart, setCart } = useContext(CartContext);
    function addToCart(e,productId,size) {
        /*  const cart = {
            items:{
                "${product._id}-${size}":qty,
            },
            totalItems:sumofitems;
        } */
        
        let _cart = { ...cart};
        const id = `${productId}-${size}`;
        if( !_cart.items) _cart.items = {};
        
        if( _cart.items[id]) {
            _cart.items[id] += 1;
        } else {
            _cart.items[id] = 1;
        }    
        if( !_cart.totalItems )
            _cart.totalItems = 0;
        _cart.totalItems += 1;
        setCart(_cart);

        setIsAdding(true);
        setTimeout(() => {
            setIsAdding(false);
        }, 1000)
    };

    return (
        <div>
            <Link to={`/products/${product._id}`}>
                <img src={product.image} alt="peproni-pizza"/>
            </Link>
            <div className="text-center">
                <Link to={`/products/${product._id}`}>
                    <h2 className="text-lg font-bold py-2"> {product.name} </h2>
                </Link>
                <button className="bg-yellow-400 py-1 rounded-full text-sm px-2 mr-2" onClick={decreasePizzaSize}> - </button>
                <span className="bg-gray-200 py-1 rounded-full text-sm px-4"> { pizzaSize } </span>
                <button className="bg-yellow-400 py-1 rounded-full text-sm px-2 ml-2" onClick={increasePizzaSize}> + </button>
            </div>
            <div className="flex items-center justify-between mt-4">
                <span> Rs {pizzaPrice} </span>
                <button disabled={isAdding} onClick={(e) => {addToCart(e,product._id,pizzaSize)}}
                 className={ `${isAdding? 'bg-green-500': 'bg-yellow-500'} py-1 px-4 rounded-full font-bold` }> 
                    ADD{isAdding? "ED": "" } 
                 </button>
            </div>
        </div>
    );
};

export default Product;