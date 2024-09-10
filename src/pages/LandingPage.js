import NavBarPre from "../components/Navbar/NavbarPrelogin";
import LoginRegisterCard from "../components/Login/LoginRegisterCard";
import Footer from "../components/Footer/Footer";
import { useTranslation } from 'react-i18next';

export default function LandingPage() {

  const { t } = useTranslation();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <NavBarPre />
      <LoginRegisterCard />
      <Footer />
    </div>
  );
}
