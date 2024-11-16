import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

type SearchOptionsType = {
    searchParams: URLSearchParams,
    sizes: any[],
    categories: any[],
    orderBy: string,
    search: string | null,
    width: number,
    onClickFilterButton: () => void
}

function SearchOptions(props: SearchOptionsType) {
    const { width, onClickFilterButton, orderBy, search, searchParams, categories, sizes } = props

    const category = searchParams.get('categoria')
    const selectSizes = searchParams.getAll('talle')
    const max = searchParams.get('max')
    const min = searchParams.get('min')
    const deals = searchParams.get('ofertas')

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
            {width < 1280 && width >= 550 &&
                <>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                        <OrderBy
                            searchParams={searchParams}
                            orderBy={orderBy}
                            style={{ display: "flex", justifyContent: "end" }} />
                        <div style={{ width: '100%', height: '35.59px' }}></div>
                        <InputSearch searchParams={searchParams} search={search ? search : ''} />
                    </div>
                    <div style={{ height: "1px", backgroundColor: "#c2c2c2" }}></div>
                    <div className="filter_list">
                        <FilterButton onClickFilterButton={onClickFilterButton} />
                        <Tags
                            searchParams={searchParams}
                            tags={getTags(sizes, categories, category, selectSizes, max, min, deals)} />
                    </div>
                </>
            }
            {width < 550 &&
                <>
                    <InputSearch
                        searchParams={searchParams}
                        search={search ? search : ""}
                        containerStyle={width >= 315 ? { width: "100%" } : {}}
                        inputStyle={{ width: "100%", minHeight: "35.59px" }} />
                    <div style={{ height: "1px", backgroundColor: "#c2c2c2" }}></div>
                    <OrderBy
                        searchParams={searchParams}
                        orderBy={orderBy}
                        style={{ display: "flex", justifyContent: "end" }} />
                    <div style={{ height: "1px", backgroundColor: "#c2c2c2" }}></div>
                    <div className="filter_list">
                        <FilterButton onClickFilterButton={onClickFilterButton} />
                        <Tags
                            searchParams={searchParams}
                            tags={getTags(sizes, categories, category, selectSizes, max, min, deals)} />
                    </div>
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

type TagsType = {
    tags: any[],
    searchParams: URLSearchParams
}

function Tags(props: TagsType) {
    const { tags, searchParams } = props

    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    const tagRef = useRef<HTMLDivElement>(null)
    const animationFrameId = useRef<number | null>(null)

    const handleOnMouseDown = (e: React.MouseEvent) => {
        if (tagRef.current) {
            setIsDragging(true)
            setStartX(e.clientX) //Guarda la posicion inicial del mouse
            setScrollLeft(tagRef.current.scrollLeft) //Guarda la posicion de scroll inicial 
        }
    }

    const handleMoveScroll = (e: MouseEvent) => {
        if (!isDragging || !tagRef.current) return;

        const dx = e.clientX - startX //calcula el desplazamiento horizontal
        tagRef.current.scrollLeft = scrollLeft - dx //Ajusta el scroll horizontal
    }

    useEffect(() => {
        // Agregar los eventos globales
        if (tagRef.current) {
            tagRef.current.addEventListener('mousedown', (e) => handleOnMouseDown(e as any));
        }

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !tagRef.current) return

            animationFrameId.current = window.requestAnimationFrame(() => handleMoveScroll(e))
        };

        const handleMouseUp = () => {
            setIsDragging(false)

            if (animationFrameId.current) {
                window.cancelAnimationFrame(animationFrameId.current)
                animationFrameId.current = null
            }
        };

        const handleMouseLeave = () => {
            setIsDragging(false)

            if (animationFrameId.current) {
                window.cancelAnimationFrame(animationFrameId.current)
                animationFrameId.current = null
            }
        };

        // Agregar los eventos globales de mouse
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Limpieza de los event listeners cuando el componente se desmonta
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isDragging, startX, scrollLeft]);

    return (
        <div
            ref={tagRef}
            className="tags">
            {
                tags.map((tag, index) =>
                    <Tag
                        key={index}
                        name={tag.name}
                        param={tag.param}
                        searchParams={searchParams}
                        value={tag.value} />)
            }
        </div>
    )
}

type TagType = {
    name: string,
    param: string[],
    value?: string,
    searchParams: URLSearchParams
}

function Tag(props: TagType) {
    const { name, param, value } = props

    const navigation = useNavigate()
    const newSearchParams = new URLSearchParams(props.searchParams)

    const handleOnClick = () => {
        if (value) {
            const values = newSearchParams.getAll(param[0])
            newSearchParams.delete(param[0])
            values.forEach(e => {
                if (e != value)
                    newSearchParams.append(param[0], e)
            })
            navigation(`/tienda?${newSearchParams.toString()}`)
            return
        }

        param.forEach(e => {
            newSearchParams.delete(e)
        })

        navigation(`/tienda?${newSearchParams.toString()}`)
        return
    }

    return (
        <p onClick={handleOnClick}>{name}</p>
    )
}

function getTags(sizes: any[], categories: any[], category: string | null, selectSizes: string[],
    max: string | null, min: string | null, deals: string | null): Object[] {

    let list: Object[] = []

    if (category) {
        list.push({ name: categories.find(cat => cat.id == category).nombre, param: ['categoria', 'talle'] })
    }

    for (const size of selectSizes) {
        list.push({ name: sizes.find(siz => siz.id == size).talle, param: ['talle'], value: size })
    }

    if (max)
        if (min)
            list.push({ name: `$${min} a $${max}`, param: ['max', 'min'] })
        else
            list.push({ name: `$${0} a $${max}`, param: ['max'] })

    if (deals == 'true')
        list.push({name: 'Todas las ofertas', param: ['ofertas']})

    return list
}

export default SearchOptions