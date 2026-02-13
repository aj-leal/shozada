import { Link } from "react-router-dom"
import heroImg from "../../assets/rabbit-hero.webp"

const Hero = () => {
    return (
        <section className="relative">
            <img
                src={heroImg}
                alt="HeroImage"
                className="w-full h-100 md:h-150 lg:h-187.5 object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-black/20 flex items-center justify-center">
                <div className="text-center text-white px-6 max-w-4xl">
                    <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
                        Vacation <br /> Ready
                    </h1>
                    <p className="text-sm tracking-tighter font-medium md:text-lg mb-6 px-7 py-3" >
                        Explore our vacation-ready outfits with fast worldwide shipping.
                    </p>
                    <Link to="/collections/all" className="bg-shozada-red px-6 py-2 font-extrabold rounded-4xl text-2xl">
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero
