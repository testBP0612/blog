---
title: 在 Next.js + typescript 專案中使用 SVGR 打造自己的 SVG 元件庫
date: '2022-05-03'
description: SVGR 是一個將 svg 檔案轉換成 React component 的套件，引入時可以根據當下需求修改所需的屬性，使用起來十分簡潔，因此將網站用到的 svg 檔案都做成 component 便可集中管理。
thumbnailUrl: '/javascript-functions-thumbnail.jpeg'
tags: ['nextjs', 'typescript']
---
  
## 為什麼要用 SVG

SVG 是一種圖形格式，是可縮放向量圖形 (Scalable Vector Graphics) 的縮寫。與我們一般常見的點陣圖形（像 JPEG 或 PNG）不同，最大的特色就是不會因為圖片尺寸過小或放大倍數過高而失真，在網站中非常適合用於標誌和圖形（Icon）。

向量圖形與點陣圖型在組成上有根本的差異。點陣圖形以像素為基本，是「方塊格」組成的矩形，如果將點陣圖放大，就會看到顆粒狀和像素化的方格。如果點陣圖縮得太小，則會變得模糊不清。相對的，向量圖形檔案則是根據點、線、形狀和顏色所構成的複雜數學算式組成。可以把它理解成就像是用程式「畫」出來的圖案。

網站設計師常會在介面上添加標示特定功能的圖形標誌，就是我們熟知的 Icon，例如登入註冊會員、社群媒體等功能按鈕常以 Icon 代替。因為 Icon 大多是尺寸較小的圖像矩形，放上網站為避免失真大多會轉存成 SVG 檔案交給前端工程師。

當網站規模大了 Icon 數量變多，用到數十個甚至上百個 SVG 都有可能，而這些很可能只是 hover 時需要顏色變化就多出一個檔案。如果是一般 PNG 檔案那確實需要，但 SVG 本質上就是程式碼組成的，可以透過參數變化，在需要的地方客製化顏色、尺寸大大提高開發彈性。

## 在專案中使用 SVGR

[@svgr/webpack](https://react-svgr.com/) 是一個 JavaScript 的套件，可以將 SVG 圖像轉換成 React component。這個套件可以幫助開發者在 React 中方便地使用 SVG 圖像，並且可以輕鬆地進行樣式和事件的設定。像是將 SVG 圖像作為 React 組件導入，並使用 props 來進行修改。

如果是使用 Create React App 指令產生的專案，它已經預先安裝了 @svgr/webpack 套件，因此不需要額外安裝。可以直接在組件中導入 SVG ，就像這樣使用：

```jsx
import { ReactComponent as logo } from "./logo.svg";
```

但是在 Next.js 中我們需要手動進行安裝及配置：

1. 在控制台中運行以下命令以安裝 @svgr/webpack：

`npm install --save-dev @svgr/webpack`

2. 再來配置新的 Webpack 規則，用於處理 SVG，在 `next.config.js` 文件中添加以下設定：

```js
webpack(config) {
	config.module.rules.push({
		// .svg 結尾的檔案才進行處理
		test: /\.svg$/i,
		// 限制 jsx, tsx 的檔案才能引入 SVG
		issuer: /\.[jt]sx?$/,
		use: ['@svgr/webpack'],
	})
	return config
},
```

3. 現在可以在 TypeScript 中使用和導入 SVG 文件，就像這樣：

```tsx
import { Icon } from '../public/icons/x.svg';

const Home: NextPage = () => {
  return (
    <main>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
			<Icon />
    </main>
  );
};

export default Home;
```

但是接下來會馬上遇到這個問題，怎麼回事？

```
Cannot find module '../public/icons/x.svg' or its corresponding type declarations.ts(2307)
```

這是因為 TypeScript 無法識別 SVG 文件的類型，具體原因是 [Next.js 11 以後導入了自己的 image type](https://github.com/vercel/next.js/pull/26485)，把 `.svg` 的檔案設定成了 `any`，可以在 `/node_modules/next/image-types/global.d.ts` 看到這些設定。