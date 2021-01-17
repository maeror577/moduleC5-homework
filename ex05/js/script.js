/*
 * Задание 5.
 * Написать код приложения, интерфейс которого состоит из двух input и кнопки.
 * В input можно ввести любое число.
 * Заголовок первого input — «номер страницы».
 * Заголовок второго input — «лимит».
 * Заголовок кнопки — «запрос».
 * При клике на кнопку происходит следующее:
 * - если число в первом input не попадает в диапазон от 1 до 10 или
 *   не является числом — выводить ниже текст «Номер страницы вне диапазона
 *   от 1 до 10»;
 * - если число во втором input не попадает в диапазон от 1 до 10 или
 *   не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
 * - если и первый, и второй input не в диапазонах или не являются числами —
 *   выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
 * - если числа попадают в диапазон от 1 до 10 — сделать запрос по URL
 *   https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page —
 *   это число из первого input, а GET-параметр limit — это введённое число
 *   второго input.
 * После получения данных вывести список картинок на экран.
 * Если пользователь перезагрузил страницу, то ему должны показываться картинки
 * из последнего успешно выполненного запроса (использовать localStorage).
 */

const url = "https://picsum.photos/v2/list?";
const inputPageNumberNode = document.getElementById("input-page-number");
const inputLimitNode = document.getElementById("input-limit");
const buttonNode = document.querySelector(".input-button");
const imagesNode = document.querySelector(".images");

imagesNode.innerHTML = localStorage.getItem("lastRequest");



const useRequest = (url, callback) => {
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (callback) {
        callback(data);
      }
    })
    .catch(() => {
      console.log("Error!");
    })
}



function displayResult(requestResult) {
  let images = "";

  requestResult.forEach(item => {
    const imageBlock = `
      <div class="images-block">
        <img src="${item.download_url}" class="images-block-item"/>
        <p class="images-block-author">${item.author}</p>
      </div>
    `;
    images += imageBlock;
    localStorage.setItem("lastRequest", images);
  });

  imagesNode.innerHTML = images;
}



buttonNode.addEventListener("click", () => {
  const pageNumber = Number(inputPageNumberNode.value);
  const limit = Number(inputLimitNode.value);
  const isPageNumberValid =
    pageNumber >= 1 && pageNumber <= 10 && Number.isInteger(pageNumber);
  const isLimitValid =
    limit >= 1 && limit <= 10 && Number.isInteger(limit);

  if (isPageNumberValid && isLimitValid) {
    imagesNode.style.color = "#000000";
    useRequest(url + "page=" + pageNumber + "&limit=" + limit, displayResult);
  } else {
    imagesNode.style.color = "#ff0000";
    if (!isPageNumberValid && !isLimitValid) {
      imagesNode.textContent = "Page number AND limit is out of [1; 10] range!";
    } else if (!isPageNumberValid) {
      imagesNode.textContent = "Page number is out of [1; 10] range!";
    } else if (!isLimitValid) {
      imagesNode.textContent = "Limit is out of [1; 10] range!";
    }
  }
});



inputPageNumberNode.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonNode.click();
  }
});



inputLimitNode.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonNode.click();
  }
});
