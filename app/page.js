import React from 'react';

const LandingPage = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white h-screen">
            {/* Header */}
            <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 flex justify-between items-center">
                <h1 className="text-3xl font-semibold">Welcome to Our Website</h1>
                <div>
                    <button className="bg-white text-blue-600 dark:text-blue-300 dark:bg-gray-700 px-4 py-2 rounded-md shadow-md hover:bg-blue-100 dark:hover:bg-gray-600">
                        Sign In
                    </button>
                    <button className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 ml-2 rounded-md shadow-md hover:bg-blue-700 dark:hover:bg-blue-800">
                        Sign Up
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-4">
                <section className="py-8">
                    <h2 className="text-2xl font-semibold mb-4">Discover Amazing Features</h2>
                    <p className="text-lg leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in velit placerat,
                        molestie libero eu, dictum sapien. Curabitur congue metus nec arcu eleifend ultricies.
                        Fusce nec odio eu tellus varius vehicula.
                    </p>
                </section>

                <section className="py-8">
                    <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
                    <p className="text-lg leading-relaxed">
                        We provide top-notch services and innovative solutions to help you achieve your goals.
                        With our user-friendly interface and powerful features, you'll be able to streamline
                        your workflow and boost productivity.
                    </p>
                </section>

                <section className="py-8">
                    <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
                    <p className="text-lg leading-relaxed">
                        Don't wait any longer! Sign up now and join our community of satisfied customers.
                        Experience the difference with our cutting-edge technology and dedicated support team.
                    </p>
                </section>
            </main>
        </div>
    );
}

export default LandingPage;
