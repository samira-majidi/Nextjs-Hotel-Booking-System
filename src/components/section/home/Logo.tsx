import Image from "next/image";
import Link from "next/link";
export default function Logo (){
return(
  <Link href= "/" className="flex items-center">
   <Image src={"/logo.png"} 
   alt={"Hotel Logo"}
     width={150}
     height={50}
      priority 
     className="w-38 sm:w-38 md:w-40 lg:w-50 h-auto transition-all duration-300 object-contain"/>
  </Link>
)
}