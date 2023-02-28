import "./sideBar.sass";
import {useState} from 'react'
import { AiOutlineDeliveredProcedure, AiOutlineSearch } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { FiHelpCircle, FiLogOut } from "react-icons/fi";
import { IoIosArrowForward, IoMdSettings } from "react-icons/io";
import { FaRegNewspaper } from "react-icons/fa";
import { SlTrash } from "react-icons/sl";
import { BsArchive } from "react-icons/bs";
import {MdUploadFile} from 'react-icons/md'
import { Link, NavLink, useNavigate } from "react-router-dom";
export function SideBar() {
    const [isSideBarClosed,SetIsSideBarClosed] = useState(false)
    const navigate = useNavigate()
    function logout(){
      localStorage.removeItem('UserAcess')
      navigate('/login')

    }
  return (
    <div className={`sideBar ${isSideBarClosed ? 'close' : ''}` }>
        <div className="sideButton" onClick={()=>SetIsSideBarClosed(!isSideBarClosed)}>
            <IoIosArrowForward/>

        </div>
      <div className="sideBarUser">
        <img
          src="https://www.logolynx.com/images/logolynx/s_cb/cbd29542455b9e0cc175289ff24cecaa.jpeg"
          alt=""
        />
        <div className="text">UserName</div>
      </div>
      <div className="seach">
        <div className="ico">
          <AiOutlineSearch />
        </div>

        <input type="text" placeholder="Pesquisar" />
      </div>
      <div className="linksContainer">
        <NavLink
          to={"/"}
          className="link"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#7e56dac9" : "",
          })}
        >
          <div className="linkItens">
            <div className="ico">
              <BsHouseDoor />
            </div>
            <div className="text">Meus arquivos</div>
          </div>
          <div className="arrowIco">
            <IoIosArrowForward />
          </div>
        </NavLink>
        <NavLink
          to={"/upload"}
          className="link"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#7e56dac9" : "",
          })}
        >
          <div className="linkItens">
            <div className="ico">
              <MdUploadFile />
            </div>
            <div className="text">Upload de arquivo</div>
          </div>
          <div className="arrowIco">
            <IoIosArrowForward />
          </div>
        </NavLink>
        <NavLink
          to={"/armazenamento"}
          className="link"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#7e56dac9" : "",
          })}
        >
          <div className="linkItens">
            <div className="ico">
              <AiOutlineDeliveredProcedure />
            </div>
            <div className="text">Armazenamento</div>
          </div>
          <div className="arrowIco">
            <IoIosArrowForward />
          </div>
        </NavLink>
        <NavLink
          to={"/arquivado"}
          className="link"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#7e56dac9" : "",
          })}
        >
          <div className="linkItens">
            <div className="ico">
              <BsArchive />
            </div>
            <div className="text">Arquivados</div>
          </div>
          <div className="arrowIco">
            <IoIosArrowForward />
          </div>
        </NavLink>
        <div className="divider"></div>
        <NavLink
          to={"/lixeira"}
          className="link"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#7e56dac9" : "",
          })}
        >
          <div className="linkItens">
            <div className="ico">
              <SlTrash />
            </div>
            <div className="text">Lixeira</div>
          </div>
          <div className="arrowIco">
            <IoIosArrowForward />
          </div>
        </NavLink>
        <NavLink
          to={"/login"}
          onClick={logout}
          className="link"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#7e56dac9" : "",
          })}
        >
          <div className="linkItens">
            <div className="ico">
              <FiLogOut />
            </div>
            <div className="text">Sair</div>
          </div>
          <div className="arrowIco">
            <IoIosArrowForward />
          </div>
        </NavLink>
      </div>
    </div>
  );
}
