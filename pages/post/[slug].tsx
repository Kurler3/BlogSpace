import {memo} from 'react';
import {getPosts, getPostDetails} from '../../services';
import {PostDetail, Categories, PostWidget, Author, CommentsForm, Comments} from '../../components';


const PostDetails = () => {
  return (
    <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT SIDE */}
            <div className="col-span-1 lg:col-span-8">
                <PostDetail />
                <Author />
                <CommentsForm />
                <Comments />
            </div>
            {/* RIGHT SIDE */}
            <div className="col-span-1 lg:col-span-4">
                <div className="relative lg:sticky top-8">
                    <PostWidget
                        categories={null}
                        slug={null}
                    />
                    <Categories />
                </div>
            </div>
        </div>
    </div>
  )
}

export default memo(PostDetails);


