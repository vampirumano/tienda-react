const Cart = ({carrito, eliminarDelCarrito, aumentarCantidad, disminuirCantidad}) => {
    const totalCarrito = carrito.reduce((suma, producto)=>suma+producto.precio*producto.cantidad,0)
        return(
            <div>
                {
                    carrito.map((producto)=>{
                        const {id, nombre, precio, categoria, stock,cantidad}=producto;
                        return(
                            <div key={id}>
                                <h3>{nombre}</h3>
                                <p>Precio: ${precio}</p>
                                <p>Cantidad: {cantidad}</p>
                                <p>Categoría{categoria}</p>
                                <p>{stock} disponibles</p>
                                <button onClick={()=>disminuirCantidad(id)}>-</button>
                                <button onClick={()=>aumentarCantidad(id)}>+</button>
                                <button onClick={()=>eliminarDelCarrito(id)}>Eliminar</button>
                            </div>
                        )
                    })
                }
                <h2>Total {totalCarrito}</h2>
            </div>
        )


}

export default Cart
