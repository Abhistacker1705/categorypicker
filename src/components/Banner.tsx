import React from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
const Banner: React.FC = () => {
  return (
    <div className="bg-bannerBg flex w-full items-center justify-center gap-7 p-3 font-medium">
      <span className="font-normal">
        <GoChevronLeft />
      </span>
      Get 10% off on business sign up
      <span className="font-normal">
        <GoChevronRight />
      </span>
    </div>
  );
};

export default Banner;
