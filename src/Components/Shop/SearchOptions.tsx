import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

type SearchOptionsType = {
    searchParams: URLSearchParams
    orderBy: string,
    search: string | null,
    width: number,
    onClickFilterButton: () => void
}

function SearchOptions(props: SearchOptionsType) {
    const { width, onClickFilterButton, orderBy, search, searchParams } = props

    return (
        <div className="options">
            {width >= 1280 &&
                <>
                    <OrderBy
                        searchParams={searchParams}
                        orderBy={orderBy} />
                    <div style={{ width: '100%' }}></div>
                    <InputSearch searchParams={searchParams} search={search ? search : ""} />
                </>
            }
            {width < 1280 && width >= 470 &&
                <>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <FilterButton onClickFilterButton={onClickFilterButton} />
                        <div style={{ width: '100%' }}></div>
                        <InputSearch searchParams={searchParams} search={search ? search : ''} />
                    </div>
                    <div style={{ height: "1px", backgroundColor: "#c2c2c2" }}></div>
                    <OrderBy
                        searchParams={searchParams}
                        orderBy={orderBy}
                        style={{ display: "flex", justifyContent: "end" }} />
                </>
            }
            {width < 470 &&
                <>
                    <InputSearch
                        searchParams={searchParams}
                        search={search ? search : ""}
                        containerStyle={width >= 315 ? { width: "100%" } : {}}
                        inputStyle={{ width: "100%", minHeight: "35.59px" }} />
                    <div style={{ height: "1px", backgroundColor: "#c2c2c2" }}></div>
                    <FilterButton onClickFilterButton={onClickFilterButton} style={{ display: "flex" }} />
                    <div style={{ height: "1px", backgroundColor: "#c2c2c2" }}></div>
                    <OrderBy
                        searchParams={searchParams}
                        orderBy={orderBy}
                        style={{ display: "flex", justifyContent: "end" }} />
                </>
            }
        </div>
    )
}

type InputSearchType =
    | {
        searchParams: URLSearchParams
        search: string
        containerStyle: React.CSSProperties
        inputStyle: React.CSSProperties
    }
    | {
        searchParams: URLSearchParams
        search: string
        containerStyle?: undefined
        inputStyle?: undefined
    }

function InputSearch(props: InputSearchType) {
    const { containerStyle, inputStyle } = props
    const [search, setSearch] = useState(props.search)
    const newSearchParams = new URLSearchParams(props.searchParams)
    const navigator = useNavigate()

    const handleSearch = () => {
        newSearchParams.set('buscar', search)
        navigator(`/tienda?${newSearchParams}`)
    }

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div style={containerStyle} className="search">
            <input
                style={inputStyle}
                type="search"
                placeholder="Buscar Productos..."
                onKeyDown={handleSearchKeyDown}
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
            <span
                onClick={handleSearch}
                translate="no"
                className="material-symbols-outlined">
                search
            </span>
        </div>
    )
}

type OrderByType = {
    orderBy: string
    searchParams: URLSearchParams
    style?: React.CSSProperties
}

function OrderBy(props: OrderByType) {
    const { style, orderBy, searchParams } = props
    const navigator = useNavigate()
    const newSearchParms = new URLSearchParams(searchParams)

    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
        newSearchParms.set('orden', e.target.value)
        navigator(`/tienda?${newSearchParms}`)
    }

    return (
        <div style={style} className="sorting">
            <label>Ordenar por </label>
            <select defaultValue={orderBy} onChange={handleOnChange}>
                <option value={'Relevancia'}>Relevancia</option>
                <option value={'Mayor Precio'}>Mayor Precio</option>
                <option value={'Menor Precio'}>Menor Precio</option>
            </select>
        </div>
    )
}

type FilterButtonType = {
    style?: React.CSSProperties
    onClickFilterButton: () => void
}

function FilterButton(props: FilterButtonType) {
    const { onClickFilterButton, style } = props

    return !style ? (
        <button onClick={onClickFilterButton}>
            <span
                translate="no"
                className="material-symbols-outlined">
                menu
            </span>Filtros
        </button>
    ) :
        (
            <div style={style}>
                <button onClick={onClickFilterButton}>
                    <span
                        translate="no"
                        className="material-symbols-outlined">
                        menu
                    </span>Filtros
                </button>
            </div>
        )
}


export default SearchOptions