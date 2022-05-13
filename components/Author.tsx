import React, {memo} from 'react'
import { Author } from '../common/types';
import Image from 'next/image';

interface Props {
  author: Author;
}

const Author:React.FC<Props> = ({author}) => {
  return (
    <div className='text-center mt-28 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20'>
      <div className="absolute left-0 right-0 -top-24">
        <Image
            src={`${author.photo.url}`}
            unoptimized
            alt={`${author.name}`}
            height="150px"
            width="100px"
            className='rounded-full align-middle'
        />
      </div>
      <h3 className='text-white my-4 text-xl font-bold'>
        {author.name}
      </h3>
      <p className='text-white text-lg'>
        {author.bio}
      </p>
    </div>
  )
}

export default memo(Author);