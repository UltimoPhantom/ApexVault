import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios';

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        let data = JSON.stringify({
            "email": email,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5555/user/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                localStorage.setItem('user', JSON.stringify(response.data));

                // Updating auth context
                dispatch({ type: 'LOGIN', payload: response.data });
            })
            .catch((error) => {
                setError(error.response.data.error)
            });
        setIsLoading(false)

    }

    return { login, isLoading, error }
}