import "../Styles/home.scss"
import Banner from "../Components/Home/Banner"
import Recommendations from "../Components/Home/Recommendations"

function Home() {



    return (
        <div className="home">
            <Banner />
            <Recommendations />
        </div>
    )
}

export default Home