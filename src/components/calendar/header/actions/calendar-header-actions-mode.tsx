'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { Mode } from '../../calendar-types'
import { calendarModes } from '../../calendar-types'
import { useCalendarContext } from '../../calendar-context'
import { calendarModeIconMap } from '../../calendar-mode-icon-map'
import { cn } from '@/lib/utils'

export default function CalendarHeaderActionsMode() {
  const { mode, setMode } = useCalendarContext()

  const modeLabel = (() => {
    switch (mode) {
      case 'day':
        return "Jour";
      case 'week':
        return "Semaine";
      case 'month':
        return "Mois";
    }
  })();

  return (
      <ToggleGroup
        className="flex gap-0 -space-x-px rounded-sm border overflow-hidden shadow-sm shadow-black/5 rtl:space-x-reverse"
        type="single"
        variant="outline"
        value={mode}
        onValueChange={(value) => {
          if (value) setMode(value as Mode)
        }}
      >
        {calendarModes.map((modeValue) => {
          const isSelected = mode === modeValue
          return (
            <div
              key={modeValue}
              className="flex-1 flex divide-x"
            >
              <ToggleGroupItem
                value={modeValue}
                className={cn(
                  'w-full rounded-none shadow-none focus-visible:z-10 text-base flex items-center justify-center gap-2 relative border-none',
                  isSelected && 'z-10'
                )}
              >
                <div
                  className="flex items-center justify-center gap-2 py-2 px-3"
                >
                  <div>
                    {calendarModeIconMap[modeValue]}
                  </div>
                    {isSelected && (
                      <p
                        key={`text-${modeValue}`}
                        className="font-medium origin-left whitespace-nowrap"
                      >
                        {modeLabel}
                      </p>
                    )}
                </div>
              </ToggleGroupItem>
            </div>
          )
        })}
      </ToggleGroup>
  )
}
