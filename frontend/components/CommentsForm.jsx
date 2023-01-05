import React, { useState, useEffect, useRef } from "react";
import { submitComment } from "../service";

const CommentsForm = ({slug}) => {
  const [errorr, setErro] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(()=>{
    nameEl.current.value=window.localStorage.getItem('name');
    emailEl.current.value=window.localStorage.getItem('email')
  },[])

  const handleCommitSubmission = () => {
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;
    setErro(false);
    console.log(name)
    console.log(email)
    console.log(comment)
    if (!comment || !name || !email) {
      setErro(true);
      return;
    }
    const commentObj = {
      name,
      comment,
      email,
      slug,
    };

    if(storeData){
      window.localStorage.setItem('name', name)
      window.localStorage.setItem('email', email)
    }else{
      window.localStorage.remove('name', name)
      window.localStorage.remove('email', email)
    }
submitComment(commentObj).then(res=>{
  setShowSuccessMessage(true);
  setTimeout(()=>{
    setShowSuccessMessage(false);

  }, 3000)
})

  };

  return (
    <div className=" bg-white shadow-lg p-8 pb-12 mb-8">
      <h3 className=" text-xl mb-8 font-semibold border-b pb-4">Leave a reply</h3>
      <div className=" grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 w-full rounded-lg outline-none focus:right-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className=" grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
        <input
          type="text"
          ref={nameEl}
          placeholder="Name"
          name="name"
          className=" py-2 px-4 w-full rounded-lg outline-none focus:right-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />

        <input
          type="email"
          ref={emailEl}
          placeholder="Email"
          name="email"
          className=" py-2 px-4 w-full rounded-lg outline-none focus:right-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
        />
      </div>
      <div className=" grid grid-cols-1 gap-4 mb-4">
        <div className="">
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label className=" text-gray-500 cursor-pointer ml-2" htmlFor="storeData">Save contact info</label>
        </div>
      </div>
      {errorr && (
        <p className=" text-xs text-red-500">All fields are required</p>
      )}
      <div className="mt-8">
        <button
          className=" transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full px-8 py-3 cursor-pointer text-white"
          type="button"
          onClick={handleCommitSubmission}
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="mt-3 text-xl float-right font-semibold text-green-500">
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
