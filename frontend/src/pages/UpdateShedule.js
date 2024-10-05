import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL1 } from '../constants/URL';
import { useNavigate, useParams } from 'react-router-dom';
import resourceImage from '../assets/image.png';
import Header from '../components/Header'; // Import the Header component

const UpdateResourceSchedule = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [lastMaintenanceDate, setLastMaintenanceDate] = useState('');
  const [nextMaintenanceDate, setNextMaintenanceDate] = useState('');
  const [purchaseCost, setPurchaseCost] = useState('');
  const [depreciationCost, setDepreciationCost] = useState('');
  const [annualMaintenanceCost, setAnnualMaintenanceCost] = useState('');
  const [operatingCost, setOperatingCost] = useState('');
  const [note, setNote] = useState('');

  const navigate = useNavigate();

  // Fetch the existing resource schedule data when the component loads
  useEffect(() => {
    const fetchResourceSchedule = async () => {
      try {
        const response = await axios.get(`${API_URL1}/${id}`);
        const data = response.data;
        // Populate form with existing data
        setName(data.name);
        setType(data.type);
        setFrequency(data.frequency);
        setLastMaintenanceDate(data.lastMaintenanceDate);
        setNextMaintenanceDate(data.nextMaintenanceDate);
        setPurchaseCost(data.purchaseCost);
        setDepreciationCost(data.depreciationCost);
        setAnnualMaintenanceCost(data.annualMaintenanceCost);
        setOperatingCost(data.operatingCost);
        setNote(data.note);
      } catch (error) {
        console.error('Error fetching resource schedule:', error);
      }
    };
    
    fetchResourceSchedule();
  }, [id]);

  // Update the existing resource schedule
  const updateData = async () => {
    try {
      window.alert('Resource Schedule Updated Successfully');
      await axios.put(`${API_URL1}/${id}`, {
        name,
        type,
        frequency,
        lastMaintenanceDate,
        nextMaintenanceDate,
        purchaseCost,
        depreciationCost,
        annualMaintenanceCost,
        operatingCost,
        note
      });
      navigate('/shedule'); // Redirect to the schedule page after update
    } catch (error) {
      console.error('Error updating resource schedule:', error);
    }
  };

  return (
    <>
      <Header /> {/* Add Header component here */}
      <Container className="mt-5">
        <Row>
          <Col md={8} className="mx-auto">
            <h2 className="mb-4 text-left">Update Resource Schedule</h2>
            <br />
            <Form id="ResourceSchedule" onSubmit={(e) => { e.preventDefault(); updateData(); }}>
              
              {/* Use Row and Col to create two sections */}
              <Row className="mb-4">
                {/* Left side: Maintenance Details */}
                <Col md={6}>
                  <h4 className="text-left">Maintenance Details</h4>
                  <Form.Group className="mb-3 text-left">
                    <Form.Label style={{ textAlign: 'left', display: 'block' }}>Resource Name</Form.Label>
                    <Form.Control
                      name="resourceName"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex-Bike"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label style={{ textAlign: 'left', display: 'block' }}>Resource Type</Form.Label>
                    <Form.Select
                      name="resourceType"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option>Select Resource Type</option>
                      <option value="Vehicle">Vehicle</option>
                      <option value="Machine">Machine</option>
                      <option value="Equipment">Equipment</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label style={{ textAlign: 'left', display: 'block' }}>Maintenance Frequency</Form.Label>
                    <Form.Control
                      name="maintenanceFrequency"
                      type="text"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      placeholder="Ex- Monthly, Yearly"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label style={{ textAlign: 'left', display: 'block' }}>Last Maintenance Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="lastMaintenanceDate"
                      value={lastMaintenanceDate}
                      onChange={(e) => setLastMaintenanceDate(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label style={{ textAlign: 'left', display: 'block' }}>Next Maintenance Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="nextMaintenanceDate"
                      value={nextMaintenanceDate}
                      onChange={(e) => setNextMaintenanceDate(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label style={{ textAlign: 'left', display: 'block' }}>Note</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Add any additional notes"
                    />
                  </Form.Group>
                </Col>

                {/* Right side: Cost Details */}
                <Col md={6}>
                  <h4 className="text-left">Cost Details</h4>
                  <Form.Group className="mb-3 text-left">
                    <Form.Label style={{ textAlign: 'left', display: 'block' }}>Purchase Cost</Form.Label>
                    <Form.Control
                      type="number"
                      name="purchaseCost"
                      value={purchaseCost}
                      onChange={(e) => setPurchaseCost(e.target.value)}
                      placeholder="Enter Purchase Cost"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label style={{ textAlign: 'left', display: 'block' }}>Depreciation Cost</Form.Label>
                    <Form.Control
                      type="number"
                      name="depreciationCost"
                      value={depreciationCost}
                      onChange={(e) => setDepreciationCost(e.target.value)}
                      placeholder="Enter Depreciation Cost"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label style={{ textAlign: 'left', display: 'block' }}>Annual Maintenance Cost</Form.Label>
                    <Form.Control
                      type="number"
                      name="annualMaintenanceCost"
                      value={annualMaintenanceCost}
                      onChange={(e) => setAnnualMaintenanceCost(e.target.value)}
                      placeholder="Enter Annual Maintenance Cost"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label style={{ textAlign: 'left', display: 'block' }}>Operating Cost</Form.Label>
                    <Form.Control
                      type="number"
                      name="operatingCost"
                      value={operatingCost}
                      onChange={(e) => setOperatingCost(e.target.value)}
                      placeholder="Enter Operating Cost"
                    />
                  </Form.Group>

                  {/* Adding an Image below cost details */}
                  <Image src={resourceImage} alt="Resource Image" fluid style={{ maxWidth: '400px' }} className="mt-4" />
                </Col>
              </Row>

              {/* Submit button below both sections */}
              <Button
                style={{ backgroundColor: '#1C4532', borderColor: '#004d00' }} // Dark green color
                type="submit"
                className="mt-4"
              >
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdateResourceSchedule;
