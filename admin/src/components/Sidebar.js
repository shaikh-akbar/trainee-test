import React, { useState } from 'react';
import { FaTachometerAlt, FaBars, FaTimes } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { PiStudentDuotone } from 'react-icons/pi';
import { MdClass } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='flex h-screen'>
            <div className={`bg-[#7985a4] h-full fixed z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform lg:translate-x-0 lg:relative`}>
                <div className='px-6 py-4'>
                    <div className='flex items-center justify-between border-b border-[#EDEDED]/[0.3] pb-4'>
                        <h1 className='text-white font-extrabold text-lg cursor-pointer'>Admin</h1>
                        <button onClick={toggleSidebar} className='lg:hidden'>
                            <FaTimes color='black' />
                        </button>
                    </div>
                    <div>
                        <Link to='/' className='flex items-center gap-4 py-4 border-b border-[#EDEDED]/[0.3]'>
                            <FaTachometerAlt color='white' />
                            <p className='text-white text-sm font-bold'>Dashboard</p>
                        </Link>
                    </div>
                    <div className='pt-4 border-b border-[#EDEDED]/[0.3]'>
                        <p className='text-xs font-extrabold text-white/[0.4]'>INTERFACE</p>
                        <div className='flex items-center py-4 cursor-pointer'>
                            <Link to='/dashboard/main' className='flex items-center gap-4'>
                                <GiTeacher color='white' />
                                <p className='text-sm font-normal text-white'>CSPM Dashboard</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-1 lg:hidden'>
                <button onClick={toggleSidebar} className='p-4'>
                    <FaBars color='black' />
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
