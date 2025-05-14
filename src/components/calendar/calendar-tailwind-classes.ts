// this is used to generate all tailwind classes for the calendar
// if you want to use your own colors, you can override the classes here

export const colorOptions = [
  {
    value: "red",
    label: "Red",
    class: {
      base: "bg-red-500 border-red-500 bg-red-500/10 hover:bg-red-500/20 text-red-500",
      light: "bg-red-300 border-red-300 bg-red-300/10 text-red-300",
      dark: "dark:bg-red-700 dark:border-red-700 bg-red-700/10 text-red-700"
    }
  },
  {
    value: "orange",
    label: "Orange",
    class: {
      base: "bg-orange-500 border-orange-500 bg-orange-500/10 hover:bg-orange-500/20 text-orange-500",
      light: "bg-orange-300 border-orange-300 bg-orange-300/10 text-orange-300",
      dark: "dark:bg-orange-700 dark:border-orange-700 bg-orange-700/10 text-orange-700"
    }
  },
  {
    value: "emerald",
    label: "Emerald",
    class: {
      base: "bg-emerald-500 border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500",
      light: "bg-emerald-300 border-emerald-300 bg-emerald-300/10 text-emerald-300",
      dark: "dark:bg-emerald-700 dark:border-emerald-700 bg-emerald-700/10 text-emerald-700"
    }
  }
];
