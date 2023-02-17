# React Native

## 1. Node.js 설치

## 2. expo cli 설치 & ios 앱 개발을 위한 모듈 설치

npm install -g expo-cli (-g는 실패)

맥 사용자라면 아래 코드 실행해야함 (실패)
brew update
brew install watchman (watchman : 폴더나 파일을 감시하고 있다가, 변화가 생기면 자동으로 원하는 기능을 실행할 수 있도록 하는 프로그램)
brew install --HEAD watchman

ios이면 appstore에서 expo go 다운받은 후 계정 만들고 로그인하기

## 3. React Native의 작동 원리

리액트 네이티브 앱은 React Native, Bridge, 운영체제를 갖고 있는 실제 앱이다
리액트 네이티브 안에는 브라우저가 없다
리액트 네이티브는 인터페이스로, 우리와 운영 체제 (ios, 안드로이드) 사이에 있음
우리가 코드로 버튼을 만든다면 리액트 네이티브(메세지 보냄)는 ios나 안드로이드에게 '버튼을 그려주세요'라고 요청을 하고, ios나 안드로이드는 버튼을 보여줌
Native(이벤트를 감지함, 메세지를 만들어서 Bridge 줌) -> Bridge(메세지를 JavaScript에게 전달함) -> JavaScript 코드(이벤트 받은 코드를 실행시키고 나서 Bridge를 통해 Native에게 메세지를 보냄)

## 4. 개발환경 설정

npx create-expo-app [폴더명]
cd [폴더명]
npx expo start

웹을 실행하려면 아래 코드까지 설치
npx expo install react-native-web@~0.18.9 react-dom@18.1.0

## 5. 로그인

expo login

## 6. Snack

https://snack.expo.dev/
Snack은 브라우저에서 React 어플리케이션을 만들 수 있게 해주는 온라인 코드 에디터임

## 7. React Native의 규칙

1. 리액트 네이티브는 웹사이트가 아니라서 HTML태그를 사용할 수 없음
   대신 사용할 수 있는 것들이 있음(ex. div 대신 View)
2. 모든 text는 <Text>라는 컴포넌트 안에 들어가야 함
3. 웹에서 사용하던 모든 style을 사용할 수 없음 (ex. border (x))

## 8. StyleSheet.create({})

이걸 사용하는 이유는 좋은 자동 완성 기능을 제공함 (c만 입력해도 c를 포함한 옵션들이 다 보여짐)
하지만 필수 요소는 아님
인라인 스타일도 가능, StylesSheet.create를 뺀 객체만 선언해도 사용 가능 (ex. const styles = {fontSize:48})
