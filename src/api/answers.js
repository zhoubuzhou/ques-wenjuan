import request from "./request.js";

export const getAnswers = (data) => request({
    method:'get',
    url:'/answers',
    params:data
});

export const addAnswers = (data) => request({
    method:'post',
    url:'/answers',
    data
});

export const editAnswersOne = (id) => request({
    method:'get',
    url:`/answers/${id}`,
});

export const delAnswers = (id) => request({
    method:'delete',
    url:`/answers/${id}`,
});
