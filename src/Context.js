import React, {useState, useEffect } from 'react' 

const Context = React.createContext() //Context returns a complex component that includes the Provider and Consumer properties 


/*This is a custom component for the Provider, so need to render props.children, which ensures that whatever component passed between 
ContextProvider can render whatever gets put between the opening and closing tabs of the Provider. Because 
rendering props.children, will need to bring in props as a parameter to the function. Can also destructure props and 
get children, thus render children. Always need a value prop.   

Am rendering children because will pull into index.js by wrapping function around the App. This process will pass 
the children onward so they are rendered correctly. */
function ContextProvider({children}) { //destructuring children from props.children

    const [allPhotos, setAllPhotos] = useState([]) //-> using useState hook to add state to ContextProvider, setting an array as initial value 
    const [cartItems, setCartItems] = useState([])


     /*Can use the useEffect hook to see if something has rendered. The useEffect hook takes a function and an array of dependencies. 
        useEffect(() => {}, [])
    Leaving the array empty, useEffect will happen just 1x when the component 1st mounts and never again. Inside the body of useEffect, can
    get the data from the api by using native fetch() method and and save the data to state. 

    To check if working, console.log(allPhotos) data. Should start as an empty array. The component should render because 
    <ContextProvider></ContextProvider> is being rendered in index.js. Then useEffect hook will run, get the data, set the photos, console
    log again because state will change and re-render the component. Check log or enter url in browser to see what info is available on the
    photos. */ 
    const url = 'https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json'
    useEffect(() => {
        fetch(url) //providing fetch with url. Fetch returns a Promise. 
        .then(response => response.json())  //resolving promise with then(). receives response, parses it. json turns response into an object. This also returns a Promise. 
        .then(data => setAllPhotos(data)) //receives object, calling object 'data'. passing in the array of data to setAllPhotos .     
    }, [])

    console.log(allPhotos)

    /*toggleFavorite() accepts id parameter and updates the array of allPhotos by flipping the `isFavorited` property of the photo with 
    the matching `id`. Want to use setAllPhotos to update state. Begin by creating an updated array by mapping over all photos which will
    look at every photo object in the array. In the function body, looking for one of the photos in allPhotos array that has the matching
    id provided to the function. If the current photo has an id equal to the id received from function then return in its place a brand
    new object. The new object will have all of the properties of the photo except the isFavorited property will be the opposite of what
    it currently is. The id's of the photos I am looping over will not match the id received by function majority of time. So if ids do
    not match, simply return the photo. After I create the updatedArr, set it to the new version of allPhotos by passing updatedArr to 
    setAllPhotos -> setAllPhotos(updatedArr). W/o setting new version to allPhotos, when clicking the heart, will turn isFavorite value 
    to true but will not turn to false when heart is clicked again. This does not modify state directly. 

    Now pass the toggleFavorite() function to the Image component because icons reside here and this is where I want the actual interaction
    to occur/function call to happen. With Image component, want to click the heart icon and flip the value of the isFavorite boolean. 
    
    Anything I want to pass from Context to the components will happen thru the value property. It doesn't have to be just state. It could
    be any values, including functions I want to pass thru. I can pass the toggleFavorite method thru the Provider and then in the Image 
    component, I can use context to grab the value by pulling in the useContext hook and import the Context file. 

       */
    function toggleFavorite(id) { //receives id from Image component during click event of heart image. The id of image is passed when clicked
        const updateArr = allPhotos.map(photo =>{
            if (photo.id === id) {
                //console.log(id)  //current id
                //console.log(!photo.isFavorite) //what id will be changed to
                return {...photo, isFavorite: !photo.isFavorite}  //copies photo object and flips isFavorite property
            }
            return photo         //return photo if ids do not match
        })
        setAllPhotos(updateArr) //setting updated array to AllPhotos 
    }
    
    /*When function is called by clicking the cart icon from the Image component, going to pass in the entire newItem object. Goal is
    to update cartItems so can call setCartItems, and will need to know what the previous items were, so they can be included in the
    new array. What is returned is a new array that has all of the previous items in it, plus the newItem. 
    
    In order to get the addToCart function to be called when the cartIcon image is clicked in the Image Component, need to pass addToCart 
    thru ContextProvider's value.  Can now grab it thru context in the Image Component.    */
    function addToCart(newItem){
        setCartItems(prevItems => [...prevItems, newItem])
    }
    console.log(cartItems)

    /*removeFromCart will need to accept a parameter to indicate which item I am trying to remove. Can pass the whole item like I did with
    addToCart. But the only thing I need is the id from the item I am trying to remove. So the id is all that I will require from this
    function. Can use a filter to remove something from the cart. Use the setCartItems() from state, get the prevItems. What I want to 
    return is the array that results from prevItem.filter(). prevItem.filter() returns an array that has only the items that met a 
    condition inside the function passed in the filter method. The function passed in the filter() method will look at each item and only
    add the item in the resulting array if the item id does not equal the id passed to the removeFromCart(id) function. Essentially every
    item will be added to the resulting array except for the 1 with the specified id.  

    Pass the function down in the Context.Provider. Now that I have access to removeFromCart, can now bring into the Image component via
    the useContext hook. 
    */
    function removeFromCart(id) {  //will receive id from Image component 
        setCartItems(prevItems => prevItems.filter(item => item.id !==id))
    }

    /*To empty the cart from the Cart component, set the cartItems to an empty array, by using state function setCartItems().Pass
    function down to Context. In Cart component, remember to grab emptyCart from Context  */
    function emptyCart(){
        setCartItems([])

    
    }

    return (/*passing allPhotos in an object. 1st {} puts me in JS. 2nd {} is object. Shorthand for value={{allPhotos: allPhotos}}. 
        Also passing the toggleFavorite, and addToCart functions and cartItems*/
        <Context.Provider value={{allPhotos, toggleFavorite, addToCart, removeFromCart, emptyCart, cartItems}}> 
            {children}
        </Context.Provider>
    )

    
}
/*exporting as named exports. Exporting Context object so that I can use it whenever/wherever I use the useContext hook */
export {ContextProvider, Context}   


