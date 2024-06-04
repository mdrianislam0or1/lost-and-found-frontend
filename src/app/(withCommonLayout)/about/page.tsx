import Image from "next/image";

export default function About() {
  return (
    <div>
      <main className="bg-gray-100 py-10">
        <section className="container mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            About Lost & Found
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Lost & Found is a community-driven platform designed to help
            individuals report and reclaim lost items. Our mission is to create
            a seamless process for reuniting people with their belongings by
            facilitating the reporting of both lost and found items.
          </p>
          <p className="text-xl text-gray-700 mb-8">
            Our platform includes user-friendly features for reporting items,
            verifying ownership, and managing user profiles. Additionally, we
            offer administrative tools for overseeing site activity and user
            management to ensure a smooth and efficient experience for all
            users.
          </p>
          <h3 className="text-3xl font-bold text-gray-800 mt-12 mb-6">
            Our Mission
          </h3>
          <p className="text-xl text-gray-700 mb-8">
            At Lost & Found, our mission is to reduce the stress and
            inconvenience of losing personal belongings. By leveraging the power
            of community and technology, we aim to increase the chances of lost
            items being returned to their rightful owners.
          </p>
          <h3 className="text-3xl font-bold text-gray-800 mt-12 mb-6">
            Our Vision
          </h3>
          <p className="text-xl text-gray-700 mb-8">
            We envision a world where lost items are quickly and efficiently
            returned to their owners. Through our platform, we hope to foster a
            sense of community and trust, where people feel confident that their
            lost belongings can find their way back home.
          </p>
          <h3 className="text-3xl font-bold text-gray-800 mt-12 mb-6">
            Meet the Team
          </h3>
          <div className="flex flex-wrap justify-center">
            {/* Team Member 1 */}
            <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden m-4">
              <Image
                height={400}
                width={400}
                className="w-full h-56 object-cover object-center"
                src="https://avatars.githubusercontent.com/u/67714964?v=4"
                alt="Team Member 1"
              />
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800">Rian Islam</h4>
                <p className="text-gray-700">Founder & CEO</p>
              </div>
            </div>
            {/* Team Member 2 */}
            <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden m-4">
              <Image
                width={400}
                height={400}
                className="w-full h-56 object-cover object-center"
                src="https://mir-s3-cdn-cf.behance.net/user/115/362cc8573627041.5edff5031116f.jpg"
                alt="Team Member 2"
              />
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800">Rian Islam</h4>
                <p className="text-gray-700">Chief Operations Officer</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
