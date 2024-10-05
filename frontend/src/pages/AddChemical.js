import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL2 } from '../constants/URL';
import { useNavigate } from 'react-router-dom';
import image from '../assets/img2.png'; // Adjust path as necessary
import Header from '../components/Header';

const AddChemical = () => {
  const [chemicalName, setChemicalName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [hazardClassification, setHazardClassification] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchaseCost, setPurchaseCost] = useState('');
  const [storageCondition, setStorageCondition] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const validateForm = () => {
    if (!chemicalName || !quantity || !hazardClassification || !expiryDate || !purchaseDate || !purchaseCost || !storageCondition) {
      setError('Please fill out all fields before submitting.');
      return false;
    }

    // Validate quantity
    if (!/^\d+(\.\d+)?$/.test(quantity)) {
      setError('Quantity must be a valid number.');
      return false;
    }

    // Validate purchase cost
    if (!/^\d+(\.\d+)?$/.test(purchaseCost)) {
      setError('Purchase cost must be a valid number.');
      return false;
    }

    // Check date validity
    const today = new Date();
    const expiry = new Date(expiryDate);
    const purchase = new Date(purchaseDate);
    if (expiry < today) {
      setError('Expiry date cannot be in the past.');
      return false;
    }
    if (purchase > today) {
      setError('Purchase date cannot be in the future.');
      return false;
    }

    setError('');
    return true;
  };

  const postData = async () => {
    if (validateForm()) {
      try {
        window.alert('Chemical Resource Saved Successfully');
        await axios.post(API_URL2, {
          chemicalName,
          quantity,
          hazardClassification,
          expiryDate,
          purchaseDate,
          purchaseCost,
          storageCondition
        });
        navigate('/viewChemicals');
      } catch (error) {
        console.error('Error saving chemical resource:', error);
      }
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <h2 className="mb-4">Add New Chemical Resource</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form id="AddChemical" onSubmit={(e) => { e.preventDefault(); postData(); }}>
              <h4>Chemical Information</h4>
              <Form.Group className="mb-3">
                <Form.Label>Chemical Name</Form.Label>
                <Form.Control
                  type="text"
                  value={chemicalName}
                  onChange={(e) => setChemicalName(e.target.value)}
                  placeholder="Ex-Sulfuric Acid"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity (Liters or Kilograms)</Form.Label>
                <Form.Control
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Ex-10 Liters or 5 KGs"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hazard Classification</Form.Label>
                <Form.Control
                  type="text"
                  value={hazardClassification}
                  onChange={(e) => setHazardClassification(e.target.value)}
                  placeholder="Ex-Flammable, Toxic"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Purchase Date</Form.Label>
                <Form.Control
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Purchase Cost</Form.Label>
                <Form.Control
                  type="number"
                  value={purchaseCost}
                  onChange={(e) => setPurchaseCost(e.target.value)}
                  placeholder="Enter Purchase Cost"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Storage Condition</Form.Label>
                <Form.Control
                  as="textarea"
                  value={storageCondition}
                  onChange={(e) => setStorageCondition(e.target.value)}
                  placeholder="Describe the storage conditions"
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

          <Col md={6} className="d-flex align-items-end justify-content-end">
            <img
              src={image}
              alt="Chemical Resource"
              style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', position: 'absolute', right: '0', bottom: '0' }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddChemical;
