
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
import Hero from "@/components/Hero";
import KeyFeatures from "@/components/KeyFeatures";
import PopularDishes from "@/components/PopularDishes";
import Testimonial from "@/components/Testimonial";


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
