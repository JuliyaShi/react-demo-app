import styles from "./CatList.module.css";
export function CatList(props) {
  return (
    <>
      <h2 style={{textAlign:"center"}}>Pet Shop catalogue</h2>
      <div className={styles.List}>{props.children}</div>
    </>
  );
}