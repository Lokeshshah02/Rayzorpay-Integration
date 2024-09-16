import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Card from "./Card";
import test from "./assests/test.png";
import axios from "axios";

const Home = () => {
  const checkoutHandler = async (amount) => {
    const {data: { key }} = await axios.get("http://localhost:4000/api/getkey");
    const {data: { order }} = await axios.post("http://localhost:4000/api/checkout", {
      amount
    });
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Lokesh shah",
      description: "Test Transaction",
      image:
        "https://avatars.githubusercontent.com/u/118357743?…00&u=3e43b705b0af02d81ea61dfb2615d30b00c809d7&v=4",
      order_id: order.id,
      callback_url: "http://localhost:4000/api/payverify",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();

    //   console.log(data);
  };

  return (
    <Box>
      <Stack
        h={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
        direction={["column", "row"]}
      >
        <Card amount={5000} img={test} checkoutHandler={checkoutHandler} />
        <Card amount={5000} img={test} checkoutHandler={checkoutHandler} />
      </Stack>
    </Box>
  );
};

export default Home;
