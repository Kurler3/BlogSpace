import React, {useState, useEffect} from 'react';
import Link from 'next/link';

// GRAPHQL FUNCTION
import { getCategories } from '../services';
import { Category } from '../common/types';

const Categories = () => {

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {

    getCategories().then((res) => setCategories(res));

  }, []);

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8'> 
        <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
          Categories
        </h3>

        {
          categories.map((category) => (
            <Link key={`${category.slug}`} href={`/category/${category.slug}`}>
                <span className='cursor-pointer block pb-3 mb-3 hover:text-blue'>
                    {category.name}
                </span>
            </Link>
          ))
        }
    </div>
  )
}

export default Categories