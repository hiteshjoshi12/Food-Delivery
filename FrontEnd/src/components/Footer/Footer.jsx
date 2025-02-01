import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <footer className="text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-5 px-[8vw] py-5 pt-20 mt-24" id="footer">
      <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-20 md:gap-10">
        <div className="flex flex-col items-start gap-5">
          <img src={assets.logo} alt="" />
          <p>
            Nutritional Value: Food provides essential nutrients like
            carbohydrates, proteins, fats, vitamins, and minerals, which are
            necessary for the bodys growth, repair, and maintenance.
          </p>
          <div className="flex gap-4">
            <img src={assets.facebook_icon} alt="Facebook" className="w-10" />
            <img src={assets.twitter_icon} alt="Twitter" className="w-10" />
            <img src={assets.linkedin_icon} alt="Instagram" className="w-10" />
          </div>
        </div>

        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white font-bold text-3xl">COMPANY</h2>
          <ul>
            <li className="my-2">Help Center</li>
            <li className="my-2">Contact Us</li>
            <li className="my-2">FAQs</li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white font-bold text-3xl">GET IN TOUCH</h2>
                <ul>
                <li className="my-2">+91 9650122063</li>
                <li className="my-2">contact@tomato.com</li>
                </ul>
          </div>
        
      </div>
      <hr className="w-full h-[2px] my-5 bg-gray-500 border-none" />

      <p className="text-center">© 2025 TOMATO. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
