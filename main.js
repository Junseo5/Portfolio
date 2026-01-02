// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// ========================================
// 테마 시스템
// ========================================

const initTheme = () => {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // 저장된 테마 또는 시스템 설정 확인
    const getPreferredTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;

        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    // 테마 적용
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // meta theme-color 업데이트
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0b' : '#fafafa');
        }
    };

    // 초기 테마 설정
    setTheme(getPreferredTheme());

    // 토글 버튼 클릭 이벤트
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // 시스템 테마 변경 감지
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
            ai: { title: "AI & RAG", desc: "Building RAG systems and optimizing retrieval quality. Experience applying techniques such as TTA, K-Fold, EMA." },
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
                desc: "Operated a Minecraft server for 2 years (1,000+ users). Ran on Ubuntu Linux with Cloudflare Spectrum for DDoS protection."
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
            ai: { title: "AI & RAG", desc: "RAG 시스템 구축 및 검색 정확도 최적화. TTA, K-Fold, EMA 등 학습 기법 적용 경험." },
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
                desc: "Django REST API 백엔드 전체 구현 (회원, 상품, 주문). 사용자 행동 로그 기반 추천 알고리즘을 설계하고 구현했습니다."
            },
            minex: {
                title: "Mine X 네트워크",
                desc: "마인크래프트 서버 운영 (2년, 누적 유저 1,000+). Ubuntu Linux로 운영하고 Cloudflare Spectrum으로 DDoS 방어 환경을 구성했습니다."
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

    // 버튼 상태 업데이트
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
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
    if (isTouchDevice() && !hasFinePointer()) {
        return;
    }

    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    document.body.classList.add('custom-cursor-enabled');

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .stat-card');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.25
        });
    });

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

// 섹션 애니메이션
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    const header = section.querySelector('.section-header');
    if (header) {
        gsap.from(header, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }
});

// About 섹션
gsap.from('.about-text > *', {
    scrollTrigger: {
        trigger: '.about-content',
        start: 'top 75%'
    },
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out'
});

gsap.from('.stat-card', {
    scrollTrigger: {
        trigger: '.stats-grid',
        start: 'top 80%'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out'
});

// Skills 섹션
gsap.from('.skill-card', {
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 80%'
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out'
});

// Projects 섹션
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
});

// Contact 섹션
gsap.from('.contact-content > *', {
    scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 85%'
    },
    y: 30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out'
});

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
