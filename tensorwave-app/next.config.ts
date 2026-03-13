import type { NextConfig } from "next"; 

const nextConfig: NextConfig = {
  /* config options here */
  //adds images from logo.dev
  images: { //configures the logos to outputt without being blocked
    remotePatterns: [ //allows images to be outtputted
      {//specifically allows logos from logo.dev to be outputted
        protocol: "https",
        hostname: "img.logo.dev",
      },
    ],
  }
};

export default nextConfig;
