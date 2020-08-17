import React, {useContext} from "react"
import {Link} from 'react-router-dom'

import {Context} from '../Context' 

/*The great thing about Context is that I do not need to prop drill or send props a million levels down components that need the data. If
the header component needs to know how many cart items there are, can simply use Context to grab the data from Context. Begin by importing
useContext hook and the Context.js file. Can now just pull in  what I need from Context,  which are the cartItems. 

Now the Header has access to the array of items in the cart. This allows me to change the cart icon in the header to display the full 
cart icon if there are any items in the cart. Since cartItems is an array of items, if the length of the array is zero, then display the 
empty cart. If array length is >0, then display the filled cart. Can use a ternary for this. Remember 0 is considered a falsey value.   */

function Header() {
    const {cartItems} = useContext(Context)  //Header now has access to cartItems passed from Context.js
    const cartClassName = cartItems.length > 0 ? "ri-shopping-cart-fill" : "ri-shopping-cart-line"
    return (
        <header>
           <Link to='/'><h2>Pic Some</h2></Link>
           <Link to='/cart'><i className={`${cartClassName} ri-fw ri-2x`}></i></Link> 
        </header>  
    )
}

export default Header
