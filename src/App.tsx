import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/index.css";

function App() {
  const currentAccount = useCurrentAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentAccount) {
      navigate("/create-object");
    }
  }, [currentAccount, navigate]);

  return (
    <div className="app-root">
      <div className="app-container">
        <h1>Sui dApp</h1>
        <p>Connect your Sui wallet to continue.</p>
        <ConnectButton className="connect-button" />
        <p className="footer-text">Powered by Mysten Dapp Kit</p>
      </div>
    </div>
  );
}

export default App;
