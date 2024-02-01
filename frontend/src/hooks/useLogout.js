import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    
    const logout = () => {
        //removing user from local storage
        localStorage.removeItem('user')

        //change golabl state
        dispatch({type: 'LOGOUT'})
    }

    return { logout }
}