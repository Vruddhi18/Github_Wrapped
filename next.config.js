/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        hostname: '*.githubusercontent.com'
      }
    ]
  }
}

export default nextConfig
