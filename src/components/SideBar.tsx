import React, { ReactElement } from 'react';
import styled from 'styled-components'
import { useState, useRef, useEffect } from "react";
import treeObj1 from '../assets/treeObj1.png'
import treeObj2 from '../assets/treeObj2.png'
import treeObj3 from '../assets/treeObj3.png'
import treeObj4 from '../assets/treeObj4.png'
import treeObj5 from '../assets/treeObj5.png'
import treeObj6 from '../assets/treeObj6.png'
import treeObj7 from '../assets/treeObj7.png'

interface SideBarProps {
  handleSelectedObj: Function
  handleMousePositionInSideBar: Function
}

interface ObjContainerProps {
  backgroundImg : string;
}

export default function SideBar({handleSelectedObj, handleMousePositionInSideBar}:SideBarProps): ReactElement {
  const [objList, setObjList] = useState<string[]>([treeObj1,treeObj2,treeObj3,treeObj4,treeObj5,treeObj6,treeObj7]);
  const renderObjList = () =>{
    return (objList.map((el, idx)=> {
      return (
        <ObjContainer 
          backgroundImg={el}
          onClick={(e)=>{
            handleSelectedObj(el);
            handleMousePositionInSideBar({positionX: e.clientX, positionY: e.clientY})
          }}
        />
      )
    }))
  }
  return (
    <Wrapper>
      {renderObjList()}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  width: 120px;
  background-color: #070A38;
  position:fixed;
  right:0;
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-left: 3px solid rgba(135,206,235,0.2);
`

const ObjContainer = styled.div<ObjContainerProps>`
  cursor: pointer;
  width: 100px;
  height: 100px;
  background-image: url(${(props)=>props.backgroundImg});
  background-size:cover;
  overflow:visible;
`