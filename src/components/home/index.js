import Navbar from './navbar'
import Working from './working'
import Testimonial from './testimonial'
import ContactUs from './contact_us'
import Footer from './footer.js'

import "./home.css";

function Index () {
  console.log("Hello")
    return (
      <>
        <Navbar />
        <Working/>
        <Testimonial />
        <ContactUs/>
        <Footer/>
      </>
    );
}

export default Index