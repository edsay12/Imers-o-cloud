import { BsArchive, BsLink45Deg, BsThreeDotsVertical } from "react-icons/bs";
import { FaFolder } from "react-icons/fa";
import "./archiveCard.sass";
import { FcFile, FcPicture, FcStart, FcHeadset } from "react-icons/fc";
import { AiOutlineDownload } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { MdOutlineDriveFileMove } from "react-icons/md";
import { useContext, useState } from "react";
import CardModalContext from "../../context/cardModalContext";
import { IoMdCloseCircleOutline } from "react-icons/io";

type ArchiveTypes = "file" | "txt" | "jpeg" | "png" | "mp3" | "mp4";
type PropType = {
  cardTitle: string;
  ArchiveTypes: ArchiveTypes;
  date: string;
  fileSize: string;
};
const iconsArray = {
  file: <FaFolder />,
  txt: <FcFile />,
  jpeg: <FcPicture />,
  png: <FcPicture />,
  mp3: <FcHeadset />,
  mp4: <FcStart />,
  default: <FcFile />,
};

export function ArchiveCard({
  ArchiveTypes,
  cardTitle,
  date,
  fileSize,
}: PropType) {
  const [isModalCarOpen, setIsModalOpen] = useState(false);

  const { isModalCardOpen, setIsCardModalOpen } = useContext(CardModalContext); // context

  function openCardModal() {
    if(isModalCardOpen){
      return
    }else{
      setIsCardModalOpen(true)
      setIsModalOpen(true)
      

    }
    
  }
  function closeModal(){
    setIsCardModalOpen(false)
    setIsModalOpen(false)

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
        <div className={isModalCarOpen ? "cardModal selected" : "cardModal"}>
          <div className="modalCloser">
            <div className="closeIco" onClick={()=> closeModal()}>
              <IoMdCloseCircleOutline/>
            </div>
          </div>
          <div className="options" onClick={()=> closeModal()}>
            <div className="option">
              <div className="optionIco" onClick={()=> closeModal()}>
                <AiOutlineDownload />
              </div>
              <div className="optiontext">Download</div>
            </div>
            <div className="option" onClick={()=> closeModal()}>
              <div className="optionIco" >
                <BsArchive />
              </div>
              <div className="optiontext">Arquivar</div>
            </div>
            <div className="option" onClick={()=> closeModal()}>
              <div className="optionIco">
                <BsLink45Deg />
              </div>
              <div className="optiontext">Gerar Link</div>
            </div>
            <div className="option" onClick={()=> closeModal()}>
              <div className="optionIco">
                <MdOutlineDriveFileMove />
              </div>
              <div className="optiontext">Mover Para</div>
            </div>
            <div className="option" onClick={()=> closeModal()}>
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
