import { Image as ImageIcon } from 'lucide-react';
import Image, { ImageProps } from 'next/image';

// پراپ‌های عکس رو می‌گیریم، ولی src رو اختیاری می‌کنیم تا اگه undefined بود خطا نده
interface FallbackImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  placeholderText?: string;
  wrapperClassName?: string;
}

export default function FallbackImage({ 
  src, 
  alt, 
  placeholderText = 'تصویری موجود نیست', 
  wrapperClassName = '',
  className,
  ...props 
}: FallbackImageProps) {
  
  // اگر عکس وجود نداشت، حالت Placeholder رو رندر کن
  if (!src) {
    return (
      <div className={`bg-gray-50 flex flex-col items-center justify-center text-gray-300 ${wrapperClassName}`}>
        <ImageIcon className="w-10 h-10 mb-2" strokeWidth={1.5} />
        <span className="text-xs font-medium text-gray-400">{placeholderText}</span>
      </div>
    );
  }

  // اگر عکس وجود داشت، کامپوننت Image خود Next.js رو رندر کن
  return (
    <div className={`relative ${wrapperClassName}`}>
      <Image 
        src={src} 
        alt={alt} 
        className={`object-cover ${className || ''}`} 
        {...props} 
      />
    </div>
  );
}
