import { SiAmazons3 } from "react-icons/si";
import { BsBucket } from "react-icons/bs";
import "./UploadArquivo.sass";
import { useState } from "react";
import  uploadImg  from "../../assets/imgs/uploadImg.png";
export function Upload() {
  const [SelectedButton, setSelectedbutton] = useState(false);
  const [fileName, setFileName] = useState("Selecione o arquivo");
  const [isSelected, setIsSelected] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e.target);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFileName(e.target.files[0].name);
    } else setFileName("Selecione o arquivo");
  }
  return (
    <>
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
          <img src={uploadImg} alt=""  />
        </section>
        <form action="post"  onSubmit={(e) => handleSubmit(e)}>
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
