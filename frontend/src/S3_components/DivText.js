import React from 'react'
import div from "./DivTextStyles.module.css"
const DivText = () => {
    return (
        <div >
            <h3 className={div.maintext}>A broad selection of courses</h3>
            <h6 className={div.secondarytext}>You can view hundereds of videos.</h6>
        </div>
        
    )
}

export default DivText