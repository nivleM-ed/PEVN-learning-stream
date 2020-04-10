/* eslint-disable no-async-promise-executor*/
import axios from 'axios';
import {CONST} from './const';
const url = CONST.SERVER_URL.concat('/users/')

class userApi {
    static login(username, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const req = await axios.post(`${url}login`, {
                    username,
                    password
                }, {
                    withCredentials: true
                })
                resolve(req.data)
            } catch (err) {
                reject(err)
            }
        })
    }

    static register(userObj) {
        return new Promise(async (resolve, reject) => {
            try {
                const req = await axios.post(`${url}register`, {
                    userObj
                }, {
                    withCredentials: true
                })
                resolve(req.data)
            } catch (err) {
                reject(err)
            }
        })
    }

}

export default userApi;