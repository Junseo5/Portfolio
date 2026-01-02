# CLAUDE.md - 포트폴리오 웹사이트 개발 가이드라인

## 프로젝트 개요

이 프로젝트는 **정적 포트폴리오 웹사이트**입니다.
- 기술 스택: HTML, CSS, Vanilla JavaScript
- 외부 라이브러리: GSAP (애니메이션), RemixIcon (아이콘)
- 호스팅: GitHub Pages (정적 파일만 지원)

## 언어 규칙

**한국어 사용 필수:**
- 모든 코드 주석은 한국어로 작성
- 모든 커밋 메시지는 한국어로 작성
- 변수명과 함수명은 영어 유지

```javascript
// ✅ 올바른 예시
// 테마를 로컬 스토리지에 저장
const saveTheme = (theme) => {
    localStorage.setItem('theme', theme);
};
```

## 정적 웹사이트 개발 원칙

### 1. JavaScript 최소화
- 정적 사이트에서 JS는 보조적 역할만 수행
- 핵심 콘텐츠는 JS 없이도 표시되어야 함
- 애니메이션 실패 시에도 콘텐츠 접근 가능해야 함

### 2. FOUC (Flash of Unstyled Content) 방지
```html
<!-- 테마 초기화는 반드시 head에서 인라인으로 -->
<head>
    <script>
        // 렌더링 전에 테마 적용
        const theme = localStorage.getItem('theme') ||
            (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', theme);
    </script>
</head>
```

### 3. Progressive Enhancement
- CSS만으로 기본 레이아웃 완성
- JS는 향상된 경험을 위한 추가 기능
- 애니메이션은 `prefers-reduced-motion` 존중

## 성능 가이드라인

### 애니메이션
- GSAP ScrollTrigger 사용 시 `once: true`로 1회만 실행
- 저사양 기기 고려하여 복잡한 애니메이션 자제
- 커스텀 커서는 데스크톱 + 마우스 환경에서만 활성화

### 리소스 로딩
- 폰트는 `preconnect`로 미리 연결
- 외부 스크립트는 필요한 것만 로드
- 이미지는 적절한 포맷과 크기 사용

## 접근성 (A11y) 요구사항

### 필수 구현
- 모든 인터랙티브 요소에 `focus-visible` 스타일
- 버튼/링크에 적절한 `aria-label`
- 색상 대비 WCAG AA 기준 충족
- 키보드만으로 모든 기능 접근 가능

```css
/* focus-visible 스타일 예시 */
button:focus-visible,
a:focus-visible {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
}
```

### 권장 구현
- `aria-live` 영역으로 동적 변경 알림
- 스킵 네비게이션 링크
- 적절한 heading 계층 구조

## 커밋 메시지 형식

```
feat(ui): 새로운 기능 추가
fix(animation): 버그 수정
refactor(js): 코드 개선
style(css): 스타일 수정
docs: 문서 수정
chore: 빌드/설정 변경
```

## 체크리스트

코드 완료 전 확인:
- [ ] JS 없이도 콘텐츠 표시됨
- [ ] 모바일/데스크톱 반응형 정상 동작
- [ ] 라이트/다크 모드 정상 동작
- [ ] 키보드 네비게이션 가능
- [ ] FOUC 현상 없음
- [ ] 외부 링크에 `rel="noopener noreferrer"`
- [ ] 모든 주석 한국어로 작성
