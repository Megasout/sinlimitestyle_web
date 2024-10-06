import "../Styles/home.scss"
import Banner from "../Components/Home/Banner"
import Recommendations from "../Components/Home/Recommendations"
import useWindowWidth from "../Hooks/useWindowWidth"

function Home() {
    const width = useWindowWidth()


    return (
        <div className="home">
            <Banner />
            <Recommendations width={width}/>
        </div>
    )
}

export default Home