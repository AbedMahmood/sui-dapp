import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { useEffect, useState } from "react";
import { Container, Heading, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import "../assets/welcome.module.css";

function Welcome() {
  const currentAccount = useCurrentAccount();
  const suiClient = useSuiClient();
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const MIST_PER_SUI = 1_000_000_000;

  useEffect(() => {

    if (!currentAccount) {
      navigate("/");
      return;
    }

    suiClient
      .getBalance({ owner: currentAccount.address })
      .then(result => {
        setBalance(result?.totalBalance ?? "0");
      })
      .catch(error => {
        setBalance("0");
      });
  }, [currentAccount, suiClient, navigate]);

  return (
    <Container
      mt="5"
      pt="2"
      px="4"
      style={{ background: "var(--gray-a2)", minHeight: 300 }}
    >
      {currentAccount ? (
        <>
          <Heading>Welcome Back</Heading>
          <Text>Address: {currentAccount.address}</Text>
          <br />
          <Text>
            Balance:{" "}
            {balance !== null
              ? (Number(balance) / MIST_PER_SUI).toLocaleString(undefined, {
                  maximumFractionDigits: 9,
                })
              : "Loading..."}{" "}
            SUI
          </Text>
        </>
      ) : (
        <Heading>Loading wallet...</Heading>
      )}
    </Container>
  );
}

export default Welcome;
