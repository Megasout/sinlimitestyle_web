import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Link } from "react-router-dom"

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
            <div className="block">
                <h1>Tipo de productos</h1>
                <Link to={''}>Prendas</Link>
                <Link to={''}>Accesorios</Link>
            </div>
            <div className="block">
                <h1>Filtrar por precio</h1>
                <form key={11}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <input type="number" placeholder="Mínimo" min={0} />
                        <div className="line"></div>
                        <input type="number" min={0} placeholder="Máximo" />
                    </div>
                    <input type="submit" value={'Filtrar'}></input>
                </form>
            </div>
            <div className="block">
                <h1>Categorias</h1>
                <Link to={''}>Categorias 1</Link>
                <Link to={''}>Categorias 2</Link>
                <Link to={''}>Categorias 3</Link>
                <Link to={''}>Categorias 4</Link>
                <Link to={''}>Categorias 5</Link>
                <Link to={''}>Categorias 6</Link>
                <Link to={''}>Categorias 7</Link>
                <Link to={''}>Categorias 8</Link>
                <Link to={''}>Categorias 9</Link>
                <Link to={''}>Categorias 10</Link>
                <Link to={''}>Categorias 11</Link>
                <Link to={''}>Categorias 12</Link>
                <Link to={''}>Categorias 13</Link>
                <Link to={''}>Categorias 14</Link>
                <Link to={''}>Categorias 15</Link>
                <Link to={''}>Categorias 16</Link>
                <Link to={''}>Categorias 17</Link>
                <Link to={''}>Categorias 18</Link>
                <Link to={''}>Categorias 19</Link>
                <Link to={''}>Categorias 20</Link>
                <Link to={''}>Categorias 21</Link>
                <Link to={''}>Categorias 22</Link>
            </div>
        </div >
    )
})

export default SideFilters