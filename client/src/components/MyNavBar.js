//import modules
import { Navbar, Container, NavDropdown } from "react-bootstrap";
import { toast } from "react-toastify";

// navbar function
const MyNavBar = ({ setAuth, isAuth }) => {
  // logout function
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully.");
  };

  const GuestDropDown = () => {
    return (
      <NavDropdown title="">

        <NavDropdown.Item href={"/login"}>Login</NavDropdown.Item>
        <NavDropdown.Item href={"/register"}>Get Started</NavDropdown.Item>
      </NavDropdown>
    );
  };

  const UserDropDown = () => {
    return (
      <NavDropdown title="">
        <NavDropdown.Item
          onClick={(e) => {
            logout(e);
          }}
        >
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    );
  };

  const LoggedDropDown = ({ isAuth }) => {
    return isAuth ? <UserDropDown /> : <GuestDropDown />;
  };

  return (
    <div>
      {/* bootstrap navbar */}
      <Navbar bg="dark" variant="dark">
        <Container data-testid="container">
          <Navbar.Brand href="/">
            <img
              alt=""
              src="https://raw.githubusercontent.com/adnjoo/capstone/main/assets/mona2.png"
              width="25"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            artExplorer
          </Navbar.Brand>
          <LoggedDropDown isAuth={isAuth} />
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavBar;