import { useSearchParams } from "react-router-dom"
import SearchOptions from "./SearchOptions"
import React from "react"

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

    const filteredProducts = getProducts({
        productos, max: maxPrice, buscar: search,
        min: minPrice, orden: orderBy, ofertas
    } as GetProductosType)

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
                {filteredProducts.map(producto =>
                    <Producto
                        key={producto.id}
                        nombre={producto.nombre}
                        precio={producto.precio}
                        nombreCategoria={producto.id_categoria != null ?
                            getCategoryName(categories, producto.id_categoria) : 'Ninguna'}
                        miniatura={getImage(miniaturas, producto.id)}
                        descuento={producto.descuento} />)}
                <WhiteSpace width={width} length={filteredProducts.length} />

            </div>
        </div>
    )
}

export default ShopContent

type ProductoType = {
    nombre: string,
    miniatura: React.CSSProperties,
    descuento: number,
    precio: number,
    nombreCategoria: string
}

function Producto(props: ProductoType) {
    const { descuento, miniatura, nombre, nombreCategoria, precio } = props

    return (
        <div className="block">
            <div className="image" style={miniatura}></div>
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

function getImage(miniaturas: any, id: any): React.CSSProperties {
    const pos = miniaturas.findIndex((miniatura: any) => miniatura.id_producto === id);

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