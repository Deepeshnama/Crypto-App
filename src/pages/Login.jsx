import { Button, Card, CardContent, Container, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {useDispatch , useSelector} from "react-redux"
import { logInUser } from '../features/auth/authSlice'
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {CircularProgress} from "@mui/material"

const Login = () => {

  const {isLoading  , isError , message , user} = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [formData , setformData] = useState({
    email : "" ,
    password : ""
  })

  const {email , password} = formData

  const handleChange = (e) => {
    setformData({
      ...formData ,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault() 

    dispatch(logInUser(formData))
    
  }

    const inputStyle = {
        margin : "10px 0px"
    }

    useEffect(() => {

      if(user){
        navigate("/")
      }

      if(isError || message){
        toast.error(message)
      }

    } , [user , isError , message])


    if(isLoading){
      return (
        <Container sx={{ padding: "80px 0px" }}>
        <CircularProgress/>
        </Container>
      )
    }





  return (
    <Container sx={{ padding: "80px 0px" }}>
      <Typography variant="h4" align="center">
        Login Here
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>

            <TextField
              variant="outlined"
              label="Email"
              fullWidth
              required
              sx={inputStyle}
              type="email"
              name = "email" 
              value={email}
              onChange={handleChange} 
            ></TextField>

            <TextField
              variant="outlined"
              label="Password"
              fullWidth
              required
              sx={inputStyle}
              type="password"
              name = "password" 
              value={password}
              onChange={handleChange} 
            ></TextField>

            <Button type='submit' variant="contained" color="success" fullWidth sx={inputStyle} >Login</Button>

          </form>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Login