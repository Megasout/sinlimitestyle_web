import { useNavigate, useSearchParams } from "react-router-dom"
import SearchOptions from "./SearchOptions"
import React, { useEffect, useRef, useState } from "react"

type ShopContentType = {
    width: number,
    sizes: any[],
    productos: Array<any>,
    miniaturas: Array<any>,
    categories: Array<any>
    onClickFilterButton: () => void
}

function ShopContent(props: ShopContentType) {
    const { categories, sizes, miniaturas, productos, width, onClickFilterButton } = props
    const [searchParams] = useSearchParams()
    const orderBy = searchParams.get('orden') ?? 'Relevancia'
    const search = searchParams.get('buscar')
    const maxPrice = searchParams.get('max')
    const minPrice = searchParams.get('min')
    const ofertas = searchParams.get('ofertas')

    const navigator = useNavigate()
    const [pageO, setPageO] = useState(searchParams.get('pg'))

    const filteredProducts = getProducts({
        productos, max: maxPrice, buscar: search,
        min: minPrice, orden: orderBy, ofertas
    } as GetProductosType)

    const numberOfProducts = 13
    const numberOfPages = Math.ceil(filteredProducts.length / numberOfProducts)
    const rawPage = searchParams.get('pg') ? parseInt(searchParams.get('pg')!) : 1
    const page = !isNaN(rawPage) && rawPage > 0 &&
        rawPage.toString() === searchParams.get('pg') && rawPage <= numberOfPages
        ? rawPage
        : 1

    useEffect(() => {
        if (pageO && pageO != '1' && searchParams.get('pg') == pageO) {
            searchParams.set('pg', '1')
            setPageO('1')
            navigator(`/tienda?${searchParams}`)
        } else 
            setPageO(searchParams.get('pg'))
        

    }, [searchParams])

    return (
        <div className="content">
            <SearchOptions
                searchParams={searchParams}
                orderBy={orderBy}
                search={search}
                width={width}
                categories={categories}
                sizes={sizes}
                onClickFilterButton={onClickFilterButton} />
            <div className="blocks">
                {filteredProducts.slice(numberOfProducts * (page - 1),
                    numberOfProducts * (page)).map(producto =>
                        <Producto
                            key={producto.id}
                            id={producto.id}
                            nombre={producto.nombre}
                            precio={producto.precio}
                            nombreCategoria={producto.id_categoria != null ?
                                getCategoryName(categories, producto.id_categoria) : 'Ninguna'}
                            miniatura={getImage(miniaturas, producto.id)}
                            descuento={producto.descuento} />)}
                <WhiteSpace width={width} length={filteredProducts.length} />
            </div>
            <div className="pages">
                <Page selectPage={page} length={numberOfPages} searchParams={searchParams} />
            </div>
        </div>
    )
}

export default ShopContent

type PageType = {
    length: number,
    selectPage: number,
    searchParams: URLSearchParams
}

function Page(props: PageType) {
    const { length, selectPage } = props

    const newSearchParams = new URLSearchParams(props.searchParams)
    const navigation = useNavigate()

    const navigationToPage = (to: number | string) => {
        newSearchParams.set('pg', to.toString())
        navigation(`/tienda?${newSearchParams.toString()}`)
        return
    }

    if (length === 1) return <></>;

    const renderPageNumbers = (start: number, end: number) =>
        Array.from({ length: end - start + 1 }, (_, index) => start + index).map((num) => (
            <p
                key={num}
                className={`page ${selectPage === num ? 'select' : ''}`}
                onClick={() => navigationToPage(num)}>
                {num}
            </p>
        ));

    const array = Array.from({ length: length }).map((_, index) => index + 1)
    const elements = obtenerElementos(array, selectPage - 1);

    const prevPage = () => navigationToPage(selectPage - 1);
    const nextPage = () => navigationToPage(selectPage + 1);

    const getPageNavigation = (start: number, end: number) => (
        <>
            {selectPage > 1 && <i className="page fa-solid fa-arrow-left" onClick={prevPage}></i>}
            {start > 1 && <p className="page" onClick={() => navigationToPage(1)}>1</p>}
            {start > 2 && <Ellipsis navigationToPage={navigationToPage} />}
            {renderPageNumbers(start, end)}
            {end < length - 1 && <Ellipsis navigationToPage={navigationToPage} />}
            {end < length && <p className="page" onClick={() => navigationToPage(length)}>{length}</p>}
            {selectPage < length && <i className="page fa-solid fa-arrow-right" onClick={nextPage}></i>}
        </>
    );

    if (length <= 5)
        return getPageNavigation(1, length)

    if (selectPage == 1)
        return (
            <>
                {renderPageNumbers(1, elements[elements.length - 1])}
                <Ellipsis navigationToPage={navigationToPage} />
                <p className="page" onClick={() => navigationToPage(length)}>{length}</p>
                <i className="page fa-solid fa-arrow-right" onClick={nextPage}></i>
            </>
        )
    if (selectPage == length)
        return (
            <>
                <i className="page fa-solid fa-arrow-left" onClick={prevPage}></i>
                <p className="page" onClick={() => navigationToPage(1)}>{1}</p>
                <Ellipsis navigationToPage={navigationToPage} />
                {renderPageNumbers(elements[0], elements[elements.length - 1])}
            </>
        )

    return getPageNavigation(elements[0], elements[elements.length - 1])
}

function obtenerElementos(array: any[], x: number): any[] {
    const start = Math.max(0, x - 2);
    const end = Math.min(array.length - 1, x + 2);
    return array.slice(start, end + 1);
}

type EllipsisType = {
    navigationToPage: (to: number | string) => void
}

function Ellipsis(props: EllipsisType) {
    const { navigationToPage } = props

    const [active, setActive] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const [text, setText] = useState('')

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node))
                setActive(false)
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleOnClick = () => {
        if (!active)
            setActive(true)
    }

    const handleNavigation = () => {
        setActive(false)
        navigationToPage(text)
    }

    return (
        <div ref={ref} className="page" onClick={handleOnClick}>
            <p>...</p>
            {active &&
                <div className="page_search">
                    <p>Ir a...</p>
                    <form>
                        <input
                            name="navigate"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            type="text"></input>
                        <button onClick={handleNavigation} type="button">Ir</button>
                    </form>
                </div>}
        </div>);
}

type ProductoType = {
    id: number,
    nombre: string,
    miniatura: React.CSSProperties | null,
    descuento: number,
    precio: number,
    nombreCategoria: string
}

function Producto(props: ProductoType) {
    const { descuento, miniatura, nombre, nombreCategoria, precio, id } = props

    const navigator = useNavigate()

    return (
        <div onClick={() => navigator(`/tienda/${id}/producto`)} className="block">
            {miniatura ?
                <div className="image" style={miniatura}></div>
                : <div className="image" style={{ backgroundColor: "#bdbdbd" }}>
                    <i style={{ fontSize: "2.8rem" }} className="fa-regular fa-image"></i>
                    <p style={{ userSelect: "none" }}>Sin Miniatura</p>
                </div>}
            <div className="info">
                <h2>{nombre}</h2>
                <div className="numbers">
                    {descuento > 0 ?
                        <>
                            <h1 className="descuento">{'$' + precio}</h1>
                            <h1>{getOff(precio, descuento)}<span>{descuento + '% OFF'}</span></h1>
                        </> :
                        <>
                            <div style={{ height: "18px" }}></div>
                            <h1>{'$' + precio}</h1>
                        </>
                    }
                    <h3>{nombreCategoria}</h3>
                </div>
            </div>
        </div>
    )
}

type GetProductosType = {
    productos: any[],
    ofertas: string | null,
    max: string | null,
    min: string | null,
    buscar: string | null,
    orden: string
}

function getProducts(data: GetProductosType): any[] {
    const { max, min, ofertas, orden, buscar } = data
    let productos = []

    if (max) {
        if (min)
            productos = data.productos.filter(p => finalPrice(p.descuento, p.precio) <= parseInt(max) &&
                finalPrice(p.descuento, p.precio) >= parseInt(min))
        else
            productos = data.productos.filter(p => finalPrice(p.descuento, p.precio) <= parseInt(max))
    } else
        productos = data.productos

    if (ofertas && ofertas == 'true')
        productos = productos.filter(producto => producto.descuento > 0)

    if (buscar && buscar != '')
        productos = productos.filter(producto => {
            const valorLowerCase = buscar.toLowerCase()

            return producto.nombre.toLowerCase().includes(valorLowerCase)
        })

    switch (orden) {
        case 'Relevancia':
            //TODO: relevancia, puntos de vicion + compra
            break
        case 'Mayor Precio':
            productos.sort((a, b) => finalPrice(b.descuento, b.precio) - finalPrice(a.descuento, a.precio))
            break
        case 'Menor Precio':
            productos.sort((a, b) => finalPrice(a.descuento, a.precio) - finalPrice(b.descuento, b.precio))
            break
    }

    return productos
}

function finalPrice(off: number, price: number): number {
    if (off == 0)
        return price

    return price - (price * off / 100)
}

function getImage(miniaturas: any, id: any): React.CSSProperties | null {
    const pos = miniaturas.findIndex((miniatura: any) => miniatura.id_producto === id);

    if (pos == -1)
        return null

    return { "--image-sourse": `url("${miniaturas[pos].url}")` } as React.CSSProperties
}

function getOff(price: number, off: number): string {
    const _off = price * off / 100
    return '$' + (price - _off)
}

function getCategoryName(categories: Array<any>, id: any): string {
    const category = categories.find((category => category.id == id))
    return category.nombre
}

type WhiteSpaceType = {
    length: number,
    width: number
}

function WhiteSpace(props: WhiteSpaceType) {
    const { length, width } = props

    if (width >= 1615 && length < 5) {
        return Array.from({ length: 5 - length }).map((_, index) =>
            <div key={index} className="white"></div>)
    }

    if (width >= 1430 && length < 4) {
        return Array.from({ length: 4 - length }).map((_, index) =>
            <div key={index} className="white"></div>)
    }

    if (width >= 1280 && length < 3) {
        return Array.from({ length: 3 - length }).map((_, index) =>
            <div key={index} className="white"></div>)
    }

    if (width >= 1070 && length < 4) {
        return Array.from({ length: 4 - length }).map((_, index) =>
            <div key={index} className="white"></div>)
    }

    if (width >= 600 && length < 3) {
        return Array.from({ length: 3 - length }).map((_, index) =>
            <div key={index} className="white"></div>)
    }

    if (width >= 400 && length < 2) {
        return Array.from({ length: 3 - length }).map((_, index) =>
            <div key={index} className="white"></div>)
    }

    if (length == 0) {
        return <div className="white"></div>
    }

    return <></>
}