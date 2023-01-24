import "./sideBar.sass";
import {useState} from 'react'
import { AiOutlineDeliveredProcedure, AiOutlineSearch } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { FiHelpCircle, FiLogOut } from "react-icons/fi";
import { IoIosArrowForward, IoMdSettings } from "react-icons/io";
import { FaRegNewspaper } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
export function SideBar() {
    const [isSideBarClosed,SetIsSideBarClosed] = useState(false)
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
            <div className="text">Home</div>
          </div>
          <div className="arrowIco">
            <IoIosArrowForward />
          </div>
        </NavLink>
        <NavLink
          to={"/cadastro"}
          className="link"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#7e56dac9" : "",
          })}
        >
          <div className="linkItens">
            <div className="ico">
              <FaRegNewspaper />
            </div>
            <div className="text">Cadastro</div>
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
          to={"/help"}
          className="link"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#7e56dac9" : "",
          })}
        >
          <div className="linkItens">
            <div className="ico">
              <FiHelpCircle />
            </div>
            <div className="text">Help</div>
          </div>
          <div className="arrowIco">
            <IoIosArrowForward />
          </div>
        </NavLink>
        <div className="divider"></div>
        <NavLink
          to={"/configuraçoes"}
          className="link"
          style={({ isActive }) => ({
            backgroundColor: isActive ? "#7e56dac9" : "",
          })}
        >
          <div className="linkItens">
            <div className="ico">
              <IoMdSettings />
            </div>
            <div className="text">Configurações</div>
          </div>
          <div className="arrowIco">
            <IoIosArrowForward />
          </div>
        </NavLink>
        <NavLink
          to={"/sair"}
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
