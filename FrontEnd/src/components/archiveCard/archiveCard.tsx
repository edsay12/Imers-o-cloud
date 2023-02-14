import { BsArchive, BsLink45Deg, BsThreeDotsVertical } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";
import "./archiveCard.sass";
import { FcFile, FcPicture, FcStart, FcHeadset } from "react-icons/fc";
import { AiOutlineDownload, AiOutlineFilePdf } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { MdOutlineDriveFileMove } from "react-icons/md";
import { useContext, useState } from "react";
import CardModalContext from "../../context/cardModalContext";
import { IoMdCloseCircleOutline } from "react-icons/io";
import React from "react";
import { useLocation } from "react-router-dom";
import Axios from "../../utils/AxiosConfig";
import CardPageReload from "../../context/cardPageReload";

type ArchiveTypes = "file" | "txt" | "jpeg" | "png" | "mp3" | "mp4" | string;
type PropType = {
  cardTitle: string;
  ArchiveTypes: ArchiveTypes;
  date: string;
  fileSize: string;
  itemKey: string;
};
const iconsArray = {
  file: <FaFolder />,
  txt: <FcFile />,
  pdf: <AiOutlineFilePdf />,
  jpeg: <FcPicture />,
  png: <FcPicture />,
  gif: <FcPicture />,
  mp3: <FcHeadset />,
  mp4: <FcStart />,
  default: <FcFile />,
};

export function ArchiveCard({
  ArchiveTypes,
  cardTitle,
  date,
  fileSize,
  itemKey,
}: PropType) {
  const [isModalCarOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const { isModalCardOpen, setIsCardModalOpen } = useContext(CardModalContext); // context
  const { isCardReload, setIsCardReload } = useContext(CardPageReload);

  function openCardModal() {
    if (isModalCardOpen) {
      return;
    } else {
      setIsCardModalOpen(true);
      setIsModalOpen(true);
    }
  }
  function closeModal() {
    setIsCardModalOpen(false);
    setIsModalOpen(false);
  }
  React.useEffect(() => {
    // runs on location, i.e. route, change
    setIsCardModalOpen(false);
  }, [location]);

  function dowload() {
    Axios.get(
      "http://localhost:8081/edvan7-2d6a6571fd7c373f8629/c913df2b46a38890223b-logo.png"
    );
  }
  function GerarLink() {
    Axios.get(
      `http://localhost:8081/url/edvan7-2d6a6571fd7c373f8629/${itemKey}`
    ).then((data) => {
      navigator.clipboard.writeText(data.data.url);
      alert("Link copiado com sucesso");
    });
  }
  function arquivar() {
    Axios.put(
      `http://localhost:8081/edvan7-2d6a6571fd7c373f8629/${itemKey}`
    ).then((data) => {
      setIsCardReload(!isCardReload);
      alert("Item arquivado com sucesso");
    });
  }
  function deleteItem() {
    Axios.delete(
      `http://localhost:8081/edvan7-2d6a6571fd7c373f8629/${itemKey}`
    ).then((data) => {
      setIsCardReload(!isCardReload);
      alert("Item deletado com sucesso");
    });
  }

  return (
    <>
      <div className="cardItem">
        <div className="card">
          <div className="section1">
            <div className="cardHeader">
              <div className="icoFile">
                {iconsArray[ArchiveTypes]
                  ? iconsArray[ArchiveTypes]
                  : iconsArray["default"]}
              </div>
              <div className="icoAction" onClick={() => openCardModal()}>
                <BsThreeDotsVertical />
              </div>
            </div>
            <div className="cardTitle">
              <h3>{cardTitle}</h3>
            </div>
            <div className="cardDate">
              {/* 06/09/2022,10:44 am */}
              <div className="date">{date}</div>
            </div>
          </div>

          <div className="fileDetails">
            <div className="fileSize">{fileSize}</div>
          </div>
        </div>
        {/* modal */}
        <div className={isModalCarOpen ? "cardModal selected" : "cardModal"}>
          <div className="modalCloser" onClick={() => closeModal()}>
            <div className="closeIco">
              <IoMdCloseCircleOutline />
            </div>
          </div>
          <div className="options">
            <div className="option" onClick={() => closeModal()}>
              <div className="optionIco">
                <AiOutlineDownload />
              </div>
              <div className="optiontext">
                <a
                  href={`http://localhost:8081/edvan7-2d6a6571fd7c373f8629/${itemKey}`}
                >
                  Download
                </a>
              </div>
            </div>
            <div
              className="option"
              onClick={() => {
                closeModal();
                arquivar();
              }}
            >
              <div className="optionIco">
                <BsArchive />
              </div>
              <div className="optiontext">Arquivar</div>
            </div>
            <div
              className="option"
              onClick={() => {
                closeModal();
                GerarLink();
              }}
            >
              <div className="optionIco">
                <BsLink45Deg />
              </div>
              <div className="optiontext">Gerar Link</div>
            </div>
            <div className="option" onClick={() => closeModal()}>
              <div className="optionIco">
                <MdOutlineDriveFileMove />
              </div>
              <div className="optiontext">Mover Para</div>
            </div>
            <div className="option" onClick={() => {
              closeModal()
              deleteItem()
              }}>
              <div className="optionIco">
                <CiTrash />
              </div>
              <div className="optiontext">Remover</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
