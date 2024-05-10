import React from 'react'
import {Grid , Card , CardMedia , CardContent , Button , CardActions , Typography} from "@mui/material"
import { Link } from 'react-router-dom'

const CoinCard = ({coin}) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
    <Card>
      <CardMedia
        sx={{ height: 240 }}
        image={coin.large}
        title={coin.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {coin.name}
        </Typography>
       
      </CardContent>
      <CardActions>
        <Link to={`/coin/${coin.id}`}>
        <Button variant='contained' size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  </Grid>
  )
}

export default CoinCard