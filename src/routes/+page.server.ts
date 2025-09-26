import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

// Google Apps Script Web App URL (설정 후 업데이트 필요)
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyIf9qO5Pbo9fjXLe8tYGVCR1o4-3q9IZqsk6bB3BDQwpt3MKtuYF5bl9ZlvEZkwk4w/exec';

export const actions = {
	rsvp: async ({ request }) => {
		const formData = await request.formData();
		const guestType = formData.get('guestType')?.toString();
		const name = formData.get('name')?.toString().trim();
		const attendance = formData.get('attendance')?.toString();
		const phoneNumber = formData.get('phoneNumber')?.toString().trim();
		const timestamp = new Date().toISOString();

		if (!guestType) {
			return fail(400, { missingGuestType: true });
		}

		if (!name) {
			return fail(400, { missingName: true });
		}

		if (!attendance) {
			return fail(400, { missingAttendance: true });
		}

		try {
			// Google Apps Script로 데이터 전송
			const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					guestType: guestType,
					name: name,
					attendance: attendance,
					phoneNumber: phoneNumber || '',
					timestamp: timestamp
				})
			});

			if (response.ok) {
				console.log(`RSVP from ${name} (${guestType}): ${attendance} - Sent to Google Sheets`);
				return { success: true };
			} else {
				console.error('Failed to send to Google Sheets');
				return fail(500, { error: 'Failed to save RSVP' });
			}
		} catch (error) {
			console.error('Error sending RSVP:', error);
			return fail(500, { error: 'Failed to save RSVP' });
		}
	}
} satisfies Actions;
