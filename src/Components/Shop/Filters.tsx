import { useSearchParams } from "react-router-dom"
import FilterButton from "./FilterButton"
import FilterPrice from "./FilterPrice"

type FilterType = {
    categories: any,
    sizes: any
}

function Filters(props: FilterType) {
    const { categories, sizes } = props

    const [searchParams] = useSearchParams()
    const deals = searchParams.get('ofertas') == 'true' ? true : false
    const categoryParam = searchParams.get('categoria')
    const sizeParams = searchParams.getAll('talle')
    const lowPrice = searchParams.get('min')
    const highPrice = searchParams.get('max')

    return (
        <div className="filters">
            <FilterBlock
                title="Ofertas y descuentos"
                children={[
                    <FilterButton
                        key={1}
                        searchParams={searchParams}
                        isActive={deals}
                        text="Todas las ofertas"
                        param="ofertas"
                        value={deals ? null : 'true'} />
                ]} />
            <FilterBlock
                title="Filtrar por precio (en UYU)"
                children={[
                    <FilterPrice
                        key={11}
                        highPrice={highPrice ? parseFloat(highPrice) : undefined}
                        lowPrice={lowPrice ? parseFloat(lowPrice) : undefined}
                        searchParams={searchParams} />
                ]} />
            <FilterBlock
                title="Categorias"
                children={categories.map((category: any) =>
                    <FilterButton
                        key={category.id}
                        searchParams={searchParams}
                        isActive={categoryParam ? categoryParam == category.id : false}
                        text={category.nombre}
                        param="categoria"
                        value={categoryParam ? categoryParam == category.id ? null : category.id : category.id}
                        deleteParams={['talle']} />)}
            />
            {categoryParam &&
                <FilterBlock
                    title="Talles"
                    children={
                        sizes.map((size: any) =>
                            <FilterButton
                                key={size.id}
                                searchParams={searchParams}
                                isActive={sizeParams.includes(size.id.toString())}
                                text={size.talle}
                                param="talle"
                                value={sizeParams.includes(size.id.toString()) ? null : size.id}
                                multiValue
                                deleteValue={size.id} />)
                    } />
            }
        </div>
    )
}

export default Filters

type FilterBlockType = {
    title: string,
    children: React.ReactNode[]
}

function FilterBlock(props: FilterBlockType) {
    const { title, children } = props

    return (
        <div className="block">
            <h1>{title}</h1>
            {children}
        </div>
    )
}