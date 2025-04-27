import {
  IonContent,
  IonHeader,
  IonTitle,
  IonIcon,
  IonImg,
  IonPage,
  IonInput,
} from "@ionic/react";
import { grid, search, add, star } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [coffeeTypeImages, setCoffeeTypeImages] = useState<
    Record<string, string>
  >({});
  const [coffeeBeansImages, setCoffeeBeansImages] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const filters = ["All", "Cappuccino", "Espresso", "Americano", "Macchiato"];

  const fetchImages = async (query: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query,
            client_id: import.meta.env.VITE_UNSPLASH_API_KEY,
            per_page: 5,
          },
        }
      );
      return response.data.results;
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch images for each coffee type
      const imagePromises = coffeeData.map((coffee) =>
        fetchImages(coffee.type.toLowerCase()).then((results) => ({
          type: coffee.type,
          url: results[0]?.urls?.small,
        }))
      );

      const beanImages = await fetchImages("coffee beans");
      setCoffeeBeansImages(beanImages);

      const coffeeImages = await Promise.all(imagePromises);
      const imageMap = coffeeImages.reduce((acc, { type, url }) => {
        acc[type] = url;
        return acc;
      }, {} as Record<string, string>);

      setCoffeeTypeImages(imageMap);
    };

    fetchData();
  }, []);

  const coffeeData = [
    {
      name: "Latte Supreme",
      description: "Rich and creamy coffee blend",
      price: 5.5,
      rating: 4.7,
      type: "Cappuccino",
    },
    {
      name: "Cappuccino Classic",
      description: "Smooth coffee with frothy milk",
      price: 4.8,
      rating: 4.5,
      type: "Cappuccino",
    },
    {
      name: "Espresso Bold",
      description: "Intense and strong coffee shot",
      price: 3.6,
      rating: 4.9,
      type: "Espresso",
    },
    {
      name: "Macchiato Delux",
      description: "Perfect balance of espresso and milk",
      price: 4.2,
      rating: 4.6,
      type: "Macchiato",
    },
    {
      name: "Americano Supreme",
      description: "Strong and bold brewed espresso",
      price: 4.0,
      rating: 4.8,
      type: "Americano",
    },
  ];

  const coffeeBeansData = [
    {
      name: "Arabica Gold",
      description: "Smooth and aromatic coffee beans",
      price: 7.0,
      rating: 4.8,
    },
    {
      name: "Robusta Royale",
      description: "Rich and full-bodied coffee beans",
      price: 6.5,
      rating: 4.6,
    },
    {
      name: "Sumatra Serenity",
      description: "Earthy and strong coffee beans",
      price: 8.0,
      rating: 4.7,
    },
    {
      name: "Brazilian Bliss",
      description: "Sweet and nutty flavor coffee beans",
      price: 6.8,
      rating: 4.5,
    },
    {
      name: "Ethiopian Essence",
      description: "Fruity and bright coffee beans",
      price: 7.5,
      rating: 4.9,
    },
  ];

  const filteredCoffeeData = coffeeData.filter((coffee) => {
    const matchesName = coffee.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = activeFilter === "All" || coffee.type === activeFilter;
    return matchesName && matchesType;
  });

  const filteredCoffeeBeansData = coffeeBeansData.filter((bean) =>
    bean.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSkeleton = () => (
    <li className="coffee-card skeleton">
      <div className="image-wrapper skeleton"></div>
      <div className="coffee-info">
        <h3 className="coffee-name skeleton"></h3>
        <p className="coffee-desc skeleton"></p>
      </div>
    </li>
  );

  const renderEmptyState = () => (
    <div className="empty-state">
      <IonIcon
        icon={search}
        style={{ fontSize: "48px", marginBottom: "1rem" }}
      />
      <h2>No results found</h2>
      <p>Try adjusting your search or filters</p>
    </div>
  );

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader>
          <div className="header-row">
            <IonIcon aria-hidden="true" icon={grid} className="grid-button" />
            <div className="profile-wrapper">
              <IonImg src="profile.jpg" className="profile-img" />
            </div>
          </div>
        </IonHeader>
        <div className="ion-title-wrapper">
          <IonTitle size="large">
            Find the best <br /> coffee for you
          </IonTitle>
        </div>

        <div className="search">
          <IonIcon aria-hidden="true" icon={search}></IonIcon>
          <IonInput
            value={searchTerm}
            onIonInput={(e: any) => setSearchTerm(e.target.value)}
            debounce={0}
            placeholder="Search for your coffee..."
            className="search-input"
          />
        </div>

        <ul className="coffees">
          {filters.map((filter) => (
            <li
              key={filter}
              className={filter === activeFilter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </li>
          ))}
        </ul>

        <ul className="coffee-elements">
          {isLoading
            ? Array(3)
                .fill(null)
                .map((_, i) => renderSkeleton())
            : filteredCoffeeData.length > 0
            ? filteredCoffeeData.map((coffee) => (
                <li key={coffee.name} className="coffee-card">
                  <div className="image-wrapper">
                    <IonImg
                      src={coffeeTypeImages[coffee.type] || "default_image_url"}
                      className="coffee-img"
                    />
                    <div className="rating-badge">
                      <IonIcon icon={star}></IonIcon>
                      <span>{coffee.rating}</span>
                    </div>
                  </div>
                  <div className="coffee-info">
                    <h3 className="coffee-name">{coffee.name}</h3>
                    <p className="coffee-desc">{coffee.description}</p>
                    <div className="coffee-bottom">
                      <span>
                        <span className="dollar">$</span>{" "}
                        {coffee.price.toFixed(2)}
                      </span>
                      <button className="add-button">
                        <IonIcon icon={add}></IonIcon>
                      </button>
                    </div>
                  </div>
                </li>
              ))
            : renderEmptyState()}
        </ul>

        <div className="coffee-beans">
          <span>Coffee Beans</span>
          <ul className="coffee-elements">
            {filteredCoffeeBeansData.map((bean, index) => (
              <li key={index} className="coffee-card">
                <div className="image-wrapper">
                  <IonImg
                    src={
                      coffeeBeansImages[index]?.urls?.small ||
                      "default_image_url"
                    }
                    className="coffee-img"
                  />
                  <div className="rating-badge">
                    <IonIcon icon={star}></IonIcon>
                    <span>{bean.rating}</span>
                  </div>
                </div>
                <div className="coffee-info">
                  <h3 className="coffee-name">{bean.name}</h3>
                  <p className="coffee-desc">{bean.description}</p>
                  <div className="coffee-bottom">
                    <span>
                      <span className="dollar">$</span> {bean.price.toFixed(2)}
                    </span>
                    <button className="add-button">
                      <IonIcon icon={add}></IonIcon>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
