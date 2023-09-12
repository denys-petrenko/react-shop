import React, { Component } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/SimpleCarousel.scss";
import banner_first from "../../assets/banner_first.jpg";
import banner_second from "../../assets/banner_second.png";
import banner_third from "../../assets/banner_third.jpg";

export default class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className="Carousel">
                <Slider {...settings}>
                    <div className="Card">
                        <img src={banner_first} alt='slide-1' />
                    </div>
                    <div className="Card">
                        <img src={banner_second} alt='slide-2' />
                    </div>
                    <div className="Card">
                        <img src={banner_third} alt='slide-3' />
                    </div>
                </Slider>
            </div>
        );
    }
}