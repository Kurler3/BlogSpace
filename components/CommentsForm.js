import React, {memo, useState, useEffect, useRef, LegacyRef, TextareaHTMLAttributes, DetailedHTMLProps, useCallback, createRef, RefObject} from 'react'

import { submitComment } from '../services';


const COMMENT_FORM_CREDENTIALS = "comment_form_credentials";


const CommentsForm = ({slug}) => {

  const [state, setState] = useState({
    error: false,
    localStorage: null,
    showSuccessMessage: false,
  });

  const commentElement = createRef();
  const nameElement = createRef(); 
  const emailElement = createRef();
  const storeDataElement = createRef();


  const handleCommentSubmittion = useCallback(() => {

    let comment = commentElement.current ? commentElement.current.value : null;
    let name = nameElement.current ? nameElement.current.value : null;
    let email = emailElement.current ? emailElement.current.value : null;
    let storeData = storeDataElement.current ? storeDataElement.current.checked : null;
    
    // SET ERROR
    if(!comment || !name || !email) {
      setState((prevState) => {
        return {
          ...prevState,
          error: true,
        }
      });
      return;
    }

    // CHECK IF USER WANTS TO ADD EMAIL + NAME TO LOCAL STORAGE
    if(storeData) {
      localStorage.setItem(COMMENT_FORM_CREDENTIALS, JSON.stringify({
        name,
        email,
      }));
    } else {
    
      // REMOVE
      localStorage.removeItem(COMMENT_FORM_CREDENTIALS);
    } 

    // CREATE NEW COMMENT OBJECT
    let commentObj = {
      name: name,
      email: email,
      comment: comment,
      slug: slug,
  };

    // UPLOAD TO GRAPH CMS
    submitComment(commentObj).then((res) => {
      console.log(res)

      // SHOW SUCCESS MESSAGE
      setState((prevState) => {
        return {
          ...prevState,
          showSuccessMessage: true,
        }
      });

      // HIDE SUCCESS MESSAGE
      setTimeout(() => {
        setState((prevState) => {
          return {
            ...prevState,
            showSuccessMessage: false,
          }
        });
      }, 3000);

    });

  }, []);



  useEffect(() => {

    let credentials = window.localStorage.getItem(COMMENT_FORM_CREDENTIALS) ? JSON.parse(window.localStorage.getItem(COMMENT_FORM_CREDENTIALS)) : "";

    nameElement.current.value = credentials.name;
    emailElement.current.value = credentials.email;

  }, []);

  return (
        <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Leave a reply</h3>

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
                ref={emailElement}
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