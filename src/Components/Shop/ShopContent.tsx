import { useSearchParams } from "react-router-dom"
import SearchOptions from "./SearchOptions"

type ShopContentType = {
    width: number,
    onClickFilterButton: () => void
}

function ShopContent(props: ShopContentType) {
    const { width, onClickFilterButton } = props
    const [searchParams] = useSearchParams()
    const orderBy = searchParams.get('orden') ?? 'Relevancia'
    const search = searchParams.get('buscar')

    console.log(orderBy)

    return (
        <div className="content">
            <SearchOptions
                searchParams={searchParams}
                orderBy={orderBy}
                search={search}
                width={width}
                onClickFilterButton={onClickFilterButton} />
            <div className="blocks">
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
                <div className="block"></div>
            </div>
        </div>
    )
}

export default ShopContent