import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    reactStrictMode: true,
    experimental: {
        appDir: true,   // обязательно для App Router
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images:{
        domains: ['places.googleapi.com', 'images.unsplash.com', 'example.com', 'lh3.googleusercontent.com']
    }
};

export default nextConfig;
