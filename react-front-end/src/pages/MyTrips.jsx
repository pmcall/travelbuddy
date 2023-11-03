//Trips Route
import { useEffect, useState } from "react";
import axios from "axios";
import TripTable from "../components/TripTable";
import tripImage from '../images/trips-hero.jpg';
import Footer from "../components/Footer"


export function MyTrips() {
  const [trips, setTrips] = useState([])
  const [comparisons, setComparisons] = useState([])

  useEffect(() => {
    // let traveller_id = window.sessionStorage.getItem('traveller_id')
    let traveller_id = 20;
    axios.get(`/trips/${traveller_id}`)
    .then(({data}) => {
      setTrips(data)
    })
  }, []);
  console.log(trips);

  useEffect(() => {
    // let traveller_id = window.sessionStorage.getItem('traveller_id')
    let traveller_id = 20;
    axios.get(`/comparisons/${traveller_id}`)
    .then(({data}) => {
      setComparisons(data)
    })
  }, []);
  console.log(comparisons)
  return (
    <div>
      <img src={tripImage} alt="Hotel" className="w-full h-auto" style={{ height: '400px' }}/>
        <div style={{ background: '#9C27B0' }} className="p-4 text-white">
          <h1 className="text-4xl font-bold mb-4">Get your track</h1>
          <p className="text-lg">See your achievements and think about what’s next!</p>
        </div>
      <TripTable trips = {trips} />
      <Footer />
    </div>
  )
}