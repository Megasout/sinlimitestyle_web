import { redirect, useLoaderData } from 'react-router-dom'
import getFromTable from '../Models/get'
import '../Styles/product.scss'
import { useEffect, useState } from 'react'
import ProductImages from '../Components/Product/ProductImages'
import useWindowWidth from '../Hooks/useWindowWidth'

export async function loader({ params }: any) {
    const id = params.ID
    const producto = await getFromTable(`/get/producto/${id}/all`)

    if (producto[0] == null)
        return redirect('../')

    if (producto[0].activo == 0)
        return redirect('./')

    return { producto: producto[0] }
}

function Product() {
    const { producto } = useLoaderData() as any
    console.log(producto)
    const [size, setSize] = useState<number | undefined>(producto.talles[0].id_talle ?? undefined)

    const stockList = getStock(size, producto.talles)
    const [modalStock, setModalStock] = useState(false)
    const [modalStockClosing, setModalStockClosing] = useState(false)
    const [amount, setAmount] = useState(stockList.length > 0 ? 1 : 0)

    const width = useWindowWidth()

    const formatProductType = (text: string) => text[0].toUpperCase() + text.slice(1)

    useEffect(() => {
        if (modalStockClosing) {
            setTimeout(() => {
                document.body.style.overflow = "auto"
                setModalStock(false)
                setModalStockClosing(false)
            }, 400)
        }
    }, [modalStockClosing])

    useEffect(() => {
        setAmount(stockList.length > 0 ? 1 : 0)
    }, [size])

    const handleModalStock = () => {
        if (amount > 0) {
            document.body.style.overflow = "hidden"
            setModalStock(true)
        }
    }

    const selectAmount = (value: number) => {
        setModalStockClosing(true)
        setAmount(value)
    }

    const renderSizeSelector = () => (
        <div className='size'>
            {size && producto.talles.map((t: any) =>
                <p
                    key={t.id_talle}
                    onClick={() => setSize(t.id_talle)}
                    className={`size_button ${t.id_talle == size ? 'select' : ''}`}>{t.talle}</p>)}
        </div>
    )

    const renderPrice = (precio: number, descuento: number) => (
        producto.descuento > 0 ?
            <>
                <h3 className='off'>{`$${precio}`}</h3>
                <h3 className='price'>{getRealPrice(precio, descuento)}
                    <span>{`${descuento}% OFF`}</span></h3>
            </> :
            <h3>{`$${precio}`}</h3>
    )

    const renderModalStockSelect = () => (
        modalStock && <div className='modal_stock'>
            <div className='background' onClick={() => setModalStockClosing(true)}></div>
            <div className={`stocks ${modalStockClosing ? 'close' : 'open'}`}>
                <span
                    onClick={() => setModalStockClosing(true)}
                    translate="no"
                    className="close material-symbols-outlined">
                    close
                </span>
                <h2 className='title'>Cantidad:</h2>
                <div className='list'>
                    {stockList.map(stock =>
                        <p
                            key={stock}
                            className={`${amount == stock ? 'select' : ''}`}
                            onClick={() => selectAmount(stock)}>{stock}</p>
                    )}
                </div>
            </div>
        </div>
    )

    const renderBuyFormSmallScreen = () => (
        <div className='buy'>
            <h2>{'Talle: ' + getSizeName(size, producto.talles)}</h2>
            {renderSizeSelector()}
            {renderPrice(producto.precio, producto.descuento)}
            <form>
                <h2
                    style={stockList.length > 0 ? { color: "green" } : { color: "crimson" }}>
                    {stockList.length > 0 ? 'Disponible' : 'Sin Stock'}</h2>
                <h2 onClick={handleModalStock} className='select_size'>{`Cantidad: ${amount}`}
                    <span
                        translate="no"
                        className="material-symbols-outlined">
                        keyboard_arrow_down
                    </span></h2>
                <input disabled={stockList.length == 0} type='button' value={'Agregar al carrito'}></input>
                <input disabled={stockList.length == 0} type='submit' value={'Comprar'}></input>
            </form>
            <div className='contact'>
                <p>¿Tienes alguna consulta?</p>
                <a href={getWhatsAppLink(producto.id)}>
                    <i style={{ color: "green" }} className='fa-brands fa-whatsapp'><span> Whatsapp</span></i>
                </a>
            </div>
            {width < 1025 && renderModalStockSelect()}
        </div>
    )

    const renderBuyFormBigScreen = () => (
        <div className='buy'>
            <h3>$500</h3>
            <form>
                <label>Cantidad</label>
                <select>
                    {stockList.length > 0 ? stockList.map(stock =>
                        <option key={stock} value={stock}>{stock}</option>
                    ) : <option>Sin Stock</option>}
                </select>
                <input disabled={stockList.length == 0} type='button' value={'Agregar al Carrito'}></input>
                <input disabled={stockList.length == 0} type='submit' value={'Comprar'}></input>
            </form>
            <div className='contact'>
                <p>¿Tienes alguna consulta?</p>
                <i className='fa-brands fa-whatsapp'><span> Whatsapp</span></i>
                <i className='fa-regular fa-envelope'><span> Email</span></i>
            </div>
        </div>
    )

    return (
        <div className="product">
            <div className='top'>
                {width < 1025 &&
                    <div className='title'>
                        <h2>{formatProductType(producto.tipo_producto)}</h2>
                        <h1>{producto.nombre}</h1>
                    </div>}
                <ProductImages width={width} images={producto.imagenes} />
                {width < 1025 && renderBuyFormSmallScreen()}
                <div className='info'>
                    {width >= 1025 && <h2>{formatProductType(producto.tipo_producto)}</h2>}
                    {width >= 1025 && <h1>{producto.nombre}</h1>}
                    {width >= 1025 &&
                        <>
                            <h3>Talle:</h3>
                            <form>
                                <select value={size} onChange={(e) => setSize(e.target.value as any)}>
                                    {size && producto.talles.map((t: any) =>
                                        <option key={t.id_talle} value={t.id_talle}>{t.talle}</option>)}
                                    {!size && <option>Único</option>}
                                </select>
                            </form>
                        </>}
                    <h3>Descripcion</h3>
                    <p>asdlkj adsklj flkdsa jlk sadjfkls;da jsdj aldskjflkas dj adsflkjas dlkjdas lkj dsklaja dslk;jfl kadsjlfk ;adsj aksdlj adslkf jdaslk; jf;dslak jflk;asdj l;ksad j;lsadj klds ja;kldsaj jasd ;jsda ;laj sfdj d ajflk sad;j lk;fasdj;lk asdjl;ka sdjl;kas dj;lasd j asd</p>
                    <h3>Categoria</h3>
                    <p>{producto.nombre_categoria ?? 'Sin Categoria'}</p>
                    <h3>Materiales</h3>
                    <p>{producto.material}</p>
                </div>
                {width >= 1025 && renderBuyFormBigScreen()}
            </div>
        </div>
    )
}

export default Product

function getStock(idSize: number | undefined, sizes: any[]): any[] {
    if (!idSize && !sizes[0].stock)
        return []

    if (!idSize && sizes[0].stock)
        return Array.from({ length: sizes[0].stock }).map((_, index) => index + 1)

    const size = sizes.find((s => s.id_talle == idSize))
    return Array.from({ length: size.stock }).map((_, index) => index + 1)
}

function getSizeName(idSize: number | undefined, sizes: any[]): string {
    if (!idSize)
        return 'Unico'

    const size = sizes.find((s => s.id_talle == idSize))
    return size.talle
}

function getRealPrice(price: number, off: number): string {
    return '$' + (price - (price * off / 100))
}

function getWhatsAppLink(id: number): string{
    const phon = 59898912284
    const text = 'Deseo consultar sobre el Producto: '
    const productLink = `https://www.SinLimiteStyle.shop/tienda/${id}/producto`
    const params = new URLSearchParams()
    params.set('phone', phon.toString())
    params.set('text', text + productLink)

    return `https://api.whatsapp.com/send?${params.toString()}`
}