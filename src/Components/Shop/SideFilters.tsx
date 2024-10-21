import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"

type SideFiltersType = {
    width: number
}

export interface ShopSideFiltersRef {
    showFilters: () => void
}

const SideFilters = forwardRef((props: SideFiltersType, ref) => {
    const { width } = props

    const [filtersVisibility, setFiltersVisibility] = useState(false)
    const [filterHidden, setFilterHidden] = useState(false)
    const timeOutMenu = useRef<number | undefined>()

    useEffect(() => setFiltersVisibility(false), [width])

    useEffect(() => {
        if (!filtersVisibility) {
            timeOutMenu.current = setTimeout(() => setFilterHidden(true), 400);
        } else {
            clearTimeout(timeOutMenu.current)
            setFilterHidden(false)
        }

        return () => {
            clearTimeout(timeOutMenu.current)
        }
    }, [filtersVisibility])

    const showFilters = () => {
        setFiltersVisibility(true)
    }

    useImperativeHandle(ref, () => ({
        showFilters: () => showFilters()
    }))

    return (
        <div className={`side_filters ${filtersVisibility ? 'open' : 'close'} ${filterHidden ? 'hidden' : ''}`}>
            <span
                onClick={() => setFiltersVisibility(false)}
                style={{ fontSize: "2rem", userSelect: "none" }}
                translate="no"
                className="close_button material-symbols-outlined">
                close
            </span>
        </div >
    )
})

export default SideFilters