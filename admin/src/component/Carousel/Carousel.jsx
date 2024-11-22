import { useEffect, useState } from "react";
import "./carousel.styles.scss";

const Carousel = ({ data }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

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
            {data.length > 0 && <img src={data[currentIndex]} alt={`Slide ${currentIndex}`} />}
        </div>
    );
}

export default Carousel;