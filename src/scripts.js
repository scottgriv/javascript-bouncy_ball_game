// This function runs when the window is fully loaded
window.onload = function () {
    // Get canvas and context
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");
  
    // Get the restart button
    var button = document.getElementById("restartBtn");
  
    // Restart the game when clicked
    button.addEventListener("click", function () {
      init();
    });
  
    // Timing and frames per second
    var lastframe = 0;
    var fpstime = 0;
    var framecount = 0;
    var fps = 0;
  
    // Level properties
    var level = {
      x: 1,
      y: 65,
      width: canvas.width - 2,
      height: canvas.height - 66
    };
  
    // The Ball
    var ball = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      xdir: 0,
      ydir: 0,
      speed: 0
    };
  
    // Score
    var score = 0;
  
    // Initialize the game
    function init() {
      // Add mouse events
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mousedown", onMouseDown);
      canvas.addEventListener("mouseup", onMouseUp);
      canvas.addEventListener("mouseout", onMouseOut);
  
      // Initializing the Ball
      ball.width = 50;
      ball.height = 50;
      ball.x = level.x + Math.random() * (level.width - ball.width);
      ball.y = level.y + Math.random() * (level.height - ball.height);
      ball.xdir = 1;
      ball.ydir = 1;
      ball.speed = 200;
  
      // Initializing the score
      score = 0;
  
      // Enter the main loop
      main(0);
    }
  
    // Main Loop
  
    function main(tframe) {
      // Request animation frames
      window.requestAnimationFrame(main);
  
      // Update and render the game
      update(tframe);
      render();
    }
  
    // Update the game state
    function update(tframe) {
      var dt = (tframe - lastframe) / 1000;
      lastframe = tframe;
  
      // Update the fps counter
      updateFps(dt);
  
      // Move the Ball
      ball.x += dt * ball.speed * ball.xdir;
      ball.y += dt * ball.speed * ball.ydir;
  
      // Handle left and right collisions with the level
      if (ball.x <= level.x) {
        // Left edge
        ball.xdir = 1;
        ball.x = level.x;
      } else if (ball.x + ball.width >= level.x + level.width) {
        ball.xdir = -1;
        ball.x = level.x + level.width - ball.width;
      }
  
      // Handle top and bottom collisions with the level
      if (ball.y <= level.y) {
        // Top edge
        ball.ydir = 1;
        ball.y = level.y;
      } else if (ball.y + ball.height >= level.y + level.height) {
        ball.ydir = -1;
        ball.y = level.y + level.height - ball.height;
      }
    }
  
    // Updating the Frames per second
    function updateFps(dt) {
      if (fpstime > 0.25) {
        // Calculate FPS
        fps = Math.round(framecount / fpstime);
  
        // Reset time and framecount
        fpstime = 0;
        framecount = 0;
      }
  
      // Increase time and framecount
      fpstime += dt;
      framecount++;
    }
  
    function render() {
      // Draw the frame
      drawFrame();
  
      // Drawing the Ball
      context.fillStyle = "#FF0000"; //Red
      context.beginPath();
      context.arc(
        ball.x + ball.width / 2,
        ball.y + ball.height / 2,
        ball.width / 2,
        0,
        2 * Math.PI
      );
      context.fill();
    }
  
    // Draw the frame
    function drawFrame() {
      // Draw background and border
      context.fillStyle = "#d0d0d0";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#e8eaec";
      context.fillRect(1, 1, canvas.width - 2, canvas.height - 2);
  
      // Draw the header
      context.fillStyle = "#000000";
      context.fillRect(0, 0, canvas.width, 65);
  
      // Draw the title
      context.fillStyle = "#ffffff";
      context.font = "24px Verdana";
      context.fillText("Catch the Bouncy Ball!", 10, 30);
  
      // Display fps
      context.fillStyle = "#ffffff";
      context.font = "12px Verdana";
      context.fillText("Balls Caught: " + score, 13, 50);
    }
  
    // Mouse event handlers
    function onMouseMove(e) {}
    function onMouseDown(e) {
      // Get the position of the mouse
      var pos = getMousePos(canvas, e);
  
      // Check if we clicked the Ball
      if (
        pos.x >= ball.x &&
        pos.x < ball.x + ball.width &&
        pos.y >= ball.y &&
        pos.y < ball.y + ball.height
      ) {
        // Increase the score
        score += 1;
  
        // Increase the speed
        ball.speed *= 1.25;
        //console.log(JSON.stringify(ball.speed));
  
        // Give the Ball a random direction
        ball.xdir *= -1;
        ball.ydir *= Math.floor(Math.random() * 2) * 2 - 1;
      }
    }
  
    function onMouseUp(e) {}
    function onMouseOut(e) {}
  
    // Get the mouse position
    function getMousePos(canvas, e) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: Math.round(
          ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width
        ),
        y: Math.round(
          ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
        )
      };
    }
  
    // Call the init function to start the game
    init();
  };
  