import React, {useEffect, useState} from 'react';
import moment from 'moment';
import Link from 'next/link';
import { Category, Post } from '../common/types';
import { getRecentPosts, getRelatedPosts } from '../services';


// PROPS INTERFACE
interface Props {
  categories: String[] | null;
  slug: String | null;
}


// IF IN SPECIFIC POST PAGE, THEN FETCH RELATED POSTS.
// IF IN HOMEPAGE THEN FETCH MOST RECENT POSTS

const PostWidget:React.FC<Props> = ({categories, slug}) => {

  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  // MAKE API CALL
  useEffect(() => {
    // CHECK THE SLUG.
    if(slug) {
      // GET RELATED POSTS
      getRelatedPosts(categories!, slug).then(
        (res:Post[]) =>  setRelatedPosts(() => res)
      );
    }
    else {
      getRecentPosts().then((res) => setRelatedPosts(() => res));
    }
    
  }, []);

  console.log('PostsWidget: ', relatedPosts);
  

  return (
    <div className='bg-white shadow-lg rounded-lg p-7 mb-8'>
      {/* TITLE */}
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        {`${slug ? "Related" : "Recent"} posts`}
      </h3>

      {/* THE POSTS :)) */}
      {
        relatedPosts.length > 0 && relatedPosts.map((post) => (
          <div key={`post_widget_${post.title}`} className="flex items-center w-full mb-4">
            {/* FEATURED IMG */}
            <div className='w-16 flex-none'>
              <img
                alt={`${post.title}`}
                height="60px"
                width="60px"
                className='align-middle rounded-full'
                src={`${post.featuredImage.url}`}
              />
            </div>

           <div className='flex-grow ml-4'>
              <p className="text-gray-500 text-xs">
                {moment(post.createdAt).format('MMM DD, YYYY')}
              </p>
           </div>


          </div>
        ))
      }

    </div>
  )
}



export default PostWidget;