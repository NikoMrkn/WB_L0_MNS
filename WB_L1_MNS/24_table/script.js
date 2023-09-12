//Дожидаемся загрузки всего DOM
document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('data-table');
    const tbody = document.getElementById('data-body');
    const pagination = document.getElementById('pagination');
    const dataUrl = 'http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true';
    let currentPage = 1; //Текущая страница
    let currentSortOrder = 'asc'; // Текущий порядок сортировки (asc или desc)

    const fetchData = async () => {
        try {
            const response = await fetch(dataUrl);
            const data = await response.json();
            renderTable(data);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
        }
    };

    const renderTable = (data) => {
        // Очищаем текущие данные в таблице и пагинации
        tbody.innerHTML = '';
        pagination.innerHTML = '';

        // Получаем заголовки столбцов из первой строки данных
        const columnHeaders = Object.keys(data[0]);

        // Рендер заголовков таблицы
        const headerRow = document.createElement('tr');
        columnHeaders.forEach(column => {
            const th = document.createElement('th');
            th.textContent = column;
            th.setAttribute('data-sortable', 'true');
            th.setAttribute('data-column', column);
            headerRow.appendChild(th);
        });
        table.querySelector('thead').innerHTML = '';
        table.querySelector('thead').appendChild(headerRow);

        // Сортировка данных
        table.querySelectorAll('th[data-sortable="true"]').forEach(th => {
            th.addEventListener('click', () => {
                const column = th.getAttribute('data-column');
                // Определение порядка сортировки
                if (currentSortOrder === 'asc') {
                    data.sort((a, b) => {
                        return a[column] > b[column] ? 1 : -1;
                    });
                    currentSortOrder = 'desc'; // Переключение на убывание
                } else {
                    data.sort((a, b) => {
                        return a[column] < b[column] ? 1 : -1;
                    });
                    currentSortOrder = 'asc'; // Переключение на возрастание
                }
                renderTable(data);
            });
        });

        // Разбивка данных на страницы (по 50 элементов на странице)
        const itemsPerPage = 50;
        const pageCount = Math.ceil(data.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Вывод данных на текущей странице
        const currentData = data.slice(startIndex, endIndex);
        currentData.forEach(item => {
            const row = document.createElement('tr');
            columnHeaders.forEach(column => {
                const td = document.createElement('td');
                td.textContent = item[column];
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });

        // Создание кнопок пагинации
        for (let i = 1; i <= pageCount; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                //обновление текущей страницы при клике на кнопку
                currentPage = i;
                renderTable(data);
            });
            pagination.appendChild(pageButton);
        }
    };

    // Начинаем загрузку данных при загрузке страницы
    fetchData();
});
