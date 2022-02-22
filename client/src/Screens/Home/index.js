import { useSelector } from 'react-redux';
import Dashboard from "../Dashboard";
import LandingPage from "../LandingPage";

export default function Home() {
    const { auth } = useSelector(state => state);
    return (auth.token ? <Dashboard /> : <LandingPage />);
}