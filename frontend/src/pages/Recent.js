import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants/URL';
import Header from '../components/Header';
import backgroundImage from '../assets/img1.png'; // Import the image


const Recent = () => {
  const [apiData, setAPIData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const callGETAPI = async () => {
    try {
      const res = await axios.get(API_URL);
      setAPIData(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteResource = async (resourceId) => {
    try {
      if (window.confirm('Are you sure you want to delete?')) {
        await axios.delete(`${API_URL}/${resourceId}`);
        callGETAPI();
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  const handleUpdate = (resourceId) => {
    navigate(`/update/${resourceId}`);
  };

  useEffect(() => {
    callGETAPI();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = apiData.filter((resource) =>
    (resource.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <Container
 
      >
        <h2 className="my-4">Recently Added Resources</h2>
        <div className="mb-4">
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Resource Name</th>
              <th>Resource Type</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Serial Number</th>
              <th>Purchase Date</th>
              <th>Warranty Expiry</th>
              <th>Maintenance Schedule</th>
              <th>Purchase Cost</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((resource, index) => (
              <tr
                key={resource._id}
                style={index === 0 ? { backgroundColor: '#ADD8E6' } : {}}
              >
                <td>{resource.name || '-'}</td>
                <td>{resource.type || '-'}</td>
                <td>{resource.model || '-'}</td>
                <td>{resource.manufacturer || '-'}</td>
                <td>{resource.setno || '-'}</td>
                <td>{resource.purchasedate ? new Date(resource.purchasedate).toLocaleDateString() : '-'}</td>
                <td>{resource.warrantyexpire ? new Date(resource.warrantyexpire).toLocaleDateString() : '-'}</td>
                <td>{resource.maintainenceschedule ? new Date(resource.maintainenceschedule).toLocaleDateString() : '-'}</td>
                <td>{resource.purchasecost || '-'}</td>
                <td>{resource.note || '-'}</td>
                <td>
                  <Button
                    variant="light"
                    style={{ backgroundColor: '#90EE90', color: 'black' }}
                    onClick={() => handleUpdate(resource._id)}
                    className="me-2"
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    style={{ backgroundColor: '#FF6347', color: 'white' }}
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

export default Recent;
