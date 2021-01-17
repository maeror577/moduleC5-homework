/*
 * Задание 1.
 * Вам дана заготовка и результат, который вы должны получить. Ваша задача —
 * написать код, который будет преобразовывать XML в JS-объект и выводить его
 * в консоль.
 */

const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const result = {};
result.list = [];

const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const listNode = xmlDOM.querySelector("list");
const studentNodes = listNode.querySelectorAll("student");

for (let studentNode of studentNodes) {
  const nameNode = studentNode.querySelector("name");
  const langAttr = nameNode.getAttribute("lang");
  const firstNameNode = nameNode.querySelector("first");
  const secondNameNode = nameNode.querySelector("second");
  const ageNode = studentNode.querySelector("age");
  const profNode = studentNode.querySelector("prof");

  const student = {
    name: `${firstNameNode.textContent} ${secondNameNode.textContent}`,
    age: Number(ageNode.textContent),
    prof: profNode.textContent,
    lang: langAttr
  }

  result.list.push(student);
}

console.log(result);
