import { useEffect, useRef } from "react";

export default function HeartCanvas({ active = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle pool: hearts, petals, sparkles
    const particles = [];
    const colors = ["#ff4d6d", "#ff758f", "#c86a45", "#f43f5e", "#fb7185", "#ffd166", "#fda4af"];

    class Particle {
      constructor(x, y, isBurst = false) {
        this.reset(x, y, isBurst);
      }

      reset(x, y, isBurst = false) {
        this.x = x !== undefined ? x : Math.random() * width;
        this.y = y !== undefined ? y : (isBurst ? y : height + Math.random() * 40);
        this.size = Math.random() * 14 + 10;
        this.type = Math.random() > 0.45 ? "heart" : (Math.random() > 0.5 ? "petal" : "sparkle");
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.55 + 0.35;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.04;

        if (isBurst) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6 + 2;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed - 2;
          this.life = 1;
          this.decay = Math.random() * 0.02 + 0.012;
          this.isBurst = true;
        } else {
          this.vx = (Math.random() - 0.5) * 0.8;
          this.vy = -(Math.random() * 1.2 + 0.6); // float upward
          this.isBurst = false;
        }
      }

      update() {
        if (this.isBurst) {
          this.x += this.vx;
          this.y += this.vy;
          this.vy += 0.08; // gravity for burst
          this.rotation += this.rotSpeed;
          this.life -= this.decay;
          if (this.life <= 0) {
            return false;
          }
        } else {
          this.x += this.vx + Math.sin(this.y * 0.01) * 0.5;
          this.y += this.vy;
          this.rotation += this.rotSpeed;

          if (this.y < -40 || this.x < -40 || this.x > width + 40) {
            this.reset();
          }
        }
        return true;
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.globalAlpha = this.isBurst ? Math.max(0, this.life * this.opacity) : this.opacity;
        c.fillStyle = this.color;

        if (this.type === "heart") {
          // Draw heart curve
          const s = this.size / 18;
          c.beginPath();
          c.moveTo(0, s * -4);
          c.bezierCurveTo(s * 7, s * -14, s * 16, s * -2, 0, s * 14);
          c.bezierCurveTo(s * -16, s * -2, s * -7, s * -14, 0, s * -4);
          c.fill();
        } else if (this.type === "petal") {
          // Draw delicate curved rose petal
          const s = this.size * 0.7;
          c.beginPath();
          c.ellipse(0, 0, s, s * 0.5, Math.PI / 4, 0, Math.PI * 2);
          c.fill();
        } else {
          // Draw sparkling star
          const s = this.size * 0.4;
          c.beginPath();
          c.arc(0, 0, s, 0, Math.PI * 2);
          c.fill();
        }

        c.restore();
      }
    }

    // Init gentle ambient floating particles
    const particleCount = Math.min(width > 768 ? 32 : 18, 40);
    for (let i = 0; i < particleCount; i++) {
      const p = new Particle(Math.random() * width, Math.random() * height);
      particles.push(p);
    }

    // Burst on click
    const handleClick = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      for (let i = 0; i < 18; i++) {
        particles.push(new Particle(x, y, true));
      }
    };
    window.addEventListener("pointerdown", handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const alive = p.update();
        if (!alive && p.isBurst) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointerdown", handleClick);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9998,
      }}
    />
  );
}
