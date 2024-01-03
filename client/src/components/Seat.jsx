/* eslint-disable react/prop-types */
import { MdEventSeat } from "react-icons/md";

const Seat = ({ ticket, onClick }) => {
    const booked = ticket.owner !== "0x0000000000000000000000000000000000000000";

    return (
        <div
            onClick={!booked ? () => onClick(ticket) : undefined}
            title={ticket.owner}
            className={`flex items-center justify-center flex-col p-4 rounded shadow hover:scale-105 transition border border-black/10 cursor-pointer ${booked ? "bg-red-600" : "bg-black/10"
                } active:scale-95`}>
            <div className="text-5xl text-black/10">
                <MdEventSeat />
            </div>

            <div className="text-sm font-semibold mt-1">
                {booked ? "Booked" : ticket.price + " Eth"}
            </div>
        </div >
    );
};

export default Seat;
