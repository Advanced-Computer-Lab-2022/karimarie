import NavbarStyles from "../S3_components/NavbarHomePage.module.css"
import TextField from "@mui/material/TextField";
import language from "../S3_components/language.png"
import closeButton from "../S3_components/closeButton.png"
import closeWhite from "../S3_components/closeWhite.png"
import filterIcon from "../S3_components/filterIcon.png"
import {Box} from '@mui/material'
import axios from "axios";
import { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import genderIcon from "../S3_components/genderIcon.png"
import Slider from "@mui/material/Slider";
import FilterSearchPage from "./FilterSearchPage";
import searchIcon from "../S3_components/searchIcon.png"
import { useNavigate } from "react-router-dom";

function NavbarHomePage(){
    const [dropDown,isDropDown]=useState(false);
    const [gender,isGender]=useState(false);
    const [showfilter,isShowFilter]=useState(false);
    const [price,setPrice]=useState();
    const [rating,setRating]=useState('');
    const [subjectList, setSubjectList] = useState([]);//list of subjects
    const [filterResult,setFilterResult]=useState('');
    const currencyFilter=localStorage.getItem("currency");
    const [search,setSearch]=useState();

    const showDropDown = (e) => {
        e.preventDefault();
         isDropDown(true);
         isShowFilter(false);
         isGender(false);
      };
      const showGender = (e) => {
        e.preventDefault();
         isDropDown(false);
         isShowFilter(false);
         isGender(true);
      };
      const showFilter = (e) => {
        e.preventDefault();
        isShowFilter(true);
        isDropDown(false);
        isGender(false);

      };

      const [countries,setCountries]=useState('');
      const getCountires = async () => {
        const res = await axios
          .get("https://restcountries.com/v2/all")
          .catch((err) => console.log(err));
          const data = await res.data;
        const myobj= JSON.stringify(data);
        const myObj1 = JSON.parse(myobj);
        const answer = myObj1.filter((count) => (count.currencies !== undefined))  
          return answer;
      };
      useEffect(()=>{
      getCountires().then((data) => setCountries(data))
     
        
      },[]);
      const [value,setValue]=useState('');
      const ChangeHandler=(e)=>{
        var newTxt = e.target.value.split('(');
        var newTxt1=newTxt[0].split(' ');
        var x1=newTxt[1].split(')');
        setValue(e.target.value);
        
        setC(newTxt1,x1);
      }    
      const setC=(newTxt,x1)=>{
        localStorage.setItem("country",newTxt[0]);
        localStorage.setItem("currency",x1[0]);
        isDropDown(false);
  }


        const filterAll = async () => {
          if(!price && !filterResult && !rating){
            const res = await axios
            .get("http://localhost:2000/home")
            .catch((err) => console.log(err));
            const data = await res.data;
            return data;
          }else{
            const res = await axios
            .post("http://localhost:2000/postFilterAll", {
              price:price,
              currency:currencyFilter,
              subject:filterResult,
              rating:rating
            })
            .catch((err) => console.log(err));
            const data = await res.data;
            return data;
          }
          };
         const handleFilter=(e)=>{
          e.preventDefault()
            filterAll().then((data) => {           
            let x=JSON.stringify(data.priceList)
            window.location.href=`FilterSearchPage?courses=${x}`
          }
            )
            isShowFilter(false);
            setPrice('');
            setRating('');

          }
        const searchCourse = async () => {
          if(search){
            const res = await axios
            .get(`http://localhost:2000/search/${search}`)
            .catch((err) => console.log(err));
            const data = await res.data;
            return data;
          }else {
            const res = await axios
            .get("http://localhost:2000/home")
            .catch((err) => console.log(err));
            const data = await res.data;
            return data;
          }
          };
          const handleSearch2=(e)=>{
            if(e.key==="Enter"){
              
            
            console.log(search);
            e.preventDefault()
              searchCourse().then((data) => {           
              console.log(data)
              let x=JSON.stringify(data.priceList)
              window.location.href=`FilterSearchPage?courses=${x}`
            }
              )
            }}
            const handleSearch=(e)=>{
             
              
              console.log(search);
              e.preventDefault()
                searchCourse().then((data) => {           
                console.log(data)
                let x=JSON.stringify(data.priceList)
                window.location.href=`FilterSearchPage?courses=${x}`
              }
                )
              }
            const getSubjects = async () => {
              const res = await axios
                .get("http://localhost:2000/subjects")
                .catch((err) => console.log(err));
                const data = await res.data;
          
                return data;
            };
            useEffect(() => {
              getSubjects().then((data) => setSubjectList(data.subjects));
              
            }, []);
            const handleSubject = (event) =>{
              setFilterResult(event.target.value);
            
          }
          
         
    return(
        <>
        
        
        <nav>
< a href="/">
<svg id="logo-15" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z" class="ccustom" fill="#17CF97"></path> 
     <path d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z" class="ccustom" fill="#17CF97"></path>
      <path d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z" class="ccustom" fill="#17CF97"></path>
       <path d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z" class="ccustom" fill="#17CF97"></path> </svg>
</a>

<div class={NavbarStyles.list}>
<ul id={NavbarStyles.navbar}>
    <li><button onClick={showFilter} title="Filter" className={NavbarStyles.buttonFilter}><img src={filterIcon} alt="card__image" width="40"></img>
            </button></li>
    <li><a className={NavbarStyles.active} href="/signup">Sign Up</a></li>
    <li><a href="/login">Login</a></li>
    <li><button onClick={showDropDown}><img src={language} alt="card__image" class={NavbarStyles.languageimage} width="40"></img></button></li>
    <li><button onClick={showGender}><img src={genderIcon} alt="card__image" class={NavbarStyles.languageimage} width="40"></img></button></li>
</ul>
</div>
<div className={NavbarStyles.searchbox}>

    <button className={NavbarStyles.btnsearch} onClick={handleSearch}><i class="fas fa-search"><img src={searchIcon} alt="card__image" ></img></i></button>
    <input type="text" className={NavbarStyles.inputsearch}  onKeyPress={handleSearch2} value={search} onChange={(e) => setSearch(e.target.value)} 
 placeholder="Type to Search..."></input>
  </div>
        </nav>
        {dropDown && <div className={NavbarStyles.shadearea}>
            <div class={NavbarStyles.country}>
        
        <button class={NavbarStyles.closeButton} onClick={()=>isDropDown(false)}><img src={closeButton} alt="card__image" width="24"></img></button>
        <div class={NavbarStyles.forms}>
        <label for="countries">Select a Country :</label>
            <Box width="250px">
            <select  class={NavbarStyles.box}value={value} onChange={ChangeHandler} placeholder="Select">
            <option>- - - - - - - - - - -Choose From Below- - - - - - - -  </option>
            {countries &&
    countries.map( (x) => 
      <option >{x.name} ({x.currencies[0].code})</option> )
  }</select>
            </Box>
  </div>    </div>
            </div>

            }
        {gender && <div className={NavbarStyles.shadearea}>
            <div class={NavbarStyles.country}>
        
        <button class={NavbarStyles.closeButton} onClick={()=>isGender(false)}><img src={closeButton} alt="card__image" width="24"></img></button>
        <div class={NavbarStyles.forms}>
        <label for="countries" >Select a Gender :</label>
            <Box width="250px">
            <form action="" className={NavbarStyles.gender}>
            <input type="radio" name="gender" value="male"/> Male<br/>
            <input type="radio" name="gender" value="female"/> Female<br/>
            <input type="radio" name="gender" value="other"/> Other
            <button>Submit</button>

          </form>
            </Box>
  </div>    </div>
            </div>

            }
      {/* {showfilter && <div className={NavbarStyles.shadearea}>
      <div className={NavbarStyles.modalcontainer}>
            <form className='form-group' onSubmit={handleFilter}>   
           <h6>Price Filter:</h6>
                  <input 
                type="Number" 
                name='price'
                value={price}
                placeholder={`Enter Price in ${currencyFilter}`}
                onChange={(e) => setPrice(e.target.value)} 
              />
                <br></br>
            <h6>Rating Filter:</h6>
            <Rating
                name="write"   
                precision={0.5}
                defaultValue={0}
                onChange={(e) => setRating(e.target.value)} 
                value={rating}
                />
                <br></br>
                <button className='btn btn-success btn-md'>Submit</button>
            </form>
            </div>
            <button className={NavbarStyles.deleteicon} onClick={()=>isShowFilter(false)}><img src={closeButton} alt="card__image" width="24"></img></button>
        </div>} */}
                          { showfilter && <div className={NavbarStyles.shadearea}>
                  <div className={NavbarStyles.modalcontainer}>
          <div className={NavbarStyles.rectangle}> <h4 className={NavbarStyles.rectangleText}>Filter our Courses </h4>       
          </div>
          <h6 className={NavbarStyles.priceText}>Price Filter in :{currencyFilter} </h6>
          <h6 className={NavbarStyles.ratingtext}>Rating:</h6>
          <Rating
          className={NavbarStyles.rating}
          name="write"
          value={rating}
          onChange={(e) => setRating(e.target.value)} 
          precision={0.5}
          >
          </Rating>
          <div className={NavbarStyles.pricefield}>
          <TextField
          type="number"
          InputProps={{
            inputProps: { 
              min: 0
            }
          }}
          onChange={(e) => setPrice(e.target.value)} 
          value={price}
          ></TextField>
          <div className={NavbarStyles.formcontrol} >
         <select value={filterResult} onChange={handleSubject}>
              <option value="">Choose A Subject</option>
        {subjectList.map(subject => (
              <option value={subject.title} key={subject._id} >{subject.title}</option>
              ))
              }
          </select> 
          </div>
          <div className={NavbarStyles.close}>
          <button onClick={()=>isShowFilter(false)}><img src={closeWhite} alt="card__image" width="24"></img></button>
          </div>
          </div>
          <button className={NavbarStyles.submitbutton}
          onClick={handleFilter}>Submit</button>
                      </div>
                      
              </div>

          }
        </>
    )
}
export default NavbarHomePage