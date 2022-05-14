import {memo, useEffect, useMemo, useState} from 'react';
import Carousel from 'react-multi-carousel';
import { Post } from '../common/types';
import { getFeaturedPosts } from '../services';
import { FeaturedPostCard } from '../components';


const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1
    }
};

// CUSTOM LEFT ARROW
const CustomLeftArrow = (
    <div className='absolute arrow-btn left-0 text-center py-8 cursor-pointer bg-pink-600 rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    </div>
);

// CUSTOM RIGHT ARROW
const CustomRightArrow = (
    <div className='absolute arrow-btn right-0 text-center py-8 cursor-pointer bg-pink-600 rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    </div>
);


// LOADING CAROUSEL ITEMS
const LoadingCarouselItems = () => {

    return <div>Loading...</div>;
}

// CAROUSEL
const FeaturedPosts:React.FC = () => {

    const [state, setState] = useState<{featuredPosts: Post[], dataLoaded: boolean}>({
        featuredPosts: [],
        dataLoaded: false,
    });

    useEffect(() => {
        // FETCH FEATURED POSTS
        getFeaturedPosts().then((res) => {
            console.log('FeaturedPosts: ', res);
            setState((prevState) => {
                return {
                    ...prevState,
                    featuredPosts: res,
                    dataLoaded: true,
                }
            })
        })
    }, []);

    return (
        <div className="mb-8 sm:hidden ">
            <Carousel 
                responsive={responsive}
                infinite
                ssr
                // autoPlay
                autoPlaySpeed={5000}
                keyBoardControl
                customLeftArrow={CustomLeftArrow}
                customRightArrow={CustomRightArrow}
                // ONLY SHOW ARROWS WHEN DATA IS FINISHED LOADING
                arrows={!!state.dataLoaded}
            >
               { 
                    !state.dataLoaded ? 
                    <LoadingCarouselItems/>
                    :
                    state.featuredPosts.map((featuredPost, index) => (
                        <FeaturedPostCard 
                            key={`featured_carousel_post_${featuredPost.title}_${index}`}
                            post={featuredPost}
                        />
                    ))
                }
            </Carousel>
        </div>
    );
}

export default memo(FeaturedPosts);