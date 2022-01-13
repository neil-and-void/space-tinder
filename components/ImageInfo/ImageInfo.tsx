import React from 'react';
import Image from 'next/image';

interface ImageInfoProps {
  image: APODImage;
}

const ImageInfo = ({ image }: ImageInfoProps) => {
  return (
    <div className="w-1/5 w-9/12">
      <div className="relative">
        <Image
          className="rounded-t-xl"
          src={image.url}
          alt={image.title}
          layout="responsive"
          height={100}
          width={150}
        />
      </div>
      <div className="h-full bg-white p-3 rounded-b-xl shadow-lg overflow-y-scroll">
        <div>{image.title}</div>
        <div>{image.date}</div>
        <div>
          You can also use variant modifiers to target media queries like
          responsive breakpoints, dark mode, prefers-reduced-motion, and more.
          For example, use md:w-full to apply the w-full utility at only medium
          screen sizes and above.You can also use variant modifiers to target
          media queries like responsive breakpoints, dark mode,
          prefers-reduced-motion, and more. For example, use md:w-full to apply
          the w-full utility at only medium screen sizes and above.You can also
          use variant modifiers to target media queries like responsive
          breakpoints, dark mode, prefers-reduced-motion, and more. For example,
          use md:w-full to apply the w-full utility at only medium screen sizes
          and above.You can also use variant modifiers to target media queries
          like responsive breakpoints, dark mode, prefers-reduced-motion, and
          more. For example, use md:w-full to apply the w-full utility at only
          medium screen sizes and above.You can also use variant modifiers to
          target media queries like responsive breakpoints, dark mode,
          prefers-reduced-motion, and more. For example, use md:w-full to apply
          the w-full utility at only medium screen sizes and above.You can also
          use variant modifiers to target media queries like responsive
          breakpoints, dark mode, prefers-reduced-motion, and more. For example,
          use md:w-full to apply the w-full utility at only medium screen sizes
          and above.You can also use variant modifiers to target media queries
          like responsive breakpoints, dark mode, prefers-reduced-motion, and
          more. For example, use md:w-full to apply the w-full utility at only
          medium screen sizes and above.You can also use variant modifiers to
          target media queries like responsive breakpoints, dark mode,
          prefers-reduced-motion, and more. For example, use md:w-full to apply
          the w-full utility at only medium screen sizes and above.You can also
          use variant modifiers to target media queries like responsive
          breakpoints, dark mode, prefers-reduced-motion, and more. For example,
          use md:w-full to apply the w-full utility at only medium screen sizes
          and above.You can also use variant modifiers to target media queries
          like responsive breakpoints, dark mode, prefers-reduced-motion, and
          more. For example, use md:w-full to apply the w-full utility at only
          medium screen sizes and above.You can also use variant modifiers to
          target media queries like responsive breakpoints, dark mode,
          prefers-reduced-motion, and more. For example, use md:w-full to apply
          the w-full utility at only medium screen sizes and above.You can also
          use variant modifiers to target media queries like responsive
          breakpoints, dark mode, prefers-reduced-motion, and more. For example,
          use md:w-full to apply the w-full utility at only medium screen sizes
          and above.
        </div>
      </div>
    </div>
  );
};

export default ImageInfo;
