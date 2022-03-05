import ReconForm from "./components/Reconform";
import { appContainer } from "./styles";

export default function App() {
  return (
    <div style={appContainer()}>
      <ReconForm />
    </div>
  );
}
