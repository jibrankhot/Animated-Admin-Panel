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

  // 🔒 prevent re-typing flicker
  private typedScenes = new Set<number>();

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    this.startVideo();
  }

  /* ================= VIDEO ================= */

  private startVideo(): void {
    const v = this.bgVideo.nativeElement;
    v.muted = true;
    v.playsInline = true;

    gsap.set('.intro', {
      opacity: 0,
      filter: 'blur(8px) brightness(0.9)'
    });

    v.addEventListener(
      'playing',
      () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.backgroundMotion();
            this.lensFocusReveal();
          });
        });
      },
      { once: true }
    );

    v.play().catch(() => {
      document.addEventListener('click', () => v.play(), { once: true });
    });
  }

  /* ================= BACKGROUND ================= */

  private backgroundMotion(): void {
    gsap.to('.video', {
      scale: 1.15,
      duration: 26,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
  }

  /* ================= INTRO ================= */

  private lensFocusReveal(): void {
    gsap.to('.intro', {
      opacity: 1,
      filter: 'blur(0px) brightness(1)',
      duration: 1.4,
      ease: 'power1.out'
    });
  }

  /* ================= NEXT ================= */

  next(): void {
    if (this.animating) return;
    this.animating = true;

    gsap.to('.scene', {
      opacity: 0,
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
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          this.animating = false;
          if (this.scene >= 1) {
            this.revealFormContent();
          }
        }
      }
    );
  }

  /* ================= FORM CONTENT ================= */

  private revealFormContent(): void {
    const tl = gsap.timeline();

    // ✨ Typing ONLY ONCE for EMAIL scene
    if (this.scene === 1 && !this.typedScenes.has(1)) {
      const headline = document.querySelector('.headline') as HTMLElement;
      const copy = document.querySelector('.copy') as HTMLElement;

      if (headline) this.typeText(headline, 22);
      if (copy) this.typeText(copy, 18, 0.15);

      this.typedScenes.add(1);
    } else {
      gsap.to('.headline, .copy', { opacity: 1, duration: 0.25 });
    }

    tl.to('.field', { opacity: 1, duration: 0.3 }, '+=0.25')
      .to('.hint', { opacity: 0.45, duration: 0.3 }, '+=0.05')
      .to('.next-btn, .enter', { opacity: 1, duration: 0.25 }, '+=0.05');
  }

  /* ================= TYPING EFFECT ================= */

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
        el.innerText += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
    });
  }

  /* ================= SUBMIT ================= */

  submit(e: Event): void {
    e.stopPropagation();

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
