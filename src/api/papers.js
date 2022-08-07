import request from "./request.js";

export const getPapers = (data) => request({
    method:'get',
    url:'/papers',
    params:data
});

export const addPapers = (data) => request({
    method:'post',
    url:'/papers',
    data
});

export const delPapers = (id) => request({
    method:'delete',
    url:`/papers/${id}`,
});

export const editPapers = (data,id) => request({
    method:'put',
    url:`/papers/${id}`,
    data
});

export const editPapersone = (id) => request({
    method:'get',
    url:`/papers/${id}`,
});