import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonIcon,
  IonImg,
} from "@ionic/react";
import { grid, add, remove } from "ionicons/icons";
import "./Tab2.css";
import { useState, useEffect } from "react";

type CartItem = {
  name: string;
  description: string;
  price: number;
  sizes: { [key: string]: number };
  image: string;
  type: "coffee" | "beans";
};

const Tab2: React.FC = () => {
  const initialCartItems: CartItem[] = [
    {
      name: "Cappuccino Classic",
      description: "With Steamed Milk",
      price: 4.2,
      sizes: { S: 0, M: 0, L: 0 },
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500",
      type: "coffee",
    },
    {
      name: "Espresso Bold",
      description: "Double Shot",
      price: 3.8,
      sizes: { S: 0, M: 0, L: 0 },
      image:
        "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=500",
      type: "coffee",
    },
    {
      name: "Robusta Royale",
      description: "Rich and full-bodied coffee beans",
      price: 3.8,
      sizes: { "250g": 0, "500g": 0, "1Kg": 0 },
      image:
        "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=500",
      type: "beans",
    },
  ];

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : initialCartItems;
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (
    itemIndex: number,
    size: string,
    increment: boolean
  ) => {
    setCartItems((items) =>
      items.map((item, index) => {
        if (index === itemIndex) {
          const newSizes = { ...item.sizes };
          newSizes[size] = Math.max(0, newSizes[size] + (increment ? 1 : -1));
          return { ...item, sizes: newSizes };
        }
        return item;
      })
    );
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * Object.values(item.sizes).reduce((a, b) => a + b, 0),
    0
  );

  return (
    <IonPage>
      <IonContent fullscreen scrollY={true}>
        <IonHeader>
          <div className="header-row">
            <IonIcon aria-hidden="true" icon={grid} className="grid-button" />
            <h1>Cart</h1>
            <div className="profile-wrapper">
              <IonImg src="profile.jpg" className="profile-img" />
            </div>
          </div>
        </IonHeader>

        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-top">
                <div className="item-image-wrapper">
                  <IonImg
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                  />
                </div>
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <p className="desc">Medium Roasted</p>
                </div>
              </div>
              {Object.entries(item.sizes).map(([size, quantity]) => (
                <div key={size} className="price-quantity-controls">
                  <span className={`size ${size}`}>{size}</span>
                  <span className="price">
                    <span className="dollar">$</span>
                    {item.price.toFixed(2)}
                  </span>
                  <IonIcon
                    icon={remove}
                    className="quantity-btn"
                    onClick={() => updateQuantity(index, size, false)}
                  />
                  <span className="quantity">{quantity}</span>
                  <IonIcon
                    icon={add}
                    className="quantity-btn"
                    onClick={() => updateQuantity(index, size, true)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <p>Total Price</p>
            <span className="price">
              <span className="dollar">$</span>
              {total.toFixed(2)}
            </span>
          </div>
          <button className="checkout-button">Pay</button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
