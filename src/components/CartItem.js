import React, {useContext, useState} from "react"
import PropTypes from "prop-types"
import {Context} from '../Context'

/*Cart Component passes down an item object and the CartItem() function receives the item parameter as an object.

To use the trash icon to remove items from a cart, can use the removeFromCart() function in Context. Pull in the 
function from the Context object via useContext hook. Now have access to function so can add an onClick to the image
to have an anonymous function call/run removeFromCart(). Pass in item.id because the {item} parameter represents 
the image or cart item on the Checkout page. 

To change the trash icon to a filled-in trash icon when hovering over it, first need to know if user is hovering over the trash
icon. I need to first create a hover state for the icon itself. To do this I will need to maintain some state. So import useState 
and set hovered and setHovered to useState starting with false->  const [hovered, setHovered] = useState(false). 

For the trashcan icon, need to set up an event listener for onMouseEnter and another for onMouseLeave so that it can correctly set the 
hovered state. But also need to change the className based upon whatever the hovered state is by dynamically changing part of the className. 

When onMouseEnter and onMouseLeave happens, run an anonymous function that changes the hovered state, with true for enter (meaning hovering)
and false for leave (no longer hovering). Can also create a variable using a ternary that says when hovered, used icon where trashcan is 
filled, when not hovered, use icon where trashcan is not filled. This variable can be used to dynamically change the trash can images. 


*/
function CartItem({item}) {
    const [hovered, setHovered] = useState(false)
    const {removeFromCart} = useContext(Context)
    const iconClassName = hovered ? "ri-delete-bin-fill" : "ri-delete-bin-line"

    return (
        <div className={iconClassName}>
        <i 
            className="ri-delete-bin-line" 
            onClick={() => removeFromCart(item.id)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
        </i>
        
        <img src={item.url} width="130px" />
        <p>$5.99</p>
    </div>
    )
}

//Important for the url to be included as part of prop
CartItem.propTypes = {
    item: PropTypes.shape({
        url: PropTypes.string.isRequired
    })
}

export default CartItem