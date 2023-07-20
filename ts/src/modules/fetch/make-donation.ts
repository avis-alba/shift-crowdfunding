import * as REQUESTS from './requests';
import handleFetchError from './error-handler';

export default function makeDonation(requestURL: string, money: { amount: string }): asyncSubmitHandler {

	return async function (event: Event) {

		event.preventDefault();

		try {
			const response: Response = await fetch(`${REQUESTS.REQUEST_ORIGIN}donate`, { // стоит url для моки, рабочий requestURL
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8'
				},
				body: JSON.stringify(money)
			});

			if (response.ok) {

				location.reload();

			} else if (response.status === ERROR_CODES.CONFLICT) {

				alert('Недостаточно средств!');
				return;

			} else {

				handleFetchError(response.status, 'project');

			}
		} catch (e) {

			if (e instanceof Error) {

				alert(`Ошибка при отправке доната: ${e.message}`);
			}
		}
	}
}