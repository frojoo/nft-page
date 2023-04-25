import axios from "axios";
import React, { useEffect, useState } from "react";

function Nfts({ page }) {
  const [selectedPage, setSelectedPage] = useState(1);
  const [nfts, setNfts] = useState();

  const getNfts = async (p) => {
    try {
      let nftArray = [];

      for (let i = 0; i < 10; i++) {
        const tokenId = i + 1 + (p - 1) * 10;

        let response = await axios.get(
          `${process.env.REACT_APP_JSON_URL}/${tokenId}.json`
        );

        nftArray.push({ tokenId, metadata: response.data });
      }

      setNfts(nftArray);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickPage = (p) => () => {
    setSelectedPage(p);
  };

  const pageComp = () => {
    let pageArray = [];

    for (let i = 0; i < page; i++) {
      pageArray.push(
        <button
          key={i}
          className={`ml-4 text-2xl font-bold hover:text-white ${
            i + 1 === selectedPage ? "text-white" : "text-gray-400"
          }`}
          onClick={onClickPage(i + 1)}
        >
          {i + 1}
          <span className="text-base"> Page</span>
        </button>
      );
    }

    return pageArray;
  };

  useEffect(() => {
    getNfts(1);
  }, []);

  useEffect(() => {
    console.log(nfts);
  }, [nfts]);

  return (
    <div>
      <div>{pageComp()}</div>
    </div>
  );
}

export default Nfts;
