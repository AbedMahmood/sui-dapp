import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createNetworkConfig, SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import "@mysten/dapp-kit/dist/index.css";

import App from "./App";
import CreateObject from "./pages/CreateObject";

const { networkConfig } = createNetworkConfig({
  devnet: { url: "https://fullnode.devnet.sui.io" },
  testnet: { url: "https://fullnode.testnet.sui.io" },
  mainnet: { url: "https://fullnode.mainnet.sui.io" },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="devnet">
          <WalletProvider autoConnect={false}>
            <Router>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/create-object" element={<CreateObject />} />
              </Routes>
            </Router>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>
);
