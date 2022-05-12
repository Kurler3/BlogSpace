import React, {memo} from 'react'
import { Author } from '../common/types';

interface Props {
  author: Author;
}

const Author:React.FC<Props> = ({author}) => {
  return (
    <div>Author</div>
  )
}

export default memo(Author);