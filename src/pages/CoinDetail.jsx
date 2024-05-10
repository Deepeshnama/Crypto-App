import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";

const CoinDetail = () => {
  const params = useParams();

  const [coin, setCoin] = useState(null);

  const fetchCoin = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${params.id}`
    );

    const data = await response.json();

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) {
    return (
      <Container sx={{ padding: "80px" }}>
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ padding: "80px 0px" }}>
      <Card>
        <CardContent>
          <CardMedia
            sx={{ height: 240 }}
            title={coin.name}
            image={coin.image.large}
          ></CardMedia>
          <Typography variant="h4" sx={{ padding: "20px" }}>
            Name :- {coin.name}
          </Typography>

          <Typography variant="h4" sx={{ padding: "20px" }}>
            Symbol :- {coin.symbol}
          </Typography>

          <Typography variant="h4" sx={{ padding: "20px" }}>
            Price :-  $ {coin.market_data.current_price.usd}
          </Typography>

          <Typography variant="h4" sx={{ padding: "20px" }}>
            Description :- {coin.description.en}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CoinDetail;
