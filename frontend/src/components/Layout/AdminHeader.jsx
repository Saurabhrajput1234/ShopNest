import React from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CiMoneyBill } from "react-icons/ci";
import { GrWorkshop } from "react-icons/gr";
import logo from '../../Assests/img/shopnest-bg2.png'




const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
         <Link to="/">
                      <img class="max-w-[191px] h-auto rounded-[6px] border border-black"
                        src={logo}
                        alt="logo"
                      />
         </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/admin-withdraw-request" className="800px:block hidden">
            <CiMoneyBill
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/admin-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/admin-sellers" className="800px:block hidden">
            <GrWorkshop
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <img
            src={`${user?.avatar}`}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
