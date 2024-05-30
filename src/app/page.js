
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
      <section className="text-center my-16 px-4 md:px-0" id="about">
        <h3 className="text-red-500 italic">Our Story</h3>
        <h1 className='text-center text-4xl font-semibold '>About Us</h1>
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni minima odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste quos suscipit tempora? Aperiam esse fugiat inventore laboriosam officiis quam rem!
          </p>
          <p>At consectetur delectus ducimus est facere iure molestias obcaecati quaerat vitae voluptate? Aspernatur dolor explicabo iste minus molestiae pariatur provident quibusdam saepe?</p>
          <p>Laborum molestias neque nulla obcaecati odio quia quod reprehenderit sit vitae voluptates? Eos, tenetur.</p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <h3 className="text-red-500 italic">Don't hesitate</h3>
       <h1 className='text-center text-4xl font-semibold '>Contact Us</h1>
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
            +46 738 123 123
          </a>
        </div>
      </section>
      </div>    
      {/* <Footer/> */}
    </>

  );
}
