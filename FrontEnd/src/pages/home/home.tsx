import "./home.sass";
import { PageContainer } from "../../components/pageContainer/PageContainer";
import { PageTitle } from "../../components/pageTitle/pageTitle";
import nothingHere from "../../assets/imgs/nothingHere.png";
import { FaFolder } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ArchiveCard } from "../../components/archiveCard/archiveCard";
import { useContext, useEffect, useState } from "react";
import Axios from "../../utils/AxiosConfig";
import { Loading } from "../../components/loading/Loading";
import { apiGetItensContent, content } from "../../@types/apiGetItensContent";
import { AxiosResponse } from "axios";
import CardPageReload from "../../context/cardPageReload";
import { toast } from "react-toastify";
import nothingHereImg from "../../assets/imgs/nothingHere.png";
export function Home() {
  const [itens, setItens] = useState<content[]>([]);
  const [isloading, setIsloading] = useState(false);
  const { isCardReload, setIsCardReload } = useContext(CardPageReload);
  const bucketName = localStorage.getItem("bucketName");
 
  useEffect(() => {
    setIsloading(true);
    Axios.get(`/${bucketName}`)
      .then((data: AxiosResponse<apiGetItensContent, apiGetItensContent>) => {
        const S3Items = data.data.itens.Content;
        const Data = S3Items.filter((data) => {
          return data.storageClass === "STANDARD";
        });
        setItens(Data);
        console.log(Data);
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

      <section className="home">
        <PageContainer>
          <PageTitle title="Meus arquivos"></PageTitle>

          {itens.length > 0 ? (
            <div className="cards">
              {itens.map((data) => {
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
          ) : (
            <img src={nothingHereImg} />
          )}
        </PageContainer>
      </section>
    </>
  );
}
