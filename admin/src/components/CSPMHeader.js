import React from 'react';
import { TbArrowForward } from "react-icons/tb";
import { IoMdMore } from "react-icons/io";
import { FaRegClock, FaChevronDown, FaPlus } from "react-icons/fa6";

function CSPMHeader({ onOpenModal }) {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between">
                <div>
                    {/* <h5 className='text-black pl-5 font-semibold'></h5> */}
                </div>
                <div className='flex items-center gap-2 pr-2'>
                    <button
                        className="bg-white text-black font-bold py-2 px-4 rounded-md flex items-center gap-1"
                        onClick={onOpenModal} // Call the function to open modal
                    >
                        Add Widget <FaPlus />
                    </button>
                    <TbArrowForward className='h-[38px] w-[35px] bg-white rounded-md' />
                    <IoMdMore className='h-[38px] w-[35px] bg-white rounded-md' />

                    <div className="relative inline-block text-left">
                        <button
                            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md"
                            onClick={toggleDropdown}
                        >
                            <FaRegClock className="text-black mr-2" />
                            <div className="w-px h-6 bg-gray-400 mx-2"></div>
                            <span>Last 2 Days</span>
                            <FaChevronDown className={`ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                                <li className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                                    <FaRegClock className="text-black mr-2" />
                                    Last 2 Days
                                </li>
                                <li className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                                    Last 3 Days
                                </li>
                                <li className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                                    Last 6 Days
                                </li>
                                <li className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                                    Last 9 Days
                                </li>
                                <li className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100">
                                    Last 11 Days
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CSPMHeader;
