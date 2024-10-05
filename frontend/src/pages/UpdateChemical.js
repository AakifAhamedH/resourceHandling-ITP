import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL2 } from '../constants/URL';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import image from '../assets/img2.png'; // Adjust path as necessary

const UpdateChemical = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [chemicalName, setChemicalName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [hazardClassification, setHazardClassification] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [purchaseCost, setPurchaseCost] = useState('');
  const [storageCondition, setStorageCondition] = useState('');

  const navigate = useNavigate();

  // Fetch the existing chemical data when the component loads
  useEffect(() => {
    const fetchChemicalData = async () => {
      try {
        const response = await axios.get(`${API_URL2}/${id}`);
        const data = response.data;
        // Populate form with existing data
        setChemicalName(data.chemicalName);
        setQuantity(data.quantity);
        setHazardClassification(data.hazardClassification);
        setExpiryDate(data.expiryDate);
        setPurchaseDate(data.purchaseDate);
        setPurchaseCost(data.purchaseCost);
        setStorageCondition(data.storageCondition);
      } catch (error) {
        console.error('Error fetching chemical data:', error);
      }
    };

    fetchChemicalData();
  }, [id]);

  // Update the existing chemical data
  const updateData = async () => {
    try {
      window.alert('Chemical Updated Successfully');
      await axios.put(`${API_URL2}/${id}`, {
        chemicalName,
        quantity,
        hazardClassification,
        expiryDate,
        purchaseDate,
        purchaseCost,
        storageCondition
      });
      navigate('/chemicals'); // Redirect to the chemicals list page after update
    } catch (error) {
      console.error('Error updating chemical data:', error);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          {/* Form Column */}
          <Col md={6}>
            <h2 className="mb-4">Update Chemical Resource</h2>
            <Form id="UpdateChemical" onSubmit={(e) => { e.preventDefault(); updateData(); }}>

              {/* Chemical Information Section */}
              <h4>Chemical Information</h4>
              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Chemical Name</Form.Label>
                <Form.Control
                  name="chemicalName"
                  type="text"
                  value={chemicalName}
                  onChange={(e) => setChemicalName(e.target.value)}
                  placeholder="Ex-Sulfuric Acid"
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Quantity (Liters or Kilograms)</Form.Label>
                <Form.Control
                  name="quantity"
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Ex-10 Liters or 5 KGs"
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Hazard Classification</Form.Label>
                <Form.Control
                  name="hazardClassification"
                  type="text"
                  value={hazardClassification}
                  onChange={(e) => setHazardClassification(e.target.value)}
                  placeholder="Ex-Flammable, Toxic"
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  name="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Purchase Date</Form.Label>
                <Form.Control
                  type="date"
                  name="purchaseDate"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Purchase Cost</Form.Label>
                <Form.Control
                  type="number"
                  name="purchaseCost"
                  value={purchaseCost}
                  onChange={(e) => setPurchaseCost(e.target.value)}
                  placeholder="Enter Purchase Cost"
                  style={{ textAlign: 'left' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ textAlign: 'left', display: 'block' }}>Storage Condition</Form.Label>
                <Form.Control
                  as="textarea"
                  name="storageCondition"
                  value={storageCondition}
                  onChange={(e) => setStorageCondition(e.target.value)}
                  placeholder="Describe the storage conditions"
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
          <Col md={6} className="d-flex align-items-end justify-content-end">
            <img
              src={image}
              alt="Chemical Resource"
              style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', position: 'absolute', right: '0', bottom: '0' }} // Image styling for right-bottom corner
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdateChemical;
