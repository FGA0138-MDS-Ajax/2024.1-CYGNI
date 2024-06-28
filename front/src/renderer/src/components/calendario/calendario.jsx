import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import utc from 'dayjs/plugin/utc';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);

const initialValue = dayjs();

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected = !outsideCurrentMonth && highlightedDays.some((highlightedDay) => {
    return dayjs(day).isSame(dayjs(highlightedDay), 'day');
  });

  return (
    <Badge key={props.day.toString()} overlap="circular" badgeContent={isSelected ? 'X' : undefined}>
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

function markNonWorkDays(escalaInicio, escala) {
  const allDays = [];
  const workDays = new Set();
  let startOfDay = dayjs.utc(escalaInicio).startOf('day'); // Garantir que comece no início do dia

  // Adiciona todos os dias do ano à lista de todos os dias
  for (let i = 0; i < 365; i++) {
    const currentDate = startOfDay.add(i, 'day').format('YYYY-MM-DD');
    allDays.push(currentDate);
  }

  switch (escala) {
    case 'expediente':
      // Segunda a sexta-feira, trabalho; sábado e domingo, folga
      for (let i = 0; i < 365; i++) {
        const currentDate = startOfDay.add(i, 'day');
        if (currentDate.day() >= 1 && currentDate.day() <= 5) {
          workDays.add(currentDate.format('YYYY-MM-DD'));
        }
      }
      break;
    case '12x36':
      // A cada 2 dias, 24 horas de trabalho seguidas por 12 horas de folga
      for (let i = 0; i < 365; i += 3) {
        const currentDate = startOfDay.add(i * 2, 'day'); // 24 horas de trabalho
        workDays.add(currentDate.format('YYYY-MM-DD'));
        workDays.add(currentDate.add(1, 'day').format('YYYY-MM-DD')); // 12 horas de folga
      }
      break;
    case '24x72':
      // A cada 3 dias de trabalho seguidos por 4 dias de folga
      for (let i = 0; i < 365; i += 7) {
        const currentDate = startOfDay.add(i * 3, 'day'); // 3 dias de trabalho
        workDays.add(currentDate.format('YYYY-MM-DD'));
        workDays.add(currentDate.add(1, 'day').format('YYYY-MM-DD'));
        workDays.add(currentDate.add(2, 'day').format('YYYY-MM-DD'));
      }
      break;
    case '8x40':
      // A cada 7 dias, 40 horas de trabalho
      for (let i = 0; i < 365; i += 7) {
        const currentDate = startOfDay.add(i, 'day');
        workDays.add(currentDate.format('YYYY-MM-DD')); // segunda-feira
        workDays.add(currentDate.add(2, 'day').format('YYYY-MM-DD')); // quarta-feira
        workDays.add(currentDate.add(4, 'day').format('YYYY-MM-DD')); // sexta-feira
      }
      break;
    case '12x60':
      // A cada 7 dias, 60 horas de trabalho
      for (let i = 0; i < 365; i += 7) {
        const currentDate = startOfDay.add(i, 'day');
        workDays.add(currentDate.format('YYYY-MM-DD'));
        workDays.add(currentDate.add(1, 'day').format('YYYY-MM-DD'));
        workDays.add(currentDate.add(2, 'day').format('YYYY-MM-DD'));
        workDays.add(currentDate.add(3, 'day').format('YYYY-MM-DD'));
      }
      break;
    default:
      break;
  }

  // Filtra os dias não trabalhados
  const nonWorkDays = allDays.filter(day => !workDays.has(day));
  return nonWorkDays;
}

export function DateCalendarServerRequest({ user }) {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDaysFromServer, setHighlightedDaysFromServer] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');

  const fetchHighlightedDays = React.useCallback(() => {
    const controller = new AbortController();
    requestAbortController.current = controller;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!user || !user.dataInicio || !user.dataTermino) {
          throw new Error('No user or data found');
        }

        const filteredInicioDates = user.dataInicio.filter((date) => date !== null);
        const filteredFinalDates = user.dataTermino.filter((date) => date !== null);

        const combinedHighlightedDays = filteredInicioDates.map((inicio, index) => {
          const final = filteredFinalDates[index];
          if (!final) return inicio; // Handle case where final date is missing
          return `${inicio}_${final}`;
        });

        if (combinedHighlightedDays.length === 0) {
          throw new Error('No funcionario data found');
        }

        setHighlightedDaysFromServer(combinedHighlightedDays);
        setErrorMessage('');
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to fetch highlighted days:', error);
          setErrorMessage('Failed to fetch highlighted days or no funcionario data found.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [user]);

  React.useEffect(() => {
    fetchHighlightedDays();
  }, [fetchHighlightedDays]);

  const markedDays = React.useMemo(() => {
    if (!user || !user.escalaInicio || !user.escala) return [];

    const daysToMark = markNonWorkDays(user.escalaInicio, user.escala);

    const allHighlightedDays = [
      ...highlightedDaysFromServer,
      ...daysToMark
    ];

    // Convert highlighted days ranges into individual days
    const expandedHighlightedDays = allHighlightedDays.flatMap((range) => {
      if (range.includes('_')) {
        const [start, end] = range.split('_');
        let current = dayjs.utc(start);
        const endDate = dayjs.utc(end);
        const days = [];

        while (current.isSameOrBefore(endDate)) {
          days.push(current.format('YYYY-MM-DD'));
          current = current.add(1, 'day');
        }

        return days;
      } else {
        return [range];
      }
    });

    return [...new Set(expandedHighlightedDays)];
  }, [user, highlightedDaysFromServer]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <DateCalendar
          defaultValue={initialValue}
          loading={isLoading}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays: markedDays,
            },
          }}
        />
      )}
    </LocalizationProvider>
  );
}
