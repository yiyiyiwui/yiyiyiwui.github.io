import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app, router }) {
        if (typeof window !== 'undefined') {
            router.onAfterRouteChanged = () => {
                setTimeout(initAvatarEffects, 400)
            }
            setTimeout(initAvatarEffects, 400)
        }
    }
}

function initAvatarEffects() {
    const img = document.querySelector('.VPHero .image-src')
    const container = document.querySelector('.VPHero .image-container')
    if (!img || !container) return

    // ===== 鼠标 3D 跟随倾斜 =====
    if (!container.dataset.tilt) {
        container.dataset.tilt = 'true'

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect()
            const cx = rect.left + rect.width / 2
            const cy = rect.top + rect.height / 2
            const dx = (e.clientX - cx) / (rect.width / 2)
            const dy = (e.clientY - cy) / (rect.height / 2)

            const tiltX = dy * -18  // 上下倾斜
            const tiltY = dx * 18   // 左右倾斜

            img.style.transition = 'transform 0.1s ease'
            img.style.transform = `
        rotateX(${tiltX}deg)
        rotateY(${tiltY}deg)
        scale(1.05)
      `

            // 动态高光
            const glowX = 50 + dx * 30
            const glowY = 50 + dy * 30
            img.style.boxShadow = `
        ${-dx * 15}px ${-dy * 15}px 40px rgba(131,56,236,0.7),
        0 0 0 3px rgba(255,255,255,0.2),
        0 0 0 7px rgba(131,56,236,0.6),
        0 0 60px rgba(58,134,255,0.4),
        inset ${dx * 8}px ${dy * 8}px 20px rgba(255,255,255,0.08)
      `
        })

        container.addEventListener('mouseleave', () => {
            img.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.6s ease'
            img.style.transform = ''
            img.style.boxShadow = ''
        })
    }

    // ===== 粒子光点 =====
    if (img.dataset.particles) return
    img.dataset.particles = 'true'

    const particles = [
        { size: 5, color: '#8338ec', angle: 20,  r: 140, duration: 2.4, delay: 0   },
        { size: 4, color: '#3a86ff', angle: 75,  r: 135, duration: 3.1, delay: 0.6 },
        { size: 6, color: '#06ffa5', angle: 130, r: 142, duration: 2.7, delay: 1.2 },
        { size: 4, color: '#ff0066', angle: 190, r: 138, duration: 3.4, delay: 0.3 },
        { size: 5, color: '#ffbe0b', angle: 245, r: 140, duration: 2.1, delay: 0.9 },
        { size: 3, color: '#8338ec', angle: 300, r: 136, duration: 2.9, delay: 1.5 },
        { size: 4, color: '#3a86ff', angle: 350, r: 143, duration: 2.3, delay: 0.4 },
        { size: 6, color: '#06ffa5', angle: 160, r: 137, duration: 3.6, delay: 0.8 },
    ]

    const imgRect = img.getBoundingClientRect()
    const contRect = container.getBoundingClientRect()
    const cx = imgRect.left - contRect.left + imgRect.width / 2
    const cy = imgRect.top  - contRect.top  + imgRect.height / 2

    particles.forEach(p => {
        const rad = (p.angle * Math.PI) / 180
        const x = cx + p.r * Math.cos(rad)
        const y = cy + p.r * Math.sin(rad)
        const el = document.createElement('span')
        el.style.cssText = `
      position: absolute;
      width: ${p.size}px;
      height: ${p.size}px;
      border-radius: 50%;
      background: ${p.color};
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%);
      z-index: 6;
      pointer-events: none;
      box-shadow: 0 0 ${p.size * 3}px ${p.color}, 0 0 ${p.size * 6}px ${p.color}40;
      animation: particlePulse ${p.duration}s ease-in-out ${p.delay}s infinite;
    `
        container.appendChild(el)
    })

    if (!document.getElementById('vp-fx-style')) {
        const style = document.createElement('style')
        style.id = 'vp-fx-style'
        style.textContent = `
      @keyframes particlePulse {
        0%, 100% { opacity: 0.1; transform: translate(-50%,-50%) scale(0.6); }
        50%       { opacity: 1;   transform: translate(-50%,-50%) scale(1.8); }
      }
    `
        document.head.appendChild(style)
    }
}