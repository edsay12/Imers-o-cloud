import "./home.sass";
import { PageContainer } from "../../components/pageContainer/PageContainer";
import { PageTitle } from "../../components/pageTitle/pageTitle";
import nothingHere from "../../assets/imgs/nothingHere.png";
import { FaFolder } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { ArchiveCard } from "../../components/archiveCard/archiveCard";
import { useEffect, useState } from "react";
import Axios from "../../utils/AxiosConfig";
import { Loading } from "../../components/loading/Loading";
export function Home() {
  const [itens, setItens] = useState([]);
  const [isloading,setIsloading] = useState(false)
  useEffect(() => {
    setIsloading(true)
    Axios.get("/edvan7-2d6a6571fd7c373f8629").then((data) => {
      
      const S3Items = data.data.itens.Contents;
      const Data = S3Items.filter(
        (data: any) => data.StorageClass === "STANDARD"
      );
      setItens(Data);
      setIsloading(false)
    });
  }, [""]);

  return (
    <>
    <Loading isLoading={isloading}/>
      <section className="home">
        <PageContainer>
          <PageTitle title="Meus arquivos"></PageTitle>

          <div className="cards">
            {itens.map((data) => {
              console.log(data)
              const DataArquivo = new Date(data.LastModified).toDateString()
            
               
              return (
                
                <ArchiveCard
                  itemKey={data.Key}
                  ArchiveTypes={data.Key.split('.')[1]}
                  cardTitle={`${data.Key.split('-')[1]}.${data.Key.split('.')[1]}`}
                  date={`${DataArquivo}`}
                  fileSize="120.2 mb"
                />
              );
            })}

            {/* <ArchiveCard
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
              /> */}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
