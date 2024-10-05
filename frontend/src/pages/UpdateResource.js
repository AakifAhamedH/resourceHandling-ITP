import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL } from '../constants/URL';
import { useNavigate, useParams } from 'react-router-dom';
import image from '../assets/img1.png'; 
import Header from '../components/Header';

const UpdateResource = () => {
  const { resourceId } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    axios.get(`${API_URL}/${resourceId}`)
      .then((response) => {
        const data = response.data;
        setName(data.name || '');
        setType(data.type || '');
        setModel(data.model || '');
        setManufacturer(data.manufacturer || '');
        setSetNo(data.setno || '');
        setPurchaseDate(data.purchasedate || '');
        setWarrantyExpiry(data.warrantyexpire || '');
        setMaintenanceSchedule(data.maintainenceschedule || '');
        setPurchaseCost(data.purchasecost || '');
        setNote(data.note || '');
      })
      .catch((error) => {
        console.error('Error fetching resource data:', error);
      });
  }, [resourceId]);

  const updateData = async () => {
    try {
      await axios.put(`${API_URL}/${resourceId}`, {
        name,
        type,
        model,
        manufacturer,
        setno,
        purchasedate,
        warrantyexpire,
        maintainenceschedule,
        purchasecost,
        note
      });
      window.alert('Resource Updated Successfully');
      navigate('/recent');
    } catch (error) {
      console.error('Error updating resource:', error);
      window.alert('Error updating resource');
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          {/* Form Column */}
          <Col md={6}>
            <h2 className="mb-4">Update Resource</h2>
            <Form id="UpdateResource" onSubmit={(e) => { e.preventDefault(); updateData(); }}>

              {/* General Information Section */}
              <h4>General Information</h4>
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Resource Name</Form.Label>
                <Form.Control
                  name="resourceName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex-Bike"
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Resource Type</Form.Label>
                <Form.Select
                  name="resourceType"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  style={{ textAlign: 'left' }}
                >
                  <option>Select Resource Type</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Machine">Machine</option>
                  <option value="Equipment">Equipment</option>
                  {/* Add other resource types as needed */}
                </Form.Select>
              </Form.Group>

              {/* Technical Details Section */}
              <h4>Technical Details</h4>
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Model</Form.Label>
                <Form.Control
                  name="model"
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Ex-Model 02E5RF"
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Manufacturer</Form.Label>
                <Form.Control
                  name="manufacturer"
                  type="text"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  placeholder="Ex-Honda"
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Serial Number</Form.Label>
                <Form.Control
                  name="serialNumber"
                  type="text"
                  value={setno}
                  onChange={(e) => setSetNo(e.target.value)}
                  placeholder="Ex-WPBRH 2345"
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              {/* Maintenance and Lifecycle Section */}
              <h4>Maintenance and Lifecycle</h4>
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Purchase Date</Form.Label>
                <Form.Control
                  type="date"
                  name="purchaseDate"
                  value={purchasedate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Warranty Expiry</Form.Label>
                <Form.Control
                  type="date"
                  name="warrantyExpiry"
                  value={warrantyexpire}
                  onChange={(e) => setWarrantyExpiry(e.target.value)}
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Maintenance Schedule</Form.Label>
                <Form.Control
                  type="date"
                  name="maintenanceSchedule"
                  value={maintainenceschedule}
                  onChange={(e) => setMaintenanceSchedule(e.target.value)}
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              {/* Cost and Value Section */}
              <h4>Cost and Value</h4>
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Purchase Price/Cost</Form.Label>
                <Form.Control
                  type="number"
                  name="purchaseCost"
                  value={purchasecost}
                  onChange={(e) => setPurchaseCost(e.target.value)}
                  placeholder="Enter Purchase Cost"
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              {/* Note Section */}
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  name="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add any additional notes"
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              <Button
                style={{ backgroundColor: '#1C4532', borderColor: '#1C4532' }}
                type="submit"
              >
                Update
              </Button>
            </Form>
          </Col>

          {/* Image Column */}
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <img
              src={image}
              alt="Resource"
              style={{ width: '100%', maxWidth: '400px', borderRadius: '8px' }} // Adjust width and styling as needed
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdateResource;
