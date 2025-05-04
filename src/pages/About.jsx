import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="py-32 px-4 md:px-32">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        About <span className="text-orange-500">Us</span>
      </h1>

      <div className="flex flex-col pt-16 md:flex-row items-center justify-between gap-12">
        {/* Text Section */}
        <motion.div
          className="w-full md:w-1/2 text-gray-800"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-lg mx-auto text-center md:text-left space-y-6">
            <motion.p
              className=" text-lg md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Welcome to your favorite food ordering experience! We’re here to deliver
              your cravings straight to your door with ease, speed, and exceptional
              service.
            </motion.p>
            <motion.p
              className="text-lg md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              At our core, we value quality, freshness, and your satisfaction. From
              secure payments to prompt deliveries, we make sure every meal is a delight
              for you.
            </motion.p>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          style={{width:"350px"}}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.img
            src="https://yummi-theme.myshopify.com/cdn/shop/files/abo-01.jpg?v=1627997034&width=1500"
            alt="Food Delivery"
            className="w-full max-w-md h-auto rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default About;
