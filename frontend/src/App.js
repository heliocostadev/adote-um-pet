
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import Message from "./components/layout/Message";

// pages
import Home from "./components/pages/Home";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Profile from "./components/pages/User/Profile";
import MyPets from "./components/pages/Pet/MyPets"
import AddPet from "./components/pages/Pet/AddPet";
import EditPet from "./components/pages/Pet/EditPet"; // Certifique-se que este é o componente correto
import PetDetails from "./components/pages/Pet/PetDetails";
import MyAdoptions from "./components/pages/Pet/MyAdoptions";

/* contexts */
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/user/profile">
              <Profile />
            </Route>
            <Route path="/pet/mypets">
              <MyPets />
            </Route>
            <Route path="/pet/add">
              <AddPet />
            </Route>
            <Route path="/pet/MyAdoptions">
              <MyAdoptions />
            </Route>
            {/* ROTA DE EDIÇÃO VEM ANTES DA ROTA DE DETALHES */}
            <Route path="/pet/edit/:id">
              <EditPet />
            </Route>
            {/* ROTA DE DETALHES VEM DEPOIS */}
            <Route path="/pet/:id">
              <PetDetails />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;

