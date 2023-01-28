import { ArchiveCard } from "../../components/archiveCard/archiveCard";
import { PageContainer } from "../../components/pageContainer/PageContainer";
import { PageTitle } from "../../components/pageTitle/pageTitle";
import "./arquivados.sass";

export function Arquivados() {
  return (
    <>
      <section className="ItensArquivados">
        <PageContainer>
          <PageTitle title="Arquivados"></PageTitle>
          <section className="description">
            <p>Ao resgatar um item arquivado ele estara disponivel no seus arquivos em um prazo de até 1 dia</p>
          </section>

          <div className="cards">
            <ArchiveCard
              ArchiveTypes="file"
              cardTitle="Readme.txt"
              date="06/09/2022,10:44 am"
              fileSize="120.2 mb"
            />
            <ArchiveCard
              ArchiveTypes="jpeg"
              cardTitle="Readme.jpeg"
              date="06/09/2022,10:44 am"
              fileSize="120.2 mb"
            />
            <ArchiveCard
              ArchiveTypes="mp3"
              cardTitle="Readme.mp3"
              date="06/09/2022,10:44 am"
              fileSize="120.2 mb"
            />
            <ArchiveCard
              ArchiveTypes="mp4"
              cardTitle="Readme.mp4"
              date="06/09/2022,10:44 am"
              fileSize="120.2 mb"
            />

            <ArchiveCard
              ArchiveTypes="txt"
              cardTitle="Readme.txt"
              date="06/09/2022,10:44 am"
              fileSize="120.2 mb"
            />
          </div>
        </PageContainer>
      </section>
    </>
  );
}
