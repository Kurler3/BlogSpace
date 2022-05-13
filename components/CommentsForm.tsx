import React, {memo, useState, useEffect, useRef, LegacyRef, TextareaHTMLAttributes, DetailedHTMLProps, useCallback} from 'react'

interface Props {
  slug: String;
}

const CommentsForm:React.FC<Props> = ({slug}) => {

  const [state, setState] = useState({
    error: false,
    localStorage: null,
    showSuccessMessage: false,
  });

  const commentElement = useRef();
  const nameElement = useRef<React.LegacyRef<HTMLTextAreaElement>>(); 
  const emailElement = useRef<React.LegacyRef<HTMLTextAreaElement>>();
  const storeDataElement = useRef<React.LegacyRef<HTMLTextAreaElement>>();


  const handleCommentSubmittion = useCallback(() => {

    // SET ERROR
    if(!commentElement.current!.value || !nameElement.current.value || !emailElement.current.value) {
      setState((prevState) => {
        return {
          ...prevState,
          error: true,
        }
      });
      return;
    }

    // CREATE NEW COMMENT OBJECT
    let commentObj = {
        name: nameElement.current.value,
        email: emailElement.current.value,
        comment: commentElement.current.value,
        slug: slug,
    };


    // CHECK IF USER WANTS TO ADD EMAIL + NAME TO LOCAL STORAGE


    // UPLOAD TO GRAPH CMS


  }, []);

  return (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Comments Form</h3>

            <div className='grid grid-cols-1 gap-4 mb-4'>
              <textarea ref={commentElement} className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                placeholder='Comment'
                name="Comment"
              />
              
            </div>
            <div className='grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2'>
              <input 
                type="text"
                ref={nameElement}
                placeholder="Name"
                name="Name"
                className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
              />
              <input 
                type="email"
                ref={nameElement}
                placeholder="Email"
                name="Email"
                className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
              />
            </div>
            
            <div className='mb-4'>
              <React.Fragment>
                <input ref={storeDataElement} type="checkbox" id="storeData" name="storeData" value="true"/>
                <label
                  className='text-gray-500 cursor-pointer ml-4' htmlFor='storeData'
                >Save my e-mail and name for the next time I comment</label>
              </React.Fragment>
            </div>

            {/* ERROR */}
            {
              !!state.error &&  
              <p
                className='text-xs text-red-500'
              >
                All field are required.
              </p>
            }
            
            <div className="nt-8">
              <button type='button' onClick={handleCommentSubmittion}
                className="transition duration-200 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
              >
                Post Comment
              </button>
              {/* SUCCESS MESSAGE */}
              {
                !!state.showSuccessMessage &&
                <span className='text-xl float-right font-semibold mt-3 text-green-500'>
                  Comment submitted for review!
                </span>
              }
            </div>
        </div>
  )
}

export default memo(CommentsForm);