import { useEffect, useState } from "react"
import Prayer from "./assets/component/prayer"


function App() {
 
const [PrayerTimes , setPrayerTimes] = useState({})
const [dateTime , setDateTime] = useState("")
const [city , setCity] = useState("Cairo")


const cities = [
  {name : "القاهرة" , value : "Cairo"},
  {name : "الاسكندرية" , value : "Alexandria"},
  {name : "الجيزة" , value : "Giza"},
  {name : "المنصورة" , value : "Mansoura"},
  {name : "أصوان" , value : "Aswan"},
  {name : "الاقصر" , value : "Luxor"}
]

useEffect(()=>{
  const fetchPrayerTimes = async () =>{
    try{
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/17-09-2025?city=Eg&country=${city}`)
      const date_prayar = await response.json()

      setPrayerTimes(date_prayar.data.timings)
      setDateTime(date_prayar.data.date.gregorian.date)

      console.log(date_prayar.data.date.gregorian.date);


    }catch(error){
      console.error(error)
    }
  }

fetchPrayerTimes()

},[city])


const formatTimes = (time) =>{
  if(!time){
    return"00:00";
  }
  let [hours , minutes] = time.split(":").map(Number)
  const perd = hours >= 12 ? "PM" : "AM" ;
  hours = hours % 12 || 12;
  return`${hours}:${minutes<10 ? "0" + minutes : minutes} ${perd}`
}



  return (
    <section>
      <div className="container">
        <div className="top_sec">
          <div className="city">
            <h3>المدينه</h3>
            <select name="" id="" onChange={(e)=> setCity(e.target.value)}>
              {cities.map((city_obj)=>(
                <option key={city_obj.value} value={city_obj.value}>{city_obj.name}</option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>

        <Prayer name="الفجر" time={formatTimes(PrayerTimes.Fajr)}/>
        <Prayer name="الظهر" time={formatTimes(PrayerTimes.Dhuhr)}/>
        <Prayer name="العصر" time={formatTimes(PrayerTimes.Asr)}/>
        <Prayer name="المغرب" time={formatTimes(PrayerTimes.Maghrib)}/>
        <Prayer name="العشاء" time={formatTimes(PrayerTimes.Isha)}/>




      </div>
    </section>
  )
}

export default App
