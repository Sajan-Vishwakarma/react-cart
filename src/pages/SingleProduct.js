import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";


const SingleProduct = ()=>{

    const [product, setProduct] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    const [pizzaPrice, setPizzaPrice] = useState();
    const [pizzaSize, setPizzaSize] = useState();
    const [isAdding, setIsAdding] = useState(false);

    const { cart, setCart} = useContext(CartContext);

    useEffect(() => {
        fetch(`/api/products/${params._id}`)
        .then( res => res.json() )
        .then( product => {
            setPizzaPrice(product.price);
            setPizzaSize(product.size);
            setProduct(product);
        });
    },[params._id])


    function increasePizzaSize(){
        setPizzaSize( prevPizzaSize => {
            let currPizzaPrice = pizzaPrice;
            if( prevPizzaSize === 'M') {
                prevPizzaSize = 'L';
                currPizzaPrice += product.price*0.10;
            }
            else if( prevPizzaSize === 'S') {
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
            if( prevPizzaSize === 'M') {
                prevPizzaSize = 'S';
                currPizzaPrice -= product.price*0.10;
            }
            else if( prevPizzaSize === 'L') {
                prevPizzaSize = 'M';
                currPizzaPrice -= product.price*0.10;
            }
            setPizzaPrice(currPizzaPrice);
            return prevPizzaSize;
        });
    };

    function addToCart(e,product,pizzaSize) {
        
        const itemID = `${product._id}-${pizzaSize}`;

        const _cart = {...cart};        
        if( !_cart.items) _cart.items = {};
        
        if( !_cart.items[itemID] ){
            _cart.items[itemID] = 1;
        } else {
            _cart.items[itemID] += 1;
        }

        if( !_cart.totalItems) _cart.totalItems = 0;
        _cart.totalItems += 1;

        setCart(_cart);

        setIsAdding(true);
        setTimeout(() => {
            setIsAdding(false);
        }, 1000)
    }

    return (
        <div className="container mx-auto mt-12">
            <button className="mb-12 font-bold" onClick={() => navigate(-1)}> Back </button>
            <div className="flex"> 
                <img src={product.image} style={ {height:"200px", width:"250px"}} alt="pizza" />
                <div className="ml-16">
                    <h1 className="text-xl font bold"> {product.name} </h1>
                    <div className="text-md"> 
                        <button className="bg-yellow-400 py-1 rounded-full text-sm px-2 mr-2"
                         onClick={decreasePizzaSize}> - </button>
                        {pizzaSize} 
                        <button className="bg-yellow-400 py-1 rounded-full text-sm px-2 ml-2"
                         onClick={increasePizzaSize}> + </button>
                    </div>
                    <div className="font-bold mt-2"> Rs {pizzaPrice}</div>
                    <button disabled={isAdding} onClick={(e)=>{addToCart(e,product,pizzaSize)}} 
                    className= { `${isAdding?'bg-green-500':'bg-yellow-500'} py-1 px-8 rounded-full font-bold mt-4`} >
                        Add{ isAdding? "ed": ""} to Cart
                    </button>
                </div>
            </div>
        </div>
    )
};

export default SingleProduct;