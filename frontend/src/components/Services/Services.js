import "./services.css";
export default function Services({ url, name }) {
  return (
    <div className="service" style={{ backgroundImage: `url(${url})` }}>
      <span>{name}</span>
    </div>
  );
}
