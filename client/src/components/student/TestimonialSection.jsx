import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets';

const TestimonialSection = () => {
  return (
    <div className="pb-12 px-8 md:px-0">
  <h2 className="text-3xl font-medium text-gray-900">Testimonial</h2>
  <p className="md:text-base text-gray-600 mt-3.5">
    Hear from our learners as they share their journeys of transformation, success, and how our
    <br />
    platform has made a difference in their lives.
  </p>

  <div className="grid gap-8 mt-14 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">

    {dummyTestimonial.map((testimonial, index) => (
      <div
        key={index}
        className="text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
      >
        <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10">
          <img
            className="h-14 w-14 rounded-full"
            src={testimonial.image}
            alt={testimonial.name}
          />
          <div>
            <h1 className="text-lg font-medium text-gray-800">
              {testimonial.name}
            </h1>
            <p className="text-gray-800/80">{testimonial.role}</p>
          </div>
        </div>

        <div className="p-5 pb-7">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                className="h-5"
                src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                alt="star"
              />
            ))}
          </div>

          <p className="text-gray-600 mt-4">{testimonial.feedback}</p>
        </div>
        <a href='#' className='text-blue-500 underline px-5'> See more</a>
      </div>
    ))}
  </div>
</div>

  )
}

export default TestimonialSection;
