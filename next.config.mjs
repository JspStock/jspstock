import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
export const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb'
    }
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        port: "",
        pathname: "/api/**"
      }
    ],
  },

  redirects: async () => [
    {
      destination: '/dashboard',
      source: '/',
      permanent: false
    },
    {
      destination: '/auth/signin',
      source: '/auth',
      permanent: false
    },
  ]
};

const withPWAConfig = withPWA({
  dest: 'public',
  sw: "/sw.js"
})

export default withPWAConfig(nextConfig);
