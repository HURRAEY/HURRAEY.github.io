# Giscus 댓글 시스템 설정 가이드

## 사전 요구사항

Giscus를 사용하기 전에 다음 조건들이 충족되어 있어야 합니다:

1. **공개 저장소**: 저장소가 공개(Public) 상태여야 합니다. 그렇지 않으면 방문자들은 Discussion을 볼 수 없습니다.
2. **Giscus 앱 설치**: Giscus 앱이 설치되어 있어야 합니다. 그렇지 않으면 방문자들은 댓글과 반응을 남길 수 없습니다.
3. **Discussions 활성화**: Discussions 기능이 해당 저장소에서 활성화되어 있어야 합니다.

**저장소**: `HURRAEY/HURRAEY.github.io`

---

## 1. Giscus 앱 설치

1. [Giscus 앱 페이지](https://github.com/apps/giscus)로 이동합니다.
2. 페이지 오른쪽 상단의 **"Install"** 버튼을 클릭합니다.
3. 설치 옵션을 선택합니다:
   - **"Only select repositories"**: 특정 저장소만 선택 (권장)
   - **"All repositories"**: 모든 저장소에 설치
4. 저장소 선택 화면에서 `HURRAEY/HURRAEY.github.io` 저장소를 선택합니다.
5. **"Install"** 버튼을 클릭하여 설치를 완료합니다.
6. 설치 완료 후 권한 승인 화면이 나타나면 **"Approve & Install"** 버튼을 클릭합니다.

**설치 확인 방법:**

- 저장소 Settings → Apps (또는 Integrations) → Installed apps에서 "giscus" 확인
- 또는 직접 링크: `https://github.com/HURRAEY/HURRAEY.github.io/settings/installations`

## 2. Giscus 설정 가져오기

1. [Giscus 설정 페이지](https://giscus.app)에 접속합니다.
2. GitHub 저장소 정보를 입력합니다:
   - Repository: `HURRAEY/HURRAEY.github.io`
   - Discussion category: 원하는 카테고리 선택 (또는 새로 생성)

**⚠️ 중요**: 만약 "giscus를 사용할 수 없습니다"라는 메시지가 나타나면, 위의 **사전 요구사항**이 모두 충족되었는지 확인하세요. 사전 요구사항이 충족되지 않으면 `repo-id`를 받을 수 없습니다.

3. 설정을 완료하면 다음 정보를 받게 됩니다:
   - `data-repo-id`: 저장소 ID
   - `data-category-id`: 카테고리 ID (선택사항)

## 3. 설정 적용

`pages/_app.tsx` 파일에서 Giscus 컴포넌트의 `repoId`를 업데이트하세요:

```tsx
<Giscus
  repo="HURRAEY/HURRAEY.github.io"
  repoId="여기에_받은_repo_id_입력" // 이 부분을 업데이트
  mapping="pathname"
  reactionsEnabled={true}
  theme="preferred_color_scheme"
  lang="ko"
/>
```

## 4. Discussions 활성화

GitHub 저장소 설정에서 Discussions를 활성화해야 합니다:

1. 저장소 Settings → Features
2. "Discussions" 체크박스 활성화

## 문제 해결

Giscus 설정 중 문제가 발생하면 [GISCUS_TROUBLESHOOTING.md](./GISCUS_TROUBLESHOOTING.md)를 참고하세요.

## 참고

- 댓글은 GitHub Discussions를 기반으로 작동합니다.
- 무료이며 GitHub 계정만 있으면 사용 가능합니다.
- 다크 모드를 자동으로 감지합니다.
