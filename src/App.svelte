<script>
  import { onMount } from "svelte";

  export let name;

  const minimiseToTray = () => {
    alert(1);
  };

  onMount(() => {
    const canvas2 = document.querySelector("#canvas");
    const context2 = canvas2.getContext("2d");

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

    //the array of all rectangles
    let boundingBoxes = [];
    // the actual rectangle, the one that is being drawn
    let o = {};

    // a variable to store the mouse position
    let m = {},
      // a variable to store the point where you begin to draw the rectangle
      start = {};
    // a boolean
    let isDrawing = false;

    const handleMouseDown = (e) => {
      start = oMousePos(canvas2, e);
      isDrawing = true;
      //console.log(start.x, start.y);
      canvas2.style.cursor = "crosshair";
    };

    function handleMouseMove(e) {
      if (isDrawing) {
        m = oMousePos(canvas2, e);
        draw();
      }
    }

    function handleMouseUp(e) {
      canvas2.style.cursor = "default";
      isDrawing = false;

      const box = Object.create(annotation);
      box.x = o.x;
      box.y = o.y;
      box.w = o.w;
      box.h = o.h;

      draw();
      box.printCoordinates();
      console.log(boundingBoxes);
    }

    function draw() {
      o.x = start.x; // start position of x
      o.y = start.y; // start position of y
      o.w = m.x - start.x; // width
      o.h = m.y - start.y; // height

      //clearcanvas();
      context2.clearRect(0, 0, canvas2.width, canvas2.height); //////***********
      // draw all the rectangles saved in the rectsRy
      boundingBoxes.map((r) => {
        drawRect(r);
      });
      // draw the actual rectangle
      drawRect(o);
    }

    canvas2.addEventListener("mousedown", handleMouseDown);

    canvas2.addEventListener("mousemove", handleMouseMove);

    canvas2.addEventListener("mouseup", handleMouseUp);

    function savecanvas() {
      context2.clearRect(0, 0, canvas2.width, canvas2.height);
      var savedBoxes = boundingBoxes.slice(0);
      console.log(savedBoxes); // ok
    }

    function resetcanvas() {
      context2.clearRect(0, 0, canvas2.width, canvas2.height);
      boundingBoxes.length = 0;
      console.log(boundingBoxes); // ok
    }

    function drawRect(o) {
      context2.strokeStyle = "black";
      context2.globalCompositeOperation = "xor";
      context2.lineWidth = 0.5;
      context2.beginPath(o);
      context2.rect(o.x, o.y, o.w, o.h);
      context2.fillRect(10, 10, 100, 100);
      context2.stroke();
      context2.fill();
    }

    // Function to detect the mouse position

    function oMousePos(canvas2, evt) {
      let ClientRect = canvas2.getBoundingClientRect();
      return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top),
      };
    }
  });
</script>

<main>
  <canvas id="canvas" />

  <div class="overlay" />
  <button on:click={() => {}}>Screenshot</button>
  <button on:click={minimiseToTray}>Minimise</button>
</main>

<style>
  .overlay {
    position: fixed;
	background-color: rgba(0,0,0,0.4);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999; /* Make sure the overlay is above other elements */
  }
  #screenshot-canvas {
    position: absolute;
    top: 0;
    left: 0;
    cursor: crosshair;
  }
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
