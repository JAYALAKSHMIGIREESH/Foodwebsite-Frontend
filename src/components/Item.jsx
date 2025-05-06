import React from "react";
import { motion } from "framer-motion";

const imageVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Item = () => {
  return (
    <div className="container mx-auto p-6" style={{ marginTop: "-30px" , marginBottom:"100px"}}>
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-black mb-16 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Special <span className="text-orange-400">Items</span>
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {[
          "https://yummi-theme.myshopify.com/cdn/shop/files/festive-4.jpg?v=1614334588&width=1500",
          "https://yummi-theme.myshopify.com/cdn/shop/files/festive-5.jpg?v=1614334588&width=1500",
          "https://yummi-theme.myshopify.com/cdn/shop/files/festive-1.jpg?v=1614334588&width=1500",
          "https://yummi-theme.myshopify.com/cdn/shop/files/festive-2.jpg?v=1614334588&width=1500",
          "https://yummi-theme.myshopify.com/cdn/shop/files/home-01.jpg?v=1628143320",
          "https://yummi-theme.myshopify.com/cdn/shop/files/festive-5.jpg?v=1614334588&width=1500",
        ].map((src, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-lg shadow-lg h-64"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={src}
              alt={`Item ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-125 hover:grayscale"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Item;
