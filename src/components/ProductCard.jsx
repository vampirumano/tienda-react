const ProductCard = ({producto, agregarAlCarrito }) =>{
    const {id, nombre, precio, categoria, stock}= producto;
    return (
        <div>
            <h2>{nombre}</h2>
            <p>Precio: {precio}</p>
            <p>Categoría: {categoria}</p>
            <p>{stock} disponibles</p>
            <button onClick={()=>agregarAlCarrito(producto)}>Agregar al carrito</button>
        </div>
    )
}

export default ProductCard