import React, {memo} from 'react'

interface Props {
  slug: String;
}

const Comments:React.FC<Props> = ({slug}) => {
  return (
    <div>Comments</div>
  )
}

export default memo(Comments);