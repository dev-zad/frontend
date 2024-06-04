/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "1337",
                pathname: "/uploads/**/*",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
            },
            {
                protocol: "https",
                hostname: "abundant-book-1882e0841b.media.strapiapp.com",
            }
        ],
    },
};

export default nextConfig;