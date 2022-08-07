import request from "./request.js";

//cv
export const getClasses = (data) => request({//获取后端关于classes的数据
    method:'get',
    url:'/classes',
    params:data
});

//添加
export const addClasses = (data) => request({
    method: 'post',
    url: '/classes',
    data,
});

//删除
export const delClasses = (id) => request({
    method: 'delete',
    url: `/classes/${id}`,
});

//编辑（更新数据
export const editClasses = (id,data) => request({
    method: 'put',
    url: `/classes/${id}`,
    data,
});

//编辑（id获取单个数据
export const editClassesOne = (id) => request({
    method: 'get',
    url: `/classes/${id}`,
});

