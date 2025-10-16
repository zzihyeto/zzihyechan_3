<script lang="ts">
    import imgBlackFull1 from '$lib/assets/gallery/black_full_1.jpg';
    import imgGreen1 from '$lib/assets/gallery/green_1.jpg';
    import imgBlackHalf1 from '$lib/assets/gallery/black_half_1.jpg';
    import imgChangyoFull1 from '$lib/assets/gallery/changyo_full_1.jpg';
    import imgFlowerOp1 from '$lib/assets/gallery/flower_op_1.jpeg';
    import imgFlowerWalking1 from '$lib/assets/gallery/flower_walking_1.jpg';
    import imgFlowerWalking2 from '$lib/assets/gallery/flower_walking_2.jpg';
    import imgBlackFull2 from '$lib/assets/gallery/black_full_2.jpg';
    import imgGreen2 from '$lib/assets/gallery/green_2.jpg';
    import imgGreen3 from '$lib/assets/gallery/green_3.jpg';
    import imgGreen6 from '$lib/assets/gallery/green_6.jpg';
    import imgJihyeChanDance from '$lib/assets/gallery/jihye_chan_dance.jpg';
    import imgJihyeFull1 from '$lib/assets/gallery/jihye_full_1.png';
    import imgWhiteFull1 from '$lib/assets/gallery/white_full_1.jpg';
    import imgWhiteHalf1 from '$lib/assets/gallery/white_half_1.jpg';

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
			zoom: false,
			wheelToZoom: false,
			allowMouseDrag: true,
			allowTouchDrag: true,
			showHideOpacity: true,
			spacing: 0.1,
			loop: true
		});

		lightbox.init();
	});

    const photos = [
        // 지정해주신 순서 (전체/반만 보기 규칙은 CSS grid-row span으로 반영)
        { src: imgBlackFull1,     width: 3244, height: 4541 },
        { src: imgBlackFull2,     width: 3244, height: 4541 },
        { src: imgChangyoFull1,   width: 3244, height: 4541 },
        { src: imgBlackHalf1,     width: 3503, height: 4905 },
        { src: imgWhiteHalf1,     width: 3123, height: 4372 },
        { src: imgWhiteFull1,     width: 2538, height: 3554 },
        { src: imgJihyeFull1,     width: 3123, height: 4372 },
        { src: imgGreen1,         width: 4032, height: 3024 },
		{ src: imgGreen6,         width: 3024, height: 4032 },
        { src: imgGreen2,         width: 3024, height: 4032 },
		{ src: imgGreen3,         width: 3024, height: 4032 },
        { src: imgFlowerOp1,      width: 3464, height: 3464 },
        { src: imgFlowerWalking1, width: 2268, height: 4032 },
        { src: imgFlowerWalking2, width: 2268, height: 4032 },
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
	.slide:nth-child(4),
	.slide:nth-child(6),
	.slide:nth-child(7),
	.slide:nth-child(11),
	.slide:nth-child(13){
		grid-row: span 2;
	}

	/* 2,3번(반크기) 이미지는 위쪽을 더 보이게 크롭 위치 조정 */
	#gallery a:nth-child(2) img.thumbnail,
	#gallery a:nth-child(3) img.thumbnail,
	#gallery a:nth-child(5) img.thumbnail,
	#gallery a:nth-child(14) img.thumbnail  {
		object-position: center 20%;
	}
</style>
