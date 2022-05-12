import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Post } from '../common/types';

// COMPONENTS
import { PostCard, PostWidget, Categories } from '../components';

// GRAPHQL FUNCTIONS
import { getPosts } from '../services';


interface Props {
  posts: {
    node: Post
  }[]
}

const Home: NextPage<Props> = ({
  posts
}) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      {/* TITLE AND ICON */}
      <Head>
        <title>BlogSpace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* POSTS */}
        <div className="lg:col-span-8 col-span-1">
          {
            posts.map((post, index) => (
              <PostCard 
                key={`${post.node.title}_${index}`}
                post={post.node}
              />
            ))
          }
        </div>
        {/* FEATURES */}
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
                {/* POSTS WIDGET */}
                <PostWidget 
                  categories={null}
                  slug={null}
                />
          </div>
          <div className="lg:sticky relative top-8">
                <Categories />
          </div>
        </div>
      </div>

    </div>
  )
}

export async function getStaticProps() {
    const posts = (await getPosts() || []);
    
    return {
      props: {
        posts
      }
    }
}


export default Home;


