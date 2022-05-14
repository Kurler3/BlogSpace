import { memo } from 'react';
import { getPosts, getPostDetails } from '../../services';
import { PostDetail, Categories, PostWidget, Author, CommentsForm, Comments, Loader } from '../../components';
import { NextGetStaticPropsCtx, Post } from '../../common/types';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

interface Props {
    post: Post;
}


const PostDetails: NextPage<Props> = ({ post }) => {

    const router = useRouter();

    // IF FETCHING DATA (THIS ONE WASN'T IN THE STATIC PATHS)
    if (router.isFallback) {
        return <Loader />
    }
    else {

        return (
            <div className="container mx-auto px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* LEFT SIDE */}
                    <div className="col-span-1 lg:col-span-8">
                        <PostDetail post={post} />
                        <Author author={post.author} />
                        <CommentsForm slug={post.slug} />
                        <Comments slug={post.slug} />
                    </div>
                    {/* RIGHT SIDE */}
                    <div className="col-span-1 lg:col-span-4">
                        <div className="relative lg:sticky top-8">
                            <PostWidget
                                categories={post.categories.map((category) => category.slug)}
                                slug={post.slug}
                            />
                            <Categories />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// PARAMS WILL GET THE SLUG (ON THE URL)
export async function getStaticProps(context: NextGetStaticPropsCtx) {
    const data = (await getPostDetails(context.params!.slug));

    return {
        props: { post: data[0] },
    };
}

export async function getStaticPaths() {

    const posts = await getPosts();


    return {
        paths: posts.map(({ node: { slug } }: { node: { slug: String } }) =>
            ({ params: { slug } })
        ),
        fallback: true
    }
}


export default memo(PostDetails);


