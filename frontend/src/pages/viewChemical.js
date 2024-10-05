import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL2 } from '../constants/URL';
import Header from '../components/Header';

const ViewChemical = () => {  // Updated function name to start with uppercase
  const [apiData, setAPIData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const callGETAPI = async () => {
    try {
      const res = await axios.get(API_URL2);
      setAPIData(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteResource = async (resourceId) => {
    try {
      if (window.confirm('Are you sure you want to delete?')) {
        await axios.delete(`${API_URL2}/${resourceId}`);
        callGETAPI();
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  const handleUpdate = (resourceId) => {
    navigate(`/update2/${resourceId}`);
  };

  useEffect(() => {
    callGETAPI();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = apiData.filter((resource) =>
    (resource.chemicalName || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <Container>
        <h2 className="my-4">Recently Added Chemical Resources</h2>
        <div className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search by chemical name..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Chemical Name</th>
              <th>Quantity</th>
              <th>Hazard Classification</th>
              <th>Expiry Date</th>
              <th>Purchase Date</th>
              <th>Purchase Cost</th>
              <th>Storage Condition</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((resource) => (
              <tr key={resource._id}>
                <td>{resource.chemicalName || '-'}</td>
                <td>{resource.quantity || '-'}</td>
                <td>{resource.hazardClassification || '-'}</td>
                <td>{resource.expiryDate ? new Date(resource.expiryDate).toLocaleDateString() : '-'}</td>
                <td>{resource.purchaseDate ? new Date(resource.purchaseDate).toLocaleDateString() : '-'}</td>
                <td>{resource.purchaseCost || '-'}</td>
                <td>{resource.storageCondition || '-'}</td>
                <td>
                  <Button
                    variant="light"
                    style={{ backgroundColor: '#ADD8E6', color: 'black' }}
                    onClick={() => handleUpdate(resource._id)}
                    className="me-2"
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    style={{ backgroundColor: '#DC143C', color: 'white' }}
                    onClick={() => deleteResource(resource._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default ViewChemical;  // Updated the export to match the new component name
