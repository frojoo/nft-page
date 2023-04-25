import React, { useEffect, useState } from "react";
import Intro from "../components/intro";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";
import Nfts from "../components/nfts";

const web3 = new Web3(window.ethereum);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

console.log(contract);

function Main({ account }) {
  const [total, setTotal] = useState(0);
  const [supply, setSupply] = useState(0);
  const [myNft, setMyNft] = useState(0);
  const [page, setPage] = useState(1);

  const getTotalNft = async () => {
    try {
      if (!contract) return;

      const totalNft = await contract.methods.totalNft().call();

      setTotal(totalNft);
    } catch (error) {
      console.error(error);
    }
  };
  const getMintedNft = async () => {
    try {
      if (!contract) return;

      const totalSupply = await contract.methods.totalSupply().call();

      setSupply(totalSupply);
      setPage(parseInt((parseInt(totalSupply) - 1) / 10) + 1);
    } catch (error) {
      console.error(error);
    }
  };
  const getMyNft = async () => {
    try {
      if (!contract || !account) return;

      const balanceOf = await contract.methods.balanceOf(account).call();

      setMyNft(balanceOf);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTotalNft();
    getMintedNft();
    console.log(page);
  }, []);

  useEffect(() => {
    getMyNft();
  }, [account]);

  return (
    <div>
      <Intro total={total} supply={supply} myNft={myNft} />
      <Nfts page={page} />
    </div>
  );
}

export default Main;
