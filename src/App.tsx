"use client";

import { useState, useEffect } from "react";
import Calendar from "@/components/calendar/calendar";
import type { Mode } from "@/components/calendar/calendar-types";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { AuthProvider } from "@/components/authentication/auth-provider";
import type { Talk } from "@/lib/types";
import { loadEvents } from "@/lib/utils";

function App() {
  const [events, setEvents] = useState<Talk[]>([]);
  const [mode, setMode] = useState<Mode>("month");
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    loadEvents(setEvents);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Calendar
                events={events}
                setEvents={setEvents}
                mode={mode}
                setMode={setMode}
                date={date}
                setDate={setDate}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
