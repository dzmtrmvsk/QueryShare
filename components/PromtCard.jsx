'use client'

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { set } from "mongoose";

const PromtCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  const {data:session} = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied,setCopied] = useState('');

  const { creator } = post;

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {setCopied('')},3000)
  }

  return (
    creator && (
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image  
              src={creator.image}
              alt='User image'
              width={40}
              height={40}
              className="rounded-full object-contain" 
            />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold font text-gray-900">
                {post.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            </div>
          </div>
          <div className="copy_btn" onClick={() => {}}>
            <Image 
            src={copied == post.prompt ?
             '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
             width={12}
             height={12}
             onClick={handleCopy} />
          </div>
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-700">
          {post.prompt}
        </p>
        <p className="font-inter text-sm blue_gradient cursor-pointer"
           onClick={() => handleTagClick && handleTagClick(post.tag)}>
          {post.tag}
        </p>
        {session?.user.id === post.creator._id && pathName === '/profile' && (
          <div className="mt-4 flex-center gap-4 border-t  border-gray-100 pt-3">
            <p className="font-inter font-sm green_gradient cursor-pointer"
               onClick={handleEdit}>
              Edit
            </p>
            <p className="font-inter font-sm orange_gradient cursor-pointer"
               onClick={handleDelete}>
              Delete
            </p>
          </div>
        )}
      </div>
    )
  );
}

export default PromtCard;
