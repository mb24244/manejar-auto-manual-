let currentGear = 'N';
let currentSpeed = 0;
let isClutchPressed = false;
let carPosition = 10;

const speedDisplay = document.getElementById('speed');
const gearDisplay = document.getElementById('gear');
const feedback = document.getElementById('feedback');
const car = document.getElementById('car');

const clutchBtn = document.getElementById('clutch-btn');
const gasBtn = document.getElementById('gas-btn');
const brakeBtn = document.getElementById('brake-btn');

// Control del Clutch
clutchBtn.addEventListener('mousedown', () => {
  isClutchPressed = true;
  clutchBtn.classList.add('active');
  feedback.innerText = "Clutch presionado 👍 ¡Puedes cambiar de marcha!";
  feedback.style.color = "green";
});

clutchBtn.addEventListener('mouseup', () => {
  isClutchPressed = false;
  clutchBtn.classList.remove('active');
});

// Cambiar de Marcha
function changeGear(gear) {
  if (!isClutchPressed) {
    feedback.innerText = "¡CRACKKK! 💥 Tienes que mantener presionado el Clutch para hacer el cambio.";
    feedback.style.color = "red";
    return;
  }
  
  currentGear = gear;
  gearDisplay.innerText = gear === 'N' ? 'N (Neutro)' : gear;
  feedback.innerText = `Pusiste marcha ${gear}. ¡Ahora suelta el clutch y acelera!`;
  feedback.style.color = "blue";
}

// Acelerar
gasBtn.addEventListener('click', () => {
  if (currentGear === 'N') {
    feedback.innerText = "El motor suena ¡BRRRR!, pero el auto no se mueve porque está en Neutro.";
    feedback.style.color = "orange";
    return;
  }

  if (isClutchPressed) {
    feedback.innerText = "Estás acelerando con el clutch pisado... ¡Acelera solo tras soltar el clutch!";
    feedback.style.color = "orange";
    return;
  }

  // Aumentar velocidad según el cambio
  let maxSpeed = parseInt(currentGear) * 30;
  if (currentSpeed < maxSpeed) {
    currentSpeed += 10;
  }

  updateDashboard();
});

// Frenar
brakeBtn.addEventListener('click', () => {
  if (currentSpeed > 0) {
    currentSpeed -= 10;
    if (currentSpeed < 0) currentSpeed = 0;
  }
  updateDashboard();
});

function updateDashboard() {
  speedDisplay.innerText = currentSpeed;
  
  // Mover el autito en la pista
  carPosition += currentSpeed / 5;
  if (carPosition > 600) carPosition = 10; // Reinicia si llega al final
  car.style.left = carPosition + "px";
}