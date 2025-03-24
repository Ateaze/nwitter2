import { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fabse";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  console.log(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter2</footer>
    </>
  );
}

export default App;
