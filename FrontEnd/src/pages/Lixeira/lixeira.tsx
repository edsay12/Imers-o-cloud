import { useEffect, useState } from "react";
import { ArchiveCard } from "../../components/archiveCard/archiveCard";
import { Loading } from "../../components/loading/Loading";
import { PageContainer } from "../../components/pageContainer/PageContainer";
import { PageTitle } from "../../components/pageTitle/pageTitle";
import Axios from "../../utils/AxiosConfig";
import "./lixeira.sass";

export function Lixeira() {
  const [itens, setItens] = useState([]);
  const [isloading, setIsloading] = useState(false);
  useEffect(() => {
    setIsloading(true);
    Axios.get("/edvan7-2d6a6571fd7c373f8629").then((data) => {
      console.log(data);
      const S3Items = data.data.itens.Contents;
      const Data = S3Items.filter(
        (data: any) => data.StorageClass === "GLACIER_IR"
      );
      setItens(Data);
      setIsloading(false);
    });
  }, [""]);
  return (
    <>
    <Loading isLoading={isloading}/>
      <section className="lixeira">
        <PageContainer>
          <PageTitle title="Itens excluidos"></PageTitle>
          <section className="description">
            <p>Itens excluidos ficarão aqui no prazo de ate 30 dias</p>
          </section>

          <div className="cards">
            {itens.map((data) => {
              console.log(data);
              const DataArquivo = new Date(data.LastModified).toDateString();

              return (
                <ArchiveCard
                  ArchiveTypes={data.Key.split(".")[1]}
                  cardTitle={`${data.Key.split("-")[1]}.${
                    data.Key.split(".")[1]
                  }`}
                  date={`${DataArquivo}`}
                  fileSize="120.2 mb"
                />
              );
            })}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
