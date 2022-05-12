import React, {memo} from 'react'

interface Props {
  slug: String;
}

const CommentsForm:React.FC<Props> = ({slug}) => {
  return (
    <div>CommentsForm</div>
  )
}

export default memo(CommentsForm);