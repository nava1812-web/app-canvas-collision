/* 🌄 Fondo general con imagen */
body {
    font-family: 'Segoe UI', sans-serif;

    background: 
        linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
        url("../img/fondo.jpg");

    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}


/* 🔝 Navbar */
.navbar {
    background: linear-gradient(90deg, #141e30, #243b55);
    backdrop-filter: blur(5px);
}


/* 🔽 Footer */
.footer {
    background: linear-gradient(90deg, #141e30, #243b55);
    color: white;
    padding: 20px 0;
    backdrop-filter: blur(5px);
}


/* 🧊 Cards efecto vidrio */
.card {
    border-radius: 15px;

    /* transparencia */
    background: rgba(255, 255, 255, 0.15);

    /* efecto blur */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);

    border: 1px solid rgba(255, 255, 255, 0.3);

    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

    transition: transform 0.25s ease, box-shadow 0.25s ease;
}


/* ✨ Hover elegante */
.card:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(0,0,0,0.5);
}


/* 🧊 Header de cards */
.card-header {
    font-size: 1.1rem;

    background: rgba(255, 255, 255, 0.2);

    backdrop-filter: blur(5px);

    border-bottom: 1px solid rgba(255,255,255,0.3);
}


/* 🎛 Panel del slider */
.card.shadow-lg {
    background: rgba(255, 255, 255, 0.2) !important;

    backdrop-filter: blur(10px);

    border: 1px solid rgba(255,255,255,0.3);
}


/* 🖼️ Canvas */
canvas {
    background-color: rgba(255, 248, 220, 0.8);

    width: 100%;
    height: 250px;

    border-radius: 12px;

    border: 2px solid rgba(0,0,0,0.4);
}


/* 🎚 Slider */
input[type="range"] {
    accent-color: #0d6efd;
}