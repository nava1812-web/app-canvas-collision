function initColision(N) {

    const canvas = document.getElementById("canvas2");
    let ctx = canvas.getContext("2d");

    const window_height = canvas.height = 250;
    const window_width = canvas.width = 300;

    let circles = [];

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

            if (this.dx === 0) this.dx = this.speed;
            if (this.dy === 0) this.dy = this.speed;
        }

        draw(context) {
            context.beginPath();
            context.strokeStyle = this.color;
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.font = "14px Arial";
            context.fillText(this.text, this.posX, this.posY);

            context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
            context.stroke();
            context.closePath();
        }

        update(context) {
            this.draw(context);

            // límites
            if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
                this.dx *= -1;
            }

            if ((this.posY + this.radius) > window_height || (this.posY - this.radius) < 0) {
                this.dy *= -1;
            }

            this.posX += this.dx;
            this.posY += this.dy;
        }
    }

    // 🔥 COLISION + CAMBIO AZUL/ROJO
    function detectarColisiones() {
        for (let i = 0; i < circles.length; i++) {
            for (let j = i + 1; j < circles.length; j++) {

                let dx = circles[j].posX - circles[i].posX;
                let dy = circles[j].posY - circles[i].posY;

                let distancia = Math.sqrt(dx * dx + dy * dy);

                if (distancia < circles[i].radius + circles[j].radius) {

                    // 🔵🔴 alternar color
                    circles[i].color = circles[i].color === "blue" ? "red" : "blue";
                    circles[j].color = circles[j].color === "blue" ? "red" : "blue";
                }
            }
        }
    }

    for (let i = 0; i < N; i++) {
        let r = Math.floor(Math.random() * 20 + 15);

        let x = Math.random() * (window_width - r * 2) + r;
        let y = Math.random() * (window_height - r * 2) + r;

        circles.push(new Circle(x, y, r, "blue", (i + 1).toString(), 2));
    }

    function animate() {
        ctx.clearRect(0, 0, window_width, window_height);
        circles.forEach(c => c.update(ctx));
        detectarColisiones();
        requestAnimationFrame(animate);
    }

    animate();
}