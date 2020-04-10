/* eslint-disable no-unused-vars */
// import axios from 'axios';
// import {CONST} from '../api/const';
// const url = CONST.SERVER_URL.concat('/users/')
import userApi from '@/api/user_api.js'

export default class userClass {
    constructor() {
        var username = null;
        var password = null;
    }
    get username() {
        return this._username;
    }
    set username(in_username) {
        this._username = in_username;
    }

    get password() {
        return this._password;
    }
    set password(in_password) {
        this._password = in_password;
    }
    
    //methods
    async login() {
        try {
            const req = await userApi.login(this.username, this.password);
            return req
        } catch(err) {
            return({"err": err})
        }
    }

    async register(userObj) {
        try {
            const req = await userApi.register(userObj);
            if(req.err) {
                return({"err": req.err})
            }
            return req
        } catch(err) {
            return({"err": err})
        }
    }

}