<script lang="ts">
	import photo2 from '$lib/assets/gallery/7.webp';
	import photo3 from '$lib/assets/gallery/black_full_2.jpg';
	import photo4 from '$lib/assets/gallery/black_half_1.jpg';
	import photo5 from '$lib/assets/gallery/10.webp';
	import photo6 from '$lib/assets/gallery/white_half_1.jpg';
	import photo7 from '$lib/assets/gallery/black_full_1.jpg';
	import photo8 from '$lib/assets/gallery/8.webp';
	import photo9 from '$lib/assets/gallery/9.webp';
	import photo10 from '$lib/assets/gallery/white_full_1.jpg';
	import photo11 from '$lib/assets/gallery/11.webp';

	import PhotoSwipeLightBox from 'photoswipe/lightbox';
	import PhotoSwipe from 'photoswipe';
	import 'photoswipe/style.css';
	import { onMount } from 'svelte';
	import { localeStore } from '../i18n.svelte';
	import { _ } from 'svelte-i18n';

	onMount(() => {
		const lightbox = new PhotoSwipeLightBox({
			gallery: '#gallery',
			children: 'a',
			showHideAnimationType: 'fade',
			pswpModule: PhotoSwipe,
			allowPanToNext: true,
			allowMouseDrag: true,
			allowTouchDrag: true,
			showHideOpacity: true,
			spacing: 0.1,
			loop: true
		});

		lightbox.init();
	});

	const photos = [
		{
			src: photo10,
			width: 2538,
			height: 3554
		},
		{
			src: photo2,
			width: 1200,
			height: 1800
		},
		{
			src: photo3,
			width: 3244,
			height: 4541
		},
		{
			src: photo4,
			width: 3503,
			height: 4905
		},
		{
			src: photo5,
			width: 1200,
			height: 1800
		},
		{
			src: photo6,
			width: 3123,
			height: 4372
		},
		{
			src: photo7,
			width: 3244,
			height: 4541
		},
		{
			src: photo8,
			width: 1200,
			height: 1800
		},
		{
			src: photo9,
			width: 1200,
			height: 1790
		},
		{
			src: photo11,
			width: 1200,
			height: 1790
		}
	];
</script>

<section class="gallery backgroundpng">
	<div class="header">
		<h2 class="title {localeStore.locale}">{$_('gallery.title')}</h2>
		<p class="sub-title {localeStore.locale}">{$_('gallery.sub_title')}</p>
	</div>
	<div id="gallery">
		{#each photos as photo}
			<a
				href={photo.src}
				class="slide"
				data-pswp-width={photo.width}
				data-pswp-height={photo.height}
				target="_blank"
			>
				<img class="thumbnail" src={photo.src} alt="" />
			</a>
		{/each}
	</div>
</section>

<style lang="scss">
		section.backgroundpng {
		position: relative;
		/* overflow: hidden;  흐림 필터 영역이 밖으로 튀어나가지 않게 */
	}

	section.backgroundpng::before {
		content: "";
		position: absolute;
		inset: 0;
		background-image: url('/src/lib/assets/background.png');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;
		opacity: 0.2; /* 투명도 */
		 /* filter: blur(0.1px); 흐림 효과 */
		 /* transform: scale(1.05); 블러 때문에 생기는 테두리 잘림 방지 */
		z-index: -1;
	}

	section.gallery {
		padding: 2em 2em 2em 2em;
		background-color: rgba($white, 0.8); /* 80% 불투명 */
	}

	.header {
		margin-bottom: 2em;
	}

	h2.title {
		text-align: center;

		&.kr {
			@extend .title-font-kr;
			letter-spacing: 1px;
		}
	}

	p.sub-title {
		text-align: center;
		&.kr {
			margin-top: 0.9em;
			font-size: 0.9rem;
		}
	}

	#gallery {
		display: grid;
		gap: 1em;
		grid-template-columns: repeat(2, 1fr);
		grid-auto-rows: 6.5em;
	}

	img.thumbnail {
		border-radius: 4px;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.slide:nth-child(1),
	.slide:nth-child(2),
	.slide:nth-child(3),
	.slide:nth-child(5),
	.slide:nth-child(7),
	.slide:nth-child(8),
	.slide:nth-child(9),
	.slide:nth-child(10) {
		grid-row: span 2;
	}
</style>
