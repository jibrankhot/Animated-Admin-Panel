import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('bgVideo', { static: true })
  bgVideo!: ElementRef<HTMLVideoElement>;

  scene = 0;
  animating = false;

  email = '';
  password = '';

  private typedScenes = new Set<number>();

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    this.startVideo();
  }

  /* ================= VIDEO ================= */

  private startVideo(): void {
    const v = this.bgVideo.nativeElement;

    // 🔑 Force autoplay from start
    v.muted = true;
    v.playsInline = true;
    v.preload = 'auto';
    v.currentTime = 0;

    const play = () => v.play().catch(() => { });
    play();

    document.addEventListener('visibilitychange', play);

    // 🎬 Cinematic background motion
    gsap.to('.video', {
      scale: 1.15,
      duration: 26,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });

    // 🎥 Lens focus reveal
    gsap.fromTo(
      '.intro',
      { opacity: 0, filter: 'blur(10px)' },
      { opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power2.out' }
    );
  }

  /* ================= NEXT ================= */

  next(): void {
    if (this.animating) return;
    this.animating = true;

    gsap.to('.scene', {
      opacity: 0,
      filter: 'blur(6px)',
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        this.scene++;
        this.enterScene();
      }
    });
  }

  /* ================= ENTER ================= */

  private enterScene(): void {
    gsap.fromTo(
      '.scene',
      { opacity: 0, filter: 'blur(8px)' },
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          this.animating = false;
          this.revealText();
        }
      }
    );
  }

  /* ================= TEXT REVEAL ================= */

  private revealText(): void {
    if (this.typedScenes.has(this.scene)) return;

    const elements = document.querySelectorAll(
      '.headline'
    ) as NodeListOf<HTMLElement>;

    let delay = 0;

    elements.forEach(el => {
      if (!el || !el.innerText.trim()) return;
      this.typeText(el, 18, delay);
      delay += 0.25;
    });

    this.typedScenes.add(this.scene);
  }

  /* ================= TYPING ================= */

  private typeText(
    el: HTMLElement,
    speed = 20,
    delay = 0
  ): void {
    const text = el.innerText;
    el.innerText = '';
    el.style.opacity = '1';

    let i = 0;

    gsap.delayedCall(delay, () => {
      const interval = setInterval(() => {
        const char = text.charAt(i);
        el.innerHTML += char === ' ' ? '&nbsp;' : char;
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
    });
  }

  /* ================= SUBMIT ================= */

  submit(): void {
    gsap.to('.world', {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        this.router.navigateByUrl('/admin');
      }
    });
  }
}
