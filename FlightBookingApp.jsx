import React, { useState } from 'react';
import { Calendar, Search, Users, MapPin, Plane, ArrowRight, Menu, X } from 'lucide-react';

const FlightBookingApp = () => {
  const [tripType, setTripType] = useState('roundtrip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [showCalendar, setShowCalendar] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const popularDestinations = [
    { name: 'Paris', country: 'France', price: '$299', emoji: '🗼' },
    { name: 'Tokyo', country: 'Japan', price: '$599', emoji: '🗾' },
    { name: 'New York', country: 'USA', price: '$399', emoji: '🗽' },
    { name: 'Dubai', country: 'UAE', price: '$499', emoji: '🏜️' },
  ];

  const airports = [
    'London (LHR)', 'New York (JFK)', 'Paris (CDG)', 'Tokyo (NRT)',
    'Dubai (DXB)', 'Singapore (SIN)', 'Los Angeles (LAX)', 'Mumbai (BOM)'
  ];

  const generateCalendar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return { days, month, year };
  };

  const { days, month, year } = generateCalendar();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const handleDateSelect = (day) => {
    if (!day) return;
    const selectedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (showCalendar === 'depart') {
      setDepartDate(selectedDate);
    } else {
      setReturnDate(selectedDate);
    }
    setShowCalendar(null);
  };

  const handleSearch = () => {
    if (!from || !to || !departDate || (tripType === 'roundtrip' && !returnDate)) {
      alert('Please fill in all required fields');
      return;
    }
    alert(`Searching flights from ${from} to ${to}\nDeparture: ${departDate}${tripType === 'roundtrip' ? `\nReturn: ${returnDate}` : ''}\nPassengers: ${passengers}`);
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', minHeight: '100vh', background: 'linear-gradient(135deg, #0062E3 0%, #00D7F0 100%)' }}>
      {/* Header */}
      <header style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Plane size={32} color="#fff" style={{ transform: 'rotate(-45deg)' }} />
            <h1 style={{ color: '#fff', margin: 0, fontSize: '24px', fontWeight: '700' }}>SkyExplorer</h1>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'block' }}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ color: '#fff', fontSize: '48px', fontWeight: '700', marginBottom: '15px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            Discover Your Next Adventure
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '20px', marginBottom: '0' }}>
            Book flights to amazing destinations worldwide
          </p>
        </div>

        {/* Booking Card */}
        <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)', marginBottom: '50px' }}>
          {/* Trip Type Selector */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
            {['roundtrip', 'oneway', 'multicity'].map(type => (
              <button
                key={type}
                onClick={() => setTripType(type)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: tripType === type ? '#0062E3' : '#f1f2f8',
                  color: tripType === type ? '#fff' : '#161616',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize'
                }}
              >
                {type === 'multicity' ? 'Multi-city' : type === 'oneway' ? 'One-way' : 'Round-trip'}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '25px' }}>
            {/* From */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#161616', fontSize: '14px', fontWeight: '600' }}>
                <MapPin size={16} style={{ display: 'inline', marginRight: '5px' }} />
                From
              </label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '2px solid #dddde5',
                  fontSize: '16px',
                  background: '#fff',
                  cursor: 'pointer',
                  transition: 'border 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0062E3'}
                onBlur={(e) => e.target.style.borderColor = '#dddde5'}
              >
                <option value="">Select departure</option>
                {airports.map(airport => (
                  <option key={airport} value={airport}>{airport}</option>
                ))}
              </select>
            </div>

            {/* To */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#161616', fontSize: '14px', fontWeight: '600' }}>
                <MapPin size={16} style={{ display: 'inline', marginRight: '5px' }} />
                To
              </label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '2px solid #dddde5',
                  fontSize: '16px',
                  background: '#fff',
                  cursor: 'pointer',
                  transition: 'border 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0062E3'}
                onBlur={(e) => e.target.style.borderColor = '#dddde5'}
              >
                <option value="">Select destination</option>
                {airports.map(airport => (
                  <option key={airport} value={airport}>{airport}</option>
                ))}
              </select>
            </div>

            {/* Depart Date */}
            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#161616', fontSize: '14px', fontWeight: '600' }}>
                <Calendar size={16} style={{ display: 'inline', marginRight: '5px' }} />
                Depart
              </label>
              <input
                type="text"
                value={departDate}
                onClick={() => setShowCalendar('depart')}
                readOnly
                placeholder="Select date"
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '2px solid #dddde5',
                  fontSize: '16px',
                  background: '#fff',
                  cursor: 'pointer',
                  transition: 'border 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0062E3'}
                onBlur={(e) => e.target.style.borderColor = '#dddde5'}
              />
            </div>

            {/* Return Date */}
            {tripType === 'roundtrip' && (
              <div style={{ position: 'relative' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#161616', fontSize: '14px', fontWeight: '600' }}>
                  <Calendar size={16} style={{ display: 'inline', marginRight: '5px' }} />
                  Return
                </label>
                <input
                  type="text"
                  value={returnDate}
                  onClick={() => setShowCalendar('return')}
                  readOnly
                  placeholder="Select date"
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '2px solid #dddde5',
                    fontSize: '16px',
                    background: '#fff',
                    cursor: 'pointer',
                    transition: 'border 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0062E3'}
                  onBlur={(e) => e.target.style.borderColor = '#dddde5'}
                />
              </div>
            )}

            {/* Passengers */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#161616', fontSize: '14px', fontWeight: '600' }}>
                <Users size={16} style={{ display: 'inline', marginRight: '5px' }} />
                Passengers
              </label>
              <input
                type="number"
                value={passengers}
                onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="9"
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '2px solid #dddde5',
                  fontSize: '16px',
                  background: '#fff',
                  transition: 'border 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0062E3'}
                onBlur={(e) => e.target.style.borderColor = '#dddde5'}
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            style={{
              width: '100%',
              padding: '18px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #0062E3 0%, #00D7F0 100%)',
              color: '#fff',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 4px 15px rgba(0, 98, 227, 0.4)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(0, 98, 227, 0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 98, 227, 0.4)';
            }}
          >
            <Search size={20} />
            Search Flights
          </button>
        </div>

        {/* Calendar Modal */}
        {showCalendar && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              backdropFilter: 'blur(4px)'
            }}
            onClick={() => setShowCalendar(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '30px',
                maxWidth: '400px',
                width: '90%',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#161616' }}>
                  {monthNames[month]} {year}
                </h3>
                <button
                  onClick={() => setShowCalendar(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '5px',
                    color: '#68697f'
                  }}
                >
                  <X size={24} />
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', marginBottom: '10px' }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} style={{ textAlign: 'center', padding: '10px', fontSize: '12px', fontWeight: '600', color: '#68697f' }}>
                    {day}
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
                {days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(day)}
                    disabled={!day}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: day ? '#f1f2f8' : 'transparent',
                      color: day ? '#161616' : 'transparent',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: day ? 'pointer' : 'default',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      if (day) {
                        e.target.style.background = '#0062E3';
                        e.target.style.color = '#fff';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (day) {
                        e.target.style.background = '#f1f2f8';
                        e.target.style.color = '#161616';
                      }
                    }}
                  >
                    {day || ''}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Popular Destinations */}
        <div>
          <h3 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', marginBottom: '25px', textAlign: 'center' }}>
            Popular Destinations
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {popularDestinations.map((dest, index) => (
              <div
                key={index}
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '25px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>{dest.emoji}</div>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '20px', fontWeight: '700', color: '#161616' }}>
                  {dest.name}
                </h4>
                <p style={{ margin: '0 0 15px 0', color: '#68697f', fontSize: '14px' }}>{dest.country}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '24px', fontWeight: '700', color: '#0062E3' }}>{dest.price}</span>
                  <ArrowRight size={20} color="#0062E3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FlightBookingApp;
