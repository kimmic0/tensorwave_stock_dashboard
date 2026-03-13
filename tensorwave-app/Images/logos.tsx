"use client"; // component should run in browser since useState is used
import Image from "next/image"; // best performance for images
import { useState } from "react"; //for handling api limit for logo.dev

// logo components 
type Props = {
    domain: string;  //used to get the logo from logo.dev
    company: string; //outputs company for the card in home page
    labelCo?: boolean; //to determine when to output company name
};

//bonus: outputting logos on main page and company page
export default function Logo({ domain, company, labelCo = true }: Props) {
    const [noImage, setNoImage] = useState(false); //dictates how component should react if no logo
    
    return (//styling purposes for logo and how to handle api limit
        <div className="flex flex-col items-center justify-center gap-2"> 
        {!noImage && (<Image src={`https://img.logo.dev/${domain}?size=64&token=${process.env.NEXT_PUBLIC_LOGO_API_KEY}`}
            alt={`${company} logo`}
            width={32}
            height={32}
            onError={() => setNoImage(true)}//if api limit is reached, don't output image
            />
        )}
        {labelCo && <span className = "text-center ">{company}</span>} 
        </div>//label company will not output for the company page it is just for the home page
    );
}