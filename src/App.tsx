import { ConnectButton, useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

function App() {
  const currentAccount = useCurrentAccount();
  const suiClient = useSuiClient();
  const [balance, setBalance] = useState(null);
  const MIST_PER_SUI = 1_000_000_000;

  useEffect(() => {
    if (!currentAccount || !suiClient) {
      setBalance(null);
      return;
    }
    suiClient.getBalance({ owner: currentAccount.address }).then(result => {
      setBalance(result?.totalBalance ?? "0");
    }).catch(() => setBalance("0"));
  }, [currentAccount, suiClient]);

  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>dApp Starter Template</Heading>
        </Box>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 300 }}
        >
          {currentAccount ? (
            <>
              <Text>Connected to: {currentAccount.address}</Text>
              <br />
              <Text>
                Balance: {balance !== null ? (Number(balance) / MIST_PER_SUI).toLocaleString(undefined, {maximumFractionDigits: 9}) : "Loading..."} SUI
              </Text>
            </>
          ) : (
            <Heading>Please connect your wallet</Heading>
          )}
        </Container>
      </Container>
    </>
  );
}

export default App;
