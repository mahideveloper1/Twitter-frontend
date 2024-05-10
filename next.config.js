/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "w7.pngwing.com"
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com"
            },
            {
                protocol: "https",
                hostname: "image-storage-puneet-app.s3.ap-south-1.amazonaws.com"
            }
        ]
    }
}

module.exports = nextConfig;
