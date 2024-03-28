/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default nextConfig;
