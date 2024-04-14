import axios from 'axios'
import React from 'react'

export const HandleLogin = (
  password: string,
  email: string,
  errorServer: React.Dispatch<React.SetStateAction<string>>
) => {
  console.log('Will Login')
  axios
    .post('/api/login', { password, email })
    .then((response) => {
      console.log(JSON.stringify(response))
      // log headers
      console.log(JSON.stringify(response.headers))

      const { data } = response
      if (data.error) {
        errorServer(data.error)
        console.log(data)
      } else {
        console.log(data)
        window.location.href = '/account'
      }
    })
    .catch((err) => {
      console.log('Login Error:')
      console.error(err)
    })
}
