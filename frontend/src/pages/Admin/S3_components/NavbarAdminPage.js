import NavbarStyles2 from "./NavbarAdminPage.module.css"
import NavbarStyles from "../../../S3_components/NavbarHomePage.module.css"
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
// import FilterSearchPage from "./FilterSearchPage";
import searchIcon from "../S3_components/searchIcon.png"
import { useNavigate } from "react-router-dom";

function NavbarAdminPage(isactive){
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

const getAll=async()=>{
    const res = await axios
            .get("http://localhost:2000/home")
            .catch((err) => console.log(err));
            const data = await res.data;
            return data;
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
            localStorage.setItem("filter",x);
            window.location.href=`FilterSearchPage?type=Admin`
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
            e.preventDefault()
              searchCourse().then((data) => {           
              let x=JSON.stringify(data.priceList)
              localStorage.setItem("filter",x);
              window.location.href=`/FilterSearchPage?type=Admin`
            }
              )
            }}
            const handleSearch=(e)=>{
              e.preventDefault()
                searchCourse().then((data) => {           
                let x=JSON.stringify(data.priceList)
                localStorage.setItem("filter",x);
                window.location.href=`/FilterSearchPage?type=Admin`
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
          const [logout,isLogOut]=useState(false);
          const showLogout=(e)=>{
              isDropDown(false);
              isShowFilter(false);
              isLogOut(true);
          }
          const getLogout = async () => {
            const res = await axios
              .get("http://localhost:2000/logout")
              .catch((err) => console.log(err));
              const data = await res.data;
              return data;
          };
          const handleLogout=()=>{
            getLogout();
            localStorage.setItem("token","")
            localStorage.setItem("currency","")
            localStorage.setItem("country","")
            window.location.href="/";
          }
          
         
    return(
        <>
        
        
        <nav>
< a href="/hii">
<svg id="logo-15" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z" class="ccustom" fill="#17CF97"></path> 
     <path d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z" class="ccustom" fill="#17CF97"></path>
      <path d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z" class="ccustom" fill="#17CF97"></path>
       <path d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z" class="ccustom" fill="#17CF97"></path> </svg>
</a>

<div class={NavbarStyles2.list}>
<ul id={NavbarStyles2.navbar}>
    <li><button onClick={showFilter} title="Filter" className={NavbarStyles2.buttonFilter}><img src={filterIcon} alt="card__image" width="40"></img>
            </button></li>
    {/* <li><a  style={{ color: isactive.isactive === "true" ? "#17cf97" : null }}href>View </a></li> */}
    <li><a href onClick={showLogout}style={{ color: isactive.isactive === "false" ? "#17cf97" : null }}>Logout</a></li>
    <li><button onClick={showDropDown}><img src={language} alt="card__image" class={NavbarStyles2.languageimage} width="40"></img></button></li>
    {/* <li><button onClick={showGender}><img src={genderIcon} alt="card__image" class={NavbarStyles.languageimage} width="40"></img></button></li> */}
</ul>
</div>
<div className={NavbarStyles2.searchbox}>

    <button className={NavbarStyles2.btnsearch} onClick={handleSearch}><i class="fas fa-search">
      {/* <img src={searchIcon} alt="card__image" ></img> */}
    </i></button>
    <input type="text" className={NavbarStyles2.inputsearch}  onKeyPress={handleSearch2} value={search} onChange={(e) => setSearch(e.target.value)} 
 placeholder="Type to Search..."></input>
  </div>
        </nav>
        {dropDown && <div className={NavbarStyles2.shadearea}>
            <div class={NavbarStyles2.country}>
        
        <button class={NavbarStyles2.closeButton} onClick={()=>isDropDown(false)}><img src={closeButton} alt="card__image" width="24"></img></button>
        <div class={NavbarStyles2.forms}>
        <label for="countries">Select a Country :</label>
            <Box width="250px">
            <select  class={NavbarStyles2.box}value={value} onChange={ChangeHandler} placeholder="Select">
            <option>- - - - - - - - - - -Choose From Below- - - - - - - -  </option>
            {countries &&
    countries.map( (x) => 
      <option >{x.name} ({x.currencies[0].code})</option> )
  }</select>
            </Box>
  </div>    </div>
            </div>

            }
         {logout&& <div className={NavbarStyles.shadearea}>
        <div className={NavbarStyles.logoutcontainer}>
        <h3 className={NavbarStyles.logouttext1}>You are attempting to log out!</h3>
        <h6 className={NavbarStyles.logouttext2}>Are you sure?</h6>
        <button className={NavbarStyles.surebutton} onClick={handleLogout}>Yes,I'm Sure</button>
        <a className={NavbarStyles.notext}href="/hii">No,I changed my mind</a>
        </div>

        </div>
        
            
        
        }
      
                          { showfilter && <div className={NavbarStyles2.shadearea}>
                  <div className={NavbarStyles2.modalcontainer}>
          <div className={NavbarStyles2.rectangle}> <h4 className={NavbarStyles2.rectangleText}>Filter our Courses </h4>       
          </div>
          <h6 className={NavbarStyles2.priceText}>Price Filter in :{currencyFilter} </h6>
          <h6 className={NavbarStyles2.ratingtext}>Rating:</h6>
          <Rating
          className={NavbarStyles2.rating}
          name="write"
          value={rating}
          onChange={(e) => setRating(e.target.value)} 
          precision={0.5}
          >
          </Rating>
          <div className={NavbarStyles2.pricefield}>
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
          <div className={NavbarStyles2.formcontrol} >
         <select value={filterResult} onChange={handleSubject}>
              <option value="">Choose A Subject</option>
        {subjectList.map(subject => (
              <option value={subject.title} key={subject._id} >{subject.title}</option>
              ))
              }
          </select> 
          </div>
          <div className={NavbarStyles2.close}>
          <button onClick={()=>isShowFilter(false)}><img src={closeWhite} alt="card__image" width="24"></img></button>
          </div>
          </div>
          <button className={NavbarStyles2.submitbutton}
          onClick={handleFilter}>Submit</button>
                      </div>
                      
              </div>

          }
        </>
    )
}
export default NavbarAdminPage