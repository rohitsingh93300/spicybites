
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";


import Hero from "../components/Hero"
import Testimonial from "../components/Testimonial"
import KeyFeatures from "../components/KeyFeatures";
import PopularDishes from "../components/PopularDishes";


export default function Home() {
  return (
    <>
      {/* <Header className=""/> */}
      <div className="max-w-4xl mx-auto">
      <Hero/>
      <PopularDishes/>
      <KeyFeatures/>
      <Testimonial/>
      </div>    
      {/* <Footer/> */}
    </>

  );
}
