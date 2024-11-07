import "../Styles/shop.scss"
import Filters from "../Components/Shop/Filters"
import ShopContent from "../Components/Shop/ShopContent"
import useWindowWidth from "../Hooks/useWindowWidth"
import SideFilters, { ShopSideFiltersRef } from "../Components/Shop/SideFilters"
import { useEffect, useRef } from "react"
import { useLoaderData, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import getFromTable from "../Models/get"

export async function loader({ request }: any) {
    const url = new URL(request.url)
    const searchParams = url.searchParams

    const filtro = searchParams.get('filtro') == 'accesorios'
        ? 'Accesorio' : 'Ropa'

    const categoria = searchParams.get('categoria')

    if (categoria) {
        const [categories, sizes] = await Promise.all([
            getFromTable(`/get/categorias/bytype/${filtro}`),
            getFromTable(`/get/talles/categoria/${categoria}`)])

        return { categories, sizes }
    }

    const categories = await getFromTable(`/get/categorias/bytype/${filtro}`)
    const sizes = {}
    return { categories, sizes }
}

function Shop() {
    const { categories, sizes } = useLoaderData() as any
    const [searchParams] = useSearchParams()

    const filter = searchParams.get('filtro') ?? ' '
    const navigate = useNavigate()
    const location = useLocation()

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
        <div key={location.search} className="shop">
            <div className="banner">
                <h1>Pagina principal{' > '} {filter![0].toUpperCase() + filter?.slice(1)}</h1>
            </div>
            <div className="body">
                {width >= 1280 &&
                    <Filters categories={categories} sizes={sizes}/>}
                <ShopContent width={width} onClickFilterButton={onClickfilterButton} />
            </div>
            <SideFilters ref={sideFilterRef} sizes={sizes} categories={categories} width={width} />
        </div>
    )
}

export default Shop