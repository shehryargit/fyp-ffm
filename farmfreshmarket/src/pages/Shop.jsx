function Shop({ addToCart }) {
  const products = [ /* dummy or fetched products */ ];

  return (
    <div className="p-6">
      <h2 className="text-3xl mb-4">Shop</h2>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="p-4 border rounded">
            <h3 className="font-bold">{product.name}</h3>
            <p>Rs. {product.price}</p>
            <button onClick={() => addToCart(product)} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
