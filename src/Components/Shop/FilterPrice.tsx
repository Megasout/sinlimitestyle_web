import { useState } from "react"
import { useNavigate } from "react-router-dom"

type FilterPriceType = {
    lowPrice: number | undefined,
    highPrice: number | undefined,
    searchParams: URLSearchParams
}

function FilterPrice(props: FilterPriceType) {
    const newSearchParams = new URLSearchParams(props.searchParams)
    const [highPrice, setHighPrice] = useState<number | undefined>(props.highPrice)
    const [lowPrice, setLowPrice] = useState<number | undefined>(props.lowPrice)
    const navigator = useNavigate()

    const handleOnClick = () => {
        if (lowPrice && !highPrice) {
            newSearchParams.set('min', '0')
            newSearchParams.set('max', lowPrice.toString())
            navigator(`/tienda?${newSearchParams}`)
            return
        }

        if (highPrice && !lowPrice) {
            newSearchParams.set('min', '0')
            newSearchParams.set('max', highPrice.toString())
            navigator(`/tienda?${newSearchParams}`)
            return
        }

        if (highPrice == 0 && lowPrice == 0) {
            newSearchParams.delete('min')
            newSearchParams.delete('max')
            navigator(`/tienda?${newSearchParams}`)
            return
        }

        if (!highPrice || !lowPrice) {
            if (newSearchParams.get('min') || newSearchParams.get('max')) {
                newSearchParams.delete('min')
                newSearchParams.delete('max')
                navigator(`/tienda?${newSearchParams}`)
                return
            }
            return
        }

        if (highPrice < lowPrice) {
            newSearchParams.set('min', highPrice.toString())
            newSearchParams.set('max', lowPrice.toString())
            navigator(`/tienda?${newSearchParams}`)
            return
        }

        newSearchParams.set('min', lowPrice.toString())
        newSearchParams.set('max', highPrice.toString())
        navigator(`/tienda?${newSearchParams}`)
    }

    return (
        <form>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                    type="number"
                    placeholder="Mínimo"
                    min={0}
                    defaultValue={lowPrice}
                    onChange={(e) => setLowPrice(e.target.value ? parseFloat(e.target.value) : undefined)} />
                <div className="line"></div>
                <input
                    type="number"
                    placeholder="Máximo"
                    min={0}
                    defaultValue={highPrice}
                    onChange={(e) => setHighPrice(e.target.value ? parseFloat(e.target.value) : undefined)} />
            </div>
            <button type="button" onClick={handleOnClick}>Filtrar</button>
        </form>
    )
}
export default FilterPrice