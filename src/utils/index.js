/*The className from the Photos component is calling the getClass() function. The Photos component, passes down the 
index of the photo. When the Photos component calls getClass(), it passes getClass() the parameter i. The getClass() 
function accepts the i parameter and essentially says...for every 5th item, return a class of Big, for every 6th 
item return a class of wide. The getClass() function allows images to take up 4 little squares of the grid, the 5th
image will be Big, (taking up 4 square spaces on the grid) and the 6th image will take up 2 square spaces on the grid.   
 */
export function getClass(i) { 
    if (i % 5 === 0) {
        return 'big';
    }
    else if (i % 6 === 0) {
        return 'wide'
    }
}