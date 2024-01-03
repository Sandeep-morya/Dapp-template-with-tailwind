import { PiTicketDuotone } from "react-icons/pi";
import PropTypes from "prop-types";

const Layout = ({ children, account }) => {
    return (
        <main>
            <header className="bg-blue-500 p-4">
                <nav className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-white text-2xl"><PiTicketDuotone /></div>
                        <p className="text-white text-xl font-semibold uppercase">Tickets</p>
                    </div>
                    <h2 className="text-white text-lg">{account || "Not Connected"}</h2>
                </nav>
            </header>
            <section className="container mx-auto mt-8 flex flex-col gap-4">
                {children}
            </section>
        </main>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    account: PropTypes.string,
};

export default Layout