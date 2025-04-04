import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import CategoryDetails from "../pages/Details/CategoryDetails";
import MedicineDetails from "../pages/Details/MedicineDetails";
import Cart from "../pages/Cart/Cart";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout></MainLayout>}>
        <Route index element={<Home></Home>}></Route>
        <Route path="category/:categoryName" element={<CategoryDetails></CategoryDetails>} />
        <Route path="medicines/:id" element={<MedicineDetails></MedicineDetails>} />
        <Route path="carts" element={<Cart></Cart>} />
      </Route>
      {/* <Route path="/shop" element={<Shop />} /> */}
      <Route path="/register" element={<Register></Register>} />
      <Route path="/login" element={<Login></Login>} />
    </Routes>



    // <Routes>
    //     <Route path="/" element={<AppLayout></AppLayout>}>
    //         <Route index element={<Home></Home>}></Route>
    //         <Route path="/create" element={<Create></Create>}></Route>
    //         <Route path="/creations" element={<Creations></Creations>}></Route>
    //         <Route
    //             path="/creation/:id"
    //             element={<SingleImage></SingleImage>}
    //         ></Route>
    //     </Route>
    // </Routes>
  );
};

export default Root;