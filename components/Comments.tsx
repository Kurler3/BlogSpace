import React, {memo, useEffect, useState} from 'react';
import moment from 'moment';
import parse from 'html-react-parser'; 
import { getComments } from '../services';
import { Comment } from '../common/types';

interface Props {
  slug: String;
}

const Comments:React.FC<Props> = ({slug}) => {

  const [state, setState] = useState<Comment[]>([]);

  useEffect(() => {
    // GET THE COMMENTS
    getComments(slug).then((res) => setState(res));
  }, []);
  
  return (
    <>
      {
        state.length > 0 &&
        (
          <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
              {`${state.length} Comments`}
            </h3>

            {/* MAP COMMENTS */}

            {
              state.map((comment) => (
                <div key={`comment_${slug}_${comment.createdAt}_${comment.email}`}
                  className="border-b border-gray-100 mb-4 pb-4"
                >
                  <p className='mb-4'>
                      <span className='font-semibold'>{comment.name}</span>
                      
                      {` on ${moment(comment.createdAt).format('MMM DD, YYYY')}`}
                  </p>

                  <p className='whitespace-pre-line text-gray-600 w-full'>
                      {parse(comment.comment)}
                  </p>
                </div>
              ))
            }

          </div>
        )
      }
    </>
  )
}

export default memo(Comments);