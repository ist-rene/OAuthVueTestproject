import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        access_token: null,
    },
    actions: {
        VERIFY_ACCESS() {
            if (localStorage.access_token) {
                state.access_token = localStorage.access_token;
            } else {
                //redirect
                window.location.href =
                    "http://auth-server:9000/oauth2/authorize?response_type=code&client_id=api-client&scope=openid&redirect_uri=http://127.0.0.1:8081/grant"
            }
        },
        async ACQUIRE_TOKEN({commit}, payload) {
            const form = new FormData()
            form.append('client_id', 'api-client')
            form.append('grant_type', 'authorization_code')
            form.append('redirect_uri', 'http://127.0.0.1:8081/grant')
            form.append('code', payload.code)
            const result = await axios({
                method: 'POST',
                url: '/oauth2/token',
                data: form,
                headers: {
                    'Authorization': 'Basic ' + btoa('api-client:secret')
                }
            })
            localStorage.setItem("access_token", result.data.access_token)
            localStorage.setItem("expires_in", result.data.expires_in)
            localStorage.setItem("refresh_token", result.data.refresh_token)

            return commit('ACCESS_TOKEN_EXTRACTED', result.data)
        },
        async SEND_ACCESS_TOKEN_TO_RESOURCE_SERVER({commit}) {
            const resource = await axios.get("http://127.0.0.1:8081/rest/resource",
                {headers: {'Authorization': 'Bearer ' + localStorage.access_token}})

            localStorage.setItem("resourceContent", resource.data)
        },
        async SEND_REFRESH_TOKEN({commit}, payload) {
            const formRefreshToken = new FormData()
            formRefreshToken.append('client_id', 'api-client')
            formRefreshToken.append('grant_type', 'refresh_token')
            formRefreshToken.append('refresh_token', localStorage.refresh_token)
            const result = await Vue.prototype.$http({
                method: 'POST',
                url: '/oauth2/token',
                data: formRefreshToken,
                headers: {
                    'Authorization': 'Basic ' + btoa('api-client:secret')
                }
            })
            localStorage.setItem("access_token", result.data.access_token)
            localStorage.setItem("expires_in", result.data.expires_in)
            localStorage.setItem("refresh_token", result.data.refresh_token)

            return commit('ACCESS_TOKEN_UPDATED', result.data)
        },
        LOGOUT({commit}) {
            localStorage.clear()
            return commit('LOGGED_OUT')
        }

    },
    mutations: {
        ACCESS_TOKEN_EXTRACTED(state) {
            state.access_token = localStorage.access_token;
        },
        ACCESS_TOKEN_UPDATED(state) {
            state.access_token = localStorage.access_token;
        },
        LOGGED_OUT(state) {
            state.access_token = null
            window.location.href =
                "http://localhost:8081"
        }
    }
})
