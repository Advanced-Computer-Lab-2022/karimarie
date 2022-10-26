import { useEffect,useState } from "react";
import AddCourseForm from "../components/instFunctional/AddCourse";


const Home= ()=>{
    const [insts,setInst]=useState([])
    useEffect(()=>{
        const fetchAllinst= async () =>{
            //console.log("hi");
            const response= await fetch('/admin/')
            const json = await response.json()
            if(response.ok){
                setInst(json)
                
            }
        };
         fetchAllinst()
    },[]);
    
   
    return(
        <div className="Home">
            <h2> Home</h2>
            <div className="inst">
                {insts && insts.map(inst=> 
                    <p key={inst._id}>{inst.firstName} and {inst.lastName}</p>
                )}
            </div>

            <AddCourseForm/>
        </div>
    )
}
export default Home;