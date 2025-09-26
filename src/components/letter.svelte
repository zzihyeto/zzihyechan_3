<script lang="ts">
	import letterBottom from '$lib/assets/flower_hand.webp';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import letterDeco from '$lib/assets/letter-deco.png';

	const nameDivider = `
    <svg width="3" height="3" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#B99493"/>
    </svg>`;
</script>

<section class="letter backgroundpng">
	<div class="header scroll-animate">
		<img class="header-deco" src={letterDeco} alt="letter header deco" />
		<h2 class="title {localeStore.locale}">{$_('letter.date')}</h2>
		<p class="sub-title {localeStore.locale}">{$_('letter.sub_title')}</p>
	</div>

	<div class="letter-container scroll-animate">
		<p class="letter {localeStore.locale} scroll-animate">
			{@html $_('letter.letter_content').replace(/\r?\n/g, '<br>')}
		</p>
		<p class="spacing scroll-animate"> </p>

		<div class="family-description kr scroll-animate">
			<p>
				임희종<span class="name-divider">{@html nameDivider}</span> 고수기
				<span class="son">의 아들</span>임찬교
			</p>
			<p>
				이찬욱<span class="name-divider">{@html nameDivider}</span> 김정임<span class="daughter"
					>의 딸</span
				>이지혜
			</p>
		</div>
	</div>
	
	<img class="letter-bottom scroll-animate" src={letterBottom} alt="letter bottom" />
</section>

<style lang="scss">
	section.backgroundpng {
		position: relative;
	}

	section.backgroundpng::before {
		content: "";
		position: absolute;
		inset: 0;
		background-image: url('/src/lib/assets/background.png');
		background-repeat: no-repeat;
		background-position: center center;
		opacity: 0.2; /* 투명도 */
		background-size: cover;
		z-index: -1;
	}


	section.letter {
		padding: 4.5em 3.5em 3em 3.5em;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 2em;
	}

	.scroll-animate {
		opacity: 0;
		transform: translateY(60px) scale(0.9);
		transition: opacity 1s ease-out, transform 1s ease-out;
		will-change: opacity, transform;

		&.animate-in {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	img.header-deco {
		width: 12em;
		margin-bottom: 0.2em;
	}

	.title {
		color: black;
		letter-spacing: 1px;

		&.kr {
			@extend .title-font-kr;
			margin-bottom: 0.4em;
		}
	}

	.sub-title {
		color: $primary-color;
		&.kr {
			font-weight: 500;
			font-size: 1rem;
		}
	}

	p.letter {
		text-align: center;
		&.kr {
			line-height: 2.3em;
			font-size: 0.9rem;
		}
	}

	.letter-signature {
		margin-top: 2em;

		p {
			text-align: right;
			font-size: 1.2rem;
		}
	}

	.family-description {
		margin-top: 3em;
		p {
			color: $font-color-default;
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			column-gap: 12px;
			margin-bottom: 20px;
			align-items: center;

			.name-divider {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.son,
			.daughter {
				display: flex;
				justify-content: center;
				font-size: 12px;
				color: $primary-color;
			}
		}
	}
</style>
