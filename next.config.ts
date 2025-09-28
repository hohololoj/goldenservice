import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: false,
	allowedDevOrigins: ['192.168.0.102', '192.168.0.105'],
	eslint: {
		ignoreDuringBuilds: true,
	  },
};

export default nextConfig;
