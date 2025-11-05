// Interactive Background with Three.js
class InteractiveBackground {
    constructor() {
        this.container = document.getElementById('interactive-bg');
        if (!this.container) return;

        this.initThreeJS();
        this.addEventListeners();
        this.animate();
    }

    initThreeJS() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#particles-js'),
            alpha: true,
            antialias: true
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
        
        // Particles
        this.particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 1500;
        
        const posArray = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        
        this.particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        // Material
        this.particlesMaterial = new THREE.PointsMaterial({
            size: 0.01,
            color: '#8b5cf6',
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        // Points
        this.particlesMesh = new THREE.Points(this.particlesGeometry, this.particlesMaterial);
        this.scene.add(this.particlesMesh);
        
        // Camera position
        this.camera.position.z = 5;
        
        // Mouse position
        this.mouseX = 0;
        this.mouseY = 0;
    }
    
    addEventListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    onMouseMove(event) {
        this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Animate particles
        this.particlesMesh.rotation.y += 0.0005;
        
        // Mouse movement effect
        this.particlesMesh.rotation.x = this.mouseY * 0.2;
        this.particlesMesh.rotation.y = this.mouseX * 0.2;
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveBackground();
});
