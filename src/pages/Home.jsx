import { Grid, Card, CardContent, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CoinCard from "../components/CoinCard";
import {useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom"

const Home = () => {

  const [trending , setTrending] = useState([])

  const {user} = useSelector(state => state.auth)
  const navigate = useNavigate()
  // console.log(trending[0].item)

  const fetchCoins = async() => {
    const response = await fetch ("https://api.coingecko.com/api/v3/search/trending")

    const data = await response.json()

    setTrending(data.coins)
  }

  useEffect(() => {
    fetchCoins()

    if(!user){
      navigate("/login")
    }
  } , [user])



  return (
    <Container sx={{ padding: "0px 0px" }}>
      <Typography variant="h4" sx={{ padding: "80px 0px" }} align="center">
        Trending Coins
      </Typography>

      <Grid container spacing={2} sx={{margin : "20px 0px"}}>
       {
        trending.map((coin) =>  <CoinCard key = {coin.item.coin_id} coin = {coin.item} />)
       }
      </Grid>
    </Container>
  );
};

export default Home;
