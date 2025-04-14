import { useNavigate } from "react-router-dom";
// import "./FertilizerCard.css";

const FertilizerCard = ({ id, name, image }) => {
  const navigate = useNavigate();

  return (
    <div className="fertilizer-card" onClick={() => navigate(`/fertilizer/${id}`)}>
      <img src={image} alt={name} className="fertilizer-card-image" />
      <h4>{name}</h4>
    </div>
  );
};

export default FertilizerCard;
