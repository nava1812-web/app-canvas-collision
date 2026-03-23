const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight / 2;
const window_width = window.innerWidth / 2;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;
        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        this.draw(context);

        if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY + this.radius) > window_height || (this.posY - this.radius) < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

// 🔥 cantidad de círculos
const N = 6;

// 🔥 arreglo de círculos
let circles = [];

// Crear N círculos aleatorios
for (let i = 0; i < N; i++) {
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let randomRadius = Math.floor(Math.random() * 40 + 30);

    circles.push(
        new Circle(randomX, randomY, randomRadius, "blue", (i + 1).toString(), 2)
    );
}

// Animación
let updateCircle = function () {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);

    // Solo se actualizan, sin colisiones
    circles.forEach(c => c.update(ctx));
};

updateCircle();