<script lang="ts">
	import { Accordion, type AccordionItem } from 'melt/builders';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { slide } from 'svelte/transition';
	import { ChevronDown } from '@lucide/svelte';
	import { type Snippet } from 'svelte';

	type Item = AccordionItem<{
		title: string;
	}>;

	const items: Item[] = [
		{ id: '1', title: $_('rsvp.accordion.parking') },
		{ id: '2', title: $_('rsvp.accordion.flower') },
		{ id: '3', title: $_('rsvp.accordion.account')}
	];

	const accordion = new Accordion({
		multiple: true
	});

	const parkingItem = accordion.getItem(items[0]);
	const flowerItem = accordion.getItem(items[1]);
	const accountItem = accordion.getItem(items[2]);

	let copied = $state(false);

	function copyAccount(accountNumber: string) {
		navigator.clipboard.writeText(accountNumber).then(() => {
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		});
	}
</script>

{#snippet accordionItem(item: ReturnType<Accordion['getItem']>, content: Snippet)}
	<div class="item">
		<div {...item.heading} class="heading">
			<button {...item.trigger} class="trigger {localeStore.locale}">
				{item.item.title}
			</button>
			<div class="chevron-down-container {localeStore.locale}" class:rotate={item.isExpanded}>
				<ChevronDown strokeWidth={1.25} />
			</div>
		</div>

		{#if item.isExpanded}
			<div
				{...item.content}
				class="content {localeStore.locale}"
				transition:slide={{ duration: 350 }}
			>
				{@render content()}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet parkingContent()}
	<p>{$_('rsvp.accordion.parking_letter1')}</p>
	<br>
	<p>{$_('rsvp.accordion.parking_letter2')}</p>
	<p>{$_('rsvp.accordion.parking_letter3')}</p>
{/snippet}

{#snippet flowerContent()}
	<p>{$_('rsvp.accordion.flower_letter1')}</p>
	<br>
	<p class="top_margin">{$_('rsvp.accordion.flower_letter2')}</p>
{/snippet}

{#snippet accountContent()}
	{@html $_('rsvp.accordion.footer_letter1').replace(/\r?\n/g, '<br>')}
	<br>
	{@html $_('rsvp.accordion.footer_letter2').replace(/\r?\n/g, '<br>')}
	<br>
	<div class="account-group account-container">
		<!-- 신랑 가족 -->
		<p class="group-title">신랑측</p>

		<div class="account-item">
			<p>{$_('rsvp.accordion.account_number4')}</p>
			<p>{$_('rsvp.accordion.account_name4')}
				<button class="copy-btn" on:click={() => copyAccount($_('rsvp.accordion.account_number4').split(' ').slice(1).join(' '))}>
					{$_('rsvp.accordion.copy_account')}
				</button>
			</p>
		</div>

		<div class="account-item">
			<p>{$_('rsvp.accordion.account_number2')}</p>
			<p>{$_('rsvp.accordion.account_name2')}
				<button class="copy-btn" on:click={() => copyAccount($_('rsvp.accordion.account_number2').split(' ').slice(1).join(' '))}>
					{$_('rsvp.accordion.copy_account')}
				</button>
			</p>
		</div>
	</div>

	<br>
	<!-- 신부 가족 -->
	<div class="account-group account-container">
		<p class="group-title">신부측</p>

		<div class="account-item">
			<p>{$_('rsvp.accordion.account_number3')}</p>
			<p>{$_('rsvp.accordion.account_name3')}
				<button class="copy-btn" on:click={() => copyAccount($_('rsvp.accordion.account_number3').split(' ').slice(1).join(' '))}>
					{$_('rsvp.accordion.copy_account')}
				</button>
			</p>
		</div>

		<div class="account-item">
			<p>{$_('rsvp.accordion.account_number')}</p>
			<p>{$_('rsvp.accordion.account_name')}
				<button class="copy-btn" on:click={() => copyAccount($_('rsvp.accordion.account_number').split(' ').slice(1).join(' '))}>
					{$_('rsvp.accordion.copy_account')}
				</button>
			</p>
		</div>
	</div>
	<br>
	
	{#if copied}
		<p class="copied-message">{$_('rsvp.accordion.account_copied')}</p>
	{/if}
{/snippet}


<div class="accordion-root" {...accordion.root}>
	{@render accordionItem(parkingItem, parkingContent)}
	{@render accordionItem(flowerItem, flowerContent)}
	{@render accordionItem(accountItem, accountContent)}
</div>

<style lang="scss">
	.accordion-root {
		width: 100%;
	}

	.item {
		margin-bottom: 1em;
	}

	.heading {
		border-top: 1px solid rgb(48, 47, 47);
		position: relative;
	}

	button.trigger {
		color: $primary-color;
		width: 100%;

		&.kr {
			letter-spacing: 1px;
			font-weight: 500;
			font-size: 1.1rem;
			padding: 0.8em 0;
		}
	}

	.chevron-down-container {
		position: absolute;
		width: 1.5em;
		height: 1.5em;
		right: 0.6em;
		color: $primary-color;
		transition: transform 350ms ease;

		&.kr {
			top: 0.9em;
		}

		&.rotate {
			transform: rotate(180deg);
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5em 0.5em 1em 0.5em;

		p {
			text-align: center;
		}
	}

	.account-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5em;
		margin-bottom: 0.5em;
	}

	.copy-btn {
		background-color: $primary-color;
		color: $white;
		border: none;
		border-radius: 4px;
		padding: 0.3em 0.5em;
		font-size: 0.8rem;
		cursor: pointer;
		transition: background-color 0.2s ease;

		&:hover {
			background-color: $primary-color-dark;
		}
	}

	.copied-message {
		color: $green-1;
		font-size: 0.8rem;
		margin-top: 0.5em;
		text-align: center;
	}
	.account-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2em;
}

	.account-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.02);
		padding: 1em;
		border-radius: 8px;
		width: 90%;
		max-width: 400px;
	}

	.group-title {
		font-weight: 600;
		margin-bottom: 0.8em;
		font-size: 1rem;
	}

	.account-item {
		margin-bottom: 0.8em;
		text-align: center;
	}

</style>