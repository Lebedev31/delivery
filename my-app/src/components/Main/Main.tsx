import './Main.scss';
import Abstraction from './Svg';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

function Main() {
  const slides = [
    { id: 1, content: 'Slide 1', background: 'lightblue' },
    { id: 2, content: 'Slide 2', background: 'lightgreen' },
    { id: 3, content: 'Slide 3', background: 'lightcoral' },
  ];

  const [show, setShow] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      setCurrentSlide((prevSlide) => {
        if (prevSlide === slides.length - 1) {
          setShow(true);
          return 0;
        } else {
          setShow(true);
          return prevSlide + 1;
        }
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="main">
      <aside className="main__contact">
        <h2>Доставка готовой еды из фермерских продуктов!</h2>
        <div className="main__abstraction">
          <Abstraction />
        </div>
        <div className="main__tel">
          <address className="main__tel-item">
            <a href="tel:+7 (499) 841-67-29">+7 (499) 841-67-29</a>
          </address>
          <address className="main__email">
            <a href="mailto:delivery@midas.rest">delivery@midas.rest</a>
          </address>
        </div>
      </aside>
      <Box className="main__slider">
        {slides.map((item, index) => {
          return (
            <div
              key={index}
              className={`main__slider-box ${show && index === currentSlide ? 'active-slider' : ''}`}
            >
              <Box
                className="main__slider-item"
                sx={{ backgroundColor: item.background }}
              >
                {item.content}
              </Box>
            </div>
          );
        })}
      </Box>
    </section>
  );
}

export default Main;
