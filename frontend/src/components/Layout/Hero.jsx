import heroImg from "../../assets/rabbit-hero.webp"

const Hero = () => {
    return (
        <section>
            <img
                src={heroImg}
                alt="HeroImage"
                className="w-full h-[4000px] md:h-[600px] lg:h-[750px] object-cover"
            />
        </section>
    )
}

export default Hero
