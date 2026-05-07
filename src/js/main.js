// Import our custom CSS
import '../scss/styles.scss'

// Import only the Bootstrap components we need
// import { Modal } from 'bootstrap';
// const  myMod = new Modal(document.getElementById('staticBackdrop'), {});
const btnSearch = document.getElementById('btnSearch');
const divResult = document.getElementById('divResult');
const bookAuthor = document.getElementById('bookAuthor');
const bookName = document.getElementById('bookName');

const res = [
	{bookAuthor: 'Pushkin', bookName: 'Capitan\'s daughter', bookInfo: '', bookWorks: []},
	{bookAuthor: 'Pushkin', bookName: 'General\'s daughter', bookInfo: '', bookWorks: []},
	{bookAuthor: 'Pushkin', bookName: 'Lieutenant\'s daughter', bookInfo: '', bookWorks: []},
	{bookAuthor: 'Pushkin', bookName: 'Marshall\'s daughter', bookInfo: '', bookWorks: []},
	{bookAuthor: 'Pushkin', bookName: 'Soldat\'s daughter', bookInfo: '', bookWorks: []},
	{bookAuthor: 'Pushkin', bookName: 'Officer\'s daughter', bookInfo: '', bookWorks: []},
	{bookAuthor: 'Александр Сергеевич Пушкин (великий русский поэт)', bookName: 'История села Горюхина, рассказанная подпоручиком' +
			' в отставке, писарем Нижегородского уезда Квакиным Петром Вениаминовичем',
		bookInfo: 'Много всякого забавного', bookWorks: ['Jlkldslsklk lskdlkdsl','Jlkldslsklk lskdlkdsl','Jlkldslsklk lskdlkdsl',]},
]

btnSearch.onclick = async () => {
	const data = await getData();
	setData(divResult, data);
	// console.log(data);
}


async function getData () {
	const params = {Author: bookAuthor.value, BookName: bookName.value};
	try {
		const response = await fetch('https://api.pekarlib.ru/book/book/B1p1s9Z4b1V5XyIi',{
			method: "POST",
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(params),
		});
		if (!response.ok) {
			console.log(await response.text());
			return [];
		}
		return await response.json();
	} catch (error) {	                    // Если есть проблемы, сообщаем в консоль и возвращаем пустой массив
		console.error("Ошибка получения данных: ", error);
		return [];
	}
	// return res;
}



function setData(elem, data) {
	elem.innerHTML = data.reduce(
		(ac, cur) => ac +
			'<details><summary>' +
			`<span class="fw-bold">${cur.bookAuthor}</span> &nbsp;` +
			`<span class="text-success">${cur.bookName}</span></summary>` +
			`<span class="fst-italic">${cur.bookInfo}</span>` +
			cur.bookWorks.reduce(
				(a, c) => a + `<p class="mb-1 text-black-50">${c}`, ''
			) +
			'</details>',
		'',
	)
}