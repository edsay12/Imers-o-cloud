import { SiAmazons3 } from "react-icons/si";
import { BsBucket } from "react-icons/bs";
import "./UploadArquivo.sass";
import { useState } from "react";
import uploadImg from "../../assets/imgs/uploadImg.png";
import Axios from "../../utils/AxiosConfig";
import { Loading } from "../../components/loading/Loading";
import { toast } from "react-toastify";
import GetToken from "../../utils/GetToken";
export function Upload() {
  const [SelectedButton, setSelectedbutton] = useState(false);
  const [fileName, setFileName] = useState("Selecione o arquivo");
  const [isSelected, setIsSelected] = useState(false);
  const [item, setItem] = useState<any | void>("");
  const [isloading, setIsloading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const bucketName = localStorage.getItem("bucketName");
    const token = GetToken();

    e.preventDefault();
    const formData = new FormData();
    formData.append("arquivo", item);

    
    if (!item) {
      toast.error("Imagem não selecionada");
      return;
    }
    try {
      setIsloading(true);
      const response = await Axios.post(`/${bucketName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": token,
        },
      });

      
      setIsloading(false);
      setItem("");
      setFileName("Selecione o arquivo");
      toast.success("item adicionado com sucesso");
    } catch (error) {
      setItem("");
      setFileName("Selecione o arquivo");
      setIsloading(false);
      toast.error("Erro desconhecido");
    }
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      
      setFileName(e.target.files[0].name);
      setItem(e.target.files[0]);
      e.target.value = "";
    } else setFileName("Selecione o arquivo");
  }

  return (
    <>
      <Loading isLoading={isloading} />
      <main className="upload">
        <section className="title">
          Cadastro de um novo item no banco de dados
        </section>
        <section className="description">
          <p>
            Escolha o arquivo no seu computador e certitifique-se que a opçao
            correta esta selecionada
          </p>
        </section>
        <section className="options">
          <img src={uploadImg} alt="" />
        </section>
        <form action="post" onSubmit={(e) => handleSubmit(e)}>
          <div className="fileInput">
            <div className="text">{fileName}</div>
            <label htmlFor="newItem">
              <div className="labelButton">
                <div className="button">Procurar</div>
              </div>
            </label>
            <input
              type="file"
              id="newItem"
              name="userItem"
              onChange={(e) => handleChange(e)}
              placeholder=""
            />
          </div>
          <button>Enviar</button>
        </form>
      </main>
    </>
  );
}
