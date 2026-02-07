import type { NextConfig } from "next";
const withMDX = require('@next/mdx')()


const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
};

module.exports = withMDX(nextConfig) 
