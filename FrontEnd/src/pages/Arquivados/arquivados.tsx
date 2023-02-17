import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { apiGetItensContent, content } from "../../@types/apiGetItensContent";
import { ArchiveCard } from "../../components/archiveCard/archiveCard";
import { Loading } from "../../components/loading/Loading";
import { PageContainer } from "../../components/pageContainer/PageContainer";
import { PageTitle } from "../../components/pageTitle/pageTitle";
import Axios from "../../utils/AxiosConfig";
import "./arquivados.sass";

export function Arquivados() {
  const [itens, setItens] = useState<content[]>([]);
  const [isloading,setIsloading] = useState(false)
  useEffect(() => {
    setIsloading(true)
    Axios.get("/edvan7-2d6a6571fd7c373f8629").then((data:AxiosResponse<apiGetItensContent, apiGetItensContent>) => {
      
      const S3Items = data.data.itens.Content;
      const Data = S3Items.filter((data)=>{
        return data.storageClass === 'GLACIER'
      })
      setItens(Data);
      console.log(Data)
      setIsloading(false)
    });
  }, [""]);
  return (
    <>
    <Loading isLoading={isloading}/>
      <section className="ItensArquivados">
        <PageContainer>
          <PageTitle title="Arquivados"></PageTitle>
          <section className="description">
            <p>Ao resgatar um item arquivado ele estara disponivel no seus arquivos em um prazo de até 1 dia</p>
          </section>

          <div className="cards">
            {itens.map((data) => {
              console.log(data)
              const DataArquivo = new Date(data.LastModified).toDateString()
            
               
              return (
                
                <ArchiveCard
                  itemKey={data.key}
                  ArchiveTypes={data.type}
                  cardTitle={data.itemName}
                  date={data.LastModified}
                  fileSize={data.size}
                  cardType={data.storageClass}
                />
              );
            })}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
