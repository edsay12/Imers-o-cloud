import "./home.sass";
import { PageContainer } from "../../components/pageContainer/PageContainer";
import { PageTitle } from "../../components/pageTitle/pageTitle";
import nothingHere from '../../assets/imgs/nothingHere.png'

export function Home() {
  return (
    <>
      <PageContainer>
        <PageTitle title="Home"></PageTitle>
        <img src={nothingHere}></img>
        <p>Nada aqui ainda !</p>

      </PageContainer>
    </>
  );
}
