import React from 'react';
import { RiArrowGoBackFill } from 'react-icons/ri';
import Link from 'next/link';

const Navbar = (props) => {
  return (
    <div>
        <div>
            <Link href="/" className='bg-primary text-myPurple flex items-center p-4'>
                <RiArrowGoBackFill className='h-6 w-6 mr-2' /> 
                Go back to website
            </Link>
        </div>
        {props.renderDefault(props)}
    </div>
  )
}

export default Navbar;