import type { Dictionary } from "@/lib/i18n/dictionaries";

/** Hours per weekday index (0 = Monday … 6 = Sunday). */
const SCHEDULE: (string | null)[] = [
  "09:00–17:00",
  "09:00–17:00",
  "09:00–17:00",
  "09:00–17:00",
  "09:00–16:30",
  null,
  null,
];

export function WorkingHours({ dict }: { dict: Dictionary }) {
  return (
    <dl className="hoursList">
      {dict.hours.days.map((day, i) => {
        const hours = SCHEDULE[i];
        return (
          <div key={day} className={`hoursRow${hours ? "" : " hoursClosed"}`}>
            <dt>{day}</dt>
            <dd>{hours ?? dict.hours.closed}</dd>
          </div>
        );
      })}
    </dl>
  );
}
