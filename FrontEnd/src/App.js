import axios from "axios"
import { useState } from "react"

const App = () => {
//================================================= Use State =======================================================================
    let [data, setData] = useState([])
    let [currency, setCurrency] = useState("₹")
    let [inrprice, setInrprice] = useState(0)
    let [price, setPrice] = useState(0)
    let [stat, setStat] = useState(false)
    let [stat1, setStat1] = useState(false)
    let [totalqnty, setTotalqnty] = useState(0)
    let [totalprc, setTotalprc] = useState(0)
// ================================================= Getting the Data From DataBase for Particular Name and Category============================= 
    const click = (name, category) => {
        axios.post("https://storied-sherbet-08afb5.netlify.app/.netlify/functions/api/getlist", { name, category })
            .then((res) => {
                setData(res.data.data); setPrice(res.data.data.price);
                setInrprice(res.data.data.price); setTotalqnty(res.data.data.totalquantity)
                setTotalprc(res.data.data.totalprice)
            })
            .catch((err) => { console.log(err.message) })
    }
// ================================================== Updating the Content On click of Save Button ===============================================

    const updatelist = (data, price, currencyformat, totalprice, totalquantity) => {
        let id = data._id
        axios.post("https://storied-sherbet-08afb5.netlify.app/.netlify/functions/api/updatelist", { id, price, currencyformat, totalprice, totalquantity })
            .then((res) => { console.log(res.data.data); alert("Saved Successfully") })
            .catch((err) => { console.log(err.message) })
    }

// ================================================= Converting the Price ====================================================
    const demo = (symbol, price, to, from, currencyformat) => {
        setCurrency(symbol)
        if (currencyformat === "₹" && to === "INR") {
            setPrice(inrprice)
            setTotalprc(totalqnty * inrprice)
            setStat(false)
        }
        else if (currencyformat === "₹" && to === "USD") {
            if (stat === false) {
                setStat(true)
                var myHeaders = new Headers();
                myHeaders.append("apikey", "DcYpFR8WprbfLxDQmNOS1BAKTEuyKNdz");

                var requestOptions = {
                    method: "GET",
                    redirect: "follow",
                    headers: myHeaders,
                };

                fetch(
                    `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${price}`,
                    requestOptions
                )
                    .then((response) => response.json())
                    .then((result) => {
                        setPrice(result.result);
                        setTotalprc((result.result) * totalqnty)
                    })
                    .catch((error) => console.log("error", error));
            }
        } else if (currencyformat === "$" && to === "INR") {
            if (stat1 === false) {
                setStat1(true)
                let myHeaders = new Headers();
                myHeaders.append("apikey", "DcYpFR8WprbfLxDQmNOS1BAKTEuyKNdz");

                let requestOptions = {
                    method: "GET",
                    redirect: "follow",
                    headers: myHeaders,
                };

                fetch(
                    `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${price}`,
                    requestOptions
                )
                    .then((response) => response.json())
                    .then((result) => {
                        setPrice(Math.ceil(result.result));
                        setTotalprc(Math.ceil((result.result) * totalqnty))
                    })
                    .catch((error) => console.log("error", error));
            }
        } else if (currencyformat === "$" && to === "USD") { setStat(true) }
    }
// ====================================== Incrementing Total Quantity and Total Price ===============================
let incTotalqnty = () => {
    if (totalqnty < 10) {
        setTotalqnty(Number(totalqnty) + 1);
        setTotalprc((totalqnty + 1) * price)
    }
};
// ====================================== Decrementing Total Quantity and Total Price ===============================

    let decTotalQnty = () => {
        if (totalqnty > 1) {
            setTotalqnty(totalqnty - 1);
            setTotalprc((totalqnty - 1) * price)
        }
    }
// ====================================== Changing Total Price On basis of Quantity ==================================
    let handleChange = (e) => {
        setTotalqnty(e.target.value);
        setTotalprc(e.target.value * price)
    }

    return (
        <div style={{ paddingLeft: "420px" }}>
            <div style={{ height: "auto", padding: "30px", display: "flex", gap: "5rem" }}>
                {/* Fruits DropDown */}
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{ width: "160px" }} >Fruits
                        <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        <li><p onClick={() => click("Apple", "Fruits")}>Apple</p></li>
                        <li><p onClick={() => click("Banana", "Fruits")}>Banana</p></li>
                        <li><p onClick={() => click("Mango", "Fruits")}>Mango</p></li>
                        <li><p onClick={() => click("Orange", "Fruits")}>Orange</p></li>
                    </ul>
                </div>

                {/* Vegetables DropDown */}
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{ width: "160px" }}>Vegetables
                        <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                        <li><p onClick={() => click("Pumpkin", "Vegetables")}>Pumpkin</p></li>
                        <li><p onClick={() => click("Lady Finger", "Vegetables")}>Lady Finger</p></li>
                        <li><p onClick={() => click("Carrot", "Vegetables")}>Carrot</p></li>
                        <li><p onClick={() => click("Spinach", "Vegetables")}>Spinach</p></li>
                    </ul>
                </div>
            </div>


            {data.length !== 0 && <div style={{ paddingLeft: "60px" }}>
                <img alt={data.name} src={data.image} style={{ width: "300px", height: "300px" }}></img>  {/*====================== Showing Image ==========================*/}
                <div style={{ paddingLeft: "40px" }}>Unit Price : {price}   {/*====================== Showing Unit Price ==========================*/}
                    <label>
                        <div className="dropdown">     {/*====================== Dropdown to convert Currency Format ==========================*/}
                            <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{ width: "50px" }}>{currency}
                                <span className="caret"></span></button>
                            <ul className="dropdown-menu">
                                <li><p onClick={() => demo("₹", price, 'INR', "USD", data.currencyformat)}>₹</p></li>
                                <li><p onClick={() => demo("$", price, "USD", "INR", data.currencyformat)}>$</p></li>
                            </ul>
                        </div>
                    </label>
                </div>
                {/*====================== Total Quantity ==========================*/}
                <p style={{ paddingLeft: "40px" }}>Total Quantity :
                    <button onClick={decTotalQnty}>-</button>  
                    <input type={"text"} value={totalqnty} style={{ border: "1px solid black", width: "40px", height: "25px", textAlign: "center" }}
                        onChange={handleChange}></input>
                    <button onClick={incTotalqnty}>+</button>
                    <label>KG</label></p>
                    {/*====================== Total Price ==========================*/}
                <p style={{ paddingLeft: "40px" }}>Total Price : {totalprc}</p>
                {/*====================== Update Button ==========================*/}
                <button style={{ marginLeft: "80px", width: "100px", background: "lightgreen" }} onClick={() => updatelist(data, price, currency, totalprc, totalqnty)}>Save</button>
            </div>}





            {/* {data!=0 && <div>
                <img src={data.image} style={{width:"300px",height:"300px"}}></img>
                <p>Unit Price : {data.price}</p>
                <p>Currency : {data.currencyformat}</p>
                <p>Total Quantity : {data.totalquantity}</p>
                <p>Total Price : {data.totalprice}</p>
            </div>} */}
        </div>
    )
}

export default App