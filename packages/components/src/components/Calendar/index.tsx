import React, { useRef, useState } from 'react'
import { Paper } from '@mui/material'

import FullCalendar from '@fullcalendar/react'
// The import order DOES MATTER here. If you change it, you'll get an error!
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
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
  const [initialView, setInitialView] = useState('dayGridMonth')
  return (
    <>
      <FullCalendar
        eventClick={(info) => {
          onClick && onClick(info.event)
        }}
        locales={locales}
        locale={'en'}
        ref={calRef}
        events={events}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={initialView}
        displayEventTime={false}
        headerToolbar={{
          right: 'today prev,next',
          center: 'title',
          left: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
      />
    </>
  )
}

export default CalendarJSX
