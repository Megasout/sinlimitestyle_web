import { useEffect, useState } from "react"

type RecommendationsType = {
    width: number
}

function Recommendations(props: RecommendationsType) {
    const { width } = props
    const [length, setLength] = useState<number>(8)

    useEffect(() => {
        if (width >= 1440)
            setLength(8)
        if (width < 1440)
            setLength(7)
        if(width < 980) 
            setLength(6)
        if(width < 800) 
            setLength(5)
    }, [width])

    return (
        <div className="recommendations">
            <h1 className="title">Nuestras recomendaciones</h1>
            <div className="list">
                {Array.from({ length: 9 }).filter((_, index) => index + 1 <= length).map((_, index) =>
                    <div key={index} className="item"></div>
                )}
            </div>
        </div>
    )
}

export default Recommendations