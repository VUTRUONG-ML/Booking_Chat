import { useEffect, useState } from "react";
import "./carousel.styles.scss";

const Carousel = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        console.log("Carousel data:", data); // Log the data prop
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                return prevIndex === data.length - 1 ? 0 : prevIndex + 1;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [data.length]);

    useEffect(() => {
        console.log("Current index:", currentIndex); // Log the current index
    }, [currentIndex]);

    return (
        <div className="carousel-wrapper">
            {data.length > 0 && <img src={data[currentIndex]} alt={`Slide ${currentIndex}`} />}
        </div>
    );
}

export default Carousel;