import { useNavigate } from "react-router-dom"

type FilterButtonType =
    | {
        text: string,
        param: string,
        value: string | null
        isActive: boolean,
        searchParams: URLSearchParams,
        multiValue: true
        deleteValue: string
        deleteParams?: null
    }
    | {
        text: string,
        param: string,
        value: string | null
        isActive: boolean,
        searchParams: URLSearchParams,
        deleteParams?: string[]
        multiValue?: false
        deleteValue?: string
    }

function FilterButton(props: FilterButtonType) {
    const { text, param, value, isActive, searchParams, multiValue, deleteValue, deleteParams } = props
    const navigator = useNavigate()
    const newSearchParams = new URLSearchParams(searchParams)

    const handleOnClick = () => {
        if (multiValue) {
            if (value) {
                newSearchParams.append(param, value)
                navigator(`/tienda?${newSearchParams.toString()}`)
                return
            }
            const values = newSearchParams.getAll(param)
            newSearchParams.delete(param)

            values.forEach((e) => {
                if (e != deleteValue) {
                    newSearchParams.append(param, e)
                }
            })
            navigator(`/tienda?${newSearchParams.toString()}`)
            return
        }

        if (deleteParams && deleteParams.length > 0) {
            deleteParams.forEach((e) => {
                newSearchParams.delete(e)
            })
        }

        if (value) {
            newSearchParams.set(param, value)
            navigator(`/tienda?${newSearchParams.toString()}`)
            return
        }

        newSearchParams.delete(param)
        navigator(`/tienda?${newSearchParams.toString()}`)
    }

    return (
        <form className="filter_button" onClick={handleOnClick}>
            <input id="check" type="checkbox" checked={isActive} readOnly />
            <label htmlFor="check">{' ' + text}</label>
        </form>
    )
}
export default FilterButton