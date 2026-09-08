import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";
import SmoothScroll from "./components/common/SmoothScroll";

function App() {

    return (

        <CartProvider>

            <SmoothScroll />

            <AppRoutes />

        </CartProvider>

    );

}

export default App;
