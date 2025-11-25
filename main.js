/**
 * 3D 우주 포트폴리오 - Three.js 기반
 * 무중력 상태의 카드들이 우주 공간에 떠있는 인터랙티브 포트폴리오
 */

// 전역 변수 선언
let scene, camera, renderer;
let stars, cards = [];
let raycaster, mouse;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };
let selectedCard = null;
let cardGroup;

// 포트폴리오 데이터 정의
const portfolioData = {
    about: {
        title: 'ABOUT ME',
        color: 0x00f5ff,
        content: `
            <p>안녕하세요! 창의적인 웹 개발자입니다.</p>
            <p>사용자 경험을 중시하며, 아름답고 기능적인 웹 애플리케이션을 만드는 것을 좋아합니다.</p>
            <h3>저는 이런 사람입니다</h3>
            <p>새로운 기술을 배우는 것을 즐기며, 문제 해결에 열정을 가지고 있습니다.
            팀과의 협업을 통해 더 나은 결과물을 만들어내는 것을 추구합니다.</p>
        `
    },
    skills: {
        title: 'SKILLS',
        color: 0xff00ff,
        content: `
            <p>다양한 기술 스택을 활용하여 프로젝트를 수행합니다.</p>
            <div class="skills-grid">
                <div class="skill-item"><div class="icon">⚛️</div><span>React</span></div>
                <div class="skill-item"><div class="icon">🟨</div><span>JavaScript</span></div>
                <div class="skill-item"><div class="icon">🔷</div><span>TypeScript</span></div>
                <div class="skill-item"><div class="icon">🎨</div><span>CSS3</span></div>
                <div class="skill-item"><div class="icon">🟢</div><span>Node.js</span></div>
                <div class="skill-item"><div class="icon">🐍</div><span>Python</span></div>
                <div class="skill-item"><div class="icon">🗄️</div><span>PostgreSQL</span></div>
                <div class="skill-item"><div class="icon">☁️</div><span>AWS</span></div>
            </div>
        `
    },
    projects: {
        title: 'PROJECTS',
        color: 0xffd700,
        content: `
            <div class="project-card">
                <h4>🚀 프로젝트 A</h4>
                <p>실시간 데이터 시각화 대시보드 개발</p>
                <div class="tech-stack">
                    <span class="tech-tag">React</span>
                    <span class="tech-tag">D3.js</span>
                    <span class="tech-tag">WebSocket</span>
                </div>
            </div>
            <div class="project-card">
                <h4>🌐 프로젝트 B</h4>
                <p>마이크로서비스 기반 E-commerce 플랫폼</p>
                <div class="tech-stack">
                    <span class="tech-tag">Node.js</span>
                    <span class="tech-tag">Docker</span>
                    <span class="tech-tag">Kubernetes</span>
                </div>
            </div>
            <div class="project-card">
                <h4>📱 프로젝트 C</h4>
                <p>크로스 플랫폼 모바일 앱 개발</p>
                <div class="tech-stack">
                    <span class="tech-tag">React Native</span>
                    <span class="tech-tag">Firebase</span>
                </div>
            </div>
        `
    },
    experience: {
        title: 'EXPERIENCE',
        color: 0x00ff88,
        content: `
            <div class="timeline">
                <div class="timeline-item">
                    <h4>시니어 프론트엔드 개발자</h4>
                    <div class="period">2022 - 현재</div>
                    <p>대규모 웹 애플리케이션 개발 및 팀 리드</p>
                </div>
                <div class="timeline-item">
                    <h4>풀스택 개발자</h4>
                    <div class="period">2020 - 2022</div>
                    <p>스타트업에서 제품 전체 개발 담당</p>
                </div>
                <div class="timeline-item">
                    <h4>주니어 개발자</h4>
                    <div class="period">2018 - 2020</div>
                    <p>웹 개발 기초 및 실무 경험 습득</p>
                </div>
            </div>
        `
    },
    contact: {
        title: 'CONTACT',
        color: 0xff6b6b,
        content: `
            <p>함께 일하고 싶으시다면 연락 주세요!</p>
            <div class="contact-info">
                <div class="contact-item">
                    <div class="icon">📧</div>
                    <span>이메일: <a href="mailto:hello@example.com">hello@example.com</a></span>
                </div>
                <div class="contact-item">
                    <div class="icon">💼</div>
                    <span>LinkedIn: <a href="#">/in/yourprofile</a></span>
                </div>
                <div class="contact-item">
                    <div class="icon">🐙</div>
                    <span>GitHub: <a href="#">github.com/yourname</a></span>
                </div>
                <div class="contact-item">
                    <div class="icon">🌐</div>
                    <span>포트폴리오: <a href="#">yourwebsite.com</a></span>
                </div>
            </div>
        `
    }
};

/**
 * 초기화 함수 - 앱 시작점
 */
function init() {
    // 씬 생성
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0f, 0.0008);

    // 카메라 설정
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );
    camera.position.z = 500;

    // 렌더러 설정
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a0f, 1);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // 레이캐스터 및 마우스 설정
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // 카드 그룹 생성
    cardGroup = new THREE.Group();
    scene.add(cardGroup);

    // 씬 구성요소 생성
    createStars();
    createNebula();
    createCards();

    // 조명 추가
    addLighting();

    // 이벤트 리스너 등록
    setupEventListeners();

    // 로딩 완료 처리
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('fade-out');
    }, 1500);

    // 애니메이션 시작
    animate();
}

/**
 * 별 파티클 시스템 생성
 */
function createStars() {
    const starCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;

        // 구형 분포로 별 배치
        const radius = 800 + Math.random() * 1000;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        // 별 색상 (흰색 ~ 노란색 ~ 파란색)
        const colorChoice = Math.random();
        if (colorChoice < 0.7) {
            colors[i3] = 1;
            colors[i3 + 1] = 1;
            colors[i3 + 2] = 1;
        } else if (colorChoice < 0.85) {
            colors[i3] = 1;
            colors[i3 + 1] = 0.9;
            colors[i3 + 2] = 0.5;
        } else {
            colors[i3] = 0.5;
            colors[i3 + 1] = 0.7;
            colors[i3 + 2] = 1;
        }

        sizes[i] = Math.random() * 2 + 0.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });

    stars = new THREE.Points(geometry, material);
    scene.add(stars);
}

/**
 * 성운 효과 생성 (배경 구체들)
 */
function createNebula() {
    // 성운 색상 그라데이션을 위한 구체들
    const nebulaColors = [
        { color: 0x4a1a6b, opacity: 0.03 },
        { color: 0x1a3a6b, opacity: 0.02 },
        { color: 0x2a1a4b, opacity: 0.025 }
    ];

    nebulaColors.forEach((nebula, index) => {
        const geometry = new THREE.SphereGeometry(600 + index * 100, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: nebula.color,
            transparent: true,
            opacity: nebula.opacity,
            side: THREE.BackSide
        });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
    });
}

/**
 * 포트폴리오 카드 생성
 */
function createCards() {
    const sections = Object.keys(portfolioData);
    const cardCount = sections.length;
    const radius = 300;

    sections.forEach((section, index) => {
        const data = portfolioData[section];
        const card = createCard(section, data, index, cardCount, radius);
        cards.push(card);
        cardGroup.add(card);
    });
}

/**
 * 개별 카드 생성
 */
function createCard(section, data, index, total, radius) {
    // 카드를 구형으로 배치
    const phi = Math.acos(-1 + (2 * index + 1) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    // 카드 그룹 생성
    const cardGroup = new THREE.Group();
    cardGroup.position.set(x, y, z);
    cardGroup.userData = { section, data, originalPosition: { x, y, z } };

    // 카드 본체 (둥근 모서리 효과를 위한 평면)
    const cardWidth = 120;
    const cardHeight = 160;
    const cardGeometry = new THREE.PlaneGeometry(cardWidth, cardHeight);

    // 카드 재질 (글로우 효과)
    const cardMaterial = new THREE.MeshPhongMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        emissive: data.color,
        emissiveIntensity: 0.1
    });

    const cardMesh = new THREE.Mesh(cardGeometry, cardMaterial);
    cardGroup.add(cardMesh);

    // 카드 테두리
    const edgesGeometry = new THREE.EdgesGeometry(cardGeometry);
    const edgesMaterial = new THREE.LineBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.6
    });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    cardGroup.add(edges);

    // 글로우 효과 (더 큰 반투명 평면)
    const glowGeometry = new THREE.PlaneGeometry(cardWidth + 20, cardHeight + 20);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.05,
        side: THREE.DoubleSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.z = -1;
    cardGroup.add(glow);

    // 텍스트 스프라이트 생성
    const textSprite = createTextSprite(data.title, data.color);
    textSprite.position.set(0, 0, 1);
    textSprite.scale.set(100, 50, 1);
    cardGroup.add(textSprite);

    // 카드가 카메라를 향하도록 설정
    cardGroup.lookAt(0, 0, 0);

    // 애니메이션 속성 추가
    cardGroup.userData.floatOffset = Math.random() * Math.PI * 2;
    cardGroup.userData.floatSpeed = 0.5 + Math.random() * 0.5;
    cardGroup.userData.rotationSpeed = 0.001 + Math.random() * 0.002;

    return cardGroup;
}

/**
 * 텍스트 스프라이트 생성
 */
function createTextSprite(text, color) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 256;

    // 배경 투명
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 텍스트 스타일
    context.font = 'bold 48px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // 글로우 효과
    const hexColor = '#' + new THREE.Color(color).getHexString();
    context.shadowColor = hexColor;
    context.shadowBlur = 20;
    context.fillStyle = '#ffffff';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // 텍스처 생성
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true
    });

    return new THREE.Sprite(spriteMaterial);
}

/**
 * 조명 설정
 */
function addLighting() {
    // 환경광
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // 포인트 라이트들
    const pointLight1 = new THREE.PointLight(0x00f5ff, 1, 1000);
    pointLight1.position.set(200, 200, 200);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 0.8, 1000);
    pointLight2.position.set(-200, -200, 200);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffd700, 0.6, 1000);
    pointLight3.position.set(0, 300, -200);
    scene.add(pointLight3);
}

/**
 * 이벤트 리스너 설정
 */
function setupEventListeners() {
    // 마우스 이벤트
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('click', onClick);

    // 터치 이벤트
    renderer.domElement.addEventListener('touchstart', onTouchStart);
    renderer.domElement.addEventListener('touchmove', onTouchMove);
    renderer.domElement.addEventListener('touchend', onTouchEnd);

    // 윈도우 리사이즈
    window.addEventListener('resize', onWindowResize);

    // 모달 닫기 버튼
    document.querySelector('.close-btn').addEventListener('click', closeModal);
    document.getElementById('detail-modal').addEventListener('click', (e) => {
        if (e.target.id === 'detail-modal') closeModal();
    });

    // 네비게이션 클릭
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            focusOnCard(section);
        });
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

/**
 * 마우스 다운 이벤트
 */
function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

/**
 * 마우스 이동 이벤트
 */
function onMouseMove(event) {
    if (!isDragging) {
        // 호버 효과를 위한 레이캐스팅
        updateMousePosition(event);
        checkCardHover();
        return;
    }

    const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    };

    targetRotation.y += deltaMove.x * 0.005;
    targetRotation.x += deltaMove.y * 0.005;

    // X축 회전 제한
    targetRotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotation.x));

    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

/**
 * 마우스 업 이벤트
 */
function onMouseUp() {
    isDragging = false;
}

/**
 * 클릭 이벤트
 */
function onClick(event) {
    updateMousePosition(event);

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cardGroup.children, true);

    if (intersects.length > 0) {
        let clickedCard = intersects[0].object;

        // 부모 그룹 찾기
        while (clickedCard.parent && !clickedCard.userData.section) {
            clickedCard = clickedCard.parent;
        }

        if (clickedCard.userData.section) {
            openModal(clickedCard.userData.section);
        }
    }
}

/**
 * 터치 시작 이벤트
 */
function onTouchStart(event) {
    if (event.touches.length === 1) {
        isDragging = true;
        previousMousePosition = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
    }
}

/**
 * 터치 이동 이벤트
 */
function onTouchMove(event) {
    if (!isDragging || event.touches.length !== 1) return;

    event.preventDefault();

    const deltaMove = {
        x: event.touches[0].clientX - previousMousePosition.x,
        y: event.touches[0].clientY - previousMousePosition.y
    };

    targetRotation.y += deltaMove.x * 0.005;
    targetRotation.x += deltaMove.y * 0.005;
    targetRotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotation.x));

    previousMousePosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
    };
}

/**
 * 터치 종료 이벤트
 */
function onTouchEnd(event) {
    isDragging = false;

    // 탭 감지 (클릭과 유사)
    if (event.changedTouches.length === 1) {
        const touch = event.changedTouches[0];
        updateMousePositionFromTouch(touch);

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(cardGroup.children, true);

        if (intersects.length > 0) {
            let clickedCard = intersects[0].object;
            while (clickedCard.parent && !clickedCard.userData.section) {
                clickedCard = clickedCard.parent;
            }
            if (clickedCard.userData.section) {
                openModal(clickedCard.userData.section);
            }
        }
    }
}

/**
 * 마우스 위치 업데이트
 */
function updateMousePosition(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

/**
 * 터치 위치로 마우스 위치 업데이트
 */
function updateMousePositionFromTouch(touch) {
    mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
}

/**
 * 카드 호버 체크
 */
function checkCardHover() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cardGroup.children, true);

    // 모든 카드 호버 효과 리셋
    cards.forEach(card => {
        card.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    });

    if (intersects.length > 0) {
        let hoveredCard = intersects[0].object;
        while (hoveredCard.parent && !hoveredCard.userData.section) {
            hoveredCard = hoveredCard.parent;
        }
        if (hoveredCard.userData.section) {
            hoveredCard.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
            document.body.style.cursor = 'pointer';
        }
    } else {
        document.body.style.cursor = 'grab';
    }
}

/**
 * 윈도우 리사이즈 핸들러
 */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * 모달 열기
 */
function openModal(section) {
    const data = portfolioData[section];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-body').innerHTML = data.content;
    document.getElementById('detail-modal').classList.remove('hidden');

    // 네비게이션 활성화 상태 업데이트
    updateNavigation(section);
}

/**
 * 모달 닫기
 */
function closeModal() {
    document.getElementById('detail-modal').classList.add('hidden');
}

/**
 * 네비게이션 상태 업데이트
 */
function updateNavigation(activeSection) {
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.dataset.section === activeSection) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * 특정 카드로 포커스 이동
 */
function focusOnCard(section) {
    const card = cards.find(c => c.userData.section === section);
    if (!card) return;

    // 카드 방향으로 회전
    const pos = card.userData.originalPosition;
    targetRotation.y = Math.atan2(pos.x, pos.z);
    targetRotation.x = Math.atan2(pos.y, Math.sqrt(pos.x * pos.x + pos.z * pos.z)) * -1;

    // 모달 열기
    setTimeout(() => {
        openModal(section);
    }, 500);
}

/**
 * 애니메이션 루프
 */
function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    // 부드러운 회전 보간
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

    // 카드 그룹 회전 적용
    cardGroup.rotation.x = currentRotation.x;
    cardGroup.rotation.y = currentRotation.y;

    // 별 천천히 회전
    if (stars) {
        stars.rotation.y += 0.0001;
        stars.rotation.x += 0.00005;
    }

    // 카드 떠다니는 애니메이션
    cards.forEach(card => {
        const offset = card.userData.floatOffset;
        const speed = card.userData.floatSpeed;

        // 부드러운 상하 움직임
        card.position.y = card.userData.originalPosition.y + Math.sin(time * speed + offset) * 5;

        // 약간의 회전
        card.rotation.z = Math.sin(time * 0.5 + offset) * 0.05;
    });

    renderer.render(scene, camera);
}

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', init);
