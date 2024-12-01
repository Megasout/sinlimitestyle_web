import { useEffect, useRef, useState } from "react"
import PrismaZoom from "react-prismazoom";

type ImagesType = {
    images: any[],
    width: number
}

function ProductImages({ images, width }: ImagesType) {
    const [select, setSelect] = useState(0)
    const [isZoomed, setIsZoomed] = useState(false);
    const [mouseHover, setMouseHover] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(false);

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
            const sensitivity = 70;
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

    const renderZoomSmallScreen = () => (
        isZoomed && <ImageZoom
            handleZoomLeave={handleZoomLeave}
            images={images}
            setSelect={setSelect}
            select={select}
            handleOnMouseEnter={handleOnMouseEnter}
            handleOnMouseLeave={handleOnMouseLeave}
            handleTouchEnd={handleTouchEnd}
            handleTouchMove={handleTouchMove}
            handleTouchStart={handleTouchStart}
            mouseHover={mouseHover}
            nextImage={nextImage}
            prevImage={prevImage}
            imageStyle={imageStyle}
            width={width} />
    )

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
            {renderZoomSmallScreen()}
            {width >= 1025 && renderImageBigScreen()}
            {width < 1025 && renderImageSmallScreen()}
            {width >= 1025 && images.length >= 1 && renderImageSelectionBigScreen()}
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
    handleOnMouseEnter: () => void,
    handleOnMouseLeave: () => void,
    handleTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void,
    handleTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void,
    handleTouchEnd: () => void,
    mouseHover: boolean,
    nextImage: () => void,
    prevImage: () => void
    imageStyle: React.CSSProperties,
    width: number
}

function ImageZoom(props: ImageZoomType) {
    const { handleZoomLeave, images, select,
        handleOnMouseEnter, handleOnMouseLeave, handleTouchEnd,
        handleTouchMove, handleTouchStart, mouseHover, nextImage,
        prevImage, imageStyle, width
    } = props

    const [zoom, setZoom] = useState<number>(100)
    const [zoomC, setZoomC] = useState(1)

    const renderZoomMenuSmall = () => (
        <div className="menu">
            <button onClick={handleZoomLeave}>Atras</button>
            <p>{`${select + 1}/${images.length}`}</p>
        </div>)

    const renderZoomMenuBig = () => (
        <div className="menu">
            <p>{`${select + 1}/${images.length}`}</p>
            <div className="options">
                <span
                    onClick={() => setZoomC(zoomC - 1)}
                    translate="no"
                    className="material-symbols-outlined">
                    zoom_out
                </span>
                <p>{`${Math.floor(zoom)}%`}</p>
                <span
                    onClick={() => setZoomC(zoomC + 1)}
                    translate="no"
                    className="material-symbols-outlined">
                    zoom_in
                </span>
                <span
                    onClick={handleZoomLeave}
                    translate="no"
                    className="material-symbols-outlined">
                    Close
                </span>
            </div>
        </div>
    )

    const renderImage = () => (
        <div
            className='big_image'
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}>
            <div className="image-container" style={imageStyle}>
                {images.map((img, index) =>
                    <ImageZoomContainer
                        key={index}
                        select={select}
                        zoomC={zoomC}
                        onZoomChange={(value) => setZoom(value)}
                        setZoomC={setZoomC}
                        onTouchEnd={handleTouchEnd!}
                        onTouchMove={handleTouchMove!}
                        onTouchStart={handleTouchStart!}
                        url={img.url} />
                )}
            </div>
            {(width < 1025 && mouseHover && images.length > 1) &&
                <NextBackButtons
                    nextImage={nextImage!}
                    prevImage={prevImage!} />}
        </div>
    )

    return (
        <>
            <div className="background">
                {width < 1025 && renderZoomMenuSmall()}
                {width >= 1025 && renderZoomMenuBig()}
                <ImageSelectionSmallScreen className="zoom" images={images} select={select} />
                {width >= 1025 && <NextBackButtons
                    nextImage={nextImage!}
                    prevImage={prevImage!} />}
            </div>
            {renderImage()}
        </>
    )
}

type ImageZoomContainerType = {
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void,
    onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void,
    onTouchEnd: () => void,
    onZoomChange: (value: number) => void,
    setZoomC: (value: number) => void,
    zoomC: number,
    select: number,
    url: string
}

interface PrismaZoomHandle {
    zoomIn: (value: number) => void;
    zoomOut: (value: number) => void;
    zoomToZone: (relX: number, relY: number, relWidth: number, relHeight: number) => void;
    reset: () => void;
    getZoom: () => number;
    move: (shiftX: number, shiftY: number, transitionDuration?: number | undefined) => void;
}

const ImageZoomContainer = (props: ImageZoomContainerType) => {
    const { onTouchEnd, onTouchMove, onTouchStart,
         onZoomChange, setZoomC, url, select, zoomC } = props

    const zoomRef = useRef<PrismaZoomHandle>(null)
    const [zoom, setZoom] = useState(false)
    const [prevZoom, setPrevZoom] = useState(zoomC)

    useEffect(() => {
        if (!zoomRef.current) return
        zoomRef.current.reset()
    }, [select])

    useEffect(() => {
        if(!zoomRef.current) return
        if(prevZoom > zoomC)
           return zoomRef.current.zoomOut(prevZoom - zoomC)
        
        zoomRef.current.zoomIn(zoomC - prevZoom)
    }, [zoomC])

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!zoomRef.current) return
        if (zoomRef.current.getZoom() == 1)
            onTouchStart(e)
    }
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!zoomRef.current) return
        if (zoomRef.current.getZoom() == 1)
            onTouchMove(e)
    }
    const handleTouchEnd = () => {
        if (!zoomRef.current) return
        if (zoomRef.current.getZoom() == 1)
            onTouchEnd()
    }

    const handleOnZoomChange = (value: number) => {
        onZoomChange(100 * value)
        setZoom(value != 1)
        setPrevZoom(value)
        setZoomC(value)
    }

    return (
        <div className="zoom_container">
            <PrismaZoom
                ref={zoomRef}
                onZoomChange={handleOnZoomChange}
                className="image_slide_zoom">
                <div
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={getImageZoom(url, zoom)}></div>
            </PrismaZoom>
        </div>
    )
}


//Botones next and back
type NextBackButtonsType = {
    nextImage: () => void,
    prevImage: () => void
}

function NextBackButtons(props: NextBackButtonsType) {
    const { nextImage, prevImage } = props

    return (
        <>
            <span
                onClick={prevImage}
                translate="no"
                className="nav l inverse material-symbols-outlined">
                arrow_forward_ios
            </span>
            <span
                onClick={nextImage}
                translate="no"
                className="nav r material-symbols-outlined">
                arrow_forward_ios
            </span>
        </>
    )
}

//Muestra la posicion del array de imagenes
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

function getImageZoom(img: string | null, zoom: boolean): React.CSSProperties | undefined {
    if (!img)
        return undefined
    return { backgroundImage: `url("${img}")`, cursor: zoom ? "grab" : "zoom-in" } as React.CSSProperties
}