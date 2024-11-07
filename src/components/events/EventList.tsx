import React, { useState } from 'react';
import { Plus, Calendar, Sparkles } from 'lucide-react';
import type { Event } from '../../types';
import { useStore } from '../../store';
import CreateEventModal from './CreateEventModal';
import EventCard from './EventCard';
import EventDetails from './EventDetails';

export default function EventList() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { events, items, addEvent, updateEvent } = useStore();

  const handleCreateEvent = async (newEvent: Omit<Event, 'id'>) => {
    await addEvent(newEvent);
    setIsCreateModalOpen(false);
  };

  const handleUpdateEvent = async (updatedEvent: Event) => {
    await updateEvent(updatedEvent);
    setSelectedEvent(updatedEvent);
  };

  if (selectedEvent) {
    return (
      <EventDetails
        event={selectedEvent}
        onBack={() => setSelectedEvent(null)}
        onUpdateEvent={handleUpdateEvent}
        items={items}
      />
    );
  }

  const categorizedEvents = events.reduce((acc, event) => {
    const now = new Date();
    const eventDate = new Date(event.date);
    
    if (eventDate < now) {
      acc.past.push(event);
    } else if (eventDate.getTime() - now.getTime() <= 7 * 24 * 60 * 60 * 1000) {
      acc.upcoming.push(event);
    } else {
      acc.future.push(event);
    }
    
    return acc;
  }, { upcoming: [] as Event[], future: [] as Event[], past: [] as Event[] });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Events
          </h1>
          <p className="text-sm text-gray-500">
            Plan and manage your creative events
          </p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary group flex items-center gap-2 self-stretch sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
          <Sparkles className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white/50 backdrop-blur-sm rounded-lg border-2 border-dashed border-gray-300">
          <Calendar className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No events yet</h3>
          <p className="text-gray-500 text-center mb-4">Create your first event to start building your community</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary"
          >
            Create Event
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {categorizedEvents.upcoming.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <h2 className="text-lg font-semibold text-gray-900">Coming Up This Week</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorizedEvents.upcoming.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => setSelectedEvent(event)}
                  />
                ))}
              </div>
            </section>
          )}

          {categorizedEvents.future.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-indigo-400" />
                <h2 className="text-lg font-semibold text-gray-900">Future Events</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorizedEvents.future.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => setSelectedEvent(event)}
                  />
                ))}
              </div>
            </section>
          )}

          {categorizedEvents.past.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Past Events</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-75">
                {categorizedEvents.past.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onClick={() => setSelectedEvent(event)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateEvent}
      />
    </div>
  );
}