import axios from 'axios';
import {message} from 'antd';

const service = axios.create({
  baseURL:'http://rap2api.taobao.org/app/mock/268434',
  timeout:5000
});

service.interceptors.request.use((config) => {
  config.data = Object.assign({},config.data,{
    // authToken:window.localStorage.getItem('authToken')
    authToken:'iuwhvfoiqjp'
  })
  return config;
});

service.interceptors.response.use((resp) => {
  if(resp.data.code === 200){
    return resp.data.data;
  }else{
    //处理错误
    //console.log('出错了')
    message.error(resp.data.data.errMsg);
  }
})

//获取文章列表
export const getArticles = () => {
  return service.post('/api/v1/articleList');
}

//通过id删除文章
export const deleteArticleById = (id) => {
  return service.post(`/api/v1/articleDelete/${id}`);
}

//通过id获取文章详细信息
export const getArticleById = (id) => {
  return service.post(`/api/v1/article/${id}`);
}

//保存文章
export const saveArticle = (id,data) => {
  return service.post(`/api/v1/articleEdit/${id}`,data);
}

//图表信息，获取文章阅读量
export const getArticleAmount = () => {
  return service.post(`/api/v1/articleAmount`);
}

//表盘信息，获取网站新增数据
export const getMainAmount = () => {
  return service.post(`/api/v1/mainAmount`);
}


