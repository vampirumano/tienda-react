const Cart = ({carrito, eliminarDelCarrito, aumentarCantidad, disminuirCantidad}) => {
    
    const totalCarrito = carrito.reduce((suma, producto)=>suma+producto.precio*producto.cantidad,0)
        return(
            <div>
                {
                    carrito.map((producto)=>{
                        const {id, nombre, precio, categoria, stock,cantidad}=producto;
                        const stotckDisponible = stock-cantidad;
                        return(
                            <div key={id}>
                                <h3>{nombre}</h3>
                                <p>Precio unitario: ${precio}</p>
                                <p>Unidades: {cantidad}</p>
                                <p>Subtotal {cantidad*precio}</p>
                                <p>{stotckDisponible} Disponible</p>
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
