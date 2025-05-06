import React from "react";
import { FaUtensils, FaHamburger, FaBeer } from "react-icons/fa";
import { motion } from "framer-motion";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Fine Dining",
      description:
        "Enjoy a premium fine dining experience with world-class cuisine in a sophisticated ambiance. Perfect for any occasion, our fine dining offers a diverse menu that will satisfy all tastes.",
      icon: <FaUtensils className="h-12 w-12 text-orange-400 mb-4" />,
    },
    {
      id: 2,
      title: "Outdoor Seating",
      description:
        "Relax and dine under the stars with our beautiful outdoor seating area. Whether it's a sunny day or a cool evening, our outdoor space offers a refreshing atmosphere to enjoy your meal.",
      icon: <FaHamburger className="h-12 w-12 text-orange-400 mb-4" />,
    },
    {
      id: 3,
      title: "Event Catering",
      description:
        "Let us bring our exquisite flavors to your event. From small gatherings to large celebrations, our catering services offer a wide range of menus to suit any event and make it memorable.",
      icon: <FaBeer className="h-12 w-12 text-orange-400 mb-4" />,
    },
  ];

  return (
    <div className="container mx-auto py-24">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-black mb-20 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our <span className="text-orange-400">Services</span>
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Animated Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              {service.icon}
            </motion.div>

            <h3 className="text-xl font-semibold mb-2 text-center">
              {service.title}
            </h3>
            <p className="text-gray-700 text-sm text-center">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
