import { useEffect, useState } from "react";
import "./carousel.styles.scss";
import { current } from "@reduxjs/toolkit";

const Carousel = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                return prevIndex === data.length - 1 ? 0 : prevIndex + 1;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [data.length]);
    return (
        <div className="carousel-wrapper">
            <img src={data[currentIndex]} alt="" />
        </div>
    )
}

export default Carousel
