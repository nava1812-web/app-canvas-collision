function initRebote(N) {

    const canvas = document.getElementById("canvas3");
    let ctx = canvas.getContext("2d");

    const window_height = canvas.height = 250;
    const window_width = canvas.width = 300;

    let circles = [];

    // 🎨 función de color aleatorio
    function randomColor() {
        return "rgb(" +
            Math.floor(Math.random() * 255) + "," +
            Math.floor(Math.random() * 255) + "," +
            Math.floor(Math.random() * 255) + ")";
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

    function detectarColisiones() {
        for (let i = 0; i < circles.length; i++) {
            for (let j = i + 1; j < circles.length; j++) {

                let dx = circles[j].posX - circles[i].posX;
                let dy = circles[j].posY - circles[i].posY;

                let distancia = Math.sqrt(dx * dx + dy * dy);
                let minDist = circles[i].radius + circles[j].radius;

                if (distancia < minDist) {

                    // 🔥 separar (evita trabado)
                    let angle = Math.atan2(dy, dx);
                    let overlap = minDist - distancia;

                    let moveX = Math.cos(angle) * (overlap / 2);
                    let moveY = Math.sin(angle) * (overlap / 2);

                    circles[i].posX -= moveX;
                    circles[i].posY -= moveY;

                    circles[j].posX += moveX;
                    circles[j].posY += moveY;

                    // 🔁 rebote
                    circles[i].dx *= -1;
                    circles[i].dy *= -1;

                    circles[j].dx *= -1;
                    circles[j].dy *= -1;

                    // 🎨 CAMBIO DE COLOR (LO NUEVO)
                    circles[i].color = randomColor();
                    circles[j].color = randomColor();
                }
            }
        }
    }

    for (let i = 0; i < N; i++) {
        let r = Math.floor(Math.random() * 20 + 15);

        let x = Math.random() * (window_width - r * 2) + r;
        let y = Math.random() * (window_height - r * 2) + r;

        circles.push(new Circle(x, y, r, "green", (i + 1).toString(), 2));
    }

    function animate() {
        ctx.clearRect(0, 0, window_width, window_height);
        circles.forEach(c => c.update(ctx));
        detectarColisiones();
        requestAnimationFrame(animate);
    }

    animate();
}