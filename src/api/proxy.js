import { createProxyMiddleware } from 'http-proxy-middleware';

export default function handler(req, res) {
  const proxy = createProxyMiddleware({
    target: 'https://uj58p9e8la.execute-api.us-east-2.amazonaws.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/dev/consultancy/search',
    },
  });
  return proxy(req, res);
}