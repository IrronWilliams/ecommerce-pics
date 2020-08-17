import React, {useContext} from "react"

import Image from "../components/Image"
import {Context} from "../Context"
import {getClass} from "../utils"


  /*
   Photos component, goal is to get a list of all photos from Context. Then mapping over the photos and create an <Image /> component. 
   The className is running a plain JavaScript function that essentially for every 5th item, it returns a class of Big, for every 6th item, 
   it returns a class of wide. The getClass() function allows images to take up 4 little squares of the grid, the 5th image will be Big, 
   (taking up 4 square spaces on the grid) and the 6th image will take up 2 square spaces on the grid. The getClass() function is just 
   styling to make the page more dynamic and cool looking. The part that is making the images work is passing the entire img object down
   thru a prop called img. 

   To get the allPhotos array from context, use the useContext hook. To get access to allPhotos, grab the photos by using useContext hook
   and pass to useContext the full Context object. -> const {allPhotos} = useContext(Context), where 'allPhotos' must perfectly match the
   props value from the Content Provider -> <Context.Provider value={{allPhotos}}>.  
   
   const {allPhotos} = useContext(Context) returns an array of objects. With the array of objects, can map over allPhotos. The map() method
   accepts a function as a parameter. The function not only receives the individual image from the array, but could also receive the index. 
   The index is what will be used when I call getClass(), which is the function in the utils folder. In the body of the function, return 
   an instance of the <Image /> component. The key is the unique identifier for each picture and passing the full image object down. Passing
   the image object down so that the <Image /> component can make use of the different properties, such as isFavorited and the url. With
   getClass(), passing the index obtained from the map() method. */

   function Photos() {
    const {allPhotos} = useContext(Context) //destructuring the objects that come back from useContext 
    
    const imageElements = allPhotos.map((img, i) => (
        <Image key={img.id} img={img} className={getClass(i)} />
    ))
    
    return (
        <main className="photos">
            {imageElements}
        </main>
    )
}

export default Photos


 
   

  