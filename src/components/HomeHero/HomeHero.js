import React from 'react';

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

import classes from './HomeCarousel.module.css';
import Button from '../UI/Button/button'

// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const homeCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return(
            <AutoplaySlider
            className={classes['SliderWrapper']}
            play={false}
            cancelOnInteraction={false} // should stop playing on user interaction
            interval={6000}
            bullets={false}
            >
                <div className={classes['slider1']}>
                    <Button 
                    btnType = 'HomeCarousel'
                    >
                        SHOP WHATS NEW
                    </Button>
                </div>
                <div className={classes['slider2']}>
                <Button 
                    btnType = 'HomeCarousel'
                    >
                        VISIT SHOP
                    </Button>
                </div>
        </AutoplaySlider>
    )
}

export default homeCarousel;