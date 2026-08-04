import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";

import "./App.css";

function App() {

    return (

        <CartProvider>

            <AppRoutes />

        </CartProvider>

    );

}

export default App;