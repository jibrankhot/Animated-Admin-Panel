import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import * as THREE from 'three';
import { gsap } from 'gsap';

type Scene = 'welcome' | 'email' | 'password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit, OnDestroy {

  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  scene: Scene = 'welcome';
  email = '';
  password = '';

  // THREE
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene3d!: THREE.Scene;
  private particles!: THREE.Points;
  private animationId!: number;

  ngAfterViewInit(): void {
    this.initThree();
    this.animate();
    this.enterUI();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }

  next(step: Scene): void {
    // Camera push
    gsap.to(this.camera.position, {
      z: this.camera.position.z - 4,
      duration: 0.9,
      ease: 'power3.inOut'
    });

    // UI transition
    gsap.to('.ui', {
      opacity: 0,
      y: -30,
      duration: 0.4,
      onComplete: () => {
        this.scene = step;
        this.enterUI();
      }
    });
  }

  private enterUI(): void {
    gsap.fromTo(
      '.ui',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }

  // ============================
  // THREE.JS SETUP
  // ============================
  private initThree(): void {
    const canvas = this.canvasRef.nativeElement;

    this.scene3d = new THREE.Scene();
    this.scene3d.fog = new THREE.Fog(0x05070c, 5, 25);

    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.z = 12;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Particles
    const geometry = new THREE.BufferGeometry();
    const count = 1500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30;
    }

    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      color: 0x7aa7ff,
      size: 0.04,
      transparent: true,
      opacity: 0.6
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene3d.add(this.particles);

    window.addEventListener('resize', this.onResize);
  }

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);

    this.particles.rotation.y += 0.0006;
    this.particles.rotation.x += 0.0003;

    this.renderer.render(this.scene3d, this.camera);
  };

  private onResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}
