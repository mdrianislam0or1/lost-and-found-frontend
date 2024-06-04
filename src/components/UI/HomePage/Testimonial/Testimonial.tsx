/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";

const Testimonial: React.FC = () => {
  return (
    <div>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <Image
                width={400}
                height={400}
                src="/img/testimonial1.jpg"
                alt="Testimonial 1"
                className="w-32 h-32 rounded-full mb-4"
              />
              <p className="text-gray-700 text-center mb-4">
                "Lost & Found helped me find my lost wallet within hours! I'm so
                grateful for this amazing platform."
              </p>
              <p className="text-gray-600 font-bold">- Sarah J.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <Image
                width={400}
                height={400}
                src="/img/testimonial2.jpg"
                alt="Testimonial 2"
                className="w-32 h-32 rounded-full mb-4"
              />
              <p className="text-gray-700 text-center mb-4">
                "I accidentally left my phone in a taxi, but thanks to Lost &
                Found, I got it back the same day! Highly recommend."
              </p>
              <p className="text-gray-600 font-bold">- John D.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
              <Image
                width={400}
                height={400}
                src="/img/testimonial3.jpg"
                alt="Testimonial 3"
                className="w-32 h-32 rounded-full mb-4"
              />
              <p className="text-gray-700 text-center mb-4">
                "I found a lost dog in my neighborhood and used Lost & Found to
                reunite it with its owner. Such a heartwarming experience!"
              </p>
              <p className="text-gray-600 font-bold">- Emily R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-blue-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
            Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tip 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Report Lost Items Promptly
              </h3>
              <p className="text-gray-700">
                The sooner you report a lost item, the higher the chances of it
                being found and returned to you.
              </p>
            </div>
            {/* Tip 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Provide Detailed Descriptions
              </h3>
              <p className="text-gray-700">
                When reporting a lost or found item, be sure to include detailed
                descriptions and any identifying features.
              </p>
            </div>
            {/* Tip 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Stay Informed
              </h3>
              <p className="text-gray-700">
                Check Lost & Found regularly for updates on reported items and
                helpful tips for managing lost or found belongings.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
