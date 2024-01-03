import { useCallback, useEffect, useState } from "react";
import ticketsConfig from "../../build/contracts/Tickets.json";
import Web3 from "web3";
import Layout from "./components/Layout";
import Seat from "./components/Seat";

const CONTRACT_ADDRESS = ticketsConfig.networks["5777"].address;
const CONTRACT_ABI = ticketsConfig.abi;
const DEFAULT_ADDRESS = "http://127.0.0.1:7545";
const web3 = new Web3(window.ethereum || DEFAULT_ADDRESS);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

const loadTickets = async () => {
  const TOTAL_TICKETS = 10;
  try {
    const ticketArray = [];
    for (let i = 0; i < TOTAL_TICKETS; i++) {
      const ticket = await contract.methods.tickets(i).call();
      ticket.id = i;
      ticket.price = Number(ticket.price) / 1e18;
      ticketArray.push(ticket);
    }
    return ticketArray;
  } catch (error) {
    throw new Error(error);
  }
};

function App() {
  const [account, setAccount] = useState();
  const [tickets, setTickets] = useState([]);

  const buyTicket = useCallback(async (ticket) => {
    if (account) {
      await contract.methods.buyTicket(ticket.id).send({ from: account, value: ticket[1] })
      const response = await loadTickets();
      setTickets(response)
    }

  }, [account]);

  useEffect(() => {
    web3.eth.requestAccounts().then((accounts) => setAccount(accounts[0]));
    loadTickets()
      .then((response) => setTickets(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Layout account={account}>
      <h1 className="font-bold text-2xl text-black/50 trackig-wider">
        Select Tickets to book, from avialable tickets
      </h1>
      <div className="flex flex-wrap gap-10 justify-center">
        {tickets.map((ticket) => (
          <Seat key={ticket.id} ticket={ticket} onClick={buyTicket} />
        ))}
      </div>
    </Layout>
  );
}

export default App;
