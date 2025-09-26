<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { LoaderCircle } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import rsvpDeco from '$lib/assets/rsvp-deco.svg';
	import RsvpAccordion from './rsvp-accordion.svelte';
	import RsvpModal from './rsvp-modal.svelte';

	let { form } = $props();

	let rsvp = $state<'yes' | 'no' | null>(null);
	let submitting = $state(false);
	let showModal = $state(false);

	function clearValidationMessage(formInput: 'name' | 'rsvp') {
		if (formInput === 'name' && form?.missingName) {
			form = null;
		}

		if (formInput === 'rsvp' && form?.missingRsvp) {
			form = null;
		}
	}
</script>

<section class="rsvp backgroundpng">
	<div class="header scroll-animate">
		<img class="header-deco" src={rsvpDeco} alt="rsvp header deco" />
		<h2 class="title {localeStore.locale} scroll-animate">참석 여부 전달</h2>
		<p class="sub-title {localeStore.locale} scroll-animate">
			{@html $_('rsvp.reply_by').replace(/\r?\n/g, '<br>')}
		</p>
	</div>

	<button class="check-attendance-btn scroll-animate" on:click={() => showModal = true}>
		참석여부 전달하기
	</button>
	<div class="submit-message scroll-animate">
		{#if form?.success}
			<p class="success {localeStore.locale}">
				{$_('rsvp.email_success')}
			</p>
		{/if}
		{#if form?.emailError}
			<p class="error {localeStore.locale}">
				{$_('rsvp.email_error')}
			</p>
		{/if}
		{#if form?.missingName}
			<p class="error {localeStore.locale}">
				{$_('rsvp.missing_name_error')}
			</p>
		{/if}
		{#if form?.missingRsvp}
			<p class="error {localeStore.locale}">
				{$_('rsvp.missing_rsvp_error')}
			</p>
		{/if}
	</div>

	<div class="accordion-container scroll-animate">
		<RsvpAccordion />
	</div>
</section>

{#if showModal}
	<RsvpModal on:close={() => showModal = false} />
{/if}

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
		/* opacity: 0.1;  투명도 */
		 /* filter: blur(0.1px); 흐림 효과 */
		 /* transform: scale(1.05); 블러 때문에 생기는 테두리 잘림 방지 */
		z-index: -1;
	}

	section.rsvp {
		padding: 4.5em 3.5em;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.scroll-animate {
		opacity: 0;
		transform: translateY(60px) scale(0.9);
		transition: opacity 1s ease-out, transform 1s ease-out;
		will-change: opacity, transform;
		text-align: center;

		&.animate-in {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	img.header-deco {
		width: 4.5em;
		margin-bottom: 0.8em;
		color: #808080;
	}

	h2.title {
		color: $primary-color;

		&.kr {
			@extend .title-font-kr;
			letter-spacing: 1px;
		}
	}

	p.sub-title {
		&.kr {
			margin-top: 0.9em;
			font-size: 0.9rem;
		}
	}

	.check-attendance-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 3em;
		height: 2.5em;
		width: 100%;
		background-color: $primary-color;
		border-radius: 4px;
		color: $white;
		letter-spacing: 0.05em;
		border: none;
		cursor: pointer;
		font-size: 1rem;
		font-weight: 600;
		transition: background-color 0.2s;

		&:hover {
			background-color: $primary-color-dark;
		}
	}

	input.fullname {
		padding: 0.4em 0.8em;
		width: 100%;
		border: 1px solid $white-2;
		border-radius: 4px;
		letter-spacing: 0.02em;

		&:active,
		&:focus {
			@extend .input-focused;
		}
		&::placeholder {
			color: $font-color-light;
		}
		&.kr::placeholder {
			font-size: 0.9rem;
		}
	}

	.select-container {
		margin-top: 1em;
	}

	button.send {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 3em;
		height: 2.5em;
		width: 100%;
		background-color: $primary-color;
		border-radius: 4px;
		color: $white;
		letter-spacing: 0.05em;

		&[disabled] {
			background-color: $primary-color-light;
			cursor: not-allowed;
		}

		&:active {
			background-color: $primary-color-dark;
		}

		&.kr {
			font-weight: 600;
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(359deg);
		}
	}

	.spinning {
		display: flex;
		justify-content: center;
		align-items: center;
		animation: spin 1s linear infinite;
	}

	.submit-message {
		margin-top: 0.5em;
		height: 1.5em;
		text-align: center;

		.kr {
			font-size: 0.9rem;
		}

		.en {
			font-size: 1.1rem;
		}

		p.success {
			color: $green-1;
		}

		p.error {
			color: $red-1;
		}
	}

	.accordion-container {
		margin-top: 2em;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
