import { SiAmazons3 } from "react-icons/si";
import { BsBucket } from "react-icons/bs";
import "./home.sass";
import { useState } from "react";
export function Home() {
  const [SelectedButton, setSelectedbutton] = useState(false);
  return (
    <>
      <main>
        <section className="pageTitle">
          Cadastro de um novo item no banco de dados
        </section>
        <section className="description">
          <p>
            Escolha o arquivo no seu computador e certitifique-se que a opçao
            correta esta selecionada
          </p>
        </section>
        <section className="selecType">
          <form >
            <div className="options">
              <div
                className={`option ${!SelectedButton ? "selected" : ""}`}
                onClick={() => setSelectedbutton(false)}
              >
                <h1>Bucket S3</h1>
                <SiAmazons3 />
                <input type={"file"} />
              </div>
              <div className={`option ${SelectedButton ? "selected" : ""}`} onClick={() => setSelectedbutton(true)}>
                <h1>S3 Glacier</h1>
                <BsBucket />
                <input type={"file"} />
              </div>
            </div>
            <div className="formButton">
              <button>Enviar</button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
