<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { X } from '@lucide/svelte';
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';

	const dispatch = createEventDispatcher();

	let guestType = $state<'groom' | 'bride' | null>(null);
	let attendance = $state<'yes' | 'no' | null>(null);
	let name = $state('');
	let phoneNumber = $state('');
	let submitting = $state(false);

	function closeModal() {
		dispatch('close');
	}

	function submitForm() {
		if (!guestType || !attendance || !name) {
			return;
		}

		submitting = true;
	}
</script>

<div class="modal-overlay" on:click={closeModal}>
	<div class="modal-content" on:click|stopPropagation>
		<button class="close-button" on:click={closeModal}>
			<X size="1.2em" />
		</button>
		
		<h2 class="modal-title">참석 의사 체크하기</h2>
		<p class="modal-subtitle">참석에 부담 가지지 말아주시고, 편하게 알려주세요. 한 분 한 분을 소중히 모실 수 있도록 참석 의사를 전달 부탁드립니다.</p>
		
		<form class="modal-form" method="POST" action="?/rsvp" use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					// 폼 초기화
					guestType = null;
					attendance = null;
					name = '';
					phoneNumber = '';
					submitting = false;
					closeModal();
				} else {
					submitting = false;
				}
			};
		}}>
			<input type="hidden" name="guestType" value={guestType || ''} />
			<input type="hidden" name="attendance" value={attendance || ''} />
			
			<div class="form-group">
				<label class="form-label">
					어느 분의 하객이신가요? <span class="required">*</span>
				</label>
				<div class="button-group">
					<button 
						type="button"
						class="option-button {guestType === 'groom' ? 'selected' : ''}"
						on:click={() => guestType = 'groom'}
					>
						신랑
					</button>
					<button 
						type="button"
						class="option-button {guestType === 'bride' ? 'selected' : ''}"
						on:click={() => guestType = 'bride'}
					>
						신부
					</button>
				</div>
			</div>

			<div class="form-group">
				<label class="form-label">
					참석하실 수 있나요? <span class="required">*</span>
				</label>
				<div class="button-group">
					<button 
						type="button"
						class="option-button {attendance === 'yes' ? 'selected' : ''}"
						on:click={() => attendance = 'yes'}
					>
						참석할게요
					</button>
					<button 
						type="button"
						class="option-button {attendance === 'no' ? 'selected' : ''}"
						on:click={() => attendance = 'no'}
					>
						참석이 어려워요
					</button>
				</div>
			</div>

			<div class="form-group">
				<label class="form-label">
					성함이 어떻게 되시나요? <span class="required">*</span>
				</label>
				<input 
					type="text" 
					name="name"
					class="form-input"
					placeholder="참석자 본인 성함"
					bind:value={name}
					required
				/>
			</div>

			<div class="form-group">
				<label class="form-label">
					동명이인 체크를 위한 번호를 알려주세요
				</label>
				<input 
					type="text" 
					name="phoneNumber"
					class="form-input"
					placeholder="핸드폰 번호 뒤 4자리"
					bind:value={phoneNumber}
				/>
			</div>

			<button type="submit" class="submit-button" disabled={submitting}>
				{submitting ? '전송 중...' : '참석 의사 보내기'}
			</button>
		</form>
	</div>
</div>

<style lang="scss">
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal-content {
		background-color: white;
		border-radius: 12px;
		padding: 2em;
		width: 90%;
		max-width: 400px;
		max-height: 90vh;
		overflow-y: auto;
		position: relative;
	}

	.close-button {
		position: absolute;
		top: 1em;
		right: 1em;
		background: none;
		border: none;
		cursor: pointer;
		color: $font-color-light;
		padding: 0.5em;
		border-radius: 4px;
		transition: background-color 0.2s;

		&:hover {
			background-color: $primary-color-light-2;
		}
	}

	.modal-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: $primary-color;
		text-align: center;
		margin-bottom: 0.5em;
	}

	.modal-subtitle {
		font-size: 0.9rem;
		color: $font-color-light;
		text-align: center;
		margin-bottom: 2em;
		line-height: 1.4;
	}

	.modal-form {
		display: flex;
		flex-direction: column;
		gap: 1.5em;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.form-label {
		font-size: 0.9rem;
		font-weight: 600;
		color: $font-color-default;

		.required {
			color: $red-1;
		}
	}

	.button-group {
		display: flex;
		gap: 0.5em;
	}

	.option-button {
		flex: 1;
		padding: 0.8em 1em;
		border: 1px solid $primary-color-light;
		background-color: white;
		color: $font-color-default;
		border-radius: 6px;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.2s;

		&:hover {
			background-color: $primary-color-light-2;
		}

		&.selected {
			background-color: $primary-color;
			color: white;
			border-color: $primary-color;
		}
	}

	.form-input {
		padding: 0.8em 1em;
		border: 1px solid $primary-color-light;
		border-radius: 6px;
		font-size: 0.9rem;
		transition: border-color 0.2s;

		&:focus {
			outline: none;
			border-color: $primary-color;
		}

		&::placeholder {
			color: $font-color-light;
		}
	}

	.submit-button {
		background-color: $primary-color;
		color: white;
		border: none;
		border-radius: 6px;
		padding: 1em;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s;

		&:hover {
			background-color: $primary-color-dark;
		}
	}
</style>
