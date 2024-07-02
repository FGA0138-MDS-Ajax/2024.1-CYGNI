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
import { Box, colors } from '@mui/material';

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
  console.log('markNonWorkDays - escalaInicio:', escalaInicio, 'escala:', escala);

  const allDays = [];
  const workDays = new Set();
  let startOfDay = dayjs.utc(escalaInicio).startOf('day'); // Garantir que comece no início do dia

  // Adiciona todos os dias do ano à lista de todos os dias
  for (let i = 0; i < 365; i++) {
    const currentDate = startOfDay.add(i, 'day').format('YYYY-MM-DD');
    allDays.push(currentDate);
  }

  switch (escala) {
    case 'Expediente':
      // Segunda a sexta-feira, trabalho; sábado e domingo, folga
      for (let i = 0; i < 365; i++) {
        const currentDate = startOfDay.add(i, 'day');
        if (currentDate.day() >= 1 && currentDate.day() <= 5) {
          workDays.add(currentDate.format('YYYY-MM-DD'));
        }
      }
      break;
    case '12 x 36':
      // trabalha um dia e folga um dia
      for (let i = 0; i < 365; i += 2) { // Incrementa de 2 em 2 dias para cada ciclo de trabalho+folga
        const currentDate = startOfDay.add(i, 'day'); // Calcula o dia atual de trabalho
        workDays.add(currentDate.format('YYYY-MM-DD')); // Adiciona o dia de trabalho
      }
      break;
    case '24 x 72':
      // trabalha um dia e folga três dias
      for (let i = 0; i < 365; i += 4) { // Incrementa de 4 em 4 dias para cada ciclo de trabalho+folga
        const currentDate = startOfDay.add(i, 'day'); // Calcula o dia atual de trabalho
        workDays.add(currentDate.format('YYYY-MM-DD')); // Adiciona o dia de trabalho
      }
      break;
    case '8 x 40':
      // Trabalha segunda-feira, quarta-feira e sexta-feira em uma semana;
      // na outra semana, terça-feira, quinta-feira e sábado, nunca domingo.
      for (let i = 0; i < 365; i += 7) {
        const weekStart = startOfDay.add(i, 'days');
        if (Math.floor(i / 7) % 2 === 0) { // Semana par: segunda, quarta, sexta
          workDays.add(weekStart.format('YYYY-MM-DD')); // Segunda-feira
          workDays.add(weekStart.add(2, 'days').format('YYYY-MM-DD')); // Quarta-feira
          workDays.add(weekStart.add(4, 'days').format('YYYY-MM-DD')); // Sexta-feira
        } else { // Semana ímpar: terça, quinta, sábado
          workDays.add(weekStart.add(1, 'days').format('YYYY-MM-DD')); // Terça-feira
          workDays.add(weekStart.add(3, 'days').format('YYYY-MM-DD')); // Quinta-feira
          workDays.add(weekStart.add(5, 'days').format('YYYY-MM-DD')); // Sábado
        }
      }
      break;
    case '12 x 60':
      // trabalha um dia e folga dois
      for (let i = 0; i < 365; i += 3) { // Incrementa i por 3 para cada ciclo de trabalho+folga
        const currentDate = startOfDay.add(i, 'day');
        workDays.add(currentDate.format('YYYY-MM-DD')); // Adiciona apenas um dia de trabalho
      }
      break;
    default:
      break;
  }

  // Filtra os dias não trabalhados
  const nonWorkDays = allDays.filter(day => !workDays.has(day));
  console.log('markNonWorkDays - nonWorkDays:', nonWorkDays);
  return nonWorkDays;
}

export function DateCalendarServerRequest({ user }) {
  console.log('DateCalendarServerRequest - user:', user);
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
        if (!user || !user.escalaInicio || !user.escala) {
          throw new Error('No user or data found');
        }

        let combinedHighlightedDays = [];

        if (user.dataInicio && user.dataTermino) {
          const filteredInicioDates = user.dataInicio.filter((date) => date !== null);
          const filteredFinalDates = user.dataTermino.filter((date) => date !== null);

          combinedHighlightedDays = filteredInicioDates.map((inicio, index) => {
            const final = filteredFinalDates[index];
            if (!final) return inicio; // Handle case where final date is missing
            return `${inicio}_${final}`;
          });
        }

        console.log('fetchHighlightedDays - combinedHighlightedDays:', combinedHighlightedDays);

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

  const markedDays = React.useMemo(() => {
    if (!user) return [];

    let daysToMark = [];

    if (user.escalaInicio && user.escala) {
      daysToMark = markNonWorkDays(user.escalaInicio, user.escala);
    }

    let allHighlightedDays = [...daysToMark];

    if (user.dataInicio && user.dataTermino) {
      const filteredInicioDates = user.dataInicio.filter((date) => date !== null);
      const filteredFinalDates = user.dataTermino.filter((date) => date !== null);
      const combinedHighlightedDays = filteredInicioDates.map((inicio, index) => {
        const final = filteredFinalDates[index];
        if (!final) return inicio; // Handle case where final date is missing
        return `${inicio}_${final}`;
      });
      allHighlightedDays = [
        ...allHighlightedDays,
        ...combinedHighlightedDays
      ];
    }
    console.log('markedDays - allHighlightedDays:', allHighlightedDays);
    // Convert highlighted days ranges into individual days
    const expandedHighlightedDays = allHighlightedDays.flatMap((range) => {
      if (range.includes('_')) {
        const [start, end] = range.split('_');

        let current = dayjs.utc(start);
        const endDate = dayjs.utc(end);
        const days = [];

        while (current.isSameOrBefore(endDate)) {
          const formattedDate = current.format('YYYY-MM-DD');
          days.push(formattedDate);
          current = current.add(1, 'day');
        }

        return days;
      } else {
        return [range];
      }
    });
    console.log('markedDays - expandedHighlightedDays:', expandedHighlightedDays);
    return [...new Set(expandedHighlightedDays)];
  }, [user]);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          <DateCalendar
            sx={
              {
                width: '60%',
                maxHeight: '700px',
                height: '90%',
                backgroundColor: '#03161A',
                '.css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root': {
                  color: '#444444',
                  fontWeight: 'bold',
                  fontSize: '1.25rem'
                },
                '.css-rhmlg1-MuiTypography-root-MuiDayCalendar-weekDayLabel': {
                  color: '#444444',
                  fontWeight: 'bold',
                  fontSize: '1.25rem'
                },
                '.css-23p0if-MuiButtonBase-root-MuiPickersDay-root': {
                  color: '#03161A',
                  fontWeight: 'bold',
                },
                '.css-23p0if-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)': {
                  color: '#444444',
                  border: '2.5px solid #D3D3D3',
                },
                '.css-6qnqtw-MuiDateCalendar-root .css-23p0if-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)': {
                  fontSize: '1.25rem'
                },
                '.css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root.Mui-selected': {
                  backgroundColor: '#FFA800',
                  fontSize: '1.25rem'
                },
                '.css-23p0if-MuiButtonBase-root-MuiPickersDay-root.Mui-selected': {
                  backgroundColor: '#FFA800',
                  fontSize: '1.25rem'
                },

                '.css-kg9q0s-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button': {
                  color: '#FFA800'
                },
                '.css-1nkg345-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button': {
                  color: '#FFA800'
                },
                '.css-1tkx1wf-MuiSvgIcon-root-MuiPickersCalendarHeader-switchViewIcon': {
                  color: '#fff'
                },
                '.css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root.Mui-selected': {
                  backgroundColor: '#FFA800'
                },
                '.css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root.Mui-selected:hover': {
                  backgroundColor: '#FFA800'
                },
                '.css-23p0if-MuiButtonBase-root-MuiPickersDay-root:focus.Mui-selected': {
                  backgroundColor: '#FFA800'
                },
                '.css-1aqny2q-MuiPickersCalendarHeader-root': {
                  backgroundColor: '#03161A',
                  borderRadius: '8px'
                },
                '.css-189spg7-MuiDateCalendar-root': {
                  backgroundColor: '#fff'
                },
                // Parte amarela que contém os dias da semana
                '.css-i5q14k-MuiDayCalendar-header': {
                  backgroundColor: '#FFA800',
                  justifyContent: 'space-evenly',
                  // marginLeft: '10%',
                  // marginRight: '10%',
                },
                // Parte branca que contém os dias de 1 a 30
                '.css-2jurxj-MuiDayCalendar-slideTransition': {
                  backgroundColor: '#fff'
                },
                // X
                '.css-1r7ctd-MuiBadge-badge': {
                  color: '#444444'
                },
                '.css-flbe84-MuiDayCalendar-weekContainer': {
                  justifyContent: 'space-evenly',
                  // marginLeft: '10%',
                  // marginRight: '10%',
                  marginTop: '4%',
                  marginBottom: '6%'
                }
              }
            }
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
    </Box >
  );
}
