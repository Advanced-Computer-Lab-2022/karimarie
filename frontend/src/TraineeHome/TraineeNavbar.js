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
import Slider from "@mui/material/Slider";
//rt FilterSearchPage from "./FilterSearchPage";
import searchIcon from "../S3_components/searchIcon.png"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Nav from "./TraineeNavbar.module.css"
import userIcon from "../InstructorHome/userIcon.png"
import Logincss from "../S3_components/Login.module.css"
import inst from "../InstructorHome/InstProfile.module.css"
import wallet2 from "../TraineeHome/wallet.png"


function TraineeNavbar(isactive){
    const type = localStorage.getItem("userType");
    const [dropDown,isDropDown]=useState(false);
    const [showfilter,isShowFilter]=useState(false);
    const [price,setPrice]=useState();
    const [rating,setRating]=useState('');
    const [subjectList, setSubjectList] = useState([]);//list of subjects
    const [filterResult,setFilterResult]=useState('');
    const currencyFilter=localStorage.getItem("currency");
    const [search,setSearch]=useState();
    const [logout,isLogOut]=useState(false);
    const showLogout=(e)=>{
        isDropDown(false);
        isShowFilter(false);
        isLogOut(true);
    }
    const showDropDown = (e) => {
        e.preventDefault();
         isDropDown(true);
         isShowFilter(false);
      };
      const showFilter = (e) => {
        e.preventDefault();
        isShowFilter(true);
        isDropDown(false);

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
        window.location.reload();
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
            window.location.href=`/FilterSearchPage?type=Trainee&spec=${type}&courses=${x}`
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
              window.location.href=`/FilterSearchPage?type=Trainee&spec=${type}&courses=${x}`
            }
              )
            }}
            const handleSearch=(e)=>{
              e.preventDefault()
                searchCourse().then((data) => {           
                let x=JSON.stringify(data.priceList)
                window.location.href=`/FilterSearchPage?type=Trainee&spec=${type}&courses=${x}`
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
            localStorage.setItem("userType","")
            window.location.href="/";
          }
          

          const[Password,isShowPassword]=useState(false);  
          const [newpassword,setnewpassword]=useState('');
          const [confirmpassword,setconfirmpassword]=useState('');
          const [sendmessage,issendmessage]=useState(false)
          const [sendmessage2,issendmessage2]=useState(false)
          const decodeID=String(localStorage.getItem("token"))

          const editpassword = async () => {
            const res = await axios
            .post(`http://localhost:2000/corpTrainee/editpassword/${decodeID}`, {
              password : newpassword
            })
            .catch((err) => console.log(err));
        
          };  
          const changePassword=()=>{
            if(newpassword!==confirmpassword){
                issendmessage(true);
                issendmessage2(false);
            }else if(newpassword.length<7){
              issendmessage2(true);
              issendmessage(false)
            }
            else {
                issendmessage(false)
                issendmessage2(false)
                hidePass(false);
                editpassword();
            }
            
    
          }
          const hidePass=(e)=>{
            isShowPassword(false);
            issendmessage(false)
            setnewpassword("")
            issendmessage2(false);
            setconfirmpassword("")
         }
         const[passwordType,setPasswordType]=useState("password")
         const togglePassword =()=>{
          if(passwordType==="password")
          {
           setPasswordType("text")
           return;
          }
          setPasswordType("password")
        }
        const[passwordType1,setPasswordType1]=useState("password")
        const togglePassword1 =()=>{
         if(passwordType1==="password")
         {
          setPasswordType1("text")
          return;
         }
         setPasswordType1("password")
       }



       const [wallet,setWallet]=useState(false);
          const [hisAmount,setHisAmount]=useState("");
          const [hisAmount2,setHisAmount2]=useState();
          const base_URL='https://api.exchangerate.host/latest'
          const [fromCurrency,setFromCurrency]=useState('EGP')
          const [toCurrency,setToCurrency]=useState(localStorage.getItem("currency"))
          const [exchangeRate,setExchanheRate]=useState('')
          const [omla,setOmla]=useState();
          const getM=async()=>{
            const res = await axios
            
            .post("http://localhost:2000/corpTrainee/viewWallet", {
              id : decodeID
            })
            .catch((err) => console.log(err)).then((data)=>{
              if(data!="no"){
               setHisAmount(data.data);
              //  const toCurrency=localStorage.getItem("currency");
              // setOmla(toCurrency);
              // console.log("Fff"+toCurrency)
              let rate;
              if(fromCurrency!=null && toCurrency!=null){
                const res= axios.get(`${base_URL}?base=${fromCurrency}&symbols=${toCurrency}`).then(
                     res=>res.data).then(data2 => {setExchanheRate(data2.rates[toCurrency])
                      setHisAmount(Math.ceil(data.data*(data2.rates[toCurrency])))
                    })}
              // if(hisAmount!=""){
              // const res2= axios.get(`${base_URL}?base=${fromCurrency}&symbols=${omla}`).then(
              //   res=>res.data).then(data => {
              //     console.log(data.rates[toCurrency])
              //     const x=Math.ceil(2.4)
              //     console.log(x)
              //     setExchanheRate(data.rates[toCurrency]);setHisAmount2(Math.ceil(hisAmount*(data.rates[toCurrency]*100))/100)})
              //   }
                
              }
            });
           
          }
         
          
            const refund=async (c)=>{
              // setFromCurrency(localStorage.getItem("currency"));
              // const toCurrency=localStorage.getItem("currency");
              // setOmla(toCurrency);
              // console.log("Fff"+toCurrency)
              let rate;
             

              // if(hisAmount!="" && hisAmount2!=""){
              // const res2= axios.get(`${base_URL}?base=${fromCurrency}&symbols=${toCurrency}`).then(
              //   res=>res.data).then(data => {
              //     console.log(data.rates[toCurrency])
              //     setExchanheRate(data.rates[toCurrency]);setHisAmount2(Math.ceil(hisAmount*(data.rates[toCurrency]*100))/100)})
              //   }
            
      
          }
          console.log(hisAmount)
          console.log(exchangeRate)
    return(
        <>
        
        
        <nav>
< a href={`/Trainee`}>
<svg id="logo-15" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z" class="ccustom" fill="#17CF97"></path> 
     <path d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z" class="ccustom" fill="#17CF97"></path>
      <path d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z" class="ccustom" fill="#17CF97"></path>
       <path d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z" class="ccustom" fill="#17CF97"></path> </svg>
</a>

<div class={NavbarStyles.list}>
  <div className={Nav.movel}>
<ul id={NavbarStyles.navbar}>
    <li><button onClick={showFilter} title="Filter" className={NavbarStyles.buttonFilter}><img src={filterIcon} alt="card__image" width="40"></img>
            </button></li>
    <li><a  style={{ color: isactive.isactive === "true" ? "#17cf97" : null }}href="/Mycourses">View My Courses </a></li>
    <li><a href onClick={showLogout}style={{ color: isactive.isactive === "false" ? "#17cf97" : null }}>Logout</a></li>
    <div className={Nav.dropdown}>
    <button className={Nav.dropbt}><img src={userIcon} width="40"></img></button>
    <div className={Nav.dropdowncontent}>
      {type!="CorpTrainee" && <a onClick={()=>{setWallet(true);getM()}} className={Nav.hr}><img src={wallet}  width="9px" height="8px"></img>Wallet</a>}
      <a href={`/viewMyR/${localStorage.getItem("token")}`}  className={Nav.hr}>Reports</a>
      <a onClick={()=>{isShowPassword(true);console.log("h")}} className={Nav.hr}>Change Password</a>
  </div>
</div>
<li><button onClick={showDropDown}><img src={language} alt="card__image" class={NavbarStyles.languageimage} width="40"></img></button></li>
</ul>
</div>
</div>
<div className={Nav.moo}>
<div className={NavbarStyles.searchbox}>

    <button className={NavbarStyles.btnsearch} onClick={handleSearch}><i class="fas fa-search">
      {/* <img src={searchIcon} alt="card__image" ></img> */}
      </i></button>
    <input type="text" className={NavbarStyles.inputsearch}  onKeyPress={handleSearch2} value={search} onChange={(e) => setSearch(e.target.value)} 
 placeholder="Type to Search..."></input>
  </div></div>
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
        {logout&& <div className={NavbarStyles.shadearea}>
        <div className={NavbarStyles.logoutcontainer}>
        <h3 className={NavbarStyles.logouttext1}>You are attempting to log out!</h3>
        <h6 className={NavbarStyles.logouttext2}>Are you sure?</h6>
        <button className={NavbarStyles.surebutton} onClick={handleLogout}>Yes,I'm Sure</button>
        <a className={NavbarStyles.notext}href={`/Trainee`}>No,I changed my mind</a>
        </div>

        </div>
        
            
        
        }
    
                          { showfilter && <div className={Nav.shadearea1}>
                  <div className={NavbarStyles.modalcontainer}>
          <div className={NavbarStyles.rectangle}> <h4 className={NavbarStyles.rectangleText}>Filter our Courses </h4>       
          </div>
          {type==="Trainee" && <h6 className={NavbarStyles.priceText}>Price Filter in :{currencyFilter} </h6>}
          <h6 className={NavbarStyles.ratingtext}>Rating:</h6>
          <Rating
          className={NavbarStyles.rating}
          name="write"
          value={rating}
          onChange={(e) => setRating(e.target.value)} 
          precision={0.5}
          >
          </Rating>
          {type==="Trainee" &&<div className={NavbarStyles.pricefield}>
          <TextField
          type="number"
          InputProps={{
            inputProps: { 
              min: 0
            }
          }}
          onChange={(e) => setPrice(e.target.value)} 
          value={price}
          ></TextField></div>}
          <div className={Nav.formcontrol1} >
         <select value={filterResult} onChange={handleSubject}>
              <option value="">Choose A Subject</option>
        {subjectList.map(subject => (
              <option value={subject.title} key={subject._id} >{subject.title}</option>
              ))
              }
          </select> 
          </div>
          <div className={Nav.close1}>
          <button onClick={()=>isShowFilter(false)}><img src={closeWhite} alt="card__image" width="24"></img></button>
          </div>
          <button className={NavbarStyles.submitbutton}
          onClick={handleFilter}>Submit</button>
                      </div>
                      
              </div>

          }
          {wallet&&
          <div className={Nav.allW}>
                <div className={inst.shadearea}>
                  <div className={inst.modalcontainer}>
                    
                  <p className={Nav.para}>Your Wallet</p>

                   <div className={Nav.nada}> <img src={wallet2} className={Nav.wallettt}></img> <span className={Nav.felooso}>{hisAmount}<span className={Nav.omla}>{toCurrency}</span></span></div>
                    <button className={Nav.pressokey} onClick={()=>setWallet(false)}
                     >Ok</button>

                    </div></div></div>}
          {Password &&<div className={Nav.mo}><div className={inst.shadearea}> 
            <div className={inst.modalcontainer}>
            <p className={inst.changepass}>Change Your Password</p>
            <p className={inst.newpass}>New Password:</p>
            <TextField className={inst.passtextfield1} type={passwordType}  required value={newpassword} onChange={(e) => setnewpassword(e.target.value)} ></TextField>
           
            <p className={inst.confirmpass}>Confirm Password:</p>
            <TextField className={inst.passtextfield2} type={passwordType1} required value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} ></TextField>
          {sendmessage && <div className={inst.message2}><p className={inst.message}>Those passwords didn't match. Try Again </p></div>}
            {sendmessage2 && <div className={inst.message}><p>Your password should be at least 8 characters</p></div>}
            <button className={inst.submitpassbutton} onClick={changePassword}>Submit</button>
            <button onClick={hidePass} className={inst.closeedit2} ><i className={["fa fa-times", ].join(' ')}aria-hidden="true"></i></button>
            {/* <button className={x.bbb} onClick={()=>{isGender(false);}}><i className={["fa fa-times", x.iconn].join(' ')}aria-hidden="true"></i></button> */}
            <div className={Nav.see}>
            <button  onClick={togglePassword}>
          { passwordType==="password"? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
</svg> :<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
</svg> }
          </button>
          </div>
          <div className={Nav.see1}>
            <button  onClick={togglePassword1}>
          { passwordType1==="password"? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
</svg> :<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentcolor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
</svg> }
          </button>
          </div>
                </div>
                </div>
                </div> 
                }
        </>
    )
}
export default TraineeNavbar