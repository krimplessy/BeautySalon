let filter = document.getElementById('Filter');
let sort = document.getElementById('Sort');
let graph = document.getElementById('buildGraph');
let clean = document.getElementById('Clean');

filter.onclick = function () {
    let table = document.getElementById('table');

    //Фильтр по категории
    let filterCateg = document.getElementsByClassName('filtCateg');
    let arrCateg = ['Стрижки','Укладки','Текстурирование',
    'Восстановление и уход','HONMA TOKYO','Однотонное окрашивание',
    'Двухцветное окрашивание', 'Классическое мелирование'];
    let arrCateg1 = [];
    for (let i in filterCateg) {
        if (filterCateg[i].checked == true) {
            arrCateg1.push(arrCateg[filterCateg[i].value]);
        }
    }
    
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        if (row.hidden == false) {
            for (let tmp of arrCateg1) {
                if (tmp === row.cells[0].innerHTML) {
                    row.hidden = false;
                    break;
                } else {
                    row.hidden = true;
                }
            }
        }
    }

    //Фильтр по гендеру
    let arrMan = ['Виталий','Петр','Михаил','Любой мастер'];
    let arrWoman = ['Инга','Василиса','Александра','Мария','Ангелина',
    'Марина','Валентина','Софья','Маргарита','Юлия','Анастасия','Милана',
    'Ольга','Светлана','Олеся','Жасмин','Диана','Любой мастер'];
    if (document.getElementById('filtGender').value == '0') {
        for (let i = 1; i < table.rows.length; i++) {
            let row = table.rows[i];
            if (row.hidden == false) {
                for (let tmp of arrMan) {
                    if (tmp === row.cells[3].innerHTML) {
                        row.hidden = false;
                        break;
                    } else {
                        row.hidden = true;
                    }
                }
            }
        }
    } else if (document.getElementById('filtGender').value == '1') {
        for (let i = 1; i < table.rows.length; i++) {
            let row = table.rows[i];
            if (row.hidden == false) {
                for (let tmp of arrWoman) {
                    if (tmp === row.cells[3].innerHTML) {
                        row.hidden = false;
                        break;
                    } else {
                        row.hidden = true;
                    }
                }
            }
        }
    }

    //Фильтр по минимальной и максимальной стоимости
    if (document.getElementById('minPrice').value > 2500) {
        document.getElementById('minPrice').value = 2500;
    } else if (document.getElementById('minPrice').value < 100) {
        document.getElementById('minPrice').value = 100;
    }
    if (document.getElementById('maxPrice').value < 2500) {
        document.getElementById('maxPrice').value = 2500;
    } else if (document.getElementById('maxPrice').value > 5950) {
        document.getElementById('maxPrice').value = 5950;
    }
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        if (row.hidden == false) {
            if (Number(row.cells[2].innerHTML) >= Number(document.getElementById('minPrice').value) &&
            Number(row.cells[2].innerHTML) <= Number(document.getElementById('maxPrice').value)) {
                row.hidden = false;
            } else {
                row.hidden = true;
            }
        }
    }
}

//Ставлю фильтр на то, чтобы поля для сортировки не повторялись
let hideFieldForSort1 = document.getElementById('SortFirst');
let hideFieldForSort2 = document.getElementById('SortSecond');
hideFieldForSort1.onchange = function () {
    if (document.getElementById('SortSecond').value === document.getElementById('SortFirst').value) {
        document.getElementById('SortFirst').value = '5';
    }
}
hideFieldForSort2.onchange = function () {
    if (document.getElementById('SortSecond').value === document.getElementById('SortFirst').value) {
        document.getElementById('SortSecond').value = '5';
    }
}

//Сортировка
sort.onclick = function() {
    let table = document.getElementById('table');

    // Сортируется, если выбрано одно поле для сортировки (первое)
    if (document.getElementById('SortFirst').value !== '5' && document.getElementById('SortSecond').value == '5') {
        if (document.getElementById('SortFirst').value === '0' || document.getElementById('SortFirst').value === '1' || document.getElementById('SortFirst').value === '3') {
            for (let i = 1; i < table.rows.length; i++) {
                let numField = Number(document.getElementById('SortFirst').value);
                for (let j = 1; j < table.rows.length - i; j++) {
                    if (document.getElementById('Sort1').value === '0') { // Сортировка по возрастанию
                        if (table.rows[j].cells[numField].innerHTML > table.rows[j + 1].cells[numField].innerHTML) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    } else if (document.getElementById('Sort1').value === '1') { // Сортировка по убыванию
                        if (table.rows[j].cells[numField].innerHTML < table.rows[j + 1].cells[numField].innerHTML) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    }
                }
            }
        } else {
            for (let i = 1; i < table.rows.length; i++) {
                let numField = Number(document.getElementById('SortFirst').value);
                for (let j = 1; j < table.rows.length - i; j++) {
                    if (document.getElementById('Sort1').value === '0') { // Сортировка по возрастанию
                        if (Number(table.rows[j].cells[numField].innerHTML) > Number(table.rows[j + 1].cells[numField].innerHTML)) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    } else if (document.getElementById('Sort1').value === '1') { // Сортировка по убыванию
                        if (Number(table.rows[j].cells[numField].innerHTML) < Number(table.rows[j + 1].cells[numField].innerHTML)) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    }
                }
            }
        }
    }

    // Сортируется, если выбрано одно поле для сортировки (второе)
    if (document.getElementById('SortFirst').value === '5' && document.getElementById('SortSecond').value !== '5') {
        if (document.getElementById('SortSecond').value === '0' || document.getElementById('SortSecond').value === '1' || document.getElementById('SortSecond').value === '3') {
            for (let i = 1; i < table.rows.length; i++) {
                let numField = Number(document.getElementById('SortSecond').value);
                for (let j = 1; j < table.rows.length - i; j++) {
                    if (document.getElementById('Sort2').value === '0') { // Сортировка по возрастанию
                        if (table.rows[j].cells[numField].innerHTML > table.rows[j + 1].cells[numField].innerHTML) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    } else if (document.getElementById('Sort2').value === '1') { // Сортировка по убыванию
                        if (table.rows[j].cells[numField].innerHTML < table.rows[j + 1].cells[numField].innerHTML) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    }
                }
            }
        } else {
            for (let i = 1; i < table.rows.length; i++) {
                let numField = Number(document.getElementById('SortSecond').value);
                for (let j = 1; j < table.rows.length - i; j++) {
                    if (document.getElementById('Sort2').value === '0') { // Сортировка по возрастанию
                        if (Number(table.rows[j].cells[numField].innerHTML) > Number(table.rows[j + 1].cells[numField].innerHTML)) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    } else if (document.getElementById('Sort2').value === '1') { // Сортировка по убыванию
                        if (Number(table.rows[j].cells[numField].innerHTML) < Number(table.rows[j + 1].cells[numField].innerHTML)) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    }
                }
            }
        }
    }

    //Сортируется по 2-м полям по возрастанию
    if (document.getElementById('SortFirst').value !== '5' && document.getElementById('SortSecond').value !== '5') {
        if (document.getElementById('SortFirst').value === '0' || document.getElementById('SortFirst').value === '1' || document.getElementById('SortFirst').value === '3') {
            for (let i = 1; i < table.rows.length; i++) {
                let numField = Number(document.getElementById('SortFirst').value);
                let numField2 = Number(document.getElementById('SortSecond').value);
                for (let j = 1; j < table.rows.length - i; j++) {
                    if (document.getElementById('Sort1').value === '0') { // Сортировка по возрастанию
                        if (table.rows[j].cells[numField].innerHTML > table.rows[j + 1].cells[numField].innerHTML) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                     } else if (document.getElementById('Sort1').value === '1') { // Сортировка по убыванию
                        if (table.rows[j].cells[numField].innerHTML < table.rows[j + 1].cells[numField].innerHTML) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                     }
                    if (table.rows[j].cells[numField].innerHTML == table.rows[j + 1].cells[numField].innerHTML) {
                        if (numField2 === 0 || numField2 === 1 || numField2 === 3) {
                            if (document.getElementById('Sort2').value === '0') { // Сортировка по возрастанию
                                if (table.rows[j].cells[numField2].innerHTML > table.rows[j + 1].cells[numField2].innerHTML) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            } else if (document.getElementById('Sort2').value === '1') { // Сортировка по убыванию
                                if (table.rows[j].cells[numField2].innerHTML < table.rows[j + 1].cells[numField2].innerHTML) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            }
                        } else { 
                            if (document.getElementById('Sort2').value === '0') { // Сортировка по возрастанию
                                if (Number(table.rows[j].cells[numField2].innerHTML) > Number(table.rows[j + 1].cells[numField2].innerHTML)) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            } else if (document.getElementById('Sort2').value === '1') { // Сортировка по убыванию
                                if (Number(table.rows[j].cells[numField2].innerHTML) < Number(table.rows[j + 1].cells[numField2].innerHTML)) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            }
                        }
                    }
                }
            }
        } else {
            for (let i = 1; i < table.rows.length; i++) {
                let numField = Number(document.getElementById('SortFirst').value);
                let numField2 = Number(document.getElementById('SortSecond').value);
                for (let j = 1; j < table.rows.length - i; j++) {
                    if (document.getElementById('Sort1').value === '0') { // Сортировка по возрастанию
                        if (Number(table.rows[j].cells[numField].innerHTML) > Number(table.rows[j + 1].cells[numField].innerHTML)) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    } else if (document.getElementById('Sort1').value === '1') { // Сортировка по убыванию
                        if (Number(table.rows[j].cells[numField].innerHTML) < Number(table.rows[j + 1].cells[numField].innerHTML)) {
                            table.rows[j].before(table.rows[j + 1]);
                        }
                    }
                    if (Number(table.rows[j].cells[numField].innerHTML) == Number(table.rows[j + 1].cells[numField].innerHTML)) {
                        if (numField2 === 0 || numField2 === 1 || numField2 === 3) {
                            if (document.getElementById('Sort2').value === '0') { // Сортировка по возрастанию
                                if (table.rows[j].cells[numField2].innerHTML > table.rows[j + 1].cells[numField2].innerHTML) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            } else if (document.getElementById('Sort2').value === '1') { // Сортировка по убыванию
                                if (table.rows[j].cells[numField2].innerHTML < table.rows[j + 1].cells[numField2].innerHTML) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            }
                        } else {
                            if (document.getElementById('Sort2').value === '0') { // Сортировка по возрастанию
                                if (Number(table.rows[j].cells[numField2].innerHTML) > Number(table.rows[j + 1].cells[numField2].innerHTML)) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            } else if (document.getElementById('Sort2').value === '1') { // Сортировка по убыванию
                                if (Number(table.rows[j].cells[numField2].innerHTML) < Number(table.rows[j + 1].cells[numField2].innerHTML)) {
                                    table.rows[j].before(table.rows[j + 1]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

//Построение графика с библиотекой d3
function getArrGraph(arrObject, fieldX, fieldY) {
    let groupObj = d3.group(arrObject, d => d[fieldX])
    arrGroup = [];
    for(let entry of groupObj) {
        let minMax = d3.extent(entry[1].map(d => d[fieldY]));
        let elementGroup = {};
        elementGroup.labelX = entry[0];
        //elementGroup.value = entry[1].map(d => d[fieldY]);
        elementGroup.valueMin = minMax[0];
        elementGroup.valueMax = minMax[1];
        arrGroup.push(elementGroup);
    }
    console.log(arrGroup);
    return arrGroup; 
}

//graph.onclick = function() {
function drawGraph(data) {
    let fieldY = document.getElementsByClassName('OY');
    for (let i in fieldY) {
        if (fieldY[i].checked == true) {
            fieldY = fieldY[i].value;
            break;
        }
    }
    
    let table = document.getElementById('table');
    let services = [];

    //Представление таблицы в виде ассоциативного массива
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        services.push({'Тип процедуры': row.cells[0].innerHTML,
        'Название процедуры': row.cells[1].innerHTML,
        'Цена': Number(row.cells[2].innerHTML),
        'Мастер': row.cells[3].innerHTML,
        'Длительность (мин)': Number(row.cells[4].innerHTML)});
    }
    //console.log(services);

    // формируем массив для построения диаграммы
    let arrGraph = getArrGraph(services, "Название процедуры", fieldY);

    let marginX = 50; 
    let marginY = 70;
    let height = 400; 
    let width = 800;

    let svg = d3.select("svg") 
        .attr("height", height)
        .attr("width", width)
       //.style("border", "solid thin grey");
    svg.selectAll("*").remove();

    // определяем минимальное и максимальное значение по оси OY
    let min = d3.min(arrGraph.map(d => d.valueMin)) * 0.95;
    let max = d3.max(arrGraph.map(d => d.valueMax)) * 1.05; 
    
    let xAxisLen = width - 2 * marginX;
    let yAxisLen = height - 2 * marginY;

    // определяем шкалы для осей
    let scaleX = d3.scaleBand() 
        .domain(arrGraph.map(function(d) {
        return d.labelX; })
        )
        .range([0, xAxisLen],1);

    let scaleY = d3.scaleLinear() 
        .domain([min, max])
        .range([yAxisLen, 0]);

    // создаем оси
    let axisX = d3.axisBottom(scaleX); // горизонтальная 
    let axisY = d3.axisLeft(scaleY);// вертикальная

    // отображаем ось OX, устанавливаем подписи оси ОX и угол их наклона
    svg.append("g")
    .attr("transform", `translate(${marginX}, ${height - marginY})`) 
    .call(axisX)
    .attr("class", "x-axis")
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function (d) {
    return "rotate(-45)"; });

    // отображаем ось OY
    svg.append("g")
        .attr("transform", `translate(${marginX}, ${marginY})`) 
        .attr("class", "y-axis")
        .call(axisY);

    // создаем набор вертикальных линий для сетки
    d3.selectAll("g.x-axis g.tick") 
        .append("line") // добавляем линию .classed("grid-line", true) // добавляем класс .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", - (yAxisLen));

    // создаем горизонтальные линии сетки
    d3.selectAll("g.y-axis g.tick") 
        .append("line") 
        .classed("grid-line", true) 
        .attr("x1", 0)
        .attr("y1", 0) 
        .attr("x2", xAxisLen)
        .attr("y2", 0);

    // отображаем данные в виде точечной диаграммы (Max)
    svg.selectAll(".dot") 
        .data(arrGraph) 
        .enter() 
        .append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return scaleX(d.labelX); })
        .attr("cy", function(d) { return scaleY(d.valueMax); }) 
        .attr("transform",`translate(${marginX + scaleX.bandwidth()/2}, ${marginY})`) 
        .style("fill", "red")

        svg.selectAll(".dot")
        .data(arrGraph)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return scaleX(d.labelX); }) 
        .attr("cy", function(d) { return scaleY(d.valueMin); }) 
        .attr("transform",`translate(${marginX + scaleX.bandwidth()/2}, ${marginY})`) 
        .style("fill", "blue")
}

// Очистить все
clean.onclick = function () {
    //Очистка выбора категорий
    let filterCateg = document.getElementsByClassName('filtCateg');
    for (let i in filterCateg) {
        filterCateg[i].checked = false;
    }

    //Очистка выбора гендера
    document.getElementById('filtGender').value = '2';

    //Очистка стоимости
    document.getElementById('maxPrice').value = 100;
    document.getElementById('maxPrice').value = 5950;

    //Очистка сортировки
    document.getElementById('SortFirst').value = '5';
    document.getElementById('SortSecond').value = '5';
    document.getElementById('Sort1').value = '0';
    document.getElementById('Sort2').value = '0';

    //Восстановление таблицы
    let table = document.getElementById('table');
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        if (row.hidden === true) {
            row.hidden = false;
        }
    }
}