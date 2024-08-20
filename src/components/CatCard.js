import { useState } from "react";
import styles from "./CatCard.module.css";

export function CatCard({
  cat,
  isFavorite,
  background = "slategray",
  onEdit,
  onPurchase,
  onFavorite,
}) {
  const [showMore, setShowMore] = useState(false);

  function handleTitleClick() {
    const newTitle = cat.title === "Dark Black" ? cat.originalTitle : "Dark Black";
    onEdit(cat.id, newTitle);
  }

  function handleClick() {
    onPurchase(cat.id, cat.stockCount - 1);
  }

  function handleTwoClicks() {
    onPurchase(cat.id, cat.stockCount - 2);
  }

  const buttonText =
    cat.title === "Dark Black" ? "Change to default name" : "Change cat's name";

  return (
    <article className={styles.Container} style={{ background }}>
      <button
        className={styles.Favorite}
        onClick={() => onFavorite(cat.id)}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>
      {cat.id === 2 && (
      <button onClick={handleTitleClick}>{buttonText}</button>
      )}
      <h2>{cat.title}</h2>
      <img
        src={cat.imageSrc}
        alt={cat.title}
        width={128}
        height={128}
      />
      <p>
        Fun Facts:{" "}
        <button onClick={() => setShowMore(!showMore)}>
          {showMore ? "hide" : "show"}
        </button>
      </p>
      {showMore && (
        <ul className={styles.Funfacts}>
          {cat.funfacts.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      )}
      <Status stockCount={cat.stockCount} />
      {cat.stockCount > 0 && (
        <>
          <p>Price: ${cat.price}</p>
          <button onClick={handleClick}>Buy</button>
        </>
      )}
      {cat.stockCount > 1 && (
        <button onClick={handleTwoClicks}>Buy 2</button>
      )}
    </article>
  );
}

function Status({ stockCount }) {
  const notAvailableTemplate = (
    <p className={styles.NotAvailableStatus}>Not available</p>
  );

  const availableTemplate = (
    <p className={styles.AvailableStatus}>{stockCount} cats available</p>
  );

  return stockCount === 0 ? notAvailableTemplate : availableTemplate;
}
