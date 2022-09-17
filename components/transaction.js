import * as React from "react";
import { useAccount } from 'wagmi'
import Script from "next/script";
import { useState } from "react";
import { chain } from "wagmi";
import { useContractWrite, usePrepareContractWrite, useContractRead } from "wagmi";
import { ethers } from "ethers";


export function Inputs({redacted, setRedacted}) {
  const [coffees, setCoffees] = useState(1);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const amount = `${0.004 * coffees}`;
  const { isConnected, address } = useAccount();
  const pay = ethers.utils.parseEther(amount)




  const { config } = usePrepareContractWrite({
    addressOrName: "0x9c9F8A8E8D6aA127608e2D3d1A70F5B7F0e68427",
    contractInterface: [
      "function buyRedacted(string memory _name, string memory _message, string memory _item) public payable",
    ],
    functionName: "buyRedacted",
    args: [name, message, redacted],
    overrides: {
      value: pay,
    },
  });
  
  const { data, isLoading, isSuccess, write } = useContractWrite(config);


  return (
    <div className="w-full">
      <Script src="https://cdn.lordicon.com/xdjxvujz.js" />
      <div className="">
        <input
          className="w-full rounded-xl py-3 px-2 bg-gray-300 border-gray-400 border text-sm text-gray-600 placeholder:text-gray-400 outline-none"
          id="Name"
          placeholder="Name or @twitter (optional)"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <textarea
          className="w-full rounded-xl py-3 px-2 bg-gray-300 border-gray-400 border text-sm text-gray-600 placeholder:text-gray-400 outline-none mt-2"
          id="Name"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>
      <div className="md:flex items-center justify-between my-6">
        <div className="flex items-center">
          <span className="text-gray-500 text-xl">0.004 ETH</span>
          <span className="mx-4 text-gray-300">x</span>
          <div className="flex gap-x-4">
            <button
              className={
                coffees === 1
                  ? "bg-gray-600 w-9 h-9 rounded-full"
                  : "bg-gray-300 w-9 h-9 rounded-full hover:bg-gray-400 transition-all"
              }
              onClick={() => setCoffees(1)}
            >
              1
            </button>
            <button
              className={
                coffees === 2
                  ? "bg-gray-600 w-9 h-9 rounded-full"
                  : "bg-gray-300 w-9 h-9 rounded-full hover:bg-gray-400 transition-all"
              }
              onClick={() => setCoffees(2)}
            >
              2
            </button>
            <button
              className={
                coffees === 3
                  ? "bg-gray-600 w-9 h-9 rounded-full"
                  : "bg-gray-300 w-9 h-9 rounded-full hover:bg-gray-400 transition-all"
              }
              onClick={() => setCoffees(3)}
            >
              3
            </button>
            <input
              className="rounded-xl w-12 h-9 px-3.5 text-center outline-none"
              value={coffees}
              onChange={(e) => setCoffees(e.target.value)}
            ></input>
          </div>
        </div>
        <h1 className="text-gray-400 text-center mt-5 md:mt-0">
          <span className="text-gray-500">Total:</span> {amount} ETH{" "}
        </h1>
      </div>
      <input
        className="w-full rounded-xl py-3 px-2 bg-gray-300 border-gray-400 border text-sm text-gray-600 placeholder:text-gray-400 outline-none mb-2"
        id="Name"
        placeholder="{Refacted}"
        onChange={(e) => setRedacted(e.target.value)}
        value={redacted}
      />
      {isConnected && (
        <button
          disabled={!write}
          onClick={() => write?.()}
          className="w-full bg-blue-600 py-2 rounded-xl"
          cursor="pointer"
        >
          {isLoading ? "Buying Lucas a " + redacted : "Buy Lucas a " + redacted}
          {isLoading ? (
            <lord-icon
              src="https://cdn.lordicon.com/mndtpdim.json"
              trigger="loop"
              colors="primary:#ffffff"
              className="w-6"
            ></lord-icon>
          ) : (
            ""
          )}
        </button>
      )}
      {isSuccess && (
        <div className="text-sm mt-5 text-gray-400 text-center">
          You successfully bought Lucas a {redacted}!
          <div className="mt-1">
            <a
              className="underline"
              target="_blank"
              rel="noreferrer"
              href={`https://arbiscan.io/address/${data?.hash}`}
            >
              Etherscan
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
