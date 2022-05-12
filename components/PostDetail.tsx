import React, {memo} from 'react';
import {Post} from '../common/types';

 interface Props {
   post: Post;
 }

const PostDetail:React.FC<Props> = ({post}) => {
  return (
    <h1>PostDetail</h1>
  );
}

export default memo(PostDetail);