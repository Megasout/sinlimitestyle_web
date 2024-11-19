import { useEffect, useRef, useState } from "react"

type ImagesType = {
    images: any[],
    width: number
}

function ProductImages({ images, width }: ImagesType) {
    const [select, setSelect] = useState(0)
    const [isZoomed, setIsZoomed] = useState(false);
    const [mouseHover, setMouseHover] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // For touch swiping
    const [startX, setStartX] = useState<number | null>(null);
    const [endX, setEndX] = useState<number | null>(null);

    useEffect(() => {
        // Detectamos si el dispositivo soporta eventos táctiles
        const checkTouchDevice = () => {
            if ('ontouchstart' in window) {
                setIsTouchDevice(true);
            } else {
                setIsTouchDevice(false);
            }
        };
        checkTouchDevice();
        window.addEventListener('resize', checkTouchDevice);
        return () => {
            window.removeEventListener('resize', checkTouchDevice);
        };
    }, []);

    useEffect(() => {
        if (isZoomed) {
            setIsZoomed(false)
        }
    }, [width])

    const handleZoomEnter = () => {
        if (images.length > 0) {
            setIsZoomed(true)
            document.body.style.overflow = "hidden"
        }
    }

    const handleZoomLeave = () => {
        setIsZoomed(false)
        document.body.style.overflow = "auto"
    }

    const nextImage = () => setSelect((prev) => (prev + 1) % images.length)
    const prevImage = () => setSelect((prev) => (prev - 1 + images.length) % images.length)

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => setStartX(e.touches[0].clientX);
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => setEndX(e.touches[0].clientX);
    const handleTouchEnd = () => {
        if (startX !== null && endX !== null) {
            const diff = endX - startX;
            const sensitivity = 30;
            if (Math.abs(diff) > sensitivity && width < 1025) {
                diff > 0 ? prevImage() : nextImage();
            }
        }
        setStartX(null);
        setEndX(null);
    }

    const renderNavigationButtons = () => (
        images.length > 1 &&
        <NextBackButtons
            nextImage={nextImage}
            prevImage={prevImage} />)

    const renderZoomBigScreen = () => (
        isZoomed && <ImageZoom
            handleZoomLeave={handleZoomLeave}
            images={images}
            setSelect={setSelect}
            select={select} />
    )

    // const renderZoomSmallScreen = () => (
    //     isZoomed && <ImageZoomSmallScreen
    //         handleZoomLeave={handleZoomLeave}
    //         images={images}
    //         setSelect={setSelect}
    //         select={select}
    //         handleOnMouseEnter={handleOnMouseEnter}
    //         handleOnMouseLeave={handleOnMouseLeave}
    //         handleTouchEnd={handleTouchEnd}
    //         handleTouchMove={handleTouchMove}
    //         handleTouchStart={handleTouchStart}
    //         mouseHover={mouseHover}
    //         nextImage={nextImage}
    //         prevImage={prevImage} />
    // )

    const renderImageSelectionBigScreen = () => (
        images.length > 1 &&
        <div className='min_block'>
            {images.map((img, index) =>
                <div
                    key={index}
                    onMouseEnter={() => setSelect(index)}
                    className={`min ${index == select ? 'select' : ''}`}
                    style={getImage(img.url)}></div>)}
        </div>
    )

    const renderImageSmallScreen = () => (
        <div
            className='image'
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            <div onClick={handleZoomEnter} className="image-container" style={imageStyle}>
                {images.map((img, index) =>
                    <div key={index} className="image-slide" style={getImage(img.url)}></div>)}
            </div>
            {(width >= 800 || mouseHover) && renderNavigationButtons()}
        </div>
    )

    const renderImageBigScreen = () => (
        <div
            className='image'
            onClick={handleZoomEnter}
            style={getImage(images.length > 0 ? images[select].url : null)}>
        </div>
    )

    // Animación CSS para el contenedor de imágenes
    const imageStyle = {
        transform: `translateX(-${select * 100}%)`, // Mueve las imágenes horizontalmente
        transition: 'transform 0.5s ease-in-out', // Transición suave
    };

    const handleOnMouseEnter = () => !isTouchDevice ? setMouseHover(true) : {}
    const handleOnMouseLeave = () => !isTouchDevice ? setMouseHover(false) : {}

    return (
        <div className='image_block'>
            {width >= 1025 && renderZoomBigScreen()}
            {/* {width < 1025 && renderZoomSmallScreen()} */}
            {width >= 1025 && renderImageBigScreen()}
            {width < 1025 && renderImageSmallScreen()}
            {width >= 1025 || images.length <= 1 && renderImageSelectionBigScreen()}
            {width < 1025 && <ImageSelectionSmallScreen images={images} select={select} />}
        </div>
    )
}

export default ProductImages

type ImageZoomType = {
    handleZoomLeave: () => void,
    images: any[],
    select: number,
    setSelect: (value: number) => void,
    handleOnMouseEnter?: undefined,
    handleOnMouseLeave?: undefined,
    handleTouchStart?: undefined,
    handleTouchMove?: undefined,
    handleTouchEnd?: undefined,
    mouseHover?: undefined,
    nextImage?: undefined,
    prevImage?: undefined
} | {
    handleZoomLeave: () => void,
    images: any[],
    select: number,
    setSelect: (value: number) => void,
    handleOnMouseEnter: () => void,
    handleOnMouseLeave: () => void,
    handleTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void,
    handleTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void,
    handleTouchEnd: () => void,
    mouseHover: boolean,
    nextImage: () => void,
    prevImage: () => void
}

function ImageZoom(props: ImageZoomType) {
    const { handleZoomLeave, images, select, setSelect } = props

    const [zoom, setZoom] = useState(false)
    const [backgroundPosition, setBackgroundPosition] = useState('center center')
    const imageRef = useRef<HTMLDivElement>(null)

    const nextImage = () => {
        setBackgroundPosition('center center')
        setZoom(false)
        if (select < images.length - 1)
            setSelect(select + 1)
        else
            setSelect(0)
    }

    const prevImage = () => {
        setBackgroundPosition('center center')
        setZoom(false)
        if (select > 0)
            setSelect(select - 1)
        else
            setSelect(images.length - 1)
    }

    const handleZoom = () => {
        setZoom(!zoom)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (zoom && imageRef.current) {
            const rect = imageRef.current.getBoundingClientRect();
            const offSetX = e.clientX - rect.left
            const offSetY = e.clientY - rect.top

            //Calculo del porsentaje de desplazamiento del mouse
            const x = (offSetX / rect.width) * 100
            const y = (offSetY / rect.height) * 100

            setBackgroundPosition(`${x}% ${y}%`)
        }
    }

    return (
        <>
            {images.length > 1 && <NextBackButtons nextImage={nextImage} prevImage={prevImage} />}
            <div className='background' onClick={handleZoomLeave}>
                <span
                    onClick={handleZoomLeave}
                    translate="no"
                    className="close material-symbols-outlined">
                    Close
                </span>
            </div>
            <div
                ref={imageRef}
                className='big_image'
                onClick={handleZoom}
                onMouseMove={handleMouseMove}
                style={getImageWithZoom(images[select].url, zoom, backgroundPosition)}></div>
        </>
    )
}

// function ImageZoomSmallScreen(props: ImageZoomType) {
//     const { handleZoomLeave, images, select,
//         handleOnMouseEnter, handleOnMouseLeave, handleTouchEnd,
//         handleTouchMove, handleTouchStart, mouseHover, nextImage,
//         prevImage
//     } = props

//     const [scale, setScale] = useState(1);
//     const [initialDistance, setInitialDistance] = useState(0); // Distancia inicial entre los dedos
//     const [isZooming, setIsZooming] = useState(false);

//     // Manejo de toque al inicio (detectar si se está haciendo zoom)
//     const handleTouchStartWithZoom = (e: React.TouchEvent<HTMLDivElement>) => {
//         if (e.touches.length === 2) {
//             // Si hay dos dedos, detectamos el gesto de zoom
//             e.preventDefault()
//             const distance = getDistance(e.touches[0], e.touches[1]);
//             setInitialDistance(distance);
//             setIsZooming(true); // Indicar que estamos haciendo zoom
//         } else if (e.touches.length === 1) {
//             // Si solo hay un dedo, seguimos con el control de navegación
//             setIsZooming(false); // No estamos haciendo zoom, es navegación
//             handleTouchStart && handleTouchStart(e);
//         }
//     };

//     // Manejo de movimiento del toque (actualización del zoom o desplazamiento)
//     const handleTouchMoveWithZoom = (e: React.TouchEvent<HTMLDivElement>) => {
//         if (isZooming && e.touches.length === 2) {
//             e.preventDefault()

//             const currentDistance = getDistance(e.touches[0], e.touches[1]);
//             const zoomFactor = currentDistance / initialDistance;
//             setScale(Math.max(1, Math.min(zoomFactor, 3))); // Limitar el zoom entre 1x y 3x
//         } else if (!isZooming && e.touches.length === 1) {
//             // Manejo de desplazamiento para navegar entre las imágenes
//             handleTouchMove && handleTouchMove(e);
//         }
//     };

//     // Manejo del fin del toque (navegar entre imágenes si es necesario)
//     const handleTouchEndWithZoom = () => {
//         setIsZooming(false);
//         handleTouchEnd && handleTouchEnd();
//     };

//     // Estilo de la imagen con el zoom aplicado
//     const imageStyle = {
//         transform: `translateX(-${select * 100}%)`, // scale(${scale})`, // Aplica el zoom con el scale
//         transition: 'transform 0.4s ease-in-out', // Transición suave
//     };

//     return (
//         <>
//             <div className="background">
//                 <div className="menu">
//                     <button onClick={handleZoomLeave}>Atras</button>
//                     <p>{`${select}/${images.length}`}</p>
//                 </div>
//                 <ImageSelectionSmallScreen className="zoom" images={images} select={select} />
//             </div>
//             <div
//                 className='big_image'
//                 onMouseEnter={handleOnMouseEnter}
//                 onMouseLeave={handleOnMouseLeave}>
//                 <div className="image-container" style={imageStyle}>
//                     {images.map((img, index) =>
//                         <div
//                             key={index}
//                             onTouchStart={handleTouchStartWithZoom}
//                             onTouchMove={handleTouchMoveWithZoom}
//                             onTouchEnd={handleTouchEndWithZoom}
//                             className="image-slide"
//                             style={getImage(img.url)}></div>)}
//                 </div>
//                 {mouseHover && images.length > 1 &&
//                     <NextBackButtons
//                         nextImage={nextImage}
//                         prevImage={prevImage} />}
//             </div>
//         </>
//     )
// }

type NextBackButtonsType = {
    nextImage: () => void,
    prevImage: () => void
}

function NextBackButtons(props: NextBackButtonsType) {
    const { nextImage, prevImage } = props

    return (
        <div className={`nav`}>
            <span
                onClick={prevImage}
                translate="no"
                className="inverse material-symbols-outlined">
                arrow_forward_ios
            </span>
            <span
                onClick={nextImage}
                translate="no"
                className="material-symbols-outlined">
                arrow_forward_ios
            </span>
        </div>
    )
}

type ImageSelectionSmallScreenType = {
    images: any[],
    select: number,
    className?: string
}

function ImageSelectionSmallScreen(props: ImageSelectionSmallScreenType) {
    const { images, select, className } = props

    return (
        images.length > 0 &&
        <div className={`selection ${className}`}>
            {images.map((_, index) =>
                <div
                    key={index}
                    className={`pos ${index == select ? 'select' : ''}`}></div>)}
        </div>
    )
}

//Obtiene imagen
function getImage(img: string | null): React.CSSProperties | undefined {
    if (!img)
        return undefined
    return { backgroundImage: `url("${img}")` } as React.CSSProperties
}

//Obtiene imagen con zoom aplicado
function getImageWithZoom(img: string, zoom: boolean, pos: string): React.CSSProperties {
    return {
        backgroundImage: `url("${img}")`,
        backgroundSize: zoom ? '130%' : 'contain',
        backgroundPosition: pos,
        cursor: zoom ? 'move' : 'zoom-in'
    } as React.CSSProperties
}