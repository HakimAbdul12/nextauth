import React from "react";

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 p-4">
        <h1 className="text-3xl font-semibold">Our Company</h1>
      </header>

      <main className="container mx-auto p-4">
        <section className="py-8">
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-lg leading-relaxed">
            We are a team of passionate individuals committed to providing
            exceptional services and products to our customers. Our journey
            began with a vision to make a positive impact on the world through
            innovation and creativity.
          </p>
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            Our mission is to exceed the expectations of our clients by
            delivering top-notch solutions tailored to their needs. We strive to
            foster a culture of collaboration, integrity, and excellence in
            everything we do.
          </p>
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">John Doe</h3>
              <p className="text-lg">Co-founder & CEO</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
              <p className="text-lg">CTO</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Alice Johnson</h3>
              <p className="text-lg">Head of Marketing</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
