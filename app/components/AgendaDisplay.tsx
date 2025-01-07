import Link from 'next/link'
import React from 'react'

const AgendaDisplay: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Bluelinx Conference Agenda</h1>
      <p className="mb-4 text-center">
        <strong>Date:</strong> January 29, 2024 – February 1, 2024<br />
        <strong>Location:</strong> InterContinental Hotel Buckhead<br />
        3315 Peachtree Rd NE, Atlanta, GA 30326
      </p>

      <div className="space-y-8">
        <AgendaDay
          date="Monday, January 29th"
          events={[
            { time: "6:00pm - 8:00pm", description: "Welcome Cocktail Reception with Heavy Hors d'Oeuvres" }
          ]}
        />

        <AgendaDay
          date="Tuesday, January 30th"
          events={[
            { time: "7:00am - 8:00am", description: "Breakfast" },
            { time: "8:00am - 12:00pm", description: "Region Supplier Meetings" },
            { time: "12:00pm - 1:00pm", description: "Lunch" },
            { time: "1:00pm - 5:45pm", description: "Region Supplier Meetings" },
            { time: "6:00pm - 6:30pm", description: "Cocktail Reception" },
            { time: "6:30pm - 8:30pm", description: "Dinner and Keynote Speaker" },
            { time: "8:30pm - 10:30pm", description: "Casino Night" }
          ]}
        />

        <AgendaDay
          date="Wednesday, January 31st"
          events={[
            { time: "7:30am - 8:30am", description: "Breakfast" },
            { time: "8:30am - 9:30am", description: "Shyam Reddy - Vision for 2024 and Beyond" },
            { time: "9:30am - 10:30am", description: "Sean Dwyer - Strategy Overview" },
            { time: "10:30am - 10:45am", description: "Break" },
            { time: "10:45am - 12:00pm", description: "Andy Wasmer - Financial Discussion" },
            { time: "12:00pm - 1:00pm", description: "Lunch" },
            { time: "1:00pm - 2:00pm", description: "Tricia Kinney - Human Resources" },
            { time: "2:00pm - 3:00pm", description: "Chad Lee - Operations Center of Excellence Safety Update" },
            { time: "3:00pm - 3:15pm", description: "Break" },
            { time: "3:15pm - 4:00pm", description: "Roxane Gray & Praveen Gautam - Digital Transformation" },
            { time: "4:00pm - 5:00pm", description: "Tricia Kinney - Legal Compliance/Education" },
            { time: "5:30pm - 6:30pm", description: "Cocktail Reception" },
            { time: "6:30pm - 9:30pm", description: "Keynote Speaker/Awards Presentation" }
          ]}
        />

        <Link href="https://forms.office.com/Pages/ResponsePage.aspx?id=e-O6gL9JtkiU-M7d-A2RGqLkK95AnKhKiKuO4O4QAktUNk5PSU0wNkI2Wlk2SUNGTlpVTFVGTUNXTC4u&rc07bc9aecd234a64972d211263322bb6=Shyam%20Reddy%20-%20Vision%20for%202024%20and%20Beyond" target='_blank'>
          Shyam
        </Link>


        <AgendaDay
          date="Thursday, February 1st"
          events={[
            { time: "7:00am - 8:00am", description: "Breakfast" },
            { time: "8:00am - 9:15am", description: "Keynote Speaker" },
            { time: "9:15am - 10:15am", description: "Gregg Argall - National Accounts Update/Multifamily - Builder" },
            { time: "10:15am - 10:30am", description: "Break" },
            { time: "10:30am - 11:30am", description: "Sean Dwyer & RVP Fireside Chat" },
            { time: "11:30am - 12:00pm", description: "Shyam Reddy - Closing Comments and Q&A" },
            { time: "12:00pm", description: "Everyone to Depart" }
          ]}
        />
      </div>
    </div>
  )
}

interface AgendaDayProps {
  date: string
  events: Array<{ time: string; description: string }>
}

const AgendaDay: React.FC<AgendaDayProps> = ({ date, events }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{date}</h2>
      <ul className="space-y-2">
        {events.map((event, index) => (
          <li key={index} className="flex">
            <span className="w-36 font-medium">{event.time}</span>
            <span>{event.description}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AgendaDisplay

