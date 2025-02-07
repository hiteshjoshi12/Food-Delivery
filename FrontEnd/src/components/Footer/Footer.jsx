import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <footer className="text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-6 px-6 md:px-[8vw] py-8 mt-16" id="footer">
      {/* Grid Layout (Single Column on Mobile, Three Columns on Desktop) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center sm:text-left">
        
        {/* About Section */}
        <div className="flex flex-col items-center sm:items-start gap-5">
          <img src={assets.logo} alt="Logo" className="w-28" />
          <p className="text-sm md:text-base leading-relaxed">
            Nutritional Value: Food provides essential nutrients like carbohydrates, proteins, 
            fats, vitamins, and minerals, which are necessary for the body’s growth, repair, and maintenance.
          </p>
          {/* Social Media Icons */}
          <div className="flex justify-center sm:justify-start gap-4">
            <img src={assets.facebook_icon} alt="Facebook" className="w-8 cursor-pointer hover:scale-110 transition" />
            <img src={assets.twitter_icon} alt="Twitter" className="w-8 cursor-pointer hover:scale-110 transition" />
            <img src={assets.linkedin_icon} alt="LinkedIn" className="w-8 cursor-pointer hover:scale-110 transition" />
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col items-center sm:items-start gap-5">
          <h2 className="text-white font-bold text-2xl">COMPANY</h2>
          <ul className="text-sm md:text-base">
            <li className="my-1 cursor-pointer hover:text-white transition">Help Center</li>
            <li className="my-1 cursor-pointer hover:text-white transition">Contact Us</li>
            <li className="my-1 cursor-pointer hover:text-white transition">FAQs</li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div className="flex flex-col items-center sm:items-start gap-5">
          <h2 className="text-white font-bold text-2xl">GET IN TOUCH</h2>
          <ul className="text-sm md:text-base">
            <li className="my-1 cursor-pointer hover:text-white transition">+91 9650122063</li>
            <li className="my-1 cursor-pointer hover:text-white transition">contact@tomato.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="w-full h-[2px] bg-gray-500 border-none" />

      {/* Copyright */}
      <p className="text-sm text-center">© 2025 TOMATO. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
