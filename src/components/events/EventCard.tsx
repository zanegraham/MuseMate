import React from 'react';
import { Calendar, Clock, CheckSquare, Users, MapPin, Music } from 'lucide-react';
import type { Event } from '../../types';

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export default function EventCard({ event, onClick }: EventCardProps) {
  const completedItems = event.checklist.filter(item => item.completed).length;
  const totalItems = event.checklist.length;
  const progress = totalItems === 0 ? 0 : (completedItems / totalItems) * 100;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const getEventTypeStyles = () => {
    switch (event.type) {
      case 'concert':
        return 'from-purple-500 to-pink-500 shadow-purple-500/25';
      case 'exhibition':
        return 'from-blue-500 to-indigo-500 shadow-blue-500/25';
      case 'workshop':
        return 'from-green-500 to-emerald-500 shadow-green-500/25';
      case 'festival':
        return 'from-yellow-500 to-orange-500 shadow-yellow-500/25';
      default:
        return 'from-indigo-500 to-purple-500 shadow-indigo-500/25';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="group relative bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200/50 
                shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${getEventTypeStyles()}`} />
      
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              {event.name}
            </h3>
            <span className="badge badge-primary mt-1">
              {event.type}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm truncate">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm truncate">{formatTime(event.date)}</span>
          </div>
          {event.venue && (
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm truncate">{event.venue}</span>
            </div>
          )}
          {event.artists && event.artists.length > 0 && (
            <div className="flex items-center text-gray-600">
              <Music className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm truncate">{event.artists.length} artists</span>
            </div>
          )}
          {event.expectedAttendees && (
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm truncate">{event.expectedAttendees} expected</span>
            </div>
          )}
          <div className="flex items-center text-gray-600">
            <CheckSquare className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm truncate">{completedItems} of {totalItems} items complete</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 bg-gradient-to-r ${getEventTypeStyles()}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {event.details?.ticketing?.price && (
          <div className="mt-4 pt-4 border-t border-gray-200/50">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Tickets from</span>
              <span className="font-medium text-gray-900">
                ${event.details.ticketing.price.toFixed(2)}
              </span>
            </div>
            {event.details.ticketing.capacity && (
              <div className="mt-1 text-xs text-gray-500">
                Capacity: {event.details.ticketing.capacity} people
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}