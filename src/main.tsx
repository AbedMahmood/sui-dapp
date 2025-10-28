import React from "react";
import ReactDOM from "react-dom/client";
import { createNetworkConfig, SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@mysten/dapp-kit/dist/index.css";

import App from "./App";
import Welcome from "./pages/Welcome";

const { networkConfig } = createNetworkConfig({
  devnet: { url: getFullnodeUrl("devnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="devnet">
        <WalletProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/welcome" element={<Welcome />} />
            </Routes>
          </Router>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
