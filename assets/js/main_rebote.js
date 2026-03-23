const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Dimensiones
const window_height = window.innerHeight / 2;
const window_width = window.innerWidth / 2;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

// 🎨 función para color aleatorio
function randomColor() {
    return `rgb(${Math.floor(Math.random()*255)},
                ${Math.floor(Math.random()*255)},
                ${Math.floor(Math.random()*255)})`;
}

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;
        this.dx = (Math.random() * 2 - 1) * this.speed;
        this.dy = (Math.random() * 2 - 1) * this.speed;
    }

    draw(context) {
        context.beginPath();

        // 🔥 relleno (para que se vea el cambio de color)
        context.fillStyle = this.color;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        context.fill();

        // borde
        context.strokeStyle = "#000";
        context.stroke();

        // texto
        context.fillStyle = "#000";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "16px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.closePath();
    }

    update(context) {
        this.draw(context);

        // rebote en paredes
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

// 🔥 número de círculos
const N = 6;
let circles = [];

// Crear círculos
for (let i = 0; i < N; i++) {
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let randomRadius = Math.floor(Math.random() * 30 + 20);

    circles.push(
        new Circle(randomX, randomY, randomRadius, randomColor(), (i + 1).toString(), 2)
    );
}

// 🔥 COLISIONES CON REBOTE Y COLOR
function detectarColisiones() {
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {

            let dx = circles[i].posX - circles[j].posX;
            let dy = circles[i].posY - circles[j].posY;
            let distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < circles[i].radius + circles[j].radius) {

                // 🔥 REBOTE EN DIRECCIÓN CONTRARIA
                circles[i].dx *= -1;
                circles[i].dy *= -1;

                circles[j].dx *= -1;
                circles[j].dy *= -1;

                // 🎨 CAMBIO DE COLOR
                circles[i].color = randomColor();
                circles[j].color = randomColor();
            }
        }
    }
}

// Animación
let updateCircle = function () {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);

    circles.forEach(c => c.update(ctx));

    detectarColisiones();
};

updateCircle();