import { useEffect, useRef, useState } from "react"

type ProgressBarType = {
    length: number,
    select: number,
    pause: boolean,
    setSelect: (value: number) => void
}

function ProgressBar(props: ProgressBarType) {
    const { length, select, setSelect, pause } = props
    const [change, setChange] = useState(false)
    const intervalRef = useRef<number | undefined>();

    const handleOnClick = (index: number) => {
        setSelect(index)
    }

    useEffect(() => {
        if(length == 0)
            return
        clearInterval(intervalRef.current)
        setChange(false)
        intervalRef.current = setTimeout(() => {
            setChange(true)
        }, 3000);
    }, [select])

    useEffect(() => {
        if (pause) return

        if (change) {
            next(length, setSelect, select + 1)
            setChange(false)
        }
    }, [pause, change])

    return (
        <div className="progress_bar">
            {Array.from({ length: length }).map((_, index) =>
                <div
                    key={index}
                    onClick={() => handleOnClick(index)}
                    className={`bar ${select == index ? 'select' : ''}`}></div>
            )}
        </div>
    )
}

export default ProgressBar

function next(length: number, setSelect: (value: number) => void, value: number) {
    if (value >= length)
        return setSelect(0)

    setSelect(value)
}