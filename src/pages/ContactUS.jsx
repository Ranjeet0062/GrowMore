import React from 'react'
import ContactForm from '../componet/form/ContactForm'
import Footer from '../componet/Footer'
import Navbar from '../componet/Navbar'
import ContactUsDetail from "../componet/form/ContactUsDetail"
function ContactUS() {
  return (
    <div className='text-white'>
      <Navbar />
      <div className='max-w-[1200px] mt-[30px] mb-[30px] flex flex-col md:flex-row  justify-between mx-auto '>
       <ContactUsDetail/>
        <ContactForm />
      </div>
      <Footer />

    </div>
  )
}

export default ContactUS