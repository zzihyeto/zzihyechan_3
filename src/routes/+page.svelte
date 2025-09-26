<script lang="ts">
	import Calendar from '../components/calendar.svelte';
	import Letter from '../components/letter.svelte';
	import Rsvp from '../components/rsvp.svelte';
	import Cover from '../components/cover.svelte';
	import Location from '../components/location.svelte';
	import type { PageProps } from './$types';
	import Gallery from '../components/gallery.svelte';
	import AudioPlayer from '../components/audio-player.svelte';
	import { onMount } from 'svelte';

	let { form }: PageProps = $props();

	onMount(() => {
		const observerOptions = {
			threshold: 0.2,
			rootMargin: '0px 0px -100px 0px'
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-in');
				}
			});
		}, observerOptions);

		const elements = document.querySelectorAll('.scroll-animate');
		elements.forEach((el) => observer.observe(el));

		return () => {
			elements.forEach((el) => observer.unobserve(el));
		};
	});
</script>

<Cover />
<Letter />
<Rsvp {form} />
<Gallery />
<Calendar />
<Location />
<AudioPlayer />

<style lang="scss">
	
</style>
