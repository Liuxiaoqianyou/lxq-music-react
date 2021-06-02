// 开发环境的URL
const devBaseURL = "http://123.207.32.32:9001";
// 开发环境的URL
const proBaseURL = "https://production.org";

// 判断当前环境是开发环境还是生产环境
export const BASE_URL = process.env.NODE_ENV === "development" ? devBaseURL: proBaseURL;
export const TIMEOUT = 5000;