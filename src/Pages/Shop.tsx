import "../Styles/shop.scss"
import Filters from "../Components/Shop/Filters"
import ShopContent from "../Components/Shop/ShopContent"
import useWindowWidth from "../Hooks/useWindowWidth"
import SideFilters, { ShopSideFiltersRef } from "../Components/Shop/SideFilters"
import { useEffect, useRef } from "react"
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom"
import getFromTable, { getFromTableQuery } from "../Models/get"

export async function loader({ request }: any) {
    const url = new URL(request.url)
    const searchParams = url.searchParams

    const filtro = searchParams.get('filtro') == 'accesorios'
        ? 'accesorio' : 'prenda'

    const categoria = searchParams.get('categoria')

    const sizeParams = searchParams.getAll('talle')

    if (sizeParams.length > 0) {
        const [productos, miniaturas, categories, sizes] = await Promise.all([
            getFromTableQuery(`/get/productos/talles`, 'talles', sizeParams),
            getFromTable(`/get/miniaturas/${filtro}s`),
            getFromTable(`/get/categorias/bytype/${filtro}`),
            getFromTable(`/get/talles/categoria/${categoria}`)])

        return { productos, miniaturas, categories, sizes }
    }

    if (categoria) {
        const [productos, miniaturas, categories, sizes] = await Promise.all([
            getFromTable(`/get/productos/${categoria}/categoria`),
            getFromTable(`/get/miniaturas/${filtro}s`),
            getFromTable(`/get/categorias/bytype/${filtro}`),
            getFromTable(`/get/talles/categoria/${categoria}`)])

        return { productos, miniaturas, categories, sizes }
    }

    const [productos, miniaturas, categories] = await Promise.all([
        getFromTable(`/get/${filtro}s`),
        getFromTable(`/get/miniaturas/${filtro}s`),
        getFromTable(`/get/categorias/bytype/${filtro}`)])

    const sizes = {}
    return { productos, miniaturas, categories, sizes }
}

function Shop() {
    const { productos, miniaturas, categories, sizes } = useLoaderData() as any
    const [searchParams] = useSearchParams()

    const filter = searchParams.get('filtro') ?? ' '
    const navigate = useNavigate()

    useEffect(() => {
        if (filter == 'prendas' || filter == 'accesorios') {
            return
        }

        navigate('../tienda?filtro=prendas')
    }, [filter])

    const width = useWindowWidth()
    const sideFilterRef = useRef<ShopSideFiltersRef>()

    const onClickfilterButton = () => {
        sideFilterRef.current?.showFilters()
    }

    return (
        <div className="shop">
            <div className="banner">
                <h1>{filter![0].toUpperCase() + filter?.slice(1)}</h1>
            </div>
            <div className="body">
                {width >= 1280 &&
                    <Filters categories={categories} sizes={sizes} />}
                <ShopContent
                    width={width}
                    onClickFilterButton={onClickfilterButton}
                    miniaturas={miniaturas}
                    productos={productos}
                    categories={categories}
                    sizes={sizes} />
            </div>
            <SideFilters
                ref={sideFilterRef}
                sizes={sizes}
                categories={categories}
                width={width}
                searchParams={searchParams} />
        </div>
    )
}

export default Shop