import { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiGetItensContent, content } from "../../@types/apiGetItensContent";
import { ArchiveCard } from "../../components/archiveCard/archiveCard";
import { Loading } from "../../components/loading/Loading";
import { PageContainer } from "../../components/pageContainer/PageContainer";
import { PageTitle } from "../../components/pageTitle/pageTitle";
import CardPageReload from "../../context/cardPageReload";
import Axios from "../../utils/AxiosConfig";
import "./lixeira.sass";
import nothingHereImg from "../../assets/imgs/nothingHere.png";
import GetToken from "../../utils/GetToken";

export function Lixeira() {
  const [itens, setItens] = useState<content[]>([]);
  const [isloading, setIsloading] = useState(false);
  const { isCardReload, setIsCardReload } = useContext(CardPageReload);
  const bucketName = localStorage.getItem("bucketName");
  const token = GetToken();
  

  useEffect(() => {
    setIsloading(true);
    Axios.get(`/${bucketName}`,{
      headers:{
        'Authorization':token
      }
    })
      .then((data: AxiosResponse<apiGetItensContent, apiGetItensContent>) => {
        const S3Items = data.data.itens.Content;
        const Data = S3Items.filter((data) => {
          return data.storageClass === "GLACIER_IR";
        });
        setItens(Data);
       
        setIsloading(false);
      })
      .catch((e) => {
        toast.error("Algo deu errado. Porfavor reinicie seu navegador ");
        setIsloading(false);
      });
  }, [isCardReload]);
  return (
    <>
      <Loading isLoading={isloading} />
      <section className="lixeira">
        <PageContainer>
          <PageTitle title="Itens excluidos"></PageTitle>
          {itens.length > 0 ?(
            <>
            <section className="description">
              <p>Itens excluidos ficarão aqui no prazo de ate 30 dias</p>
            </section>

            <div className="cards">
              {itens.map((data) => {
                
                const DataArquivo = new Date(data.LastModified).toDateString();

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
          </>


          ) : <img src={nothingHereImg}/> }
          
        </PageContainer>
      </section>
    </>
  );
}
