import React, { useState, useEffect } from "react";

const apiKey = process.env.GOOGLE_MAP_API_KEY;

import {
  Heart,
  MapPin,
  Clock,
  User,
  CheckCircle,
  Calendar,
  Award,
  Star,
  Zap,
  Trophy,
} from "lucide-react";

const App = () => {
  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(""); // ✅ 新增：用户 ID
  const [userLocation, setUserLocation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [requests, setRequests] = useState([
    {
      id: 1,
      elderName: "Mary Chen",
      category: "groceries",
      location: "San Jose Downtown",
      lat: 37.3382,
      lng: -121.8863,
      time: "2024-11-23 10:00",
      duration: "2",
      status: "open",
      description: "Need help with grocery shopping at Trader Joes",
    },
    {
      id: 2,
      elderName: "Robert Johnson",
      category: "technology",
      location: "San Jose West",
      lat: 37.3352,
      lng: -121.9193,
      time: "2024-11-24 14:00",
      duration: "1",
      status: "open",
      description: "Help setting up new smartphone and apps",
    },
  ]);
  const [myRequests, setMyRequests] = useState([]);
  const [myVolunteering, setMyVolunteering] = useState([]);
  const [volunteerHours, setVolunteerHours] = useState(0);
  const [badges, setBadges] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const categories = [
    {
      id: "groceries",
      name: "Grocery Shopping",
      icon: "🛒",
      color: "bg-green-500",
    },
    { id: "health", name: "Health Check-ups", icon: "🏥", color: "bg-red-500" },
    {
      id: "transportation",
      name: "Transportation",
      icon: "🚗",
      color: "bg-blue-500",
    },
    {
      id: "technology",
      name: "Tech Assistance",
      icon: "💻",
      color: "bg-purple-500",
    },
    { id: "chatting", name: "Companionship", icon: "💬", color: "bg-pink-500" },
    { id: "others", name: "Other Needs", icon: "📋", color: "bg-yellow-500" },
  ];

  const badgeList = [
    { id: "first", name: "First Timer", icon: "🌟", requirement: 1 },
    { id: "helper", name: "Helpful Hand", icon: "🤝", requirement: 5 },
    { id: "hero", name: "Community Hero", icon: "🦸", requirement: 10 },
    { id: "legend", name: "Living Legend", icon: "👑", requirement: 20 },
    { id: "marathon", name: "Time Champion", icon: "⏰", requirement: 50 },
  ];

  useEffect(() => {
    if (volunteerHours === 0) return;

    const earnedBadges = badgeList.filter(
      (badge) =>
        volunteerHours >= badge.requirement && !badges.includes(badge.id)
    );

    if (earnedBadges.length > 0) {
      setBadges((prev) => [...prev, ...earnedBadges.map((b) => b.id)]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [volunteerHours]);

  const handleLogin = (type) => {
    // Validation（这里把 ID 也设成必填）
    if (
      !userId.trim() ||
      !userName.trim() ||
      !userLocation.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      alert("Please fill in all fields (including ID)!");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    // Password validation for sign up
    if (isSignUp) {
      if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
    }

    // Success
    setUserType(type);
    setIsLoggedIn(true);
  };

  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: "3s",
            fontSize: "24px",
          }}
        >
          {["🎉", "✨", "⭐", "🌟", "💫"][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </div>
  );

  const MapView = ({ requests, userLocation }) => {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MapPin className="text-pink-500" />
          Nearby Requests Map
        </h3>
        <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=37.3382,-121.8863&zoom=13&maptype=roadmap`}
            className="rounded-xl"
          ></iframe>

          <div className="absolute inset-0 pointer-events-none">
            {requests.map((req, idx) => (
              <div
                key={req.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-bounce"
                style={{
                  left: `${30 + idx * 20}%`,
                  top: `${40 + idx * 10}%`,
                  animationDelay: `${idx * 0.2}s`,
                }}
              >
                <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  {categories.find((c) => c.id === req.category)?.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-3 text-center">
          📍 Showing requests near {userLocation}
        </p>
        <div className="mt-4 flex gap-2 flex-wrap justify-center">
          {requests.map((req, idx) => (
            <div
              key={req.id}
              className="flex items-center gap-2 bg-pink-100 px-3 py-1 rounded-full text-sm"
            >
              <span>{categories.find((c) => c.id === req.category)?.icon}</span>
              <span className="font-semibold">
                {idx + 1}. {req.elderName}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ElderDashboard = () => {
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [newRequest, setNewRequest] = useState({
      category: "",
      location: userLocation,
      time: "",
      duration: "",
      description: "",
    });

    const createRequest = () => {
      if (newRequest.category && newRequest.location && newRequest.time) {
        const request = {
          id: Date.now(),
          elderName: userName,
          ...newRequest,
          lat: 37.3382 + Math.random() * 0.05,
          lng: -121.8863 + Math.random() * 0.05,
          status: "open",
        };
        setRequests([...requests, request]);
        setMyRequests([...myRequests, request]);
        setNewRequest({
          category: "",
          location: userLocation,
          time: "",
          duration: "",
          description: "",
        });
        setShowRequestForm(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-2xl">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <span className="animate-wave">👋</span>
                Welcome, {userName}!{" "}
                <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full ml-2">
                  ID: {userId}
                </span>
              </h2>
              <p className="text-blue-100 text-lg mt-1">Elder Dashboard</p>
            </div>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setUserType(null);
                setUserName("");
                setUserId("");
              }}
              className="bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 font-semibold shadow-lg transform hover:scale-105 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          {!showRequestForm ? (
            <>
              <button
                onClick={() => setShowRequestForm(true)}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-6 rounded-2xl font-bold text-xl hover:from-pink-600 hover:to-purple-600 transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1 mb-6 flex items-center justify-center gap-3"
              >
                <Zap className="w-6 h-6" />
                Create New Help Request
              </button>

              <MapView
                requests={requests.filter((r) => r.status === "open")}
                userLocation={userLocation}
              />

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Star className="text-yellow-500" />
                  My Requests
                </h3>
                {myRequests.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-gray-500 text-lg">
                      No requests yet. Create your first one!
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {myRequests.map((req) => (
                      <div
                        key={req.id}
                        className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-4">
                            <span className="text-5xl">
                              {
                                categories.find((c) => c.id === req.category)
                                  ?.icon
                              }
                            </span>
                            <div>
                              <h4 className="font-bold text-xl">
                                {
                                  categories.find((c) => c.id === req.category)
                                    ?.name
                                }
                              </h4>
                              <span
                                className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold ${
                                  req.status === "open"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {req.status === "open"
                                  ? "✓ Waiting for Volunteer"
                                  : "✓ Completed"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-gray-700 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-pink-500" />
                            <span>{req.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-purple-500" />
                            <span>{req.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-blue-500" />
                            <span>{req.duration} hours</span>
                          </div>
                        </div>
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-xl">
                          {req.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Create New Request</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setNewRequest({ ...newRequest, category: cat.id })
                    }
                    className={`p-6 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                      newRequest.category === cat.id
                        ? "border-purple-600 bg-purple-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <div className="text-4xl mb-3">{cat.icon}</div>
                    <div className="text-sm font-bold">{cat.name}</div>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Location (e.g., San Jose Downtown)"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl text-lg focus:ring-4 focus:ring-purple-300 focus:border-transparent"
                  value={newRequest.location}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, location: e.target.value })
                  }
                />
                <input
                  type="datetime-local"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl text-lg focus:ring-4 focus:ring-purple-300 focus:border-transparent"
                  value={newRequest.time}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, time: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Estimated duration (hours)"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl text-lg focus:ring-4 focus:ring-purple-300 focus:border-transparent"
                  value={newRequest.duration}
                  onChange={(e) =>
                    setNewRequest({ ...newRequest, duration: e.target.value })
                  }
                />
                <textarea
                  placeholder="Describe your request in detail..."
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl text-lg h-32 focus:ring-4 focus:ring-purple-300 focus:border-transparent"
                  value={newRequest.description}
                  onChange={(e) =>
                    setNewRequest({
                      ...newRequest,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={createRequest}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all"
                >
                  🚀 Publish Request
                </button>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const VolunteerDashboard = () => {
    const acceptRequest = (requestId) => {
      const request = requests.find((r) => r.id === requestId);
      if (request) {
        setMyVolunteering([
          ...myVolunteering,
          { ...request, volunteerName: userName },
        ]);
        setRequests(requests.filter((r) => r.id !== requestId));
      }
    };

    const completeVolunteering = (requestId) => {
      const task = myVolunteering.find((t) => t.id === requestId);
      if (task) {
        const hours = parseInt(task.duration) || 1;
        setVolunteerHours(volunteerHours + hours);
        setMyVolunteering(myVolunteering.filter((t) => t.id !== requestId));
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        {showConfetti && <Confetti />}

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-2xl">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <span className="animate-wave">👋</span>
                Welcome, {userName}!{" "}
                <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full ml-2">
                  ID: {userId}
                </span>
              </h2>
              <p className="text-purple-100 text-lg mt-1">Volunteer Hero</p>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Trophy className="w-6 h-6 text-yellow-300" />
                  <span className="font-bold text-xl">
                    {volunteerHours} hours
                  </span>
                </div>
                <div className="flex gap-2">
                  {badges.slice(0, 3).map((badgeId) => {
                    const badge = badgeList.find((b) => b.id === badgeId);
                    return (
                      <div
                        key={badgeId}
                        className="text-3xl animate-bounce"
                        title={badge.name}
                      >
                        {badge.icon}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setUserType(null);
                setUserName("");
                setUserId("");
              }}
              className="bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-50 font-semibold shadow-lg transform hover:scale-105 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6 space-y-6">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Award className="w-8 h-8" />
              Your Achievements
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {badgeList.map((badge) => {
                const earned = badges.includes(badge.id);
                return (
                  <div
                    key={badge.id}
                    className={`bg-white rounded-xl p-4 text-center transition-all transform ${
                      earned ? "scale-105 shadow-lg" : "opacity-50 grayscale"
                    }`}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <div className="text-xs font-bold text-gray-800">
                      {badge.name}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {badge.requirement}h
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <MapView
            requests={requests.filter((r) => r.status === "open")}
            userLocation={userLocation}
          />

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Zap className="text-purple-500" />
              Available Requests
            </h3>
            {requests.filter((r) => r.status === "open").length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎉</div>
                <p className="text-gray-500 text-lg">
                  All caught up! No new requests right now.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {requests
                  .filter((r) => r.status === "open")
                  .map((req) => (
                    <div
                      key={req.id}
                      className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:border-purple-400"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <span className="text-5xl">
                            {
                              categories.find((c) => c.id === req.category)
                                ?.icon
                            }
                          </span>
                          <div>
                            <h4 className="font-bold text-xl">
                              {
                                categories.find((c) => c.id === req.category)
                                  ?.name
                              }
                            </h4>
                            <p className="text-gray-600">
                              Requested by {req.elderName}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => acceptRequest(req.id)}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                        >
                          Accept 🎯
                        </button>
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 text-gray-700 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-pink-500" />
                          <span>{req.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-purple-500" />
                          <span>{req.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-500" />
                          <span>{req.duration} hours</span>
                        </div>
                      </div>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-xl">
                        {req.description}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Heart className="text-pink-500" />
              My Active Tasks
            </h3>
            {myVolunteering.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">💪</div>
                <p className="text-gray-500 text-lg">
                  No active tasks. Accept a request to get started!
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {myVolunteering.map((task) => (
                  <div
                    key={task.id}
                    className="border-4 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-5xl">
                          {categories.find((c) => c.id === task.category)?.icon}
                        </span>
                        <div>
                          <h4 className="font-bold text-xl">
                            {
                              categories.find((c) => c.id === task.category)
                                ?.name
                            }
                          </h4>
                          <p className="text-gray-600">
                            Helping {task.elderName}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => completeVolunteering(task.id)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                      >
                        Complete ✓
                      </button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-gray-700 mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-pink-500" />
                        <span>{task.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        <span>{task.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <span>{task.duration} hours</span>
                      </div>
                    </div>
                    <p className="text-gray-700 bg-white p-4 rounded-xl">
                      {task.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -top-48 -left-48 animate-pulse"></div>
          <div
            className="absolute w-96 h-96 bg-white opacity-10 rounded-full -bottom-48 -right-48 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative z-10 transform hover:scale-105 transition-transform duration-300">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <Heart className="w-20 h-20 text-pink-500 mx-auto mb-4 animate-pulse" />
              <Zap className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Elderly Angel
            </h1>
            <p className="text-gray-600 text-lg">
              Connecting Hearts, Building Communities
            </p>
          </div>

          {/* Toggle Sign In / Sign Up */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                !isSignUp
                  ? "bg-white shadow-md text-purple-600"
                  : "text-gray-600"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                isSignUp
                  ? "bg-white shadow-md text-purple-600"
                  : "text-gray-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:ring-4 focus:ring-purple-300 focus:border-transparent transition-all"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* ✅ 新增：User ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                User ID
              </label>
              <input
                type="text"
                placeholder="Enter your ID"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:ring-4 focus:ring-purple-300 focus:border-transparent transition-all"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:ring-4 focus:ring-purple-300 focus:border-transparent transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder={
                  isSignUp
                    ? "Create a password (min 6 characters)"
                    : "Enter your password"
                }
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:ring-4 focus:ring-purple-300 focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password (sign up only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:ring-4 focus:ring-purple-300 focus:border-transparent transition-all"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="Your location (e.g., San Jose Downtown)"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:ring-4 focus:ring-purple-300 focus:border-transparent transition-all"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
              />
            </div>
          </div>

          {!isSignUp && (
            <div className="text-right mt-2">
              <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">
                Forgot password?
              </button>
            </div>
          )}

          <div className="space-y-3 mt-6">
            <button
              onClick={() => handleLogin("elder")}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              🙋 I Need Help
            </button>
            <button
              onClick={() => handleLogin("volunteer")}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
            >
              ❤️ I Want to Volunteer
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-purple-600 font-semibold hover:text-purple-700"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return userType === "elder" ? <ElderDashboard /> : <VolunteerDashboard />;
};

export default App;
