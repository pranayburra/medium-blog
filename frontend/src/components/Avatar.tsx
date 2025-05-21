import React from 'react';

interface AvatarProps {
  name: string;
  onClick?: () => void;
}

const Avatar = ({ name, onClick }: AvatarProps) => {
  return (
    <div 
      onClick={onClick} 
      className="relative cursor-pointer inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:bg-gray-200 transition-colors"
    >
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
};

export default Avatar;