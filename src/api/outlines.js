import request from "./request.js";

//cv
export const getOutlines = (data) => request({//获取后端关于classes的数据
    method:'get',
    url:'/outlines',
    params:data
});

//添加
export const addOutlines = (data) => request({
    method: 'post',
    url: `/outlines`,
    data,
});

//删除
export const delOutlines = (id) => request({
    method: 'delete',
    url: `/outlines/${id}`,
});

//编辑（更新数据
export const editOutlines = (id,data) => request({
    method: 'put',
    url: `/outlines/${id}`,
    data,
});

//编辑（id获取单个数据 回填
export const editOutlinesOne = (id) => request({
    method: 'get',
    url: `/outlines/${id}`,
});

