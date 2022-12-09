import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SubjectsStyles from "../S3_components/SubjectsStyles.module.css"
import { useState } from 'react';
 const Subjects = () => {
  const [subjectvalue,setsubjectValue]=useState();
  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <section className={SubjectsStyles.skill} id="skills">
        <div className={SubjectsStyles.container}>
            <div className="row">
                <div className="col-12">
                    <div className={SubjectsStyles.skillbx}>
                        <h2>Subjects</h2>
                        <Carousel responsive={responsive} infinite={true} className={SubjectsStyles.skillslider}>
                            <div className="item">
                                <button class={SubjectsStyles.astext} onClick={()=>setsubjectValue("Web Development")}>
                                <h5>Web Development</h5>
                                </button>
                            </div>
                            <div className="item">
                            <button class={SubjectsStyles.astext}onClick={()=>setsubjectValue("Software Engineering")}>
                                <h5>Software Engineering</h5>
                                </button>
                            </div>
                            <div className="item">
                            <button class={SubjectsStyles.astext} onClick={()=>setsubjectValue("No Cpde Development")}>
                                <h5>No Code Development</h5>
                                </button>
                            </div>
                            <div className="item">
                            <button class={SubjectsStyles.astext} onClick={()=>setsubjectValue("Data Science")}>
                                <h5>Data Science</h5>
                                </button>
                            </div>
                            <div className="item">
                            <button class={SubjectsStyles.astext} onClick={()=>setsubjectValue("Software Testing")}>
                                <h5>Software Testing</h5>
                                </button>
                            </div>
                            
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
export default Subjects