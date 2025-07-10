/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/api/portraits/**',
      },

      {

        protocol: 'https',
        hostname: 'ih1.redbubble.net',
        port: '',
        pathname: '/**'

      },

      {

        protocol: 'https',
        hostname: 'www.goldsgym.co.id',
        port: '',
        pathname: '/**'

      },
      {

        protocol: 'https',
        hostname: 'i1.sndcdn.com',
        port: '',
        pathname: '/**'

      },
      {

        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '/**'

      },
      {

        protocol: 'https',
        hostname: 'id-live-01.slatic.net',
        port: '',
        pathname: '/**'

      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        port: '',
        pathname: '/api/portraits/**',
      },



    ],
  },
};

export default nextConfig;