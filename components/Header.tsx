import React, {useContext} from 'react';

import Link from 'next/link';

// DEMO CATEGORIES
const categories = [
    {
        name: 'React',
        slug: 'react',
    },
    {
        name: 'Web Development',
        slug: 'web-dev',
    },
]

const Header:React.FC = () => {
  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='border-b w-full inline-block border-blue-400 py-8'>
            {/* WEBSITE TITLE */}
            <div className="md:float-left block">
                <Link href="/">
                    <span className='cursor-pointer font-bold text-4xl text-white'>
                        BlogSpace
                    </span>
                </Link>
            </div>

            {/* NAV BUTTONS */}
            <div className='hidden md:float-left md:contents'>
                {
                    categories.map((category, index) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>  
                            <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                                {category.name}
                            </span>
                        </Link>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Header