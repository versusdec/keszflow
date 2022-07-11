import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
} from '@mui/icons-material'
import * as dateFns from 'date-fns'

interface IMonth {
  currentDay: Date
}

function getWeeks(currentDay: Date) {
  const date = new Date(
    Date.UTC(currentDay.getFullYear(), currentDay.getMonth(), 1)
  )
  const weeks: Array<Array<Date>> = []
  const days = []
  while (date.getMonth() === currentDay.getMonth()) {
    days.push(
      new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    )
    date.setDate(date.getDate() + 1)
  }

  let w: Array<Date> = []
  days.forEach((d, i, a) => {
    const day = d.getDay()
    if (day !== 0) {
      w.push(d)
    } else if (day === 0) {
      w.push(d)
      weeks.push(w)
      w = []
    }
  })
  if (w.length) {
    weeks.push(w)
    w = []
  }
  return weeks
}

type Event = {
  [key: string]: any[]
}

interface IEvArr {
  events?: Event
  onClick?: (info: any) => void
}

const EventsContext = createContext<IEvArr>({
  events: {},
  onClick: () => {},
})

const MonthView = ({ currentDay }: IMonth) => {
  const weeks = getWeeks(currentDay)
  const { events, onClick } = useContext(EventsContext)

  const WeekJSX = ({ week }: { week: Date[] }) => {
    const Days = week.map((day, index) => {
      return <DayJSX key={`day_${new Date().getTime() + index}`} day={day} />
    })
    if (week[0].getDay() !== 1) {
      for (let i = 1; i < week[0].getDay(); i++) {
        Days.unshift(
          <DayJSX key={'day_' + new Date(week[0]).getTime() + i} day={null} />
        )
      }
    }
    if (week[0].getDay() === 0) {
      for (let i = 0; i <= 5; i++) {
        Days.unshift(
          <DayJSX key={'day_' + new Date(week[0]).getTime() + i} day={null} />
        )
      }
    }
    if (week[week.length - 1].getDay() !== 0) {
      for (let i = 0; i < 7 - week[week.length - 1].getDay(); i++) {
        Days.push(
          <DayJSX
            key={'day_' + new Date(week[week.length - 1]).getTime() + i}
            day={null}
          />
        )
      }
    }

    return (
      <Stack className={'week'} direction={'row'} sx={{}}>
        {Days}
      </Stack>
    )
  }

  const DayJSX = ({ day }: { day: Date | null }) => {
    const today = dateFns.format(new Date(), 'yyyy.MM.dd')
    const k = day && dateFns.format(new Date(day), 'yyyy.MM.dd')
    const eves = events && k && events[k]

    return (
      <Box
        className={'day'}
        sx={{
          bgcolor: (theme) => {
            if (!day) {
              // @ts-ignore
              return theme.palette.pastel.primary[100]
            } else if (dateFns.format(new Date(day), 'yyyy.MM.dd') === today) {
              return 'secondary.light'
            } else {
              return 'background.default'
            }
          },
        }}
      >
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Typography>{day && dateFns.format(day, 'dd')}</Typography>
        </Box>
        <Box sx={{}}>
          {eves &&
            eves.map((e, i) => {
              return (
                <Box key={i}>
                  <ListItem
                    disablePadding
                    onClick={() => {
                      onClick && onClick(e)
                    }}
                  >
                    <ListItemButton>{e.name}</ListItemButton>
                  </ListItem>
                </Box>
              )
            })}
        </Box>
      </Box>
    )
  }

  const Weeks = weeks.map((week, index) => {
    return <WeekJSX key={'week_' + new Date().getTime() + index} week={week} />
  })

  return (
    <>
      <Box sx={{}}>
        <Stack
          direction={'row'}
          sx={{
            gap: 2,
            mb: 2,
          }}
        >
          <Box
            key={'mon'}
            sx={{ flexBasis: 'calc(100% / 7)', textAlign: 'center' }}
          >
            Mon
          </Box>
          <Box
            key={'tue'}
            sx={{ flexBasis: 'calc(100% / 7)', textAlign: 'center' }}
          >
            Tue
          </Box>
          <Box
            key={'wed'}
            sx={{ flexBasis: 'calc(100% / 7)', textAlign: 'center' }}
          >
            Wed
          </Box>
          <Box
            key={'thu'}
            sx={{ flexBasis: 'calc(100% / 7)', textAlign: 'center' }}
          >
            Thu
          </Box>
          <Box
            key={'fri'}
            sx={{ flexBasis: 'calc(100% / 7)', textAlign: 'center' }}
          >
            Fri
          </Box>
          <Box
            key={'sat'}
            sx={{ flexBasis: 'calc(100% / 7)', textAlign: 'center' }}
          >
            Sat
          </Box>
          <Box
            key={'sun'}
            sx={{ flexBasis: 'calc(100% / 7)', textAlign: 'center' }}
          >
            Sun
          </Box>
        </Stack>
        {Weeks}
      </Box>
    </>
  )
}

const WeekView = ({ currentDay, week }: { currentDay: Date; week: number }) => {
  const { events, onClick } = useContext(EventsContext)
  const weeks = getWeeks(currentDay)
  const DayJSX = ({ day }: { day: Date }) => {
    const today = dateFns.format(new Date(), 'yyyy.MM.dd')
    const k = day && dateFns.format(new Date(day), 'yyyy.MM.dd')
    const evs = events && k && events[k]
    return (
      <Stack direction={'row'} sx={{}}>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            flexBasis: '180px',
            minHeight: '80px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '1px solid',
            borderColor: 'primary.main',
            bgcolor: () => {
              if (dateFns.format(new Date(day), 'yyyy.MM.dd') === today) {
                return 'secondary.light'
              } else {
                return 'primary.light'
              }
            },
          }}
        >
          <Typography variant={'h3'}>{dateFns.format(day, 'dd')}</Typography>
          <Typography variant={'subtitle1'}>
            {dateFns.format(new Date(day), 'E')}
          </Typography>
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          {evs &&
            evs.map((e, i) => {
              return (
                <Box key={i}>
                  <ListItem
                    disablePadding
                    onClick={() => {
                      onClick && onClick(e)
                    }}
                  >
                    <ListItemButton>{e.name}</ListItemButton>
                  </ListItem>
                </Box>
              )
            })}
        </Box>
      </Stack>
    )
  }
  const WeekJSX = weeks[week].map((day, index) => {
    return (
      <Box
        sx={{
          borderBottom: '1px solid',
          borderColor: 'primary.main',
          '&:last-of-type': {
            border: 'none',
          },
        }}
        key={new Date(day).getTime() + index}
      >
        <DayJSX day={day} />
      </Box>
    )
  })

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'primary.main',
      }}
    >
      {WeekJSX}
    </Box>
  )
}

const DayView = ({ currentDay }: { currentDay: Date }) => {
  const today = dateFns.format(new Date(), 'yyyy.MM.dd')
  const { events, onClick } = useContext(EventsContext)
  const k = currentDay && dateFns.format(new Date(currentDay), 'yyyy.MM.dd')
  const evs = events && k && events[k]
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'primary.main',
      }}
    >
      <Box
        sx={{
          borderBottom: evs ? '1px solid' : 'none',
          borderColor: 'primary.main',
          p: 2,
          bgcolor: (theme) => {
            if (dateFns.format(new Date(currentDay), 'yyyy.MM.dd') === today) {
              return 'secondary.light'
            } else {
              return 'primary.light'
            }
          },
        }}
      >
        <Typography variant={'button'}>
          {dateFns.format(currentDay, 'E, dd')}
        </Typography>
      </Box>
      <Box sx={{}}>
        {evs &&
          evs.map((e, i) => {
            return (
              <Box key={i}>
                <ListItem
                  disablePadding
                  onClick={() => {
                    onClick && onClick(e)
                  }}
                >
                  <ListItemButton>{e.name}</ListItemButton>
                </ListItem>
              </Box>
            )
          })}
      </Box>
    </Box>
  )
}

const CalendarJSX = ({
  events,
  onClick,
}: {
  events: any[] | undefined
  onClick?: (info: any) => void
}) => {
  // const locale = 'en';
  const [view, setView] = useState('month')
  const today = dateFns.startOfDay(new Date())
  const [currentDay, setCurrentDay] = useState<Date>(today)
  const getEvents = useCallback(
    (events: Array<any> | undefined) => {
      const ev: any = {}
      events &&
        events.forEach((event, i) => {
          if (!ev[dateFns.format(new Date(event.date), 'yyyy.MM.dd')]) {
            ev[dateFns.format(new Date(event.date), 'yyyy.MM.dd')] = []
          }
          ev[dateFns.format(new Date(event.date), 'yyyy.MM.dd')].push(event)
        })
      return events && ev
    },
    [events]
  )
  const [eves, setEves] = useState(undefined)

  useEffect(() => {
    setEves(getEvents(events))
  }, [events])

  const getCurrentWeek = useCallback(
    (currentDay: Date) => {
      let currentWeek = 0
      const weeks = getWeeks(currentDay)
      weeks.forEach((week, i, arr) => {
        week.forEach((day) => {
          if (
            dateFns.format(day, 'd.mm.yyyy') ===
            dateFns.format(currentDay, 'd.mm.yyyy')
          ) {
            currentWeek = i
          }
        })
      })
      return currentWeek
    },
    [currentDay]
  )

  const [week, setWeek] = useState(getCurrentWeek(currentDay))

  const handlePrev = () => {
    if (view === 'month') {
      currentDay.setMonth(currentDay.getMonth() - 1)
    } else if (view === 'week') {
      const prevDate = new Date(currentDay)
      prevDate.setDate(currentDay.getDate() - 7)
      if (prevDate.getMonth() === currentDay.getMonth()) {
        setWeek(week - 1)
        currentDay.setDate(currentDay.getDate() - 7)
        setCurrentDay(dateFns.startOfDay(currentDay))
      } else {
        currentDay.setDate(currentDay.getDate() - 7)
        setWeek(getWeeks(currentDay).length - 1)
      }
    } else if (view === 'day') {
      currentDay.setDate(currentDay.getDate() - 1)
    }
    setCurrentDay(dateFns.startOfDay(currentDay))
  }

  const handleNext = () => {
    if (view === 'month') {
      currentDay.setMonth(currentDay.getMonth() + 1)
    } else if (view === 'week') {
      const nextDate = new Date(currentDay)
      nextDate.setDate(currentDay.getDate() + 7)
      if (currentDay.getMonth() === nextDate.getMonth()) {
        setWeek(week + 1)
        currentDay.setDate(currentDay.getDate() + 7)
      } else {
        setWeek(0)
        currentDay.setDate(currentDay.getDate() + 7)
        currentDay.setDate(1)
      }
    } else if (view === 'day') {
      currentDay.setDate(currentDay.getDate() + 1)
    }
    setCurrentDay(dateFns.startOfDay(currentDay))
  }

  const handleToday = () => {
    setCurrentDay(dateFns.startOfDay(today))
    setWeek(getCurrentWeek(today))
  }

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{ gap: 2, mb: 3 }}
      >
        <Stack direction={'row'} sx={{ gap: 2 }}>
          <Button
            variant={'contained'}
            sx={{
              bgcolor: view === 'month' ? 'primary.dark' : 'primary.main',
            }}
            onClick={() => {
              setView('month')
            }}
          >
            MONTH
          </Button>
          <Button
            variant={'contained'}
            sx={{
              bgcolor: view === 'week' ? 'primary.dark' : 'primary.main',
            }}
            onClick={() => {
              setView('week')
            }}
          >
            WEEK
          </Button>
          <Button
            variant={'contained'}
            sx={{
              bgcolor: view === 'day' ? 'primary.dark' : 'primary.main',
            }}
            onClick={() => {
              setView('day')
            }}
          >
            DAY
          </Button>
        </Stack>
        <Box>
          <Typography variant={'h4'}>
            {dateFns.format(currentDay, 'MMMM')},{' '}
            {dateFns.format(currentDay, 'yyyy')}
          </Typography>
        </Box>
        <Stack direction={'row'} sx={{ gap: 2, marginLeft: '0' }}>
          <Button variant={'contained'} onClick={handleToday}>
            TODAY
          </Button>
          <IconButton
            color={'primary'}
            aria-label="previous"
            onClick={() => {
              handlePrev()
            }}
          >
            <ArrowBackIosNewOutlined />
          </IconButton>
          <IconButton
            color={'primary'}
            aria-label="next"
            onClick={() => {
              handleNext()
            }}
          >
            <ArrowForwardIosOutlined />
          </IconButton>
        </Stack>
      </Stack>
      <Paper
        sx={{
          p: 3,
          '& .week': {
            borderTop: '1px solid',
            borderLeft: '1px solid',
            borderColor: 'primary.main',
            '&:last-of-type': {
              borderBottom: '1px solid',
              borderColor: 'primary.main',
            },
          },
          '& .day': {
            flexBasis: 'calc(100% / 7)',
            borderRight: '1px solid',
            borderColor: 'primary.main',
          },
        }}
      >
        <EventsContext.Provider value={{ events: eves, onClick }}>
          {view === 'month' && <MonthView currentDay={currentDay} />}
          {view === 'week' && <WeekView currentDay={currentDay} week={week} />}
          {view === 'day' && <DayView currentDay={currentDay} />}
        </EventsContext.Provider>
      </Paper>
    </Box>
  )
}

export default CalendarJSX
