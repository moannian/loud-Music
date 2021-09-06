const devBaseURL = 'http://123.207.32.32:9001';
const proBaseURL = 'http://123.207.32.32:9001'

// 判断是否为开发环境
export const Base_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;

export const timeOUT = 50000