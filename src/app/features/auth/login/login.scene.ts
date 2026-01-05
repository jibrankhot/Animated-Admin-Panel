import * as THREE from 'three';
import gsap from 'gsap';

export class LoginScene {

    private scene = new THREE.Scene();
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    private raf = 0;

    private planes: THREE.Mesh[] = [];

    constructor(private canvas: HTMLCanvasElement) { }

    init(): void {
        const w = window.innerWidth;
        const h = window.innerHeight;

        this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
        this.camera.position.set(0, 0, 6);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });

        this.renderer.setSize(w, h);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambient);

        const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
        keyLight.position.set(2, 4, 6);
        this.scene.add(keyLight);

        this.createFabricLayers();

        gsap.to(this.camera.position, {
            z: 5,
            duration: 4,
            ease: 'power2.out'
        });

        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('resize', this.onResize);

        this.animate();
    }

    private createFabricLayers(): void {
        const geometry = new THREE.PlaneGeometry(10, 6, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            side: THREE.DoubleSide,
            roughness: 0.6,
            metalness: 0.05
        });

        for (let i = 0; i < 3; i++) {
            const plane = new THREE.Mesh(geometry, material);
            plane.position.z = -i * 1.6;
            this.scene.add(plane);
            this.planes.push(plane);
        }
    }

    private animate = (): void => {
        this.raf = requestAnimationFrame(this.animate);

        this.planes.forEach((p, i) => {
            p.rotation.z += 0.0003 * (i + 1);
        });

        this.renderer.render(this.scene, this.camera);
    };

    private onMouseMove = (e: MouseEvent): void => {
        const x = (e.clientX / window.innerWidth - 0.5) * 0.25;
        const y = (e.clientY / window.innerHeight - 0.5) * 0.15;

        gsap.to(this.camera.position, {
            x,
            y,
            duration: 1.2,
            ease: 'power3.out'
        });
    };

    private onResize = (): void => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    };

    destroy(): void {
        cancelAnimationFrame(this.raf);
        this.renderer.dispose();
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('resize', this.onResize);
    }
}
