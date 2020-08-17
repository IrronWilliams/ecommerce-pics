import React, {useContext, useState} from "react"
import {Context} from "../Context"
import CartItem from "../components/CartItem"

/*I want my carts page to look at items in the cart and map over them to display something on the page. In order for the Cart component to 
have access to the items in the cart, will need Context again. I will need the cartItems, so can use useContext and pass in the Context 
object and destrucure cartItems from the Context object. 

Would like to delete items from the cart on the checkout page. Instead of congesting the Cart Component, can create another component 
called CartItem and render an instance of <CartItem /> from the Cart Component

Cart Component passes down an item object and the CartItem function receives the item parameter as an object. 

To console log the cartItems, need to go to the cart page (/cart) because when you navigate away from it, it actually dismounts the home
page (/). Had to go to the carts page in order for the carts page to mount. 

To calculate total cost of cart, can find the length of the cartItems array by $5.99 and apply toLocaleString. Then
render the variable totalCoastDisplay

The 'Place Order' button is currently hardcoded. Can use state to keep track of what the Place Order button should 
be. Import useState and set state with the button, with Place Order as default and can replace the hardcoded text with state
     -> const [buttonText, setButtonText] = useState("Place Order") 

Clicking the button should create a series of events. When button is clicked, should call the placeOrder() function. The function should
set the buttonText to 'Ordering'. Use setTimeout() to wait 3 seconds. setTimeout() takes 2 parameter, a function and the time the amount
of time to wait in milliseconds. After 3 seconds, console.log 'Order Placed'. Set the buttonText back to 'Place Order'. 

To conditionally render the Place Order button, can use a ternary to check if the length of the cartItems is >0. If so, render the div 
with the button. If not, render a paragraph saying 'You have no items in your cart.'
If not, 

*/

function Cart() {
    const [buttonText, setButtonText] = useState('Place Order')
    const {cartItems, emptyCart} = useContext(Context)  //using Context, passing in the Context object and destructuring cartItem from the object. 
    //console.log(cartItems)
    const totalCost = cartItems.length *5.99
    const totalCostDisplay = totalCost.toLocaleString("en-US", {style: "currency", currency: "USD"})
            
    const cartItemElements = cartItems.map(item => ( //map over each item in cart, create an instance of CartItem and pass down key & item.  
        <CartItem key={item.id} item={item} />
    ))

    function placeOrder() {
        setButtonText('Ordering...')
        setTimeout(() =>{
            console.log('Order Placed')
            setButtonText('Place Order')
            emptyCart()

        },3000)
    }
    
    return (
        <main className="cart-page">
            <h1>Check out</h1>
            {cartItemElements}
            <p className="total-cost">Total: {totalCostDisplay}</p>
            {
                cartItems.length>0 ? 
                    <div className="order-button">
                        <button onClick={placeOrder}>{buttonText}</button>
                    </div> :
                    <p>You have no items in your cart.</p>
            }
        </main>
    )
}

export default Cart