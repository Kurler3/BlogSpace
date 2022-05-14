/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    GRAPHCMS_TOKEN: process.env.GRAPHCMS_TOKEN,
  }
}
