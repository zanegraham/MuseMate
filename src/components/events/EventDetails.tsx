import React, { useState } from 'react';
import { 
  ArrowLeft, Calendar, Clock, Plus, Users, MapPin, Edit2, 
  ShoppingBag, Package, Music, Truck, Palette, Zap 
} from 'lucide-react';
import type { Event, Item } from '../../types';
import ChecklistSection from './checklist/ChecklistSection';
import AddItemsModal from './checklist/AddItemsModal';
import EventNotesSection from './notes/EventNotesSection';
import EditEventModal from './EditEventModal';
import MerchandiseSection from './merchandise/MerchandiseSection';
import EquipmentSection from './equipment/EquipmentSection';
import CrayboServicesSection from './services/CrayboServicesSection';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
  onUpdateEvent: (updatedEvent: Event) => void;
  items: Item[];
}

export default function EventDetails({ event, onBack, onUpdateEvent, items }: EventDetailsProps) {
  const [isAddItemsModalOpen, setIsAddItemsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'checklist' | 'notes' | 'merch' | 'equipment' | 'services'>('checklist');

  const handleToggleItem = (itemId: string) => {
    const updatedChecklist = event.checklist.map(item => 
      item.itemId === itemId ? { ...item, completed: !item.completed } : item
    );
    onUpdateEvent({ ...event, checklist: updatedChecklist });
  };

  const handleAddItems = (selectedItemIds: string[]) => {
    const newItems = selectedItemIds
      .filter(id => !event.checklist.some(item => item.itemId === id))
      .map(id => ({ itemId: id, completed: false }));
    
    onUpdateEvent({
      ...event,
      checklist: [...event.checklist, ...newItems],
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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
        return 'from-purple-500 to-pink-500';
      case 'exhibition':
        return 'from-blue-500 to-indigo-500';
      case 'workshop':
        return 'from-green-500 to-emerald-500';
      case 'festival':
        return 'from-yellow-500 to-orange-500';
      default:
        return 'from-indigo-500 to-purple-500';
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Events
      </button>

      <div className="relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200/50 shadow-sm">
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${getEventTypeStyles()}`} />
        
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {event.name}
              </h1>
              <span className="badge badge-primary">
                {event.type}
              </span>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="btn-secondary flex items-center gap-2 self-stretch sm:self-auto"
            >
              <Edit2 className="w-4 h-4" />
              Edit Event
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="flex items-center p-3 bg-white/50 rounded-lg border border-gray-200/50">
              <Calendar className="w-5 h-5 text-indigo-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{formatDate(event.date)}</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white/50 rounded-lg border border-gray-200/50">
              <Clock className="w-5 h-5 text-indigo-600 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{formatTime(event.date)}</p>
              </div>
            </div>
            {event.venue && (
              <div className="flex items-center p-3 bg-white/50 rounded-lg border border-gray-200/50">
                <MapPin className="w-5 h-5 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Venue</p>
                  <p className="font-medium">{event.venue}</p>
                </div>
              </div>
            )}
            {event.expectedAttendees && (
              <div className="flex items-center p-3 bg-white/50 rounded-lg border border-gray-200/50">
                <Users className="w-5 h-5 text-indigo-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Expected</p>
                  <p className="font-medium">{event.expectedAttendees} attendees</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200/50 shadow-sm overflow-hidden">
        <div className="border-b border-gray-200/50">
          <div className="flex flex-wrap">
            <TabButton
              icon={CheckSquare}
              label="Checklist"
              active={activeTab === 'checklist'}
              onClick={() => setActiveTab('checklist')}
            />
            <TabButton
              icon={Music}
              label="Notes & Details"
              active={activeTab === 'notes'}
              onClick={() => setActiveTab('notes')}
            />
            <TabButton
              icon={ShoppingBag}
              label="Merchandise"
              active={activeTab === 'merch'}
              onClick={() => setActiveTab('merch')}
            />
            <TabButton
              icon={Package}
              label="Equipment"
              active={activeTab === 'equipment'}
              onClick={() => setActiveTab('equipment')}
            />
            <TabButton
              icon={Zap}
              label="Craybo Services"
              active={activeTab === 'services'}
              onClick={() => setActiveTab('services')}
              badge="New"
            />
          </div>
        </div>

        {activeTab === 'checklist' && (
          <>
            <div className="p-6 border-b border-gray-200/50">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Checklist</h2>
                <button
                  onClick={() => setIsAddItemsModalOpen(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Items
                </button>
              </div>
            </div>

            <ChecklistSection
              checklist={event.checklist}
              items={items}
              onToggleItem={handleToggleItem}
            />
          </>
        )}

        {activeTab === 'notes' && (
          <EventNotesSection
            notes={event.notes || ''}
            onUpdateNotes={(notes) => onUpdateEvent({ ...event, notes })}
            details={event.details || {}}
            onUpdateDetails={(details) => onUpdateEvent({ ...event, details })}
          />
        )}

        {activeTab === 'merch' && (
          <MerchandiseSection
            merchandise={event.merchandise || []}
            onUpdate={(merchandise) => onUpdateEvent({ ...event, merchandise })}
          />
        )}

        {activeTab === 'equipment' && (
          <EquipmentSection
            equipment={event.equipment || []}
            onUpdate={(equipment) => onUpdateEvent({ ...event, equipment })}
          />
        )}

        {activeTab === 'services' && (
          <CrayboServicesSection
            event={event}
            onUpdateEvent={onUpdateEvent}
          />
        )}
      </div>

      <AddItemsModal
        isOpen={isAddItemsModalOpen}
        onClose={() => setIsAddItemsModalOpen(false)}
        onAdd={handleAddItems}
        items={items}
        existingItemIds={event.checklist.map(item => item.itemId)}
      />

      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={event}
        onUpdate={(updatedEvent) => {
          onUpdateEvent(updatedEvent);
          setIsEditModalOpen(false);
        }}
      />
    </div>
  );
}

interface TabButtonProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: string;
}

function TabButton({ icon: Icon, label, active, onClick, badge }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all
        hover:text-gray-700 whitespace-nowrap
        ${active 
          ? 'border-indigo-500 text-indigo-600 bg-gradient-to-r from-indigo-50 to-purple-50' 
          : 'border-transparent text-gray-500 hover:border-gray-300'
        }
      `}
    >
      <Icon className="w-4 h-4" />
      {label}
      {badge && (
        <span className="ml-1.5 px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-600">
          {badge}
        </span>
      )}
    </button>
  );
}