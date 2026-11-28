import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function ProductCard({ product }) {
  const [isAdded, setIsAdded] = useState(false);

  // Add product temporarily, then return to the original button
  const handleAddToCart = () => {
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  return (
    <>
      <style>{`
        .product-card {
          background-color: #f8efe1;
          border: none;
          border-radius: 28px;
          padding: 10px;
          height: 100%;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-image-wrapper {
          position: relative;
          width: 100%;
          height: 260px;
          overflow: hidden;
          border-radius: 22px;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-category {
          position: absolute;
          top: 12px;
          left: 12px;
          background-color: #eee4d5;
          color: #765b45;
          padding: 6px 12px;
          border-radius: 30px;
          font-size: 11px;
        }

        .product-price {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background-color: #70452c;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Georgia, serif;
        }

        .product-name {
          color: #70452c;
          font-family: Georgia, serif;
          font-size: 20px;
          margin-bottom: 18px;
        }

        .add-to-cart-btn {
          width: 100%;
          height: 52px;
          background: transparent;
          border: 1px solid #dfd1bd;
          border-radius: 30px;
          color: #70452c;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 8px 6px 18px;
          transition: all 0.3s ease;
        }

        .add-to-cart-btn:hover {
          background-color: #70452c;
          color: white;
        }

        .add-cart-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background-color: #c69a6d;
          color: #70452c;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 23px;
          transition: all 0.3s ease;
        }

        /* Added state */
        .add-cart-icon.added {
          background-color: #6b8e6e;
          color: white;
          animation: addedPop 0.3s ease;
        }

        /* Checkmark animation */
        @keyframes addedPop {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }

          70% {
            transform: scale(1.2);
            opacity: 1;
          }

          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .add-to-cart-btn.added-btn {
          border-color: #6b8e6e;
          color: #6b8e6e;
        }
      `}</style>

      <Card className="product-card">
        <div className="product-image-wrapper">
          <Card.Img
            src={product.img}
            alt={product.name}
            className="product-image"
          />

          <span className="product-category">
            {product.cat}
          </span>

          <span className="product-price">
            ${product.price}
          </span>
        </div>

        <Card.Body className="p-2 pt-3">
          <Card.Title className="product-name">
            {product.name}
          </Card.Title>

          <Button
            className={`add-to-cart-btn ${isAdded ? "added-btn" : ""}`}
            onClick={handleAddToCart}
          >
            <span>
              {isAdded ? "Added to cart" : "Add to cart"}
            </span>

            <span
              className={`add-cart-icon ${isAdded ? "added" : ""}`}
            >
              {isAdded ? "✓" : "+"}
            </span>
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}