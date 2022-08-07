import request from "./request.js";

//cv
export const getItems = (data) => request({//获取后端关于classes的数据
    method:'get',
    url:'/items',
    params:data
});

//添加
export const addItems = (data) => request({
    method: 'post',
    url: `/items`,
    data,
});

//删除
export const delItems = (id) => request({
    method: 'delete',
    url: `/items/${id}`,
});

//编辑（更新数据
export const editItems = (id,data) => request({
    method: 'put',
    url: `/items/${id}`,
    data,
});

//编辑（id获取单个数据 回填
export const editItemsOne = (id) => request({
    method: 'get',
    url: `/items/${id}`,
});

