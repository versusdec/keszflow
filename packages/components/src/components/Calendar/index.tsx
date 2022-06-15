import React, { useRef } from 'react'

import FullCalendar from '@fullcalendar/react'
// The import order DOES MATTER here. If you change it, you'll get an error!
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import locales from '@fullcalendar/core/locales-all'

export interface IEvents {
  title: string
  start: string

  [rest: string]: any
}

const CalendarJSX = ({
  events,
  onClick,
}: {
  events: IEvents[] | undefined
  onClick?: (info: any) => void
}) => {
  const calRef = useRef(null)
  // const [initialView, setInitialView] = useState('dayGridMonth')
  const locale = 'en'

  return (
    <>
      <FullCalendar
        eventClick={(info) => {
          onClick && onClick(info.event)
        }}
        locales={locales}
        locale={locale}
        ref={calRef}
        events={events}
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        displayEventTime={false}
        buttonText={{
          listWeek:
            locales.find(({ code }) => code === locale)?.buttonText?.week ||
            'week',
          listDay:
            locales.find(({ code }) => code === locale)?.buttonText?.day ||
            'day',
        }}
        headerToolbar={{
          right: 'today prev,next',
          center: 'title',
          left: 'dayGridMonth,listWeek,listDay',
        }}
      />
    </>
  )
}

export default CalendarJSX
