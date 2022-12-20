import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";

const Cart = () => {
    
    let total = 0;
    const [cartItems, setCartItems] = useState([]);
    const [priceFetched, togglePriceFetched] = useState(false);

    const { cart, setCart } = useContext(CartContext);
    
    useEffect(() => {
        if( !cart.items){
            return;
        }

        if( priceFetched) return;

        // need to extract productids from 
        const pids = []
        const productList = []
        for( let key of Object.keys(cart.items)){
            const product = key.split('-');
            pids.push(product[0]);
            productList.push(product);
        }       

        fetch('/api/products/cart-items',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ids: pids})
        }).then( res=> res.json())
        .then( products => {
            const items = [];
            for(let [index,product] of products.entries() ){
                const obj = { ...product[0], chosenSize: productList[index][1]};
                items.push(obj);
            }
            setCartItems(items);
            togglePriceFetched(true);
        })

    },[cart, priceFetched]);


    /** Utility functions to calculate qty and price of pizza */
    function getQty(itemID) {
        return cart.items[itemID];
    }

    function getPrice(item){
        const {size, chosenSize, _id, price } = item;
        const itemID = `${_id}-${chosenSize}`;

        let chosenSizePrice = 0;
        if( chosenSize === 'S'){
            chosenSizePrice = price + ((size==='S')? 0 : 
                (size === 'M')? -price*0.1 : -price*0.2);
            }
        else if( chosenSize === 'M'){
            chosenSizePrice = price + ((size==='S')? price*0.1: 
                (size === 'M')? 0 : -price*0.1);
        }
        else if( chosenSize === 'L'){
            chosenSizePrice = price+((size==='S')?price*0.2:((size === 'M')? price*0.1 : 0));
        }
        total += getQty(itemID)*chosenSizePrice;
        return getQty(itemID)*chosenSizePrice;
    }
    
    function decrease(event,itemID) {
        const existingQty = cart.items[itemID];
        if( existingQty === 0) return;
        
        const _cart = {...cart};
        _cart.items[itemID] = existingQty - 1;
        _cart.totalItems -= 1;
        setCart(_cart);
    }
    
    function increase(event,itemID) {        
        const existingQty = cart.items[itemID];
        const _cart = {...cart};
        _cart.items[itemID] = existingQty + 1;
        _cart.totalItems += 1;
        setCart(_cart);
    }
    

    function deleteItem(event, itemID) {
        const _cart = {...cart};
        const qty = getQty(itemID);
        delete _cart.items[itemID];
        _cart.totalItems -= qty;

        const newCartItems = cartItems.filter(item => {
            return ((`${item._id}-${item.chosenSize}`) !== itemID);
        });

        setCartItems(newCartItems);
        setCart(_cart);
    }   

    function handleOrder(event){
        window.alert('Order Placed Successfully');
        setCart({});
        setCartItems([]);
    }
    
    return (
        !cartItems.length ?
        <img className="mx-auto w-1/2 mt-12" src="/images/empty-cart.png" alt="Empty Cart"/> :
        <div className="container mx-auto lg:w-1/2 w-full pb-24">
        <h1 className="my-12 font-bold"> Cart items</h1>
        <ul>
            {
                cartItems.map((item) => {
                    return (
                        <li className="mb-12" key={`${item._id}-${item.chosenSize}`}>
                        <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <img className="h-16" src="/images/peproni.png" alt="peproni"/>
                        <span className="font-bold ml-4 w-48"> {item.name}
                        <span className="bg-yellow-500 px-2 py-2 ml-2 mr-2 rounded-full leading-none"> {item.chosenSize} </span>
                        </span>
                        </div>
                        <div>
                        <button onClick={(e) => {decrease(e,`${item._id}-${item.chosenSize}`)}} className="bg-yellow-500 px-4 py-2 rounded-full leading-none"> - </button>
                        <b className="px-4"> { getQty(`${item._id}-${item.chosenSize}`) } </b>
                        <button onClick={(e) => {increase(e,`${item._id}-${item.chosenSize}`)}} className="bg-yellow-500 px-4 py-2 rounded-full leading-none"> + </button>
                        </div>
                        <span className="ml-2 mr-2"> <b>Rs { getPrice(item)} </b></span>
                        <button onClick={(e) => deleteItem(e,`${item._id}-${item.chosenSize}`)} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white"> Delete </button>
                        </div>
                        </li>
                    )
                })
            }
        </ul>
        <hr className="my-6"/>
        <div className="text-right">
        <b>Grand Total: Rs {total}</b>
        </div>
        <div className="text-right mt-6">
        <button onClick={(e) => handleOrder(e)} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">Order Now</button>
        </div>
        </div>
        )
    };
    
    export default Cart;