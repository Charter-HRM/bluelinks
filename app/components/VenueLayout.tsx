import Image from 'next/image'

const VenueLayout: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Venue Layout</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Meeting Space</h2>
        <p className="mb-4">
          40,000 sq ft of flexible function space, including the beautiful 11,070 sq ft Ellington Ballroom and 4,800 sq ft of outdoor terrace
          space, accommodating groups up to 1,230. All function space is conveniently located on one level (14th floor). Mercer Ballroom
          features floor-to-ceiling windows overlooking Piedmont Park. Ten executive meeting rooms, ranging from 480 sq.ft. to 1,260
          sq.ft., all feature floor to ceiling windows and fantastic city and park views.
        </p>
        <p className="mb-4">
          Based on your schedule of events, we are happy to propose the following meeting space
          with a $100,000.00 F&B minimum:
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Floor Plan</h2>
        <div className="relative w-full h-96 mb-4">
          <Image
            src="/floor-plan.png"
            alt="Venue Floor Plan"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <ul className="list-disc pl-5">
          <li>General Session / Awards Dinner: Ellington Ballroom</li>
          <li>Banquets (windows): Mercer Ballroom</li>
          <li>Reception options: Terrace (if weather is nice), Overlook East (windows, as cold weather backup)</li>
          <li>Breakouts (windows): Overlook East and King Room</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Why LOEWS Atlanta?</h2>
        <ul className="list-disc pl-5">
          <li><strong>Location:</strong> Midtown is Atlanta's hottest and most walkable district. The American Planning Association has listed Midtown Atlanta as one of the five Great Neighborhoods in America!</li>
          <li><strong>Overlook:</strong> All conference space conveniently located on our 14th floor away from all hotel traffic and overlooking Midtown's beautiful skyline and Piedmont Park</li>
          <li><strong>Exemplary Food & Beverage:</strong> Loews Hotels & Co. is renowned for providing our group's the best quality food & beverage experience in the industry.</li>
          <li><strong>Wellness:</strong> Exhale Spa and Fitness Center is the city's largest hotel spa/fitness facility (22,500 sq.ft.) offering 15 treatment rooms, Core Fusion, Yoga and Cycle.</li>
          <li><strong>Service:</strong> Loews Atlanta is one of the city's highest-ranked group hotels on TripAdvisor.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Taxes, Fees, and Food & Beverage Estimates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Taxes and Fees</h3>
            <ul className="list-disc pl-5">
              <li>Room Tax (occ & state): 16.9%</li>
              <li>F&B & Sales Tax: 8.9%</li>
              <li>F&B Service Charges: 24%</li>
              <li>Porterage / Bellman: $10 / room (optional unless an organized bag pull is requested)</li>
              <li>Mandatory State lodging fee: $5 per room night</li>
              <li>Taxi from Atlanta Hartsfield-Jackson Int'l Airport: $35 Estimate – One Way</li>
              <li>Shuttle from Atlanta Hartsfield-Jackson Int'l Airport: $18.50 One Way</li>
              <li>MARTA (rapid rail): $2.50 One Way (2 blocks from hotel)</li>
              <li>Overnight Self/Valet Parking: $26/$40 per night</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Food and Beverage Estimates</h3>
            <ul className="list-disc pl-5">
              <li>Continental Breakfasts: $33.00</li>
              <li>Breakfast Buffets: $48.00</li>
              <li>Lunch Buffets: $58.00</li>
              <li>Lunch Plated: $50.00</li>
              <li>Box Lunch: $42.00</li>
              <li>Dinner Buffet: $90.00</li>
              <li>AM Breaks: $22.00</li>
              <li>PM Breaks: $22.00</li>
            </ul>
            <p className="mt-2 text-sm">
              Above food and beverage prices do not include service charges and taxes.
              These are to be used as a guideline only and are not guaranteed menu prices.
              Pricing for all F&B will be confirmed 6 months prior to the group arrival date.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default VenueLayout

