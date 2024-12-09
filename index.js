const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let index = 0;

function showSlide(newIndex) {
    if (newIndex < 0) {
        index = slide.length - 1;
    } else if (newIndex >= slide.length) {
        index = 0;
    } else {
        index = newIndex;
    }
    slides.style.transform = `translateX(-${index * 100}%)`;
}

prev.addEventListener('click', () => showSlide(index - 1));
next.addEventListener('click', () => showSlide(index + 1));

setInterval(() => showSlide(index + 1), 5000);

const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
const confetti = [];
const colors = ['#FFD700', '#ff6347', '#8a2be2', '#32cd32', '#1e90ff'];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 6 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocityX: Math.random() * 2 - 1,
            velocityY: Math.random() * 3 + 1,
            opacity: Math.random() * 0.8 + 0.2,
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(${hexToRgb(particle.color)},${particle.opacity})`;
        ctx.fill();
    });
}

function updateConfetti() {
    confetti.forEach((particle) => {
        particle.y += particle.velocityY;
        particle.x += particle.velocityX;

        if (particle.y > canvas.height) {
            particle.y = -10;
            particle.x = Math.random() * canvas.width;
        }
    });
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return `${(bigint >> 16) & 255}, ${(bigint >> 8) & 255}, ${bigint & 255}`;
}

function animateConfetti() {
    drawConfetti();
    updateConfetti();
    requestAnimationFrame(animateConfetti);
}

createConfetti();
animateConfetti();

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
