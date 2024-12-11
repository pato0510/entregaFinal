
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Otras configuraciones que puedas tener
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
};

export default nextConfig;
