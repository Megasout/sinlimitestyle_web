import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import Filters from "./Filters"

type SideFiltersType = {
    width: number,
    categories: any,
    sizes: any
}

export interface ShopSideFiltersRef {
    showFilters: () => void
    closeFilters: () => void
}

const SideFilters = forwardRef((props: SideFiltersType, ref) => {
    const { width, categories, sizes } = props

    const [filtersVisibility, setFiltersVisibility] = useState(false)
    const [filterHidden, setFilterHidden] = useState(false)
    const timeOutMenu = useRef<number | undefined>()

    useEffect(() => setFiltersVisibility(false), [width])

    useEffect(() => {
        if (!filtersVisibility) {
            timeOutMenu.current = setTimeout(() => setFilterHidden(true), 400);
            document.body.style.overflow = "auto"
        } else {
            clearTimeout(timeOutMenu.current)
            setFilterHidden(false)
            document.body.style.overflow = "hidden"
        }

        return () => {
            clearTimeout(timeOutMenu.current)
        }
    }, [filtersVisibility])

    const showFilters = () => {
        setFiltersVisibility(true)
    }

    useImperativeHandle(ref, () => ({
        showFilters: () => showFilters(),
        closeFilters: () => setFiltersVisibility(false)
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
            <Filters categories={categories} sizes={sizes}/>
        </div >
    )
})

export default SideFilters