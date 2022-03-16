export const getters = {
    isAuthenticated(state){
        return state.auth.loggedIn
    },

    loggedInUser(state){
        return state.auth.user
    }
}

/** função/se o usuario ta logado ou n
 * 
 * pegar o usuario
*/