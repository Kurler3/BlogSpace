import React from 'react';
import Link from 'next/link';

interface Props {
    post: {
      title: String;
      excerpt: String;
      author: {};
      createdAt: String;
      slug: String;
      featuredImage: {url:String};
      categories:[]
    }
}

const PostCard:React.FC<Props> = ({
    post,
}) => {
  console.log('Post: ', post);
  
  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
        <div className='relative overflow-hidden shadow-md pb-80 mb-6'>
            {/* IMAGE */}
            <img 
              src={`${post.featuredImage.url}`}
              alt={`${post.title}`}
              className="object-top absolute h-80 w-full object-fill shadow-lg rounded-t-lg lg:rounded-lg"
            />
            <h1 className='
              transition duration-700 text-center mb-8 cursor-pointer
              hover:text-pink-600 text-3xl font-semibold
            '
            >
              <Link href={`/post/${post.slug}`}>
                  {post.title}
              </Link>
            </h1>
        </div>
    </div>
  )
}

export default PostCard;