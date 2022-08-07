import request from "./request.js";

//cv
export const getUsers = (data) => request({
    method:'get',
    url:'/users',
    params:data
});

//ajks请求方式，接口（替代了阿贾克斯）
export const login = (data) => request({
    method: 'post',//请求方式
    url: '/users/login',//后端地址
    data,//用来传数据
});

//添加
export const addUser = (data) => request({//调用addUser过data传数据
    method: 'post',//通过post
    url: '/users',
    data,//发送data数据(会自动转译成json)
});

//删除
export const delUser = (id) => request({
    method: 'delete',
    url: `/users/${id}`,
});

//编辑
export const editUser = (id,data) => request({
    method: 'put',
    url: `/users/${id}`,
    data,
});

//编辑
export const editForm = (id) => request({
    method: 'get',
    url: `/users/${id}`,
});


//权限
export const exist = (data) => request({
    method: 'get',
    url: '/users/exist',
    params: data
});

//权限
export const setGroups=(id,data)=>request({
    method:'put',
    url:`/users/group/${id}`,
    data,//接收一个数组
})

