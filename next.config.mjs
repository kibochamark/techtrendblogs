/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'gravatar.com',
            },
            {
                hostname: 'res.cloudinary.com',
            }
        ],
    },
};

export default nextConfig;
