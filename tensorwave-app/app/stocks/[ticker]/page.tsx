import Logo from "@/Images/logos"; //imports the logo component to output company logo
import { stocks } from "@/company/business"; // imports business to output each company data
type Values = { //type for the stock ticker parameter
    ticker: string;
};
//company page for each stock ticker using alphavantage api to get overview and historical price data
export default async function Stock({params}:{params: Promise<Values>}){
    const { ticker } =  await params; //gets ticker out of the params object
    const stock = stocks.find((box) => box.ticker === ticker); //looks for stock to get the right logo 
    if(!stock)// edge case if stock doesn't get outtputted due to api limit
    {
        return <div>Stock N/A</div>;
    }
    //url for company overview and load prices 
    const linkO = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;
    const linkP = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`;
    //tested demo so i wouldn't run into api limit
    //const linkO = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`;
    //const linkP = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`;
    // collects company overview data
    const callO = await fetch(linkO); //calls overview data
    const data = await callO.json(); //listens for response
    //collects historical price data
    const callP = await fetch(linkP); //calls daily price data
    const dataP = await callP.json(); //listens for response
    const timeS = dataP["Time Series (Daily)"]; //collects time series to extract each entry
    const entries = timeS ? Object.entries(timeS) : []; //convert from object to array to iterate through each day and output it
    console.log("overview data:", data); //debugging purposes
    console.log("price data:", dataP);
    return (//printing all fields with style but if unavailable we output N/A
    <div className="space-y-4 min-h-screen flex flex-col bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 animate-gradient">
         <h1 className = "text-5xl font-bold mb-6 text-center "> {data.Name ? data.Name : stock.company}</h1><br/> 
          <div className= "flex items-center justify-center gap-3">
          <Logo domain={stock.logo} company={stock.company} labelCo={false} />
          <p>{data.Symbol ? data.Symbol : "Symbol: N/A"}</p>
          </div>

          <p>{data.Description ? data.Description : "Description: N/A"}</p>
          <p>{data.Exchange ? `Exchange: ${data.Exchange}` : "Exchange: N/A"}</p>
          <p>{data.Sector ? `Sector: ${data.Sector}` : "Sector: N/A"}</p>
          <p>{data.Industry ? `Industry: ${data.Industry}` : "Industry: N/A"}</p>
          <p>{data.MarketCapitalization ? `Market Capitalization: ${data.MarketCapitalization}` : "Market Capitalization: N/A"}</p>
          <p>{data.AssetType ? `Asset type: ${data.AssetType}` : "Asset type: N/A"}</p>

          {entries.length > 0 ? ( //if api returns historical price data, output it as a table otherwise "N/A"
            <> <h2 className = "text-3xl font-bold mb-6 text-center ">Historical Price Data</h2>
          <table className = "w-full border-collapse text-left">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Close Price</th>
                    <th> Volume</th>
                    <th> Percentage</th>
                </tr>
            </thead>
            <tbody>
            { entries.slice(0, 30).map(([date, val]: [string, any], index) => {
              //loops thru up 30 entries for price, if out of bounds then value
              //becomes null otherwise calculate   
                const prevDay = entries[index+1] as [string, any] | undefined;
                const currDay = Number(val["4. close"]);
                const prevClose = prevDay ? Number(prevDay[1]["4. close"]) : null;
                const percentage = prevClose ? (((currDay - prevClose) / prevClose) * 100).toFixed(2) : "N/A";
                return(//data entry for each header in the table
                <tr key={date}>
                <td>{date}</td>
                <td>{val["4. close"]}</td>
                <td>{val["5. volume"]}</td>
                <td>{percentage === "N/A" ? "N/A" : `${percentage}%`}</td>
              </tr>
            );
            })}
            </tbody>
            </table>
            </>
            ) : (<h2>Historical Prices: N/A</h2>//edge if no historical price data is available
        )}
    </div>
    );
}