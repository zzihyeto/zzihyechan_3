<script lang="ts">
	import locationTopWave from '$lib/assets/location-top-wave.svg';
	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import { Clipboard, Github } from '@lucide/svelte';
	import { onMount } from 'svelte';

	function copyAddress() {
		navigator.clipboard
			.writeText('경기 성남시 중원구 광명로 304')
			.then(() => alert($_('location.address_copied')))
			.catch(() => null);
	}

	function shareNaverMap() {
		const url = 'https://map.naver.com/p/search/성남%20혜성%20감리%20교회';
		window.open(url, '_blank');
	}

	function shareKakaoMap() {
		const url = 'https://map.kakao.com/link/search/성남%20혜성%20감리%20교회';
		window.open(url, '_blank');
	}

	function shareKakaoTalk() {
		const url   = window.location.href;
		const title = '임찬교와 이지혜의 결혼식에 초대합니다!';
		const desc  = '2026년 1월 31일, 우리의 특별한 날에 함께해주세요.';
		const image = 'https://emily-marries-anthony.com/preview.jpg'; // 가급적 1200x630 권장

		// 1) Kakao 공식 공유 (PC/모바일 공통)
		if (window.Kakao && window.Kakao.isInitialized()) {
			try {
			window.Kakao.Share.sendDefault({
				objectType: 'feed',
				content: {
				title: title,
				description: desc,
				imageUrl: image,
				link: { mobileWebUrl: url, webUrl: url }
				},
				buttons: [
				{ title: '청첩장 보기', link: { mobileWebUrl: url, webUrl: url } }
				]
			});
			return; // 성공 시 여기서 끝
			} catch (e) {
			console.warn('Kakao share failed, fallback:', e);
			// 이어서 폴백으로 진행
			}
		}

		// 2) Web Share API (모바일 브라우저/일부 데스크톱)
		if (navigator.share) {
			navigator.share({ title, text: desc, url })
			.catch(() => {
				// 3) 마지막 폴백: 클립보드
				navigator.clipboard?.writeText(`${title}\n${url}`)
				.then(() => alert('청첩장 주소가 복사되었습니다. 카카오톡에 붙여넣기 해주세요.'))
				.catch(() => alert('취소되었습니다. 주소를 직접 복사해 주세요.'));
			});
			return;
		}

		// 3) 클립보드 폴백
		navigator.clipboard?.writeText(`${title}\n${url}`)
			.then(() => alert('청첩장 주소가 복사되었습니다. 카카오톡에 붙여넣기 해주세요.'))
			.catch(() => alert('공유가 막혔습니다. 주소를 직접 복사해 주세요.'));
		}



	function copyInvitationLink() {
		const url = window.location.href;
		navigator.clipboard.writeText(url).then(() => {
			alert('청첩장 주소가 복사되었습니다!');
		}).catch(() => {
			alert('복사에 실패했습니다.');
		});
	}

	onMount(() => {
		// 신규 네이버 지도 API 스크립트 로드
		const script = document.createElement('script');
		script.src = 'https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=ygo4qwfjsa';
		script.onload = () => {
			// 네이버 지도 초기화
			const map = new (window as any).naver.maps.Map('naver-map', {
				center: new (window as any).naver.maps.LatLng(37.44436582740946, 127.1599992535768), // 성남 혜성 감리 교회 좌표 (임시)
				zoom: 15,
				mapTypeControl: false,
				scaleControl: false,
				logoControl: false,
				mapDataControl: false,
				zoomControl: false,
				panControl: false
			});

			// 마커 추가 (압정 모양)
			const marker = new (window as any).naver.maps.Marker({
				position: new (window as any).naver.maps.LatLng(37.44436582740946, 127.1599992535768),
				map: map,
				icon: {
					content: '<div style="background-color: #e74c3c; width: 20px; height: 20px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); margin: -10px -10px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
					size: new (window as any).naver.maps.Size(20, 20),
					anchor: new (window as any).naver.maps.Point(10, 10)
				}
			});

			// 정보창 추가
			const infoWindow = new (window as any).naver.maps.InfoWindow({
				content: '<div style="padding:10px;min-width:200px;text-align:center;">' +
					'<h3 style="margin:0 0 5px 0;color:#4CAF50;">성남 혜성 감리 교회 3층 본당</h3>' +
					'<p style="margin:0;font-size:12px;">경기 성남시 중원구 광명로 304</p>' +
					'</div>'
			});

			// 마커 클릭 시 정보창 표시
			(window as any).naver.maps.Event.addListener(marker, 'click', () => {
				if (infoWindow.getMap()) {
					infoWindow.close();
				} else {
					infoWindow.open(map, marker);
				}
			});
		};
		document.head.appendChild(script);
	});
</script>

<img src={locationTopWave} class="location-top-wave" alt="" />
<section class="location backgroundpng">
	<h2 class="title {localeStore.locale}">{$_('location.title')}</h2>
	<p class="sub_title">성남 혜성 감리 교회 3층 본당</p>

	<div class="address-container">
		<button class="copy-button" ><Clipboard size="1.0em" /></button>
		<span class="address" onclick={copyAddress}>경기 성남시 중원구 광명로 304</span>
	</div>

	<div class="map-section">
		<div id="naver-map" class="naver-map-wide"></div>
		<div class="map-buttons">
			<button class="share-button naver" onclick={shareNaverMap}>
				네이버 지도
			</button>
			<button class="share-button kakao" onclick={shareKakaoMap}>
				카카오맵
			</button>
		</div>
	</div>

	<div class="transportation-container">
		<h3 class="transportation-title">{$_('location.transportation.title')}</h3>
		
		<div class="transport-method">
			<div class="transport-icon">🚇</div>
			<div class="transport-info">
				<h4>{$_('location.transportation.subway.title')}</h4>
				<p class="route">{$_('location.transportation.subway.line')}</p>
				<p class="walk-time">+ {$_('location.transportation.subway.time')}</p>
			</div>
		</div>

		<div class="transport-method">
			<div class="transport-icon">🚌</div>
			<div class="transport-info">
				<h4>{$_('location.transportation.bus.title')}</h4>
				
				<div class="bus-stop">
					<p class="stop-name">📍 {$_('location.transportation.bus.stop1.name')}</p>
					<p class="route">{$_('location.transportation.bus.stop1.routes')}</p>
					<p class="walk-time">+ {$_('location.transportation.bus.stop1.time')}</p>
				</div>
				
				<div class="bus-stop">
					<p class="stop-name">📍 {$_('location.transportation.bus.stop2.name')}</p>
					<p class="route">{$_('location.transportation.bus.stop2.routes')}</p>
					<p class="walk-time">+ {$_('location.transportation.bus.stop2.time')}</p>
				</div>
			</div>
		</div>
	</div>

	<div class="finish-letter-container">
		<p class="venue {localeStore.locale}">
			{@html $_('location.finish_letter').replace(/\r?\n/g, '<br>')}
		</p>
	</div>

	<div class="invitation-share">
		<button class="share-button kakao-talk" onclick={shareKakaoTalk}>
			카카오톡으로 청첩장 전하기
		</button>
		<button class="share-button copy-link" onclick={copyInvitationLink}>
			청첩장 주소 복사하기
		</button>
	</div>

	<p class="copyright">© 2026. zzihyechan All rights reserved.</p>

</section>

<style lang="scss">
	
	@font-face {
		font-family: 'YESGothic-Regular';
		src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_13@1.0/YESGothic-Regular.woff') format('woff');
		font-weight: normal;
		font-style: normal;
	}	

	img.location-top-wave {
		max-width: $content-max-width;
		margin: auto;
	}

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

	section.location {
		font-family: 'YESGothic-Regular';
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		/** background-color: $bg-color-1;**/
		padding: 1em 2em 1em 2em;
	}

	h2.title {
		font-family: 'YESGothic-Regular';
		color: $primary-color;
		text-align: center;
		margin-bottom: 1em;

		&.kr {
			@extend .title-font-kr;
			letter-spacing: 1px;
		}
	}

	.sub_title{
		font-family: 'YESGothic-Regular';
		text-align: center;
		color: $font-color-default;
		font-size: 1rem;
		font-weight: bold;
		margin-bottom: 1.5em;
	}

	.venue {
		font-family: 'YESGothic-Regular';
		text-align: center;
		color: $font-color-default;
		font-size: 1rem;
		font-weight: 500;
		margin-bottom: 1.5em;
	}

	.address-container {
		font-family: 'YESGothic-Regular';
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.5em;
		padding: 0.5em 1em;
		background-color: $white;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

		.address {
			font-size: 1rem;
			color: $font-color-default;
		}

		.copy-button {
			background: none;
			border: none;
			color: $primary-color;
			cursor: pointer;
			padding: 0.1em;
			border-radius: 4px;
			transition: background-color 0.2s;
			font-size: 0.9em;

			&:hover {
				background-color: $primary-color-light-2;
			}
		}
	}

	.map-section {
		font-family: 'YESGothic-Regular';
		margin-top: 2em;
		width: 100%;
		height: 25em;
		position: relative;
		border-radius: 12px;
		overflow: hidden;
	}

	.naver-map-wide {
		width: 100%;
		height: 100%;
	}

	.map-buttons {
		font-family: 'YESGothic-Regular';
		background-color: rgba(255, 255, 255, 0.95);
		padding: 1em;
		display: flex;
		gap: 1em;
		justify-content: center;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		backdrop-filter: blur(5px);
	}

	.share-button {
		font-family: 'YESGothic-Regular';
		padding: 0.8em 1.5em;
		border: none;
		border-radius: 6px;
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;

		&.naver {
			background-color: #03c75a;
			color: white;

			&:hover {
				background-color: #02a94a;
			}
		}

		&.kakao {
			background-color: #fee500;
			color: #3c1e1e;

			&:hover {
				background-color: #fdd835;
			}
		}
	}

	.invitation-share {
		font-family: 'YESGothic-Regular';
		margin-top: 2em;
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 100%;
		max-width: 400px;
	}

	.share-button.kakao-talk {
		background-color: #fee500;
		color: #3c1e1e;
		padding: 1em 1.5em;

		&:hover {
			background-color: #fdd835;
		}
	}

	.share-button.copy-link {
		font-family: 'YESGothic-Regular';
		background-color: $primary-color;
		color: white;
		padding: 1em 1.5em;

		&:hover {
			background-color: $primary-color-dark;
		}
	}

	p.signature {
		font-size: 1rem;
	}
	
	.transportation-container {
		margin: 2em 0;
		padding: 1.5em;
		background-color: #f8f9fa;
		border-radius: 12px;
		border: 2px solid #e9ecef;
	}

	.transportation-title {
		text-align: center;
		color: $primary-color;
		font-size: 1.3rem;
		margin-bottom: 1.5em;
		font-weight: 600;
	}

	.transport-method {
		display: flex;
		align-items: flex-start;
		margin-bottom: 1.5em;
		padding: 1em;
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0,0,0,0.1);

		&:last-child {
			margin-bottom: 0;
		}
	}

	.transport-icon {
		font-size: 2em;
		margin-right: 1em;
		flex-shrink: 0;
	}

	.transport-info {
		flex: 1;

		h4 {
			color: $primary-color;
			font-size: 1.1rem;
			margin-bottom: 0.5em;
			font-weight: 600;
		}

		.route {
			color: $font-color-default;
			font-size: 0.9rem;
			line-height: 1.4;
			margin-bottom: 0.3em;
		}

		.walk-time {
			color: $green-1;
			font-size: 0.85rem;
			font-weight: 500;
			margin-bottom: 0.5em;
		}
	}

	.bus-stop {
		margin-bottom: 1em;
		padding: 0.8em;
		background-color: #f8f9fa;
		border-radius: 6px;
		border-left: 3px solid $primary-color-light;

		&:last-child {
			margin-bottom: 0;
		}

		.stop-name {
			color: $primary-color;
			font-weight: 600;
			font-size: 0.95rem;
			margin-bottom: 0.3em;
		}
	}

	.finish-letter-container {
		margin-top: 2em;
		text-align: center;
	}

	p.copyright {
		font-size: 0.8rem;
		color: $font-color-default;
		opacity: 0.7;
		margin-top: 2em;
	}
</style>
