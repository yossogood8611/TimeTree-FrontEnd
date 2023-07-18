import React, { Ref } from "react";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import SideBar from "./SideBar";
import Tree from "../assets/tree.png";

interface mousePosition {
  positionX: number | null;
  positionY: number | null;
}

interface ObjContainerProps {
  backgroundImg: string;
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedObj, setSelectedObj] = useState<string>("");
  const [mousePosition, setMousePosition] = useState<mousePosition>({
    positionX: null,
    positionY: null,
  });
  const [mouseEndPosition, setMouseEndPosition] = useState<mousePosition>({
    positionX: null,
    positionY: null,
  });

  const drawBackground = () => {
    const canvasCur = canvasRef.current as HTMLCanvasElement;
    const ctx = canvasCur.getContext("2d");
    const bgImage = new Image();
    bgImage.src = Tree;
    if (ctx === null) return;
    ctx.drawImage(bgImage, 0, 0, window.innerWidth, window.innerHeight);
  };

  const drawObject = (mouseEndPosition: mousePosition) => {
    const canvasCur = canvasRef.current as HTMLCanvasElement;
    const ctx = canvasCur.getContext("2d");
    const objImage = new Image();
    objImage.src = selectedObj;
    if (ctx === null) return;
    if (!mouseEndPosition.positionX) return;
    if (!mouseEndPosition.positionY) return;
    ctx.drawImage(
      objImage,
      mouseEndPosition.positionX - 50,
      mouseEndPosition.positionY - 50,
      100,
      100
    );
  };

  const handleSelectedObj = (obj: string) => {
    setSelectedObj(obj);
  };
  const handleMousePositionInSideBar = ({
    positionX,
    positionY,
  }: mousePosition) => {
    setMousePosition({ ...mousePosition, positionX, positionY });
  };
  // useEffect(()=>{
  //   drawBackground();
  //   console.log("배경 그리기");
  // },[]);

  return (
    <Wrapper
      onMouseMove={(e) => {
        if (selectedObj !== "") {
          setMousePosition({
            ...mousePosition,
            positionX: e.clientX,
            positionY: e.clientY,
          });
        }
      }}
    >
      <CanvasContainer backgroundImg={Tree}>
        <CanvasComponent
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      </CanvasContainer>
      <SideBar
        handleSelectedObj={handleSelectedObj}
        handleMousePositionInSideBar={handleMousePositionInSideBar}
      />
      {selectedObj !== "" &&
      mousePosition.positionX &&
      mousePosition.positionY ? (
        <SelectedObj
          backgroundImg={selectedObj}
          style={{
            position: "absolute",
            left: mousePosition.positionX,
            top: mousePosition.positionY,
          }}
          onClick={(e) => {
            setSelectedObj("");
            drawObject({ positionX: e.clientX, positionY: e.clientY });
          }}
        />
      ) : null}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const SelectedObj = styled.div<ObjContainerProps>`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.backgroundImg});
  background-size: cover;
  transform: translate(-50%, -50%);
  overflow: visible;
`;

const CanvasContainer = styled.div<ObjContainerProps>`
  position: relative;
  width: calc(100% - 120px);
  background-image: url(${(props) => props.backgroundImg});
  background-position-x: center;
  background-position-y: -130px;
  background-size: 853px 1280px;
  background-repeat: no-repeat;
  background-color: #8aacbf87;
`;

const CanvasComponent = styled.canvas``;
