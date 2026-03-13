import Link from "next/link"; //linking home page to company page
import Logo from "@/Images/logos"; // logo component for company 
import { stocks } from "@/company/business"; // company stock ticker data
//main page 
export default function Home() {
  return (//styling purposes for main page
    <div className = "min-h-screen flex flex-col bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-gradient text-white p-8">
      <h1 className = "text-5xl font-bold mb-6 text-center ">Stock Dashboard</h1>
      <p className = "mb-10 text-lg text-center "> Choose a stock to view more details</p>
      <ul className = "grid grid-cols-3 gap-4"> 
        { stocks.map((stock ) => ( //loops through company name to output in card view
        <li key = {stock.ticker}><Link href={`/stocks/${stock.ticker}`}
        className = "block h-24 flex items-center justify-center p-2 bg-white bg-opacity-20 rounded-lg shadow-md hover:bg-opacity-30 transition duration-300 text-center text-xl font-semibold text-black">
          <Logo domain={stock.logo} company={stock.company} labelCo={true} /> 
          </Link>
        </li>))//logo domain line handles api logo limit by outputting company if no logo exists
      }</ul>
    </div>
  );
}
