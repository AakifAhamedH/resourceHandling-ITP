import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../constants/URL';
import { useNavigate } from 'react-router-dom';
import image from '../assets/img1.png';
import Header from '../components/Header';

const AddResource = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [model, setModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [setno, setSetNo] = useState('');
  const [purchasedate, setPurchaseDate] = useState('');
  const [warrantyexpire, setWarrantyExpiry] = useState('');
  const [maintainenceschedule, setMaintenanceSchedule] = useState('');
  const [purchasecost, setPurchaseCost] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !type || !model || !manufacturer || !setno || !purchasedate || !warrantyexpire || !maintainenceschedule || !purchasecost) {
      setError('Please fill out all fields before submitting.');
      return false;
    }

    if (isNaN(purchasecost) || purchasecost <= 0) {
      setError('Valid Purchase Cost is required.');
      return false;
    }

    const today = new Date();
    if (new Date(purchasedate) > today) {
      setError('Purchase Date cannot be in the future.');
      return false;
    }
    
    if (new Date(warrantyexpire) < today) {
      setError('Warranty Expiry Date cannot be in the past.');
      return false;
    }

    setError('');
    return true;
  };

  const postData = async () => {
    if (validateForm()) {
      try {
        await axios.post(API_URL, {
          name,
          type,
          model,
          manufacturer,
          setno,
          purchasedate,
          warrantyexpire,
          maintainenceschedule,
          purchasecost,
          note,
        });
        window.alert('Resource Saved Successfully');
        navigate('/recent');
      } catch (error) {
        console.error('Error saving resource:', error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <h2 className="mb-4">Add New Resource</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form
              id="AddResource"
              onSubmit={(e) => {
                e.preventDefault();
                postData();
              }}
              noValidate
            >
              {/* General Information Section */}
              <h4>General Information</h4>
              <Form.Group className="mb-3">
                <Form.Label>Resource Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex-Bike"
                />
              </Form.Group>

              <Form.Group className="mb-3">
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

              {/* Technical Details Section */}
              <h4>Technical Details</h4>
              <Form.Group className="mb-3">
                <Form.Label>Model</Form.Label>
                <Form.Control
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Ex-Model 02E5RF"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Manufacturer</Form.Label>
                <Form.Control
                  type="text"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  placeholder="Ex-Honda"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Serial Number</Form.Label>
                <Form.Control
                  type="text"
                  value={setno}
                  onChange={(e) => setSetNo(e.target.value)}
                  placeholder="Ex-WPBRH 2345"
                />
              </Form.Group>

              {/* Maintenance and Lifecycle Section */}
              <h4>Maintenance and Lifecycle</h4>
              <Form.Group className="mb-3">
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control
                  type="date"
                  value={purchasedate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Warranty Expiry</Form.Label>
                <Form.Control
                  type="date"
                  value={warrantyexpire}
                  onChange={(e) => setWarrantyExpiry(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Maintenance Schedule</Form.Label>
                <Form.Control
                  type="date"
                  value={maintainenceschedule}
                  onChange={(e) => setMaintenanceSchedule(e.target.value)}
                />
              </Form.Group>

              {/* Cost and Value Section */}
              <h4>Cost and Value</h4>
              <Form.Group className="mb-3">
                <Form.Label>Purchase Price/Cost</Form.Label>
                <Form.Control
                  type="number"
                  value={purchasecost}
                  onChange={(e) => setPurchaseCost(e.target.value)}
                  placeholder="Enter Purchase Cost"
                />
              </Form.Group>

              {/* Note Section */}
              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add any additional notes"
                />
              </Form.Group>

              <Button
                style={{ backgroundColor: '#1C4532', borderColor: '#1C4532' }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Col>

          {/* Image Column */}
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <img
              src={image}
              alt="Resource"
              style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddResource;
