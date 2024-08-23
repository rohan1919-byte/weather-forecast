import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import "./SearchBox.css"
import { useState } from 'react';



export default function SearchBox({updateWhetherInfo}){
    let[city,setCity] = useState("");
    let[error,setError] =useState(false);

    const API_URL="https://api.openweathermap.org/data/2.5/weather";
    const API_KEY=""; //paste this to your api key 


    let getWeatherInfo = async () =>{ //jevha pan api calll karta tevha te async karave lagt 
        try{
            let responce=await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`); //yavar apn request pathavu
        let jsonResponse= await responce.json();
        let result ={
            city:city,
            temp:jsonResponse.main.temp,
            tempMin:jsonResponse.main.temp_min,
            tempMax:jsonResponse.main.temp_max,
            humidity:jsonResponse.main.humidity,
            feelsLike:jsonResponse.main.feels_like,
            weather:jsonResponse.weather[0].description,
        }
        console.log(result)
        return result;
        }catch (error){
            throw error;
        }
    };

    let handleChange = (event) =>{
        setCity(event.target.value);
    }

    let handleSubmit = async (event) =>{
        try{
            event.preventDefault();
            console.log(city);
            setCity("");//city chi value print jalyavar search box reset hoil
           let newinfo = await getWeatherInfo(); //call karnar
           updateWhetherInfo(newinfo)//updatewhether info madhe newinfo pass kele
        }catch(error){
            setError(true);
        }
       
    }


    return(
        <div className='searchbox'>
            {/* <h3>Search For the weather</h3> */}
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined" required value={city} onChange={handleChange}/>
            <Button variant="contained" color='secondary' endIcon={<SendIcon />} type='submit' className='searchboxButton'>Search</Button>
            {error && <p style={{color:"red"}}>No Such Place Exists In Our API</p>}  {/* jar error ala tar ha paragraph print honar*/}
            </form>
        </div>
    );
}