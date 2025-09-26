<script lang="ts">
	import '/src/styles/global.scss';
	import '/src/i18n.svelte.ts';
	import { localeStore } from '../i18n.svelte';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	let { children } = $props();

	let localeLoaded = $derived(!localeStore.isLoading && localeStore.locale);
	let title = $state('');

	onMount(() => {
		document.body.classList.add('loaded');
		if (localeLoaded) {
			title = $_('meta.title');
		}

		// Kakao SDK 초기화
		const key = import.meta.env.VITE_KAKAO_JS_KEY;
		if (window.Kakao && !window.Kakao.isInitialized()) {
			window.Kakao.init(key);
			console.log('Kakao initialized:', window.Kakao.isInitialized());
		}
	});
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<title>{title}</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Noto+Serif+KR:wght@200..900&family=Sacramento&display=swap"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
	/>
	<meta property="og:title" content="ChanGyo & JiHye's Wedding" /> 
	<meta property="og:description" content="Please join us on our most special day!" /> 
	<meta property="og:image" content="https://emily-marries-anthony.com/preview.jpg" /> 
	<meta property="og:url" content="https://zzihyechanwedding.netlify.app" />
	<meta property="og:type" content="website" />

	<!-- ✅ 여기에서 외부 SDK 스크립트 로드 -->
	<script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js" defer crossorigin="anonymous"></script>
</svelte:head>

{#if localeLoaded}
	{@render children()}
{/if}
