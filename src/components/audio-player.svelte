<script lang="ts">
	import { Play, Pause, Volume2, VolumeX } from '@lucide/svelte';
	import { onMount } from 'svelte';

	let audio: HTMLAudioElement;
	let isPlaying = $state(false);
	let isMuted = $state(false);
	let showControls = $state(false);

	onMount(() => {
		// 오디오 파일 경로를 여기에 설정하세요
		// 예: audio.src = '/path/to/your/music.mp3';
		// audio.src = '/static/music/background-music.mp3';
		
		// 자동 재생 시도 (브라우저 정책으로 인해 사용자 상호작용 후에만 작동)
		// audio.play().catch(() => {
		// 	console.log('자동 재생이 차단되었습니다. 사용자가 상호작용해야 합니다.');
		// });
	});

	function togglePlay() {
		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
		isPlaying = !isPlaying;
	}

	function toggleMute() {
		audio.muted = !audio.muted;
		isMuted = !isMuted;
	}

	function showPlayerControls() {
		showControls = true;
		setTimeout(() => {
			showControls = false;
		}, 3000);
	}
</script>

<div class="audio-player" on:click={showPlayerControls}>
	<button class="play-button" on:click={togglePlay}>
		{#if isPlaying}
			<Pause size="1.2em" />
		{:else}
			<Play size="1.2em" />
		{/if}
	</button>
	
	{#if showControls}
		<div class="controls">
			<button class="mute-button" on:click={toggleMute}>
				{#if isMuted}
					<VolumeX size="1em" />
				{:else}
					<Volume2 size="1em" />
				{/if}
			</button>
		</div>
	{/if}
	
	<audio 
		bind:this={audio}
		loop
		preload="auto"
		on:play={() => isPlaying = true}
		on:pause={() => isPlaying = false}
	>
		<!-- 오디오 파일을 여기에 추가하세요 -->
		<!-- <source src="/static/music/background-music.mp3" type="audio/mpeg"> -->
		<!-- <source src="/static/music/background-music.ogg" type="audio/ogg"> -->
		브라우저가 오디오를 지원하지 않습니다.
	</audio>
</div>

<style lang="scss">
	.audio-player {
		position: fixed;
		bottom: 2em;
		left: 2em;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5em;
	}

	.play-button {
		width: 3em;
		height: 3em;
		border-radius: 50%;
		background-color: $primary-color;
		color: white;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		transition: all 0.2s;

		&:hover {
			background-color: $primary-color-dark;
			transform: scale(1.1);
		}
	}

	.controls {
		display: flex;
		gap: 0.5em;
		background-color: rgba(255, 255, 255, 0.9);
		padding: 0.5em;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.mute-button {
		background: none;
		border: none;
		cursor: pointer;
		color: $primary-color;
		padding: 0.3em;
		border-radius: 4px;
		transition: background-color 0.2s;

		&:hover {
			background-color: $primary-color-light-2;
		}
	}
</style>
