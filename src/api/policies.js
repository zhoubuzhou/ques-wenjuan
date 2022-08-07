import request from "./request.js";

export const getPolicies = () => request({
    method: 'get',
    url: '/policies/groups',
})