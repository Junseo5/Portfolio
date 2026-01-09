// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ========================================
// 테마 시스템 (초기화는 head에서 인라인으로 처리됨)
// ========================================

const initTheme = () => {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // 테마 적용 함수
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // meta theme-color 업데이트
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0b' : '#f5f5f7');
        }
    };

    // 토글 버튼 클릭 이벤트
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // 시스템 테마 변경 감지 (사용자가 수동 설정하지 않은 경우에만)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
};

initTheme();

// ========================================
// 다국어 시스템
// ========================================

const translations = {
    en: {
        hero: {
            badge: "Open to Work",
            greeting: "Hello,",
            name: "I'm Junseo",
            role: ".",
            desc: "I build backend systems and AI-powered services with Python. I focus on shipping services that deliver real value to users.",
            viewWork: "View Projects",
            contact: "Contact Me"
        },
        about: {
            label: "About",
            title: "About Me",
            lead: "When I want to build something, I learn by diving in and doing it myself.",
            desc: "I started coding because I wanted to run my own Minecraft server, and ended up operating a service used by over 1,000 players for two years. After completing an AI curriculum at SSAFY, I built a RAG-based Discord chatbot SaaS as a solo developer, improving search accuracy from around 40% to 80%.",
            desc2: "I focus not just on writing code, but on shipping services that deliver real value to users.",
            years: "Years",
            projects: "Projects",
            users: "Users"
        },
        skills: {
            label: "Skills",
            title: "Tech Stack",
            python: { title: "Python Backend", desc: "Designing and building REST APIs with Django and FastAPI. Experience training AI models with PyTorch." },
            ai: { title: "AI", desc: "VQA fine-tuning, RAG system building and retrieval optimization, recommendation model ALS, Gap filling development and 4 model integration experience." },
            devops: { title: "Servers & Infra", desc: "Building and operating Linux servers. Experience deploying services with Nginx and Cloudflare." }
        },
        projects: {
            label: "Projects",
            title: "Projects",
            desc: "Projects I designed and developed."
        },
        project: {
            discord: {
                title: "Discord R Chatbot",
                desc: "AI chatbot SaaS for game communities. Built a RAG-based real-time Q&A system and improved search accuracy from 40% to 80%."
            },
            ssafy: {
                title: "SSAFY AI Challenge – VQA",
                desc: "Improved VQA accuracy with Qwen2.5-VL from 0.76 to 0.94. Ran experiments with TTA, K-Fold, EMA and various techniques."
            },
            self: {
                title: "SelF – Agricultural E-commerce",
                desc: "Implemented Django REST API backend (members, products, orders). Designed and implemented recommendation algorithms based on user behavior logs."
            },
            minex: {
                title: "Mine X Network",
                desc: "Operated a Minecraft server for 2 years (1,000+ users). Purchased hardware, built and operated Ubuntu Linux infrastructure from scratch, and configured DDoS protection using Cloudflare Spectrum."
            },
            visit: "Visit Site"
        },
        contact: {
            title: "Get in Touch",
            desc: "If you'd like to collaborate or have any questions, feel free to reach out."
        },
        footer: {
            copyright: "© 2025 Song Junseo. All rights reserved.",
            made: "Made with code & coffee"
        }
    },
    ko: {
        hero: {
            badge: "구직 중",
            greeting: "안녕하세요,",
            name: "송준서",
            role: "입니다.",
            desc: "Python 기반 백엔드 시스템 구축과 AI 서비스 개발을 합니다. 실제 사용자에게 가치를 전달하는 서비스를 만드는 데 집중합니다.",
            viewWork: "프로젝트 보기",
            contact: "연락하기"
        },
        about: {
            label: "About",
            title: "소개",
            lead: "만들고 싶은 게 생기면 직접 부딪치며 배웁니다.",
            desc: "마인크래프트 서버를 만들고 싶다는 생각으로 개발을 시작해 1,000명이 이용하는 서비스를 2년간 운영했습니다. SSAFY에서 AI 교육을 이수한 후, RAG 기반 Discord 챗봇 SaaS를 1인 개발하며 검색 정확도를 40%에서 80%까지 개선했습니다.",
            desc2: "코드를 작성하는 것을 넘어, 실제 사용자에게 가치를 전달하는 서비스를 만드는 데 집중합니다.",
            years: "경력",
            projects: "프로젝트",
            users: "유저"
        },
        skills: {
            label: "Skills",
            title: "기술 스택",
            python: { title: "Python Backend", desc: "Django, FastAPI로 REST API 설계 및 구축. PyTorch 기반 AI 모델 학습 경험." },
            ai: { title: "AI", desc: "VQA 파인튜닝, RAG 구축 및 검색 정확도 최적화, 추천 모델 ALS, Gap filling 제작 및 4개 모델 연동 경험." },
            devops: { title: "Servers & Infra", desc: "Linux 서버 구축 및 운영. Nginx, Cloudflare 활용한 서비스 배포 경험." }
        },
        projects: {
            label: "Projects",
            title: "프로젝트",
            desc: "직접 기획하고 개발한 프로젝트들입니다."
        },
        project: {
            discord: {
                title: "Discord R 챗봇",
                desc: "게임 커뮤니티를 위한 AI 챗봇 SaaS. RAG 기반 실시간 Q&A 시스템을 구축하고, 검색 정확도를 40%에서 80%까지 개선했습니다."
            },
            ssafy: {
                title: "SSAFY AI 챌린지 – VQA",
                desc: "Qwen2.5-VL 모델로 VQA 정확도를 0.76에서 0.94로 향상시켰습니다. TTA, K-Fold, EMA 등 다양한 기법을 실험했습니다."
            },
            self: {
                title: "SelF – 농산물 이커머스",
                desc: "Django REST API 백엔드 전체 구현 (회원, 상품, 주문). 사용자 행동 로그 기반 추천 알고리즘 (ALS, Gap filling)을 설계하고 구현했습니다."
            },
            minex: {
                title: "Mine X 네트워크",
                desc: "마인크래프트 서버 운영 (2년, 누적 유저 1,000+). 하드웨어 구매부터 Ubuntu Linux 인프라 구축·운영까지 직접 수행하고, Cloudflare Spectrum으로 DDoS 방어 환경을 구성했습니다."
            },
            visit: "사이트 방문"
        },
        contact: {
            title: "연락하기",
            desc: "협업 제안이나 궁금한 점이 있으시면 편하게 연락주세요."
        },
        footer: {
            copyright: "© 2025 Song Junseo. All rights reserved.",
            made: "Made with code & coffee"
        }
    }
};

// 언어 변경 함수
function updateLanguage(lang) {
    // html lang 속성 업데이트
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations[lang];
        keys.forEach(k => {
            if (value) value = value[k];
        });
        if (value) {
            element.textContent = value;
        }
    });

    // 버튼 상태 및 접근성 속성 업데이트
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const isActive = btn.getAttribute('data-lang') === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // 설정 저장
    localStorage.setItem('preferredLanguage', lang);
}

// 언어 토글 이벤트
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        updateLanguage(lang);
    });
});

// 초기 언어 설정
const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang');
const savedLang = localStorage.getItem('preferredLanguage');
const defaultLang = 'ko';

if (langParam && translations[langParam]) {
    updateLanguage(langParam);
} else if (savedLang && translations[savedLang]) {
    updateLanguage(savedLang);
} else {
    updateLanguage(defaultLang);
}

// ========================================
// 커스텀 커서
// ========================================

const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
};

const hasFinePointer = () => {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
};

const initCustomCursor = () => {
    // 터치 기기나 마우스 없는 환경에서는 비활성화
    if (isTouchDevice() && !hasFinePointer()) {
        return;
    }

    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    document.body.classList.add('custom-cursor-enabled');

    // gsap.quickTo 사용: 매번 새 트윈을 생성하지 않고 재사용 (성능 최적화)
    const cursorX = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power2.out' });
    const cursorY = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power2.out' });
    const followerX = gsap.quickTo(follower, 'x', { duration: 0.25, ease: 'power2.out' });
    const followerY = gsap.quickTo(follower, 'y', { duration: 0.25, ease: 'power2.out' });

    document.addEventListener('mousemove', (e) => {
        cursorX(e.clientX);
        cursorY(e.clientY);
        followerX(e.clientX);
        followerY(e.clientY);
    }, { passive: true }); // passive 이벤트로 스크롤 성능 개선

    // 인터랙티브 요소 호버 효과
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .stat-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 0, duration: 0.2 });
            gsap.to(follower, { scale: 1.5, opacity: 0.3, duration: 0.2 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, duration: 0.2 });
            gsap.to(follower, { scale: 1, opacity: 0.6, duration: 0.2 });
        });
    });
};

initCustomCursor();

// ========================================
// 애니메이션
// ========================================

// 히어로 애니메이션
const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTimeline
    .from('.logo', { y: -30, opacity: 0, duration: 0.8 })
    .from('.header-right', { y: -30, opacity: 0, duration: 0.8 }, '-=0.6')
    .from('.hero-badge', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero-title', { y: 40, opacity: 0, duration: 0.8 }, '-=0.4')
    .from('.hero-desc', { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
    .from('.hero-cta', { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
    .from('.hero-info', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4');

// ========================================
// 스크롤 애니메이션 (정적 사이트 최적화)
// ========================================

// 스크롤 애니메이션 설정
const setupScrollAnimations = () => {
    const selectors = [
        '.section-header',
        '.about-text > *',
        '.stat-card',
        '.skill-card',
        '.project-card',
        '.contact-content > *'
    ];

    selectors.forEach(selector => {
        gsap.utils.toArray(selector).forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 88%',
                    once: true
                },
                opacity: 0,
                y: 25,
                duration: 0.5,
                ease: 'power2.out',
                immediateRender: false // 핵심: 초기 렌더링 방지
            });
        });
    });
};

setupScrollAnimations();

// ========================================
// 부드러운 스크롤
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
