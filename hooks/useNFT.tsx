import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useNFT = (_address?: string) => {
  const { address } = useAccount();
  const addr = _address || address;

  const [nfts, setNfts] = useState([]);
  const [next, setNext] = useState();

  const [searchParams, setSearchParams] = useState<{ [key: string]: string }>({
    limit: "5",
  });

  const gotoNext = () => {
    setSearchParams({
      limit: "5",
      next,
    });
  };

  useEffect(() => {
    setSearchParams({ limit: "5" });
  }, [addr]);

  useEffect(() => {
    fetch(
      `https://api.opensea.io/api/v2/chain/ethereum/account/${addr}/nfts?${new URLSearchParams(
        searchParams
      )}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "x-api-key": "a04d0e0d45e64e5eba12d40a0bd280e1",
        },
        // mode: "no-cors",
      }
    )
      .then((response) => response.json())
      .then(({ nfts, next }) => {
        console.log(nfts);
        setNext(next);
        setNfts(nfts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [addr, searchParams]);

  return { nfts, gotoNext };
};

export default useNFT;
