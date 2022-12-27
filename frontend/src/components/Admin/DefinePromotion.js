import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"

const DefinePromotion=()=>{
    const [courses,setcourses]=useState('');
    const getCourses = async () => {
        const res = await axios
          .get("http://localhost:2000/home")
          .catch((err) => console.log(err));
          const data = await res.data;
          return data;
      };
    const dataArray = ['nr1', 'nr2'];
var initialState =""
if(courses){
    initialState=courses.reduce((o, key) => ({ ...o, [key._id]: false}), {})

}
console.log(initialState)
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState(initialState);
  const toggleCheck = (inputName) => {
    setChecked((prevState) => {
      const newState = { ...prevState };
      newState[inputName] = !prevState[inputName];
      return newState;
    });
  };

  const selectAll = (value) => {
    setCheckedAll(value);
    setChecked((prevState) => {
      const newState = { ...prevState };
      for (const inputName in newState) {
        newState[inputName] = value;
      }
      return newState;
    });
  };


  useEffect(() => {
    getCourses().then((data)=>setcourses(data.priceList))
    let allChecked = true;
    for (const inputName in checked) {
      if (checked[inputName] === false) {
        allChecked = false;
      }
    }
    if (allChecked) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checked]);

    return (
        <div className="App">
          <div>
            <input
              type="checkbox"
              onChange={(event) => selectAll(event.target.checked)}
              checked={checkedAll}
            />
           <label> Select All</label>

          </div>
            {dataArray.map(data => (
              <div>
            <label>{data}</label>
            <input
              type="checkbox"
              name={data}
              onChange={() => toggleCheck(data)}
              checked={checked[data]}
              />
          </div>
            ))}
        </div>
      );
}
export default DefinePromotion;