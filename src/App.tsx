"use client";

import { useState, useEffect } from "react";
import Calendar from "@/components/calendar/calendar";
import type { CalendarEvent, Mode } from "./components/calendar/calendar-types";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./components/authentication/auth-provider";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/authentication/protected-route";
import Unauthorized from "./pages/Unauthorized";
import { fetchTalks } from "@/lib/api";

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [mode, setMode] = useState<Mode>("month");
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const loadEvents = async () => {
      const eventsData = await fetchTalks();
      setEvents(eventsData);
    };
    loadEvents();
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
          <Route
            path="/dashboard-organizer"
            element={
              <ProtectedRoute requiredRole="organizer">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard-talker"
            element={
              <ProtectedRoute requiredRole="talker">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
