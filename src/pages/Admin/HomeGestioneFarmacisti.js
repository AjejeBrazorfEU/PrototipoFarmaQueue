

function HomeGestioneFarmacisti() {
const [farmacie, setFarmacie] = useState([]);
  const navigate = useNavigate();
    
  const nuovaFarmacia = (destination) => {
      navigate(destination);
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/homeAdmin/getFarmacie`)
      .then(res => {
        setFarmacie(res.data);
      })
  }, []);


  return (
    <div className="HomeGestioneFarmacisti">
      <h1>HomeGestioneFarmacisti</h1>
    </div>
  );
}

export default HomeGestioneFarmacisti;