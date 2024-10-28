// 4
// let audioContext = new (window.AudioContext || window.webkitAudioContext)();
// let analyser;
// let microphone;
// let player = document.getElementById("player");
// let velocityY = 0;
// let isJumping = false;
// let obstacles = [];
// let score = 0;

// // מיקום השחקן, נעדכן אותו לפי השמאלי של הדמות
// let playerLeftPosition = 100; // מיקום התחלתי לשחקן

// window.onload = function () {
//   checkMicrophoneConnection();
//   createObstacle();
//   gameLoop();
// };

// // פונקציה שמחברת למיקרופון אם הוא לא מחובר כבר
// async function checkMicrophoneConnection() {
//   if (!microphone || !analyser) {
//     await initMicrophone();
//   }
//   setInterval(async () => {
//     if (!microphone || !analyser) {
//       await initMicrophone();
//     }
//   }, 5000); // בדיקה כל 5 שניות
// }

// async function initMicrophone() {
//   try {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     microphone = audioContext.createMediaStreamSource(stream);
//     analyser = audioContext.createAnalyser();
//     microphone.connect(analyser);
//     console.log("Microphone is connected");
//   } catch (error) {
//     console.error("Error accessing microphone:", error);
//   }
// }

// function getVolume() {
//   if (!analyser) return 0; // ודא שה־Analyser מחובר
//   const dataArray = new Uint8Array(analyser.frequencyBinCount);
//   analyser.getByteFrequencyData(dataArray);
//   let sum = 0;
//   for (let i = 0; i < dataArray.length; i++) {
//     sum += dataArray[i];
//   }
//   return sum / dataArray.length;
// }

// // function createObstacle() {
// //   const obstacle = document.createElement("div");
// //   obstacle.classList.add("obstacle");

// //   const randomHeight = Math.floor(Math.random() * 80) + 20;
// //   const randomWidth = Math.floor(Math.random() * 30) + 20;
// //   obstacle.style.width = randomWidth + "px";
// //   obstacle.style.height = randomHeight + "px";

// //   obstacle.style.bottom = "0px";
// //   obstacle.style.left = `${window.innerWidth}px`;
// //   document.getElementById("gameContainer").appendChild(obstacle);
// //   obstacles.push(obstacle);
// // }
// function createObstacle() {
//   const obstacle = document.createElement("img");
//   obstacle.classList.add("obstacle");

//   // קבע את מקור התמונה
//   const randomImageIndex = Math.floor(Math.random() * 8); // לדוגמה, אם יש לך 3 תמונות
//   obstacle.src = `falls/fall${randomImageIndex}.png`; // עדכן את הנתיב לפי שם התמונה

//   const randomHeight = Math.floor(Math.random() * 80) + 20;
//   const randomWidth = Math.floor(Math.random() * 30) + 20;
//   obstacle.style.width = randomWidth * 2 + "px";
//   obstacle.style.height = randomHeight * 2 + "px";

//   obstacle.style.position = "absolute"; // חשוב לקבוע את המיקום לאבסולוטי
//   obstacle.style.bottom = "0px";
//   obstacle.style.left = `${window.innerWidth}px`;
//   document.getElementById("gameContainer").appendChild(obstacle);
//   obstacles.push(obstacle);
// }

// function updateObstacles() {
//   obstacles.forEach((obstacle, index) => {
//     let leftPosition = parseFloat(obstacle.style.left) || 0;
//     leftPosition -= 5;
//     obstacle.style.left = leftPosition + "px";

//     const playerBottom = parseFloat(player.style.top) + player.offsetHeight;
//     const obstacleTop = window.innerHeight - parseFloat(obstacle.style.height);

//     // הגדרת מרווח של 5 פיקסלים
//     const buffer = 10;

//     // חישוב התנגשויות עם מרווח
//     if (
//       leftPosition <= playerLeftPosition + player.offsetWidth - buffer &&
//       leftPosition + obstacle.offsetWidth >= playerLeftPosition + buffer &&
//       playerBottom >= obstacleTop
//     ) {
//       alert("הפסדת! נסה שוב.");
//       resetGame();
//       return;
//     }

//     if (leftPosition < -obstacle.offsetWidth) {
//       obstacle.remove();
//       obstacles.splice(index, 1);
//       score++;
//       document.getElementById("score").innerText = score; // עדכון הניקוד
//       if (score >= 5) {
//         alert("ניצחת! עברת את כל המכשולים.");
//         resetGame();
//         return;
//       } else {
//         createObstacle();
//       }
//     }
//   });
// }

// function resetGame() {
//   obstacles.forEach((obstacle) => obstacle.remove());
//   obstacles = [];
//   score = 0;
//   isJumping = false;
//   player.style.top = `${window.innerHeight - 100}px`; // גובה התחלתי
//   player.style.left = `${playerLeftPosition}px`; // מיקום התחלתי לשחקן
//   createObstacle();
// }

// // function gameLoop() {
// //   const volume = getVolume();

// //   if (volume > 50 && !isJumping) {
// //     velocityY = -Math.min(volume / 5, 50);
// //     isJumping = true;
// //   }

// //   if (isJumping) {
// //     player.style.top =
// //       (parseFloat(player.style.top) || window.innerHeight - 100) +
// //       velocityY +
// //       "px";
// //     velocityY += 1;

// //     if (parseFloat(player.style.top) >= window.innerHeight - 100) {
// //       player.style.top = window.innerHeight - 100 + "px";
// //       isJumping = false;
// //     }
// //   }

// //   updateObstacles();
// //   requestAnimationFrame(gameLoop);
// // }
// function gameLoop() {
//   const volume = getVolume();

//   // אם יש רעש מעל 50 והדמות לא קופצת, קבע את מהירות הקפיצה
//   if (volume > 50 && !isJumping) {
//     // הגבר את גובה הקפיצה
//     velocityY = -Math.min(volume / 3, 100); // הגדלת הקפיצה
//     isJumping = true;
//   }

//   if (isJumping) {
//     player.style.top =
//       (parseFloat(player.style.top) || window.innerHeight - 100) +
//       velocityY +
//       "px";

//     // האטת הירידה על ידי צמצום קצב עליית velocityY
//     velocityY += 0.5; // האטת הכבידה

//     // בדוק אם הדמות חזרה לארץ
//     if (parseFloat(player.style.top) >= window.innerHeight - 100) {
//       player.style.top = window.innerHeight - 100 + "px";
//       isJumping = false;
//     }
//   }

//   updateObstacles();
//   requestAnimationFrame(gameLoop);
// }
// ===============================\
let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let analyser;
let microphone;
let player = document.getElementById("player");
let velocityY = 0;
let isJumping = false;
let obstacles = [];
let coins = []; // רשימה לאחסון המטבעות
let score = 0;

// מיקום השחקן, נעדכן אותו לפי השמאלי של הדמות
let playerLeftPosition = 100; // מיקום התחלתי לשחקן

window.onload = function () {
  //   document.getElementById("loseMessage").style.display = "block"; // בדיקה האם מוצג בהצלחה
  checkMicrophoneConnection();
  createObstacle();
  createCoin(); // יצירת מטבעות בתחילת המשחק
  gameLoop();
};

// פונקציה שמחברת למיקרופון אם הוא לא מחובר כבר
async function checkMicrophoneConnection() {
  if (!microphone || !analyser) {
    await initMicrophone();
  }
  setInterval(async () => {
    if (!microphone || !analyser) {
      await initMicrophone();
    }
  }, 5000); // בדיקה כל 5 שניות
}

async function initMicrophone() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    microphone = audioContext.createMediaStreamSource(stream);
    analyser = audioContext.createAnalyser();
    microphone.connect(analyser);
    console.log("Microphone is connected");
  } catch (error) {
    console.error("Error accessing microphone:", error);
  }
}

function getVolume() {
  if (!analyser) return 0; // ודא שה־Analyser מחובר
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    sum += dataArray[i];
  }
  return sum / dataArray.length;
}

function createObstacle() {
  const obstacle = document.createElement("img");
  obstacle.classList.add("obstacle");

  // קבע את מקור התמונה
  const randomImageIndex = Math.floor(Math.random() * 9);
  obstacle.src = `falls/fall${randomImageIndex + 1}.png`;

  const randomHeight = Math.floor(Math.random() * 80) + 20;
  const randomWidth = Math.floor(Math.random() * 30) + 20;
  obstacle.style.width = randomWidth * 2 + "px";
  obstacle.style.height = randomHeight * 2 + "px";

  obstacle.style.position = "absolute";
  obstacle.style.bottom = "0px";
  obstacle.style.left = `${window.innerWidth}px`;
  document.getElementById("gameContainer").appendChild(obstacle);
  obstacles.push(obstacle);
}

function createCoin() {
  const coin = document.createElement("img");
  const randomImageIndex = Math.floor(Math.random() * 3);
  coin.src = `win/win${randomImageIndex + 1}.png`;
  coin.classList.add("coin");

  const randomYPosition = Math.random() * (window.innerHeight / 2);

  coin.style.position = "absolute";
  coin.style.left = `${window.innerWidth}px`;
  coin.style.top = `${randomYPosition}px`;

  document.getElementById("gameContainer").appendChild(coin);
  coins.push(coin);
}

function updateObstacles() {
  obstacles.forEach((obstacle, index) => {
    let leftPosition = parseFloat(obstacle.style.left) || 0;
    leftPosition -= 5;
    obstacle.style.left = leftPosition + "px";

    const playerBottom = parseFloat(player.style.top) + player.offsetHeight;
    const obstacleTop = window.innerHeight - parseFloat(obstacle.style.height);

    // הגדרת מרווח של 5 פיקסלים
    const buffer = 10;

    // חישוב התנגשויות עם מרווח
    if (
      leftPosition <= playerLeftPosition + player.offsetWidth - buffer &&
      leftPosition + obstacle.offsetWidth >= playerLeftPosition + buffer &&
      playerBottom >= obstacleTop
    ) {
      showLoseMessage(); // הצגת הודעת הפסד
      setTimeout(() => {
        resetGame();
      }, 4000); // הצגת ההודעה למשך 2 שניות
      return;
    }

    if (leftPosition < -obstacle.offsetWidth) {
      obstacle.remove();
      obstacles.splice(index, 1);
      score++;
      document.getElementById("score").innerText = score; // עדכון הניקוד
      if (score >= 20) {
        showWinMessage(); // הצגת הודעת ניצחון
        setTimeout(() => {
          resetGame();
        }, 4000); // הצגת ההודעה למשך 2 שניות
        return;
      } else {
        createObstacle();
      }
    }
  });
}

function updateCoins() {
  coins.forEach((coin, index) => {
    let leftPosition = parseFloat(coin.style.left) || 0;
    leftPosition -= 5; // נזיז את המטבעות גם כן
    coin.style.left = leftPosition + "px";

    const coinBottom = parseFloat(coin.style.top) + coin.offsetHeight;
    const playerBottom = parseFloat(player.style.top) + player.offsetHeight;

    // הגדרת מרווח של 5 פיקסלים
    const buffer = 10;

    // בדוק אם השחקן נוגע במטבע
    if (
      playerLeftPosition < leftPosition + coin.offsetWidth - buffer &&
      playerLeftPosition + player.offsetWidth > leftPosition + buffer &&
      playerBottom >= coinBottom
    ) {
      score += 5; // הוספת 5 נקודות
      document.getElementById("score").innerText = score; // עדכון הניקוד
      coin.remove(); // מחיקת המטבע
      coins.splice(index, 1); // הסרת המטבע מרשימת המטבעות
      createCoin(); // יצירת מטבע חדש
    }

    if (leftPosition < -coin.offsetWidth) {
      coin.remove(); // אם המטבע יצא מהמסך, נסיר אותו
      coins.splice(index, 1); // הסרת המטבע מרשימת המטבעות
    }
  });
}

function resetGame() {
  obstacles.forEach((obstacle) => obstacle.remove());
  obstacles = [];
  coins.forEach((coin) => coin.remove()); // הסרת המטבעות
  coins = []; // ריקון הרשימה של המטבעות
  score = 0;
  isJumping = false;
  hideMessages(); // הסתרת הודעות הניצחון וההפסד
  player.style.top = `${window.innerHeight - 100}px`; // גובה התחלתי
  player.style.left = `${playerLeftPosition}px`; // מיקום התחלתי לשחקן
  createObstacle();
  createCoin(); // יצירת מטבעות חדשים
}

//
function showLoseMessage() {
  console.log("הפסדת - מציג הודעת הפסד");
  document.getElementById("loseMessage").style.display = "block";
}

function showWinMessage() {
  console.log("ניצחת - מציג הודעת ניצחון");

  document.getElementById("winMessage").style.display = "block";
}

function hideMessages() {
  document.getElementById("loseMessage").style.display = "none";
  document.getElementById("winMessage").style.display = "none";
}

function gameLoop() {
  const volume = getVolume();

  if (volume > 50 && !isJumping) {
    velocityY = -Math.min(volume / 3, 100);
    isJumping = true;
  }

  if (isJumping) {
    player.style.top =
      (parseFloat(player.style.top) || window.innerHeight - 100) +
      velocityY +
      "px";

    velocityY += 0.5; // האטת הכבידה

    if (parseFloat(player.style.top) >= window.innerHeight - 100) {
      player.style.top = window.innerHeight - 100 + "px";
      isJumping = false;
    }
  }

  updateObstacles();
  updateCoins(); // עדכון המטבעות
  requestAnimationFrame(gameLoop);
}
