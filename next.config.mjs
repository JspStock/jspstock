/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dblroye9s/image/upload/**",
      },
    ],
  },

  redirects: async () => [
    {
      destination: '/dashboard',
      source: '/',
      permanent: true
    },
    {
      destination: '/auth/signin',
      source: '/auth',
      permanent: false
    }
  ]
};

export default nextConfig;
