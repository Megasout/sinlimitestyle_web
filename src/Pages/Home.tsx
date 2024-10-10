import "../Styles/home.scss"
import Banner from "../Components/Home/Banner"
import Recommendations from "../Components/Home/Recommendations"
import useWindowWidth from "../Hooks/useWindowWidth"
import PrendasTipo from "../Components/Home/PrendasTipo"
import Carousel from "../Components/Home/CustomCarousel"
import Colecciones from "../Components/Home/Colecciones"

function Home() {
    const width = useWindowWidth()


    return (
        <div className="home">
            <Banner />
            <Recommendations width={width} />
            <PrendasTipo />
            <Carousel title="Novedades" width={width}/>
            <Carousel title="Lo más popular" width={width}/>
            <Colecciones/>
        </div>
    )
}

export default Home