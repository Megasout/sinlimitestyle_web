import { Link } from "react-router-dom"

function Filters() {
    return (
        <div className="filters">
            <FilterBlock
                title="Tipo de producto"
                children={[
                    <Link key={1} to={''}>Prendas</Link>,
                    <Link key={2} to={''}>Accesorios</Link>
                ]} />
            <FilterBlock
                title="Filtrar por precio"
                children={[
                    <form key={11}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <input type="number" placeholder="Mínimo" min={0} />
                            <div className="line"></div>
                            <input type="number" min={0} placeholder="Máximo" />
                        </div>
                        <input type="submit" value={'Filtrar'}></input>
                    </form>
                ]} />
            <FilterBlock
                title="Categorias"
                children={[
                    <Link key={3} to={''}>Categoria 1</Link>,
                    <Link key={4} to={''}>Categoria 2</Link>,
                    <Link key={5} to={''}>Categoria 3</Link>,
                    <Link key={6} to={''}>Categoria 4</Link>,
                    <Link key={7} to={''}>Categoria 5</Link>,
                    <Link key={8} to={''}>Categoria 6</Link>,
                    <Link key={9} to={''}>Categoria 7</Link>,
                    <Link key={10} to={''}>Categoria 8</Link>
                ]} />
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