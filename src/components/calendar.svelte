<script lang="ts">
	import { onMount } from 'svelte';

	let days = $state(0);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);

	const weddingDate = new Date('2026-01-31T12:00:00');

	function updateCountdown() {
		const now = new Date();
		const diff = weddingDate.getTime() - now.getTime();

		if (diff > 0) {
			const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hoursDiff = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutesDiff = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			const secondsDiff = Math.floor((diff % (1000 * 60)) / 1000);

			days = daysDiff;
			hours = hoursDiff;
			minutes = minutesDiff;
			seconds = secondsDiff;
		} else {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		}
	}

	onMount(() => {
		updateCountdown();
		const interval = setInterval(updateCountdown, 1000);
		return () => clearInterval(interval);
	});
</script>

<section class="calendar backgroundpng">
	<h2 class="title en">January 2026</h2>
	<p class="wedding-date">2026년 01월 31일 토요일 | 오후 12시</p>
	<div class="calendar-grid">
		<div class="weekdays">
			<div class="weekday">Sun</div>
			<div class="weekday">Mon</div>
			<div class="weekday">Tue</div>
			<div class="weekday">Wed</div>
			<div class="weekday">Thu</div>
			<div class="weekday">Fri</div>
			<div class="weekday">Sat</div>
		</div>
		<div class="days">
			<!-- 1월 1일은 목요일 -->
			<div class="day empty"></div>
			<div class="day empty"></div>
			<div class="day empty"></div>
			<div class="day empty"></div>
			<div class="day new-year">1</div>
			<div class="day">2</div>
			<div class="day">3</div>
			<div class="day sunday">4</div>
			<div class="day">5</div>
			<div class="day">6</div>
			<div class="day">7</div>
			<div class="day">8</div>
			<div class="day">9</div>
			<div class="day">10</div>
			<div class="day sunday">11</div>
			<div class="day">12</div>
			<div class="day">13</div>
			<div class="day">14</div>
			<div class="day">15</div>
			<div class="day">16</div>
			<div class="day">17</div>
			<div class="day sunday">18</div>
			<div class="day">19</div>
			<div class="day">20</div>
			<div class="day">21</div>
			<div class="day">22</div>
			<div class="day">23</div>
			<div class="day">24</div>
			<div class="day sunday">25</div>
			<div class="day">26</div>
			<div class="day">27</div>
			<div class="day">28</div>
			<div class="day">29</div>
			<div class="day">30</div>
			<div class="day wedding-day">31</div>
		</div>
	</div>
	
	<div class="countdown">
		<div class="countdown-item">
			<span class="countdown-number">{days}</span>
			<span class="countdown-label">DAYS</span>
		</div>
		<div class="countdown-item">
			<span class="countdown-number">{hours}</span>
			<span class="countdown-label">HOURS</span>
		</div>
		<div class="countdown-item">
			<span class="countdown-number">{minutes}</span>
			<span class="countdown-label">MINUTES</span>
		</div>
		<div class="countdown-item">
			<span class="countdown-number">{seconds}</span>
			<span class="countdown-label">SECONDS</span>
		</div>
	</div>
	
	<div class="wedding-day-message">
		❤️ 결혼식이 {days === 0 ? '오늘' : `D-${days} 후에`} 진행됩니다 ❤️
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
		opacity: 0.9; /* 투명도 */
		 /* filter: blur(0.1px); 흐림 효과 */
		 /* transform: scale(1.05); 블러 때문에 생기는 테두리 잘림 방지 */
		z-index: -1;
	}

	section.calendar {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: rgba($primary-color-light, 0.8); /* 80% 불투명 */
		padding: 2em 1em 4em 1em;
	}

	h2.title {
		color: white !important;
		text-align: center;
		margin-bottom: 1em;

		&.en {
			@extend .title-font-en;
			letter-spacing: 1px;
		}
	}

	.wedding-date {
		text-align: center;
		color: black;
		font-size: 1rem;
		font-weight: 500;
		margin-bottom: 1.5em;
	}

	.calendar-grid {
		width: 100%;
		max-width: 400px;
	}

	.weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 8px;
		margin-bottom: 1em;
	}

	.weekday {
		text-align: center;
		font-weight: 600;
		color: $white;
		font-size: 0.9rem;
		padding: 0.5em 0;
	}

	.days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 8px;
	}

	.day {
		text-align: center;
		padding: 0.8em 0;
		font-size: 1rem;
		color: $white;
		border-radius: 50%;
		transition: all 0.3s ease;

		&.empty {
			visibility: hidden;
		}

		&.new-year {
			color: $red-1;
		}

		&.sunday {
			color: $red-1;
		}

		&.wedding-day {
			background-color: rgb(255, 255, 112);
			color: $primary-color;
			font-weight: 600;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
			transform: scale(1.1);
		}
	}

	.countdown {
		display: flex;
		justify-content: center;
		gap: 1em;
		margin-top: 2em;
	}

	.countdown-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: white;
		padding: 1em;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		min-width: 60px;
	}

	.countdown-number {
		font-size: 1.5rem;
		font-weight: 700;
		color: $primary-color;
		margin-bottom: 0.2em;
	}

	.countdown-label {
		font-size: 0.7rem;
		color: $font-color-light;
		font-weight: 500;
	}

	.wedding-day-message {
		margin-top: 1em;
		font-size: 1rem;
		color: $white;
		font-weight: 600;
		text-align: center;
	}
</style>
