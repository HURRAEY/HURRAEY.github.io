# Giscus 문제 해결 가이드

## 문제 진단 체크리스트

Giscus가 작동하지 않을 때 다음 항목들을 순서대로 확인하세요.

### 1. 저장소 공개 여부 확인

**확인 방법:**

1. GitHub에서 `HURRAEY/HURRAEY.github.io` 저장소로 이동
2. 저장소 이름 옆에 "Public" 또는 "Private" 표시 확인
3. **"Private"인 경우**: Settings → General → Danger Zone → Change repository visibility → Make public

**확인 사항:**

- ✅ 저장소가 **Public** 상태여야 합니다
- ❌ Private 저장소에서는 방문자가 Discussion을 볼 수 없습니다

---

### 2. Giscus 앱 설치 확인

**확인 방법 (방법 1 - 저장소 설정에서):**

1. GitHub 저장소로 이동: `https://github.com/HURRAEY/HURRAEY.github.io`
2. 저장소 페이지에서 **"Settings"** 탭 클릭 (저장소 이름 옆에 있음)
3. 왼쪽 사이드바에서 다음 중 하나를 찾으세요:
   - **"Integrations"** → **"Installed GitHub Apps"** (구버전)
   - **"Apps"** → **"Installed apps"** (신버전)
   - 또는 **"Integrations"** → **"Installed apps"**
4. "giscus" 앱이 목록에 있는지 확인

**확인 방법 (방법 2 - 직접 링크):**

- 저장소 설정의 Apps 페이지로 직접 이동: `https://github.com/HURRAEY/HURRAEY.github.io/settings/installations`
- "giscus" 앱이 목록에 있는지 확인

**확인 방법 (방법 3 - Giscus 앱 페이지에서):**

1. [Giscus 앱 페이지](https://github.com/apps/giscus)로 이동
2. "Configure" 버튼 클릭
3. 설치된 저장소 목록에서 `HURRAEY/HURRAEY.github.io`가 있는지 확인

**설치되어 있지 않은 경우:**

1. [Giscus 앱 페이지](https://github.com/apps/giscus)로 이동
2. "Install" 버튼 클릭
3. "Only select repositories" 선택
4. `HURRAEY/HURRAEY.github.io` 선택
5. "Install" → "Approve & Install" 클릭

**확인 사항:**

- ✅ Giscus 앱이 설치되어 있어야 합니다
- ❌ 앱이 없으면 방문자가 댓글을 남길 수 없습니다

---

### 3. Discussions 활성화 확인

**확인 방법:**

1. GitHub 저장소로 이동: `https://github.com/HURRAEY/HURRAEY.github.io`
2. Settings → Features
3. "Discussions" 섹션 확인
4. "Set up discussions" 또는 "Discussions" 체크박스가 활성화되어 있는지 확인

**활성화되어 있지 않은 경우:**

1. Settings → Features
2. "Discussions" 체크박스 활성화
3. "Set up discussions" 버튼 클릭 (처음 활성화하는 경우)

**확인 사항:**

- ✅ Discussions 기능이 활성화되어 있어야 합니다
- ❌ Discussions가 없으면 Giscus가 작동하지 않습니다

---

### 4. Giscus 설정 페이지에서 repo-id 가져오기

**모든 사전 요구사항을 충족한 후:**

1. [Giscus 설정 페이지](https://giscus.app) 접속
2. 저장소 입력: `HURRAEY/HURRAEY.github.io`
3. **"giscus를 사용할 수 없습니다" 메시지가 사라지고** 설정 옵션들이 나타나는지 확인
4. 설정 완료 후 제공되는 스크립트에서 다음 정보 복사:
   - `data-repo-id`: 저장소 ID
   - `data-category-id`: 카테고리 ID (선택사항)

**주의:**

- 사전 요구사항(공개 저장소, 앱 설치, Discussions 활성화)이 모두 충족되어야만 repo-id를 받을 수 있습니다
- 그렇지 않으면 "giscus를 사용할 수 없습니다" 메시지가 계속 표시됩니다

---

### 5. 코드에 설정 적용

**`pages/_app.tsx` 파일 수정:**

```tsx
<Giscus
  repo="HURRAEY/HURRAEY.github.io"
  repoId="여기에_받은_repo_id_입력" // 빈 문자열("")이 아닌 실제 ID 입력
  mapping="pathname"
  reactionsEnabled={true}
  theme="preferred_color_scheme"
  lang="ko"
/>
```

---

## 단계별 확인 순서

1. ✅ 저장소가 Public인가?
2. ✅ Giscus 앱이 설치되어 있는가?
3. ✅ Discussions가 활성화되어 있는가?
4. ✅ Giscus 설정 페이지에서 repo-id를 받을 수 있는가?
5. ✅ 코드에 repo-id가 올바르게 입력되어 있는가?

---

## 자주 발생하는 오류

### "giscus를 사용할 수 없습니다" 메시지

- **원인**: 사전 요구사항 중 하나 이상이 충족되지 않음
- **해결**: 위의 체크리스트 1-3번 항목 확인

### 댓글이 표시되지 않음

- **원인**: `repoId`가 빈 문자열이거나 잘못된 값
- **해결**: Giscus 설정 페이지에서 올바른 `repoId` 확인 후 코드에 입력

### 댓글을 남길 수 없음

- **원인**: Giscus 앱이 설치되지 않음
- **해결**: 체크리스트 2번 항목 확인

---

## "모든 조건을 충족했는데도 작동하지 않는 경우"

모든 사전 요구사항을 확인했는데도 "giscus를 사용할 수 없습니다" 메시지가 나타나는 경우, 다음을 확인하세요:

### 1. 저장소 이름 정확성 확인

**확인 사항:**

- 저장소 이름에 공백이나 특수문자가 없는지 확인
- 대소문자가 정확한지 확인: `HURRAEY/HURRAEY.github.io` (대문자 H, U, R, R, A, E, Y)
- 저장소 URL을 직접 복사해서 사용: `https://github.com/HURRAEY/HURRAEY.github.io`

**테스트 방법:**

1. GitHub에서 저장소 페이지로 이동
2. 주소창의 URL을 복사
3. `github.com/` 뒤의 부분만 추출 (예: `HURRAEY/HURRAEY.github.io`)
4. Giscus 설정 페이지에 정확히 입력

### 2. Discussions 카테고리 생성 확인

**중요:** Discussions가 활성화되어 있어도 카테고리가 없으면 작동하지 않을 수 있습니다.

**확인 방법:**

1. 저장소 페이지에서 **"Discussions"** 탭 클릭
2. 카테고리가 있는지 확인 (General, Announcements 등)
3. 카테고리가 없다면:
   - Discussions 페이지에서 "New discussion" 클릭
   - 카테고리 선택 드롭다운에서 "New category" 선택
   - "General" 또는 "Announcements" 카테고리 생성

### 3. Giscus 앱 권한 재확인

**권한 확인:**

1. [Giscus 앱 페이지](https://github.com/apps/giscus)로 이동
2. "Configure" 버튼 클릭
3. `HURRAEY/HURRAEY.github.io` 저장소 선택
4. 다음 권한이 부여되어 있는지 확인:
   - ✅ Discussions: Read & Write
   - ✅ Metadata: Read-only

**권한 재설정:**

1. 저장소 Settings → Apps → Installed apps
2. "giscus" 앱 옆의 "Configure" 클릭
3. 권한을 확인하고 필요시 재설정

### 4. 브라우저 캐시 및 쿠키 문제

**해결 방법:**

1. 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
2. 시크릿/프라이빗 모드에서 Giscus 설정 페이지 다시 시도
3. 다른 브라우저에서 시도

### 5. GitHub API 캐시 문제

GitHub API가 변경사항을 아직 반영하지 않았을 수 있습니다.

**해결 방법:**

1. 5-10분 대기 후 다시 시도
2. 저장소 Settings에서 Discussions를 비활성화했다가 다시 활성화
3. Giscus 앱을 제거했다가 다시 설치

### 6. 저장소 접근 권한 확인

**확인 사항:**

- 저장소에 접근할 수 있는 GitHub 계정으로 로그인되어 있는지 확인
- 조직(Organization) 저장소인 경우, 조직 설정에서 앱 설치 권한 확인

### 7. 저장소 이름 형식 확인

`.github.io` 저장소의 경우 특별한 주의가 필요합니다.

**확인 사항:**

- 저장소 이름이 정확히 `HURRAEY.github.io` 형식인지 확인
- 사용자 이름이 정확한지 확인 (대소문자 구분)

### 8. 수동으로 Discussion 생성 테스트

**테스트 방법:**

1. 저장소 Discussions 탭으로 이동
2. "New discussion" 클릭
3. 제목에 테스트 페이지 경로 입력 (예: `/posts/hello-hurraey`)
4. Discussion 생성이 가능한지 확인
5. 생성이 안 되면 Discussions 설정에 문제가 있을 수 있음

### 9. Giscus 설정 페이지에서 직접 확인

**디버깅 정보 확인:**

1. Giscus 설정 페이지에서 저장소 입력 후
2. 브라우저 개발자 도구 열기 (F12)
3. Console 탭에서 에러 메시지 확인
4. Network 탭에서 GitHub API 호출 실패 여부 확인

### 10. 대안: 수동으로 repo-id 가져오기

위 방법들이 모두 실패하면, GitHub API를 통해 직접 확인할 수 있습니다:

**방법:**

1. GitHub Personal Access Token 생성 (Settings → Developer settings → Personal access tokens)
2. 다음 API 호출로 저장소 정보 확인:
   ```
   GET https://api.github.com/repos/HURRAEY/HURRAEY.github.io
   ```
3. 응답에서 `id` 필드 확인 (이것이 repo-id)

---

## 추가 도움말

- [Giscus 공식 문서](https://github.com/giscus/giscus)
- [GitHub Discussions 가이드](https://docs.github.com/en/discussions)
- [Giscus GitHub Issues](https://github.com/giscus/giscus/issues) - 유사한 문제 검색
