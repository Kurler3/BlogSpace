import React, {memo} from 'react'
import { Post } from '../common/types';
import moment from 'moment';
import Image from 'next/image';
import Link from "next/link";

interface Props {
    post: Post;
}


const FeaturedPostCard:React.FC<Props> = ({post}) => {



  return (
        <Link href={`/post/${post.slug}`}>
            <div className='relative py-8 text-white text-center flex flex-col align-center justify-start m-7 h-60 bg-opacity-60 bg-black font-semibold cursor-pointer hover:shadow-lg hover:-translate-y-1 transition overflow-hidden rounded-lg'>

                {/* IMG BACKGROUND */}
                <div className="absolute w-full h-full left-0 top-0 -z-10 flex justify-center align-center">
                    <Image 
                        unoptimized
                        src={`${post.featuredImage.url}`}
                        alt={`${post.title}`}
                        layout="fill"
                        className="object-cover min-w-full min-h-full"
                    />
                </div>

                {/* CREATED AT */}
                <p className='text-gray-300'>{moment(post.createdAt).format("MMM DD, YYYY")}</p>
                {/* TITLE */}
                <h3 className='mt-4 font-bold px-4 text-lg flex-1'>{post.title}</h3>
                {/* AUTHOR PHOTO AND NAME */}
                <div className="flex flex-row object-bottom  px-2 items-center">
                    
                    <Image
                        loader={() => `${post.author.photo.url}`}
                        src={`${post.author.photo.url}`}
                        height="65px"
                        width="65px"
                        className='rounded-full'
                    />

                    {/* AUTHOR NAME */}
                    <p className='ml-4 font-normal'>{post.author.name}</p>
                </div>
            </div>
        </Link>
  );
}

export default memo(FeaturedPostCard);