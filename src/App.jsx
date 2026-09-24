import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'
import objeto from './components/prueba'



const productos = [
  {
    id: 1,
    nombre: 'Zapatillas Nike',
    precio: 90.99,
    categoria: 'Calzado',
    stock: 10
  },
  {
    id: 2,
    nombre: 'Camiseta Adidas',
    precio: 49.99,
    categoria: 'Ropa',
    stock: 20
  },
  {
    id: 3,
    nombre: 'Chaqueta Puma',
    precio: 70.99,
    categoria: 'Ropa',
    stock: 10
  },  
];



function App() {

    //Estado del carrito
    
    const carritoGuardado = localStorage.getItem('carrito');
    
    

    const [carrito, setCarrito]= useState(carritoGuardado === null? []: JSON.parse(carritoGuardado));

    //Estado del input
    const [busqueda, setBusqueda] = useState("");
    //console.log(busqueda);

  

    //Productos filtrados
    const productosFiltrados = productos.filter(item=> {
      const nombreProducto = item.nombre.toLowerCase();
      const nombreBusqueda = busqueda.toLowerCase();
      return nombreProducto.includes(nombreBusqueda)
    });
    
    

    //Función agregar al carrito. Recibe el producto de ProductCard al hacer click en el botón
    const agregarAlCarrito = (producto) =>{
      const productoExistente= carrito.find(item=>item.id===producto.id);

      if(productoExistente){
        const nuevoCarrito= carrito.map(item=>item.id===producto.id && item.cantidad < producto.stock?{...item, cantidad: item.cantidad+1}:item);
        setCarrito(nuevoCarrito)
      }else{
        setCarrito([...carrito, {...producto, cantidad:1}])
      }
      // console.log(productoExistente);
      // console.log(carrito);
  
    }
    //Aumentar cantidad recibe el id del producoto desdec Cart
    const aumentarCantidad = (id)=>{
      
      setCarrito(carrito.map(item=>item.id === id && item.cantidad < item.stock?{...item, cantidad: item.cantidad + 1} : item))
    }
    const disminuirCantidad = (id)=>{

      const producto = carrito.find(item=>item.id === id);

      if(producto.cantidad>1){
          setCarrito(carrito.map(item=>item.id === id ?{...item, cantidad: item.cantidad - 1} : item));
        }else{
          setCarrito(carrito.filter(item=>item.id !==id))
        }
    }

    

    //Función eliminar del carrito. Recibe el id del producto de Cart de Cart.js
    const eliminarDelCarrito = (id) =>{
      setCarrito(carrito.filter(producto=> producto.id !== id))
    };

    //Cantidad de productos en el carrito
    const totalProductos = carrito.reduce((total, producto)=>total + producto.cantidad,0);

    useEffect(()=>{
      localStorage.setItem("carrito", JSON.stringify(carrito));
      
      
    },[carrito]);

    


    // const carritoLS = localStorage.getItem("carrito");
    // console.log(typeof carritoLS);

    // const carritoRecuperado = JSON.parse(carritoLS);
    // console.log(typeof carritoRecuperado)



  return (
    <div>
      <Header/>
      <input
        type="text"
        placeholder='Buscar producto'
        value={busqueda}
        onChange={e=>setBusqueda(e.target.value)}

      />
      <p>La mejor tienda online</p>
      <p>Explora nuestros productos</p>
      <button>Ver productos</button>

      {
        productosFiltrados.length === 0 ? <p>Producto no encontrado</p>:productosFiltrados.map(producto=>{
          return(
            
            <ProductCard key={producto.id} producto={producto} agregarAlCarrito={agregarAlCarrito}/>
          )
          
          
        })
      }
      

      {

      }

      {carrito.length === 0? <p>Carrito vacío</p>: <p>Productos en el carrito ({totalProductos})</p>}
      <p>Productos diferentes {carrito.length}</p>

      <Cart
        carrito = {carrito}
        aumentarCantidad = {aumentarCantidad}
        disminuirCantidad={disminuirCantidad}
        eliminarDelCarrito= {eliminarDelCarrito}
      />


    </div>
  );
}
export default App