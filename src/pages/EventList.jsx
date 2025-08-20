// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// function EventList() {
//   const [events, setEvents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/events");
//       setEvents(response.data);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const handleAddToCart = (event) => {
//     console.log("Added to Cart:", event);
//   };

//   const handleDeleteEvent = async (id) => {
//     if (window.confirm("Are you sure you want to delete this event?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/events/${id}`);
//         alert("Event deleted successfully!");
//         fetchEvents();
//       } catch (error) {
//         console.error("Error deleting event", error);
//         alert("Failed to delete event");
//       }
//     }
//   };

//   const navigate = useNavigate()

//   const handleViewDetails = (eventId) => {
//     console.log("Event Details:", );
//     navigate(`/events/${eventId}`);
//     // Navigate to details page later if needed
//   };

//   const filteredEvents = events.filter(event =>
//     event.description.toLowerCase().includes(searchTerm.toLowerCase()) || event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.venue.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Container className="py-4">
//       <h2 className="text-center mb-4">Event List</h2>

//       <Form className="mb-4">
//         <Form.Control
//           type="text"
//           placeholder="Search events..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </Form>

//       <Row>
//         {filteredEvents.map((event) => (
//           <Col key={event._id} xs={12} md={6} lg={4} className="mb-4">
//             <Card className="h-100 shadow-sm">
//               <Card.Img
//                 variant="top"
//                 src={`http://localhost:5000${event.imageUrl}`}
//                 style={{ height: "200px", objectFit: "cover" }}
//               />
//               <Card.Body>
//                 <Card.Title>{event.title}</Card.Title>
//                 <Card.Text  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.description}</Card.Text>
//                 <Card.Text><strong>Date:</strong> {event.date}</Card.Text>
//                 <Card.Text><strong>Venue:</strong> {event.venue}</Card.Text>
//                 <div className="d-flex justify-content-between">
//                   <Button variant="primary" onClick={() => handleViewDetails(event._id)}>Details</Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// }

// export default EventList;
 
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function EventList() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const navigate = useNavigate();

  const handleViewDetails = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  // Extract unique categories (handling empty as "Others")
  const categories = ["All", ...new Set(events.map(event => event.category?.trim() || "Others"))];

  const filteredEvents = events.filter(event => {
    const matchSearch =
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase());

    const eventCategory = event.category?.trim() || "Others";
    const matchCategory = selectedCategory === "All" || selectedCategory === eventCategory;

    return matchSearch && matchCategory;
  });

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Event List</h2>

      {/* Search and Filter Controls */}
      <Form className="mb-4 d-flex flex-column flex-md-row gap-3">
        <Form.Control
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Form.Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>
      </Form>

      {/* Event Cards */}
      <Row>
        {filteredEvents.map((event) => (
          <Col key={event._id} xs={12} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              {event.imageUrl && (
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000${event.imageUrl}`}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {event.description}
                </Card.Text>
                <Card.Text><strong>Date:</strong> {event.date}</Card.Text>
                <Card.Text><strong>Venue:</strong> {event.venue}</Card.Text>
                <Card.Text><strong>Category:</strong> {event.category?.trim() || "Others"}</Card.Text>
                <Button variant="primary" onClick={() => handleViewDetails(event._id)}>Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default EventList;
