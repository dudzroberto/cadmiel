import { Link } from "react-router-dom";
import Cadmiel from "../../assets/ccadmiel.jpg";

import { Content, Main } from "./styles";

export default function Home() {
  return (
    <Main>
      <Content>
        <div class="container-fluid remove-padding">
          <div class="row g-5 text-center">
            <div class="col-12">
              <img src={Cadmiel} alt="Cadmiel 4.0" />
            </div>
            <div class="col-12">
              <Link to="/comparador">Comparador</Link>
              <Link to="/relatorios">Relatórios</Link>
            </div>
          </div>
        </div>
      </Content>
    </Main>
  );
}
