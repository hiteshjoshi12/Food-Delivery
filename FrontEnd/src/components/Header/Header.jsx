const Header = () => {
  return (
    <div className="h-[34vw] m-[30px auto] bg-[url('/header_img.png')] bg-no-repeat bg-contain relative">
      <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] [animation:fadeIn_1s_ease-in-out]">
        <h2 className="font-medium text-white text-[max(3.5vw,22px)]">
          Order Your Favourite Food Here.
        </h2>
        <p className="text-white text-[1.2vw]">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your craveings and elevate your dining
          experience, one delicious meal at a time.{" "}
        </p>
        <button className="border-none font-medium p-5 w-[160px] bg-white text-[#747474] text-[max(1vw,13px)] rounded-4xl">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
