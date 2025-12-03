// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Translations
const translations = {
    en: {
        hero: {
            subtitle: "Backend Developer & Drone Specialist",
            title1: "I build it",
            title2: "from scratch",
            title3: "and ship it.",
            desc: "I build backend systems and AI services with Python, and I have 5 years of hands-on experience building and flying drones.",
            viewWork: "View Projects",
            contactMe: "Get in Touch",
            scroll: "Scroll"
        },
        about: {
            title: "About",
            lead: "When I want to build something, I learn by diving in and doing it myself.",
            desc: "I started coding because I wanted to run my own Minecraft server, and ended up operating a service used by over 1,000 players for two years. After completing an AI curriculum at SSAFY, I built a RAG-based Discord chatbot SaaS as a solo developer, improving search accuracy from around 40% to 80% while keeping latency low. I focus not just on writing code, but on shipping services that deliver real value to users.",
            years: "Years Coding",
            projects: "Projects"
        },
        skills: {
            title: "Tech Stack",
            python: { title: "Python Backend", desc: "Designing and building REST APIs with Django and FastAPI. Experience training AI models with PyTorch." },
            ai: { title: "AI & RAG", desc: "Building RAG systems and optimizing retrieval quality. Experience applying techniques such as TTA, K-Fold, EMA, and more." },
            drone: { title: "Drones", desc: "Five years of building and flying drones. Licensed ultralight vehicle pilot and certified flight examiner." },
            devops: { title: "Servers & Infrastructure", desc: "Building and operating Linux servers. Experience deploying services with Nginx and Cloudflare." }
        },
        projects: {
            title: "Projects"
        },
        project: {
            discord: {
                title: "Discord R Chatbot",
                desc: "An AI chatbot SaaS for game communities. Built a RAG-based real-time Q&A system and improved search accuracy from about 40% to 80%. Implemented subscription plans, API key issuing, two-factor authentication, and other production features as a solo developer."
            },
            ssafy: {
                title: "SSAFY AI Challenge – VQA",
                desc: "Improved VQA accuracy with Qwen2.5-VL from 0.76 to 0.94. Ran experiments with TTA, K-Fold, AMP, EMA, SWA, and performed external data exploration and preprocessing."
            },
            self: {
                title: "SelF – Agricultural E-commerce",
                desc: "E-commerce platform for agricultural products. Implemented the entire Django REST API backend (members, products, orders). Designed and implemented recommendation algorithms based on user behavior logs."
            },
            drone: {
                title: "Industrial Drone Control",
                desc: "Participated in an industrial drone control skills competition. Assembled industrial drones and programmed autonomous flight missions using Pixhawk flight controllers and Mission Planner."
            },
            minex: {
                title: "Mine X Network",
                desc: "Operated a Minecraft server for 2 years with 1,000+ cumulative users. Built and ran on-premise servers with Ubuntu Linux, configured DDoS protection with Cloudflare Spectrum, and developed custom plugins in Java."
            },
            visit: "Visit Site"
        },
        contact: {
            title: "Contact",
            desc: "If you'd like to collaborate or have any questions, feel free to reach out."
        },
        footer: {
            copyright: "© 2025 Song Junseo. All rights reserved.",
            credit: "Designed & Built with 💻 & ☕"
        }
    },
    ko: {
        hero: {
            subtitle: "백엔드 개발자 & 드론 전문가",
            title1: "직접 만들고",
            title2: "끝까지",
            title3: "완성합니다.",
            desc: "Python 기반 백엔드 시스템 구축과 AI 서비스 개발을 합니다. 5년간 드론을 직접 제작하고 비행한 경험이 있습니다.",
            viewWork: "프로젝트 보기",
            contactMe: "연락하기",
            scroll: "스크롤"
        },
        about: {
            title: "소개",
            lead: "만들고 싶은 게 생기면 직접 부딪치며 배웁니다.",
            desc: "마인크래프트 서버를 만들고 싶다는 생각으로 개발을 시작해 1,000명이 이용하는 서비스를 2년간 운영했습니다. SSAFY에서 AI 교육을 이수한 후, RAG 기반 Discord 챗봇 SaaS를 1인 개발하며 검색 속도는 유지하되 검색 정확도를 40%에서 80%까지 개선했습니다. 코드를 작성하는 것을 넘어, 실제 사용자에게 가치를 전달하는 서비스를 만드는 데 집중합니다.",
            years: "개발 경력",
            projects: "프로젝트"
        },
        skills: {
            title: "기술 스택",
            python: { title: "Python 백엔드", desc: "Django, FastAPI로 REST API 설계 및 구축. PyTorch 기반 AI 모델 학습 경험." },
            ai: { title: "AI & RAG", desc: "RAG 시스템 구축 및 검색 정확도 최적화. TTA, K-Fold, EMA 등 학습 기법 적용 경험." },
            drone: { title: "드론", desc: "5년간 드론 제작 및 비행. 초경량비행장치 조종자 자격증, 실기평가자 자격 보유." },
            devops: { title: "서버 & 인프라", desc: "Linux 서버 구축 및 운영. Nginx, Cloudflare 활용한 서비스 배포 경험." }
        },
        projects: {
            title: "프로젝트"
        },
        project: {
            discord: {
                title: "Discord R 챗봇",
                desc: "게임 커뮤니티를 위한 AI 챗봇 SaaS. RAG 기반 실시간 Q&A 시스템을 구축하고, 검색 정확도를 40%에서 80%까지 개선했습니다. 구독 시스템, API 키 발급, 2단계 인증 등 상용 서비스 기능을 1인 개발했습니다."
            },
            ssafy: {
                title: "SSAFY AI 챌린지 – VQA",
                desc: "Qwen2.5-VL 모델로 VQA 정확도를 0.76에서 0.94로 향상시켰습니다. TTA, K-Fold, AMP, EMA, SWA 등 다양한 기법을 직접 실험하고, 외부 데이터 탐색 및 가공을 수행했습니다."
            },
            self: {
                title: "SelF – 농산물 이커머스",
                desc: "Django REST API 백엔드 전체 구현 (회원, 상품, 주문). 사용자 행동 로그 기반 추천 알고리즘을 설계하고 구현했습니다."
            },
            drone: {
                title: "산업용 드론 제어",
                desc: "기능경기대회 참가. 산업용 드론 조립 및 Pixhawk, Mission Planner를 활용한 자율 비행 미션 프로그래밍을 수행했습니다."
            },
            minex: {
                title: "Mine X 네트워크",
                desc: "마인크래프트 서버 운영 (2년, 누적 유저 1,000+). 사무실에 직접 서버를 구축하고 Ubuntu Linux로 운영했습니다. Cloudflare Spectrum으로 DDoS 방어 환경을 구성하고, Java로 커스텀 플러그인을 개발했습니다."
            },
            visit: "사이트 방문"
        },
        contact: {
            title: "연락하기",
            desc: "협업 제안이나 궁금한 점이 있으시면 편하게 연락주세요."
        },
        footer: {
            copyright: "© 2025 Song Junseo. All rights reserved.",
            credit: "Designed & Built with 💻 & ☕"
        }
    }
};

// Language Logic
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

    // Update buttons state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // Save preference
    localStorage.setItem('preferredLanguage', lang);
}

// Event Listeners
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        updateLanguage(lang);
    });
});

// Initialize
const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang');
const savedLang = localStorage.getItem('preferredLanguage');
const defaultLang = 'ko'; // Default to Korean as requested

if (langParam && translations[langParam]) {
    updateLanguage(langParam);
} else if (savedLang && translations[savedLang]) {
    updateLanguage(savedLang);
} else {
    updateLanguage(defaultLang);
}

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .project-item');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 0, duration: 0.2 });
        gsap.to(follower, { scale: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)', duration: 0.2 });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, duration: 0.2 });
        gsap.to(follower, { scale: 1, backgroundColor: 'transparent', duration: 0.2 });
    });
});

// Hero Animations
const heroTimeline = gsap.timeline();

heroTimeline
    .from('.logo', {
        y: -50,
        autoAlpha: 0,
        duration: 1,
        ease: 'power4.out'
    })
    .from('.hero-subtitle', {
        y: 30,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-title .line', {
        y: 100,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
    }, '-=0.8')
    .from('.hero-desc', {
        y: 30,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.6')
    .from('.scroll-indicator', {
        y: 50,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5');

// Scroll Animations
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    gsap.from(section.querySelector('.section-header'), {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// About Section
gsap.from('.about-text > *', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
});

gsap.from('.profile-img-container', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
    },
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: 'power4.out'
});

// Skills Section Animation
gsap.from('.skill-card', {
    scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 85%',
    },
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: 'power4.out',
    // Prevent first card from rendering in its "from" position
    // when the page is refreshed mid-scroll.
    immediateRender: false
});

// 3D Tilt Effect for Skills
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.1,
            ease: 'power1.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// Projects Section
const projects = document.querySelectorAll('.project-item');

projects.forEach((project, index) => {
    const direction = index % 2 === 0 ? -50 : 50;
    
    gsap.from(project.querySelector('.project-content'), {
        scrollTrigger: {
            trigger: project,
            start: 'top 80%',
        },
        x: direction,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from(project.querySelector('.project-visual'), {
        scrollTrigger: {
            trigger: project,
            start: 'top 80%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2
    });
});

// Contact Section
gsap.from('.contact-content > *', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 90%', // Trigger earlier
    },
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
