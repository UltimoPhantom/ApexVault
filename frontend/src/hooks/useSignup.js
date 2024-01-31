import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios';

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    // const signup = async (email, password) => {
    //     setIsLoading(true)
    //     setError(null)
    //     console.log("Sending: ", email, password)

    //     const response = await fetch('http://localhost:5555/signup', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ email, password })
    //     })
    //     console.log("Res Res: ", response)
    //     const json = await response.json()

    //     if (!response.ok) {
    //         setIsLoading(false)
    //         setError(json.error)
    //     }

    //     if (response.ok) {
    //         //saving to local storage
    //         localStorage.setItem('user', JSON.stringify(json))

    //         //updating auth context
    //         dispatch({ type: 'LOGIN', payload: json })
    //         setIsLoading(false)
    //     }
    // }


    // const signup2 = async (email, password) => {
    //     setIsLoading(true);
    //     setError(null);
    //     console.log("Sending: ", email, password);

    //     try {
    //         const response = await axios.post('http://localhost:5555/user/signup', {
    //             email,
    //             password
    //         });

    //         console.log("Res Res: ", response);

    //         if (response.status === 200) {
    //             // Saving to local storage
    //             localStorage.setItem('user', JSON.stringify(response.data));

    //             // Updating auth context
    //             dispatch({ type: 'LOGIN', payload: response.data });
    //         }

    //         setIsLoading(false);
    //     } catch (error) {
    //         console.error("Error signing up:", error);
    //         setIsLoading(false);
    //         setError(error.message);
    //     }
    // };

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        let data = JSON.stringify({
            "email": email,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:5555/user/signup',
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
                console.log("EEE: ", error)
                console.log("EEE message : ", error.message)
            });
        setIsLoading(false)

    }

    return { signup, isLoading, error }
}