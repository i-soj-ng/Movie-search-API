const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  console.log("proxy");
  app.use(
      createProxyMiddleware( '/api', {
          target: 'https://yts.mx/api',
          changeOrigin: true,
          // 하단 처리는 필수로 해주어야 한다. 아래의 내용이 없으면 url 경로에
          // api가 추가되어 경로를 찾을 수 없어진다.
          pathRewrite:{
            '^/api/':'/'
          }
      }),
      createProxyMiddleware('/yts', {
        target: 'https://movie-app-20203117.herokuapp.com/',
        changeOrigin: true,
//        pathRewrite:{ '^/yts/':'/' },
        followRedirects: true
      }),
      createProxyMiddleware('/img-yts', {
        target: 'https://movie-app-20203117.herokuapp.com/',
        changeOrigin: true,
//        pathRewrite:{ '^/img-yts/':'/' }
      })
  )
};
