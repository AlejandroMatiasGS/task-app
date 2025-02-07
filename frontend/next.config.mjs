/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,  
    env: {
        NEXT_PUBLIC_SECRET_KEY: process.env.SECRET_KEY,
        NEXT_PUBLIC_API_URL: process.env.API_URL,
    },
};

export default nextConfig;