/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
module.exports = {
  env: {
    SERVIDOR: process.env.SERVIDOR,
    SERVIDOR2: process.env.SERVIDOR2,
    PORT: process.env.PORT,
  },
  nextConfig
};
