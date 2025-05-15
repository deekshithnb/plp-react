import { Link } from "react-router";

export default function ProductCard({ name, imageUrl, price, url }) {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} />
      <Link to={url}>
        <h3>{name}</h3>
      </Link>
      <p className="price">${price}</p>
      {/* <button class="add-to-cart">Add to Cart</button> */}
    </div>
  );
}
