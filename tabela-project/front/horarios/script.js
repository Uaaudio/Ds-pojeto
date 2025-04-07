
const monthYearEl = document.getElementById('monthYear');
const calendarBody = document.getElementById('calendarBody');

const hoje = new Date();
let currentMonth = hoje.getMonth();
let currentYear = hoje.getFullYear();

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
               "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function generateCalendar(month, year) {
  calendarBody.innerHTML = "";
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYearEl.textContent = `${meses[month]} de ${year}`;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');

      if (i === 0 && j < firstDay) {
        cell.innerHTML = "";
      } else if (date > daysInMonth) {
        break;
      } else {
        cell.innerHTML = `<span class="day">${date}</span>`;

        // Exemplo: Adicionar evento fictício em terças
        const dayOfWeek = new Date(year, month, date).getDay();
        if (dayOfWeek === 2) {
          cell.innerHTML += `<div class="event">📡 Aula: Internet das Coisas</div>`;
        } else if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
          cell.innerHTML += `<div class="event">🕒 Aula: Desenvolvimento</div>`;
        }

        // Destacar o dia atual
        if (date === hoje.getDate() && month === hoje.getMonth() && year === hoje.getFullYear()) {
          cell.classList.add("today");
        }

        date++;
      }

      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }
}

function changeMonth(delta) {
  currentMonth += delta;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentMonth, currentYear);
}

// Iniciar com mês atual
generateCalendar(currentMonth, currentYear);
