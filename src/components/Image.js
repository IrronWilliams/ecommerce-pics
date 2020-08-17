import React, {useState, useContext} from 'react'
import PropTypes from "prop-types"
import {Context} from '../Context'  //pulls in Context object

/*The Image component is taking the className that was determined from the getClass() function and sticking in the 
className property. The image-container is used to contain the grid. The crucial part is rendering an acutal img 
element where the source is whatever the url is from the object obtained thru props. 

allowing className to be passed down to thru this component via props. className will come as a prop. 
providing a hardcoded className of image-container. helps make the distinction between the grid items and image container.  

The image function is not only receiving a prop called className, but also receiving a prop called img. The img is a full object that has 
a url property, an id property and isFavorited property. The property of the img object received in the function that will be used in 
the return/render is the url property.   

Will need to maintain state to maintain hover events, so pull in useState hook. Will use state by keeping track of a boolean called 
hovered where initial state will be set to false. When mouse enters the div, set hover to true and when mouse leaves div, set hover 
to false. Can use 2 event listeners, onMouseEnter and onMouseLeave. When mouse enters, it will run the anonymous function which will 
setHovered to true and when mouse leaves, will setHovered to false. Now have hovered state on/for each image.

Console logging comments will initially see False for each pic because have not hovered over pics. But when hover 
over a pic, the all False will be replaced by a single True. Moving a mouse to another image will console both a 
single False and single True. When moving out of image to another pic changed hovered to false and re-rendered the 
component. But moving to the new image changed hovered to True.   

Grabbing toggleFavorite method from the Context by saying useContext and passing in the Context object. Can now take the toggleFavorite
function and make it so that clicking the the icon runs the toggleFavorite function. The toggleFavorite function needs to receive the img 
id as a parameter. Can accomplish this by adding an onclick={} to the heartIcon variable. Can't just say onClick={toggleFavorite} because 
the onClick event listener is receiving the event as a parameter and not the id. So will need an anonymous function and that anonymous 
function will call toggleFavorite -> onClick={() => toggleFavorite(img.id)} where toggleFavorite will receive the img.id property. The img 
comes from props, and the props is an object that has an id property.  -> function Image({className, img})

image. icons reside here and this is where I want the actual interaction
to occur/function call to happen. With Image component, want to click the heart icon and flip the value of the isFavorite boolean.

if onclick={heartIcon} then run toggleFavorite method? ....onclick={()=> toggleFavorite(img.id)}
*/

function Image({className, img}) {   //destructuring className and img from props passed and received by Photos component 
    const [hovered, setHovered] = useState(false)
    //console.log(hovered)
    const {toggleFavorite, addToCart, cartItems, removeFromCart} = useContext(Context)  //destructuring the objects that come back from useContext 

    
    /*Do not have a property on the image to determine if item is in the cart. With the cartIcon, want it to display the filled shopping 
    cart if the item is already in the cart. If so, return <i className="ri-shopping-cart-fill cart"></i>, else if the image is being 
    hovered return <i className="ri-add-circle-line cart" onClick={() => addToCart(img)}></i>. 
    
    The challenge is that I do not have access to what's in the cart at this point. Fortunately, can use Context to get access to whats 
    in the cart by passing thru the cartItems. Thats as simple as adding cartItems to be passed in the Context.Provider. Then can update
    the useContext hook to grab the cartItems. The next challenge....now have a list of cartItems, how do I determine the current img is
    already in the cartItems. Can use find or some, even filter to check to see if the array length is = to 0. The some array method
    returns a boolean which essentially says if any of the items meets a condition. I can create a variable that will hold the boolean for
    whether or not the item is in the array. The some() method looks at every item and will return true if any item in the array has an id
    equal to the current img id.  

    removeFromCart() function only requires an id parameter, which is why only the img.id parameter is passed.  
    */

    //const cartIcon = hovered && <i className="ri-add-circle-line cart" onClick={()=> addToCart(img)}></i> //calls addToCart function and passes in full img object
    function cartIcon() {
        const alreadyInCart = cartItems.some(item => item.id === img.id) //returns boolean true if condition is met
        if(alreadyInCart) {
            return <i className="ri-shopping-cart-fill cart" onClick={() => removeFromCart(img.id)}></i>
        } else if(hovered) {
            return <i className="ri-add-circle-line cart" onClick={() => addToCart(img)}></i>
        } 
    }

    /*heartIcon() fills heart when heart image is clicked. onClick calls toggleFavorite() from Context.js and passes the id.
    The toggleFavorite() function flips the value of the isFavorite boolean of the pic when the id of the current pic matches the id that
    was passed to toggleFavorite as a parameter. If img not clicked the heart is not filled but is outlined with a line.   */
   function heartIcon() {
       if(img.isFavorite) {
           return <i className="ri-heart-fill favorite" onClick={()=> toggleFavorite(img.id)}></i> 
       } else if(hovered){
           return <i className="ri-heart-line favorite" onClick={()=> toggleFavorite(img.id)}></i>
       } 
    }

    return (
        <div 
            className={`${className} image-container`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img src={img.url} className="image-grid"/>
            {heartIcon()}
            {cartIcon()}

          
        </div>
    )
}

/*The Image component is relying pretty heavily on some of the props that are being passed in such as className and img. Its a good habit
to add propTypes to components that are receiving props. If I refactor program in the future and forget to pass a needed prop, I will 
get a message stating the prop is required. 

Before exporting Image, using propTypes. Image.propTypes will be an object and the properties of the object will be the props that are
being accepted. Want to make sure the propTypes for className = string. Its ok if the image does not receive a className. The Photos 
component is using getClass() and getClass() doesn't always return something. So important not to make this prop required. In regards
to img, there is something called PropTypes.object which is fine to use. But there are specific properties of the image object that I want
to ensure is being included with the prop that is being passed to the Image component. The way you can describe the properties of an
object is by its shape. There is a propType called shape and its a function that accepts an object. -> PropTypes.shape({}). It allows
me to specify the specific properties of the object that it should be receiving. Image has an id and it should be a string and should be
required because passing the id to the toggleFavorite() function. url is also a string and required because have to display the image
url using the image source. Should also receive the isFavorite property which is a boolean, indicated by bool. Not to important if this
is not included in prop because the heartIcon() function is managing this.  */

Image.propTypes = {
    className: PropTypes.string,
    img: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    })
}


export default Image
