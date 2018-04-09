
// 模拟异步请求
export const getUser = (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = params;
      resolve(res);
    }, 1000)
  })
}
