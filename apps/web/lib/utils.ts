import { usePathname } from "next/navigation";

export const isActive =(url:string)=>{
    const pathname = usePathname();
     const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };
}