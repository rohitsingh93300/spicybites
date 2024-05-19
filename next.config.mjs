import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images:{
       remotePatterns: [
        {
            protocol:'https',
            hostname: '*.googleusercontent.com',
    },
    {
        protocol: 'https',
        hostname: 'spicybites.s3.amazonaws.com',
    }
       ]
    }
};

export default nextConfig;
