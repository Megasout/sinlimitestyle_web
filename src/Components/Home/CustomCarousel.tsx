import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

type CustomCarouselType = {
    width: number,
    title: string
}

function CustomCarousel(props: CustomCarouselType) {
    const { width, title } = props
    const [slideToSlide, setSlideToSlide] = useState<number>(1)

    const responsive = {
        a: {
            breakpoint: { max: 4000, min: 1439 },
            items: 8,
            partialVisibilityGutter: 5
        },
        b: {
            breakpoint: { max: 1439, min: 1200 },
            items: 7,
            partialVisibilityGutter: 6
        },
        c: {
            breakpoint: { max: 1200, min: 1030 },
            items: 6,
            partialVisibilityGutter: 8
        },
        d: {
            breakpoint: { max: 1030, min: 880 },
            items: 5,
            partialVisibilityGutter: 10
        },
        e: {
            breakpoint: { max: 880, min: 750 },
            items: 4,
            partialVisibilityGutter: 12
        },
        f: {
            breakpoint: { max: 750, min: 600 },
            items: 3,
            partialVisibilityGutter: 16
        },
        g: {
            breakpoint: { max: 600, min: 0 },
            items: 2,
            partialVisibilityGutter: 20
        }
    };

    useEffect(() => {
        if (width >= 1440)
            setSlideToSlide(1)
        if (width < 1440)
            setSlideToSlide(1)
        if (width < 1200)
            setSlideToSlide(2)
        if (width < 1030)
            setSlideToSlide(3)
        if (width < 880)
            setSlideToSlide(4)
        if (width < 750)
            setSlideToSlide(3)
        if (width < 600)
            setSlideToSlide(2)
    }, [width])

    return (
        <div className="recommendations custom">
            <h1 className="title">{title}</h1>
            <Carousel
                className="carousel"
                swipeable={false}
                draggable={false}
                responsive={responsive}
                slidesToSlide={slideToSlide}
                partialVisible>
                {Array.from({ length: 15 }).map((_, index) =>
                    <div key={index} className={`item ${index == 7 ? 'final' : ''}`}></div>)}
            </Carousel>
        </div>
    )
}

export default CustomCarousel