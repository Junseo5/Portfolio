// GSAP 라이브러리 사용 가능 여부 확인
const gsapAvailable = typeof gsap !== 'undefined';
if (gsapAvailable && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

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
            contact: "Contact Me",
            resume: "Download Resume"
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
            minex: {
                title: "Mine X Network",
                desc: "Operated a Minecraft server for 2 years (1,000+ users). Purchased hardware, built and operated Ubuntu Linux infrastructure from scratch, and configured DDoS protection using Cloudflare Spectrum."
            },
            visit: "Visit Site",
            detail: "Details",
            ssafy: {
                title: "SSAFY AI Challenge – VQA",
                desc: "Improved VQA accuracy with Qwen2.5-VL from 0.76 to 0.94. Ran experiments with TTA, K-Fold, EMA and various techniques.",
                challenge: { title: "Key Problem Solving" },
                challenge1: { title: "Training/Inference Misalignment Fix", desc: "Discovered a structural issue where answer tokens were missing during training, preventing the model from learning answer patterns. By including answers in the Assistant message and switching to add_generation_prompt=False, the model accurately learned answer token positions, significantly boosting accuracy." },
                challenge2: { title: "T4 GPU Memory Constraints", desc: "Faced BFloat16 incompatibility and OOM issues on T4 GPUs. Resolved by switching to Float16, replacing FlashAttention with SDPA Attention, and combining 4-bit QLoRA + Gradient Checkpointing + Batch Size 1 + Gradient Accumulation 4 for memory efficiency." },
                challenge3: { title: "Overfitting Prevention & Generalization", desc: "Addressed single-model overfitting and performance variance through Stratified K-Fold, EMA/SWA, TTA, and Majority Voting ensemble, achieving a final accuracy of 0.94." }
            },
            self: {
                title: "SelF – Agricultural E-commerce",
                desc: "Implemented Django REST API backend (members, products, orders). Designed and implemented recommendation algorithms based on user behavior logs.",
                challenge: { title: "Key Problem Solving" },
                challenge1: { title: "Unstructured Data Cleaning & Accuracy Improvement", desc: "Agricultural product data was unstructured with inconsistent categories, units, and naming, causing low recommendation accuracy. Built a data normalization pipeline and designed category mapping logic to improve model input quality." },
                challenge2: { title: "Recommendation Cold Start Problem", desc: "New users lacked behavioral data, making personalized recommendations impossible. Designed a 4-model ensemble combining popularity-based and recipe Gap filling models to provide meaningful recommendations even for users without behavioral data." }
            },
            ani: {
                title: "ANI – AI News Curation",
                desc: "AI-powered personalized news curation service. Designed and implemented the entire Django backend, GPT-4o-mini SSE streaming chatbot, Elasticsearch search, and personalized recommendation system.",
                challenge: { title: "Key Problem Solving" },
                challenge1: { title: "Real-time AI Chatbot SSE Streaming Stabilization", desc: "The GPT-4o-mini chatbot experienced connection drops and timeout issues during SSE streaming. Implemented FormData transmission support, 120-second timeout configuration, and multimodal (image/PDF) attachment handling. Built a hybrid search pipeline leveraging Elasticsearch results as context." },
                challenge2: { title: "Admin Statistics Real-time Aggregation Fallback", desc: "Statistics data appeared empty for periods without pre-aggregated snapshots. Implemented AdminReportQueryService to generate reports in real-time from article source data, with support for hourly (24-slot) and period-based (daily/weekly/monthly/yearly) reports." }
            }
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
            contact: "연락하기",
            resume: "이력서 다운로드"
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
            minex: {
                title: "Mine X 네트워크",
                desc: "마인크래프트 서버 운영 (2년, 누적 유저 1,000+). 하드웨어 구매부터 Ubuntu Linux 인프라 구축·운영까지 직접 수행하고, Cloudflare Spectrum으로 DDoS 방어 환경을 구성했습니다."
            },
            visit: "사이트 방문",
            detail: "자세히 보기",
            ssafy: {
                title: "SSAFY AI 챌린지 – VQA",
                desc: "Qwen2.5-VL 모델로 VQA 정확도를 0.76에서 0.94로 향상시켰습니다. TTA, K-Fold, EMA 등 다양한 기법을 실험했습니다.",
                challenge: { title: "대표 문제 해결" },
                challenge1: { title: "학습/추론 불일치 해결", desc: "학습 시 정답 토큰이 누락되어 모델이 정답 패턴을 학습하지 못하는 구조적 문제를 발견했습니다. Assistant 메시지에 정답을 포함하고 add_generation_prompt=False로 전환하여 정답 토큰 위치를 정확히 학습시켰고, 이것만으로 정확도가 크게 향상되었습니다." },
                challenge2: { title: "T4 GPU 메모리 제약 극복", desc: "T4 GPU에서 BFloat16 미지원 및 OOM 문제가 발생했습니다. Float16 전환, FlashAttention 대신 SDPA Attention 적용, 4-bit QLoRA + Gradient Checkpointing + Batch Size 1 + Gradient Accumulation 4 조합으로 메모리 효율을 확보했습니다." },
                challenge3: { title: "과적합 방지 및 일반화", desc: "단일 모델의 과적합과 성능 편차 문제를 Stratified K-Fold, EMA/SWA, TTA, Majority Voting 앙상블로 해결하여 최종 정확도 0.94를 달성했습니다." }
            },
            self: {
                title: "SelF – 농산물 이커머스",
                desc: "Django REST API 백엔드 전체 구현 (회원, 상품, 주문). 사용자 행동 로그 기반 추천 알고리즘 (ALS, Gap filling)을 설계하고 구현했습니다.",
                challenge: { title: "대표 문제 해결" },
                challenge1: { title: "비정형 데이터 정제 및 정확도 개선", desc: "농산물 데이터가 비정형적이고 카테고리·단위·명칭이 통일되지 않아 추천 모델의 정확도가 낮았습니다. 데이터 정규화 파이프라인을 구축하고 카테고리 매핑 로직을 설계하여 모델 입력 품질을 개선했습니다." },
                challenge2: { title: "추천 개인화 cold start 문제", desc: "신규 사용자의 행동 로그가 부족해 개인화 추천이 작동하지 않는 문제가 있었습니다. 인기 기반 추천과 레시피 Gap filling 모델을 결합한 4개 모델 앙상블 구조를 설계하여, 행동 데이터가 없는 사용자에게도 의미 있는 추천을 제공했습니다." }
            },
            ani: {
                title: "ANI – AI 뉴스 큐레이팅",
                desc: "AI 기반 개인 맞춤형 뉴스 큐레이팅 서비스. Django 백엔드 전체 설계 및 구현, GPT-4o-mini 기반 SSE 스트리밍 챗봇, Elasticsearch 검색, 개인화 추천 시스템을 개발했습니다.",
                challenge: { title: "대표 문제 해결" },
                challenge1: { title: "실시간 AI 챗봇 SSE 스트리밍 안정화", desc: "GPT-4o-mini 기반 챗봇에서 SSE 스트리밍 응답 시 연결 끊김과 타임아웃 문제가 발생했습니다. FormData 전송 지원, 120초 타임아웃 설정, 멀티모달(이미지/PDF) 첨부 처리를 구현하고, Elasticsearch 검색 결과를 컨텍스트로 활용하는 하이브리드 검색 파이프라인을 구축했습니다." },
                challenge2: { title: "관리자 통계 실시간 집계 Fallback 설계", desc: "사전 집계 스냅샷이 누락된 구간의 통계 데이터가 비어 표시되는 문제가 있었습니다. 기사 원천 데이터에서 실시간으로 리포트를 생성하는 AdminReportQueryService를 구현하고, 시간별(hourly) 24슬롯 데이터와 기간별(일/주/월/연) 리포트를 지원하는 fallback 로직을 설계했습니다." }
            }
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

    // 이력서 링크에 현재 언어 파라미터 반영
    const resumeLink = document.querySelector('a[href*="resume.html"]');
    if (resumeLink) {
        resumeLink.setAttribute('href', './resume.html?lang=' + lang);
    }

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
// 애니메이션 (GSAP 사용 가능 시에만 실행)
// ========================================

if (gsapAvailable) {
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
}

// ========================================
// 프로젝트 상세 토글
// ========================================

document.querySelectorAll('.project-detail-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const detail = btn.nextElementSibling;
        const isOpen = !detail.hidden;
        detail.hidden = isOpen;
        btn.setAttribute('aria-expanded', String(!isOpen));
    });
});

// ========================================
// 부드러운 스크롤
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // URL 해시 업데이트 (브라우저 히스토리 지원)
            history.pushState(null, '', href);
        }
    });
});
