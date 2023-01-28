import { ArchiveCard } from "../../components/archiveCard/archiveCard";
import { PageContainer } from "../../components/pageContainer/PageContainer";
import { PageTitle } from "../../components/pageTitle/pageTitle";
import './lixeira.sass'

export function Lixeira(){
    return (
        <>
        <section className="lixeira">
          <PageContainer>
            <PageTitle title="Itens excluidos"></PageTitle>
            <section className="description">
              <p>Itens excluidos ficarão aqui no prazo de ate 30 dias</p>
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
    )
}