//Trips Route
import { useEffect, useState } from "react";
import axios from "axios";
import TripTable from "../components/TripTable";
import tripImage from '../images/trips-hero.jpg';
import Footer from "../components/Footer"
import ComparisonCard from "../components/ComparisonCard"
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


export function MyTrips() {
  const [allTrips, setAllTrips] = useState([])
  const [trips, setTrips] = useState([])
  const [comparisons, setComparisons] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // let traveller_id = window.sessionStorage.getItem('traveller_id')
      let traveller_id = 20;

      await axios.get(`/trips/${traveller_id}`)
      .then(({ data }) => {
        setTrips(data);
      });
      await axios.get(`/comparisons/${traveller_id}`)
      .then(({ data }) => {
        setComparisons(data);
      });
      await axios.get(`/trips/all`)
      .then(({ data }) => {
        setAllTrips(data);
      });
    };
    fetchData()
    
  }, []);
  console.log(trips);
  console.log(allTrips)
  console.log(comparisons);

  const handleComparisonClick = () => {
    navigate("/make_comparisons");
  };


  return (
    <div>
      <img src={tripImage} alt="Hotel" className="w-full h-auto" style={{ height: '400px' }}/>
        <div style={{ background: '#9C27B0' }} className="p-4 text-white">
          <h1 className="text-4xl font-bold mb-4">Get your track</h1>
          <p className="text-lg">See your achievements and think about what’s next!</p>
        </div>
      <TripTable trips = {trips} />
      {/* <ComparisonTable comparisons = {comparisons} /> */}
      <ComparisonCard comparisons = {comparisons[0]} allTrips = {allTrips}/>
      <Button onClick={handleComparisonClick}>
        MAKE A COMPARISON
      </Button>
      <Footer />
    </div>
  )
}