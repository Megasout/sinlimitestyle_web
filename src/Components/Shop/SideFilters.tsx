import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import Filters from "./Filters"

type SideFiltersType = {
    width: number,
    categories: any,
    sizes: any,
    searchParams: URLSearchParams
}

export interface ShopSideFiltersRef {
    showFilters: () => void
    closeFilters: () => void
}

const SideFilters = forwardRef((props: SideFiltersType, ref) => {
    const { width, categories, sizes, searchParams } = props

    const [category, setCategory] = useState(searchParams.get('categoria'))
    const [filtersVisibility, setFiltersVisibility] = useState(false)
    const [filterHidden, setFilterHidden] = useState(false)
    const [canClose, setCanClose] = useState(false)
    const timeOutMenu = useRef<number | undefined>()
    const scrollRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: 531,
                behavior: "smooth"
            })
        }
    }

    useEffect(() => {
        const cat = searchParams.get('categoria')
        if (cat && cat != category) {
            setCategory(cat)
            scrollToBottom()
        } else if (!cat && cat != category)
            setCategory(cat)
    }, [searchParams])

    useEffect(() => setFiltersVisibility(false), [width])

    useEffect(() => {
        if (!filtersVisibility) {
            clearTimeout(timeOutMenu.current)
            setCanClose(false)
            timeOutMenu.current = setTimeout(() => setFilterHidden(true), 400);
            document.body.style.overflow = "auto"
        } else {
            timeOutMenu.current = setTimeout(() => setCanClose(true), 400);
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

    const handleOnClick = () => {
        if (canClose)
            setFiltersVisibility(false)
    }

    const className = `${filtersVisibility ? 'open' : 'close'} ${filterHidden ? 'hidden' : ''}`

    return (
        <>
            <div onClick={handleOnClick} className={`side_filters_background ${className}`}></div>
            <div className={`side_filters_container ${className}`}>
                <div className="top">
                    <h1>Filtros</h1>
                    <span
                        onClick={handleOnClick}
                        style={{ fontSize: "2rem", userSelect: "none" }}
                        translate="no"
                        className="close_button material-symbols-outlined">
                        close
                    </span>
                </div>
                <div ref={scrollRef} className={`side_filters`}>
                    <Filters categories={categories} sizes={sizes} />
                </div >
            </div>
        </>

    )
})

export default SideFilters