import { useState } from "react";
import { Fragment } from "react";
import { CatList } from "./components/CatList";
import { CatCard } from "./components/CatCard";
import { CatFilter } from "./components/CatFilter";
import { cats as catsData } from "./data/cats";
import styles from "./App.module.css";

function App() {
  const [cats, setCats] = useState(
    catsData.map((cat) => ({ ...cat, originalTitle: cat.title }))
  );
  const [filters, setFilters] = useState({
    price: {
      min: 0,
      max: 999,
    },
    other: "other value",
  });
  const [favorites, setFavorites] = useState([]);

  function handleTitle(catId, newTitle) {
    setCats((prevcats) =>
      prevcats.map((cat) =>
        cat.id === catId
          ? { ...cat, title: cat.title === "Dark Black" ? cat.originalTitle : newTitle }
          : cat
      )
    );
  }

  function handlePurchase(catId, stockCount) {
    setCats((prevcats) =>
      prevcats.map((cat) =>
        cat.id === catId ? { ...cat, stockCount } : cat
      )
    );
  }

  function handleFilter(key, value) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: {
        ...prevFilters.price,
        [key]: value,
      },
    }));
  }

  function handleFavorite(catId) {
    if (favorites.includes(catId)) {
      setFavorites((prevFavotites) =>
        prevFavotites.filter((id) => id !== catId)
      );
    } else {
      setFavorites((prevFavotites) => [...prevFavotites, catId]);
    }
  }

  return (
    <div className={styles.App}>
      <CatList>
        {cats.map((cat) => (
          <CatCard
            key={cat.title}
            cat={cat}
            isFavorite={favorites.includes(cat.id)}
            onEdit={handleTitle}
            onPurchase={handlePurchase}
            onFavorite={handleFavorite}
          />
        ))}
      </CatList>

      <h2>Cats filtered by price</h2>
      <CatFilter filters={filters} onFilter={handleFilter} />
      {cats
        .filter(
          ({ price }) =>
            price >= filters.price.min && price <= filters.price.max
        )
        .map(({ title, price }) => (
          <Fragment key={title}>
            <hr className={styles.ListDivider} />
            <p className={styles.ListTitle}>
              {title} cost ${price}
            </p>
          </Fragment>
        ))}
    </div>
  );
}

export default App;
