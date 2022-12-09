import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import headerImg from "../S3_components/Doodle.png";
import BannerStyles from "../S3_components/Banner.module.css"
export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Learn", "Have Fun", "Develop Your Skills" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }
return(
    <section className={BannerStyles.banner} id="home">
      <Container>
        <Row className="alighitemscenter">
          <Col xs={12} md={6} xl={7}>
                
                <h1>{`Here You Can`} <span className={BannerStyles.txtrotate} dataPeriod="1000" data-rotate='[ "Learn", "Have Fun", "Develop Your Skills"  ]'><span className="wrap">{text}</span></span></h1>
                <div className={BannerStyles.paragraph}>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                  </div>
                  {/* <button>Let’s Get Started <ArrowRightCircle size={25} /></button> */}
            
          </Col>
          <Col xs={12} md={6} xl={5}>
                  <img src={headerImg} alt="Header Img"/>
               
          </Col>
        </Row>
      </Container>

    </section>

)

}
export default Banner;