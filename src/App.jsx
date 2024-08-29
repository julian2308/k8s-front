import { useEffect, useState } from "react";

function App() {
  const ENDPOINT = "http://k8s-backend:8081/products";
  const CORSHEADER = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
  }
  const [products, setProducts] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [trigger, setTrigger] = useState(false);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const createProduct = () => {
    fetch(`${ENDPOINT}/${inputValue}`, {
      method: "POST",
      headers: CORSHEADER,
    })
      .then(() => {
        alert("Product added successfully!");
        setTrigger(!trigger);
        setInputValue("");
      });
  };

  const getProducts = () => {
    fetch(ENDPOINT, {
      headers: CORSHEADER,
    })
      .then((response) => response.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    getProducts();
  }, [trigger]);

  return (
    <>
      <div>
        Type the product you want to add:
        <input
          type="text"
          id="product"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={createProduct}>Add product</button>
      </div>

      <h1>These are our products</h1>
      {products ? (
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              <h2>{product}</h2>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
