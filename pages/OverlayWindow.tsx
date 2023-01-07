import React, { useEffect, useState, useCallback } from 'react';

const OverlayWindow = () => {
  const [canvas, setCanvas] = useState(null);
  const [context2, setContext2] = useState(null);

  const initCanvas = () => {
    console.log('init canvas');
    setCanvas(document.querySelector('#canvas'));
  };

  useEffect(() => {
    console.log('set context');
    if (canvas) {
      setContext2(canvas?.getContext('2d'));
    }
  }, [canvas, context2]);

  const initEventListeners = () => {
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
  };

  console.log('>>', canvas);
  console.log('cotext2', context2);

  // const handleDraw = () => {
  const resetCanvas = () => {
    if (context2) {
      context2.clearRect(0, 0, canvas?.width, canvas?.height);
    }
  };

  const saveCoordinates = (data) => {
    resetCanvas();
    console.log(data);
  };

  const annotation = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    printCoordinates: function () {
      console.log(
        `X: ${this.x}px, Y: ${this.y}px, Width: ${this.w}px, Height: ${this.h}px`
      );
    },
  };
  // the actual rectangle, the one that is being drawn
  let o = {};
  // a variable to store the mouse position
  let m = {},
    // a variable to store the point where you begin to draw the rectangle
    start = {};
  // a boolean
  let isDrawing = false;
  const handleMouseDown = (e) => {
    start = oMousePos(canvas, e);
    isDrawing = true;
    canvas.style.cursor = 'crosshair';
  };
  function handleMouseMove(e) {
    if (isDrawing) {
      m = oMousePos(canvas, e);
      draw();
    }
  }
  function handleMouseUp(e) {
    canvas.style.cursor = 'default';
    isDrawing = false;
    const box = Object.create(annotation);
    box.x = o.x;
    box.y = o.y;
    box.w = o.w;
    box.h = o.h;
    draw();
    saveCoordinates(box);
  }

  function draw() {
    o.x = start.x; // start position of x
    o.y = start.y; // start position of y
    o.w = m.x - start.x; // width
    o.h = m.y - start.y; // height

    context2?.clearRect(0, 0, canvas?.width, canvas?.height);
    // draw the actual rectangle
    drawRect(o);
  }

  const drawRect = (o) => {
    if (context2) {
      context2.strokeStyle = 'pink';
      context2.globalCompositeOperation = 'xor';
      context2.lineWidth = 0.5;
      context2.beginPath(o);
      context2.rect(o.x, o.y, o.w, o.h);
      context2.fillStyle = 'rgba(0, 0, 0, 0.8)';
      context2.fillRect(10, 10, window.innerWidth, window.innerHeight);
      context2.stroke();
      context2.fill();
    }
  };
  // Function to detect the mouse position
  function oMousePos(canvas2, evt) {
    let ClientRect = canvas2.getBoundingClientRect();
    return {
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top),
    };
  }
  // };

  useEffect(() => initCanvas(), [canvas]);

  useEffect(() => {
    if (canvas) {
      initEventListeners();
    }
  }, [canvas]);

  // useEffect(() => {
  //   handleDraw();
  // }, [canvas]);

  return [
    <canvas
      id="canvas"
      width={window.innerWidth}
      height={window.innerHeight}
    />,
    <div id="overlay"></div>,
  ];
};

export default OverlayWindow;
