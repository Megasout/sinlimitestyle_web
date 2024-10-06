import React, { useEffect, useState } from "react"
import ProgressBar from "../ProgressBar"

import banner1 from "../../assets/Images/bannerPH1.png"
import banner2 from "../../assets/Images/bannerPH2.png"
import banner3 from "../../assets/Images/bannerPH3.png"

const banners = [banner1, banner2, banner3]

function Banner() {
    const [select, setSelect] = useState(0)
    const [pause, setPause] = useState<boolean>(false)
    const [url, setUrl] = useState<React.CSSProperties>({ "--image-sourse": `url("${banners[select]}")` } as React.CSSProperties)

    useEffect(() => {
        setUrl({ "--image-sourse": `url("${banners[select]}")` } as React.CSSProperties)
    }, [select])

    const handleOnMouseEnter = () => {
        setPause(true)
    }

    const handleOnMouseLeave = () => {
        setPause(false)
    }

    return (
        <div
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            style={url}
            className="banner">
            <h1>Text</h1>
            <h2>Text 2</h2>

            <ProgressBar
                length={banners.length}
                select={select}
                setSelect={setSelect}
                pause={pause} />
        </div>
    )
}

export default Banner