const Header = () => {
  return (
    <div className="relative rounded-3xl md:rounded-[0px] w-full h-[50vh] md:h-[34vw] my-[76px] mx-auto bg-[url('/header_img.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      {/* Overlay for Readability */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="absolute flex flex-col items-start gap-4 md:gap-[1.5vw] max-w-[90%] md:max-w-[50%] bottom-5 md:bottom-[10%] left-5 md:left-[6vw] text-white">
        <h2 className="font-bold text-3xl md:text-[max(3.5vw,22px)] leading-tight">
          Order Your Favourite Food Here.
        </h2>
        <p className="text-[4vw] md:text-[1.2vw] leading-relaxed">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise.
        </p>
        <button className="border-none font-medium py-3 px-6 md:p-5 w-[max(140px,40%)] md:w-[160px] bg-white text-[#747474] text-[max(3.5vw,13px)] md:text-[max(1vw,13px)] rounded-full shadow-md hover:bg-gray-200 transition">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
