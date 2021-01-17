/*
 * Задание 4.
 * Напишите код приложения, интерфейс которого представляет собой 2 input и
 * кнопку. В input можно ввести любое число. При клике на кнопку происходит
 * следующее:
 * - если оба числа не попадают в диапазон от 100 до 300 или введено не число —
 *   выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
 * - если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью
 *   fetch по URL https://picsum.photos/200/300, где первое число — ширина
 *   картинки, второе — высота.
 * После получения данных вывести ниже картинку на экран.
 */

const url = "https://picsum.photos/";
const inputWidthNode = document.getElementById("input-width");
const inputHeightNode = document.getElementById("input-height");
const buttonNode = document.querySelector(".input-button");
const imageNode = document.querySelector(".image");



const useRequest = (url, callback) => {
  return fetch(url)
    .then((response) => {
      if (callback) {
        callback(response.url);
      }
    })
    .catch(() => {
      console.log("Error!");
    })
}



function displayResult(imgUrl) {
  imageNode.innerHTML = `<img src="${imgUrl}">`;
}



buttonNode.addEventListener("click", () => {
  const width = Number(inputWidthNode.value);
  const height = Number(inputHeightNode.value);
  const isValuesValid = width >= 100 && width <= 300 && Number.isInteger(width)
    && height >= 100 && height <= 300 && Number.isInteger(height);

  if (isValuesValid) {
    imageNode.style.color = "#000000";
    useRequest(url + width + "/" + height, displayResult);
  } else {
    imageNode.style.color = "#ff0000";
    imageNode.textContent = "Incorrect input!";
  }
});



inputWidthNode.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonNode.click();
  }
});



inputHeightNode.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonNode.click();
  }
});
