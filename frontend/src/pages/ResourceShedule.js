import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Alert, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL1 } from '../constants/URL';
import { useNavigate } from 'react-router-dom';
import resourceImage from '../assets/image.png';
import Header from '../components/Header';

const ResourceSchedule = () => {
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
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !type || !frequency || !lastMaintenanceDate || !nextMaintenanceDate || !purchaseCost || !depreciationCost || !annualMaintenanceCost || !operatingCost) {
      setError('Please fill out all fields before submitting.');
      return false;
    }

    if (isNaN(purchaseCost) || isNaN(depreciationCost) || isNaN(annualMaintenanceCost) || isNaN(operatingCost)) {
      setError('Costs must be valid numbers.');
      return false;
    }

    const today = new Date();
    const lastMaintenance = new Date(lastMaintenanceDate);
    const nextMaintenance = new Date(nextMaintenanceDate);
    if (lastMaintenance > today) {
      setError('Last maintenance date cannot be in the future.');
      return false;
    }
    if (nextMaintenance < today) {
      setError('Next maintenance date cannot be in the past.');
      return false;
    }

    setError('');
    return true;
  };

  const postData = async () => {
    if (validateForm()) {
      try {
        await axios.post(API_URL1, {
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
        window.alert('Resource Schedule Saved Successfully');
        navigate('/shedule');
      } catch (error) {
        console.error('Error saving resource schedule:', error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col md={8} className="mx-auto">
            <h2 className="mb-4 text-left">Resource Schedule Maintenance & Cost</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form id="ResourceSchedule" onSubmit={(e) => { e.preventDefault(); postData(); }}>
              <Row className="mb-4">
                {/* Left side: Maintenance Details */}
                <Col md={6}>
                  <h4 className="text-left">Maintenance Details</h4>
                  <Form.Group className="mb-3 text-left">
                    <Form.Label>Resource Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex-Bike"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label>Resource Type</Form.Label>
                    <Form.Select
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
                    <Form.Label>Maintenance Frequency</Form.Label>
                    <Form.Control
                      type="text"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      placeholder="Ex- Monthly, Yearly"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label>Last Maintenance Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={lastMaintenanceDate}
                      onChange={(e) => setLastMaintenanceDate(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label>Next Maintenance Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={nextMaintenanceDate}
                      onChange={(e) => setNextMaintenanceDate(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label>Note</Form.Label>
                    <Form.Control
                      as="textarea"
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
                    <Form.Label>Purchase Cost</Form.Label>
                    <Form.Control
                      type="number"
                      value={purchaseCost}
                      onChange={(e) => setPurchaseCost(e.target.value)}
                      placeholder="Enter Purchase Cost"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label>Depreciation Cost</Form.Label>
                    <Form.Control
                      type="number"
                      value={depreciationCost}
                      onChange={(e) => setDepreciationCost(e.target.value)}
                      placeholder="Enter Depreciation Cost"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label>Annual Maintenance Cost</Form.Label>
                    <Form.Control
                      type="number"
                      value={annualMaintenanceCost}
                      onChange={(e) => setAnnualMaintenanceCost(e.target.value)}
                      placeholder="Enter Annual Maintenance Cost"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 text-left">
                    <Form.Label>Operating Cost</Form.Label>
                    <Form.Control
                      type="number"
                      value={operatingCost}
                      onChange={(e) => setOperatingCost(e.target.value)}
                      placeholder="Enter Operating Cost"
                    />
                  </Form.Group>

                  {/* Adding an Image below cost details */}
                  <Image src={resourceImage} alt="Resource Image" fluid style={{ maxWidth: '400px' }} className="mt-4" />
                </Col>
              </Row>

              <Button
                style={{ backgroundColor: '#1C4532', borderColor: '#004d00' }} // Dark green color
                type="submit"
                className="mt-4"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResourceSchedule;
