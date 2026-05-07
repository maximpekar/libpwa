import '../scss/styles.scss'

const btnSearch = document.getElementById('btnSearch');
const divResult = document.getElementById('divResult');
const bookAuthor = document.getElementById('bookAuthor');
const bookName = document.getElementById('bookName');
const elemFindType = document.getElementById('findType');
let findType = true;

btnSearch.onclick = async () => {
	const data = await getData(findType);
	setData(divResult, data, findType);
}


elemFindType.onclick = () => {
	findType = !findType;
	if (findType) {
		elemFindType.innerHTML = 'Поиск книг';
	}
	else {
		elemFindType.innerHTML = '<span class="text-primary">Поиск произведений</span>';
	}
}


async function getData (findType = true) {
	const params = {Author: bookAuthor.value, BookName: bookName.value, FindType: findType};
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
}


function setData(elem, data, findType = true) {
	if (findType) {
		elem.innerHTML = data.reduce(
			(ac, cur) => ac +
				'<details><summary>' +
				`<span class="fw-bold">${cur.bookAuthor}</span> &nbsp;` +
				`<span class="text-success">${cur.bookName}</span></summary>` +
				`<span class="fst-italic">${cur.bookInfo}</span>` +
				cur.bookWorks.reduce(
					(a, c) => a + `<p class="mb-1 text-secondary">${c}`, ''
				) +
				'</details>',
			'',
		);
	}
	else {
		elem.innerHTML = '<span class="text-danger">Ничего не найдено!</span>';
	}
}