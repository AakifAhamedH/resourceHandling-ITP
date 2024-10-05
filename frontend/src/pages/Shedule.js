import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL1 } from '../constants/URL';
import Header from '../components/Header';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Shedule = () => {
  const [apiData, setAPIData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const callGETAPI = async () => {
    try {
      const res = await axios.get(API_URL1);
      console.log('API Data:', res.data);
      setAPIData(res.data);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const deleteResource = async (resourceId) => {
    try {
      if (window.confirm('Are you sure you want to delete?')) {
        await axios.delete(`${API_URL1}/${resourceId}`);
        callGETAPI();
      }
    } catch (error) {
      setError('Error deleting resource. Please try again.');
    }
  };

  const handleUpdate = (resourceId) => {
    navigate(`/update1/${resourceId}`);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    callGETAPI();
  }, []);

  const calculateTotal = (resourceSchedule) => {
    const purchaseCost = parseFloat(resourceSchedule.purchaseCost) || 0;
    const annualMaintenanceCost = parseFloat(resourceSchedule.annualMaintenanceCost) || 0;
    const depreciationCost = parseFloat(resourceSchedule.depreciationCost) || 0;
    const operatingCost = parseFloat(resourceSchedule.operatingCost) || 0;

    return purchaseCost + annualMaintenanceCost + depreciationCost + operatingCost;
  };

  const filteredData = apiData.filter((resource) =>
    (resource.name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generatePDF = () => {
    const pdf = new jsPDF();
  
    // Set Title of the PDF
    pdf.setFontSize(20);  
    pdf.text('NELCO', 10, 15);
  
    // Set Subtitle
    pdf.setFontSize(16);
    pdf.text('Resource Schedule Maintenance & Cost', 10, 25);
  
    // Add a horizontal line under the title for styling
    pdf.setLineWidth(0.5);
    pdf.line(10, 28, 200, 28);  
  
    // Create the table data
    const tableData = filteredData.map((resourceSchedule) => [
      resourceSchedule.name || '-',
      resourceSchedule.type || '-',
      resourceSchedule.frequency || '-',
      resourceSchedule.lastMaintenanceDate ? new Date(resourceSchedule.lastMaintenanceDate).toLocaleDateString() : '-',
      resourceSchedule.nextMaintenanceDate ? new Date(resourceSchedule.nextMaintenanceDate).toLocaleDateString() : '-',
      resourceSchedule.note || '-',
      resourceSchedule.purchaseCost || '-',
      resourceSchedule.annualMaintenanceCost || '-',
      resourceSchedule.depreciationCost || '-',
      resourceSchedule.operatingCost || '-',
      calculateTotal(resourceSchedule).toFixed(2),
    ]);
  
    const headers = [
      'Name', 
      'Type', 
      'Frequency', 
      'Last M Date', 
      'Next M Date', 
      'Note', 
      'Purchase Cost', 
      'Annual M Cost', 
      'Depreciation Cost', 
      'Operating Cost', 
      'Total'
    ];
  
    // Configure autoTable options with improved layout
    pdf.autoTable({
      head: [headers],
      body: tableData,
      startY: 35,  
      theme: 'grid',
      
      headStyles: {
        fillColor: [0, 102, 204],  
        textColor: [255, 255, 255],  
        fontSize: 10,  
        fontStyle: 'bold',  
        halign: 'center',  
        valign: 'middle',  // Vertically align text to middle
      },
      
      bodyStyles: {
        fontSize: 8,  
        textColor: [0, 0, 0],  
      },
      
      alternateRowStyles: {
        fillColor: [240, 240, 240],  
      },
      
      columnStyles: {
        0: { cellWidth: 15 },  // Name
        1: { cellWidth: 20 },  // Type
        2: { cellWidth: 20 },  // Frequency
        3: { cellWidth: 20 },  // Last Maintenance Date
        4: { cellWidth: 20 },  // Next Maintenance Date
        5: { cellWidth: 20 },  // Note
        6: { cellWidth: 20 },  // Purchase Cost
        7: { cellWidth: 15 },  // Annual Maintenance Cost
        8: { cellWidth: 15 },  // Depreciation Cost
        9: { cellWidth: 15, halign: 'right' },  // Operating Cost (aligned to right)
        10: { cellWidth: 18, halign: 'right', fontStyle: 'bold' },  // Total (aligned and bold)
      },
  
      margin: { top: 20, right: 5, bottom: 10, left: 8 },  // Set margins for better layout
      styles: {
        overflow: 'linebreak',  
        cellPadding: 2,  // Adjust padding for better spacing
      },
    });
  
    // Save the generated PDF
    pdf.save('ResourceScheduleReport.pdf');
  };

  return (
    <>
      <Header />
      <Container>
        <h2 className="my-4">Resource Schedule Maintenance & Cost</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <Form.Control
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

           
            {filteredData.length > 0 ? (
              <div id="data-table">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Frequency</th>
                      <th>Last Maintenance Date</th>
                      <th>Next Maintenance Date</th>
                      <th>Note</th>
                      <th>Purchase Cost</th>
                      <th>Annual Maintenance Cost</th>
                      <th>Depreciation Cost</th>
                      <th>Operating Cost</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((resourceSchedule) => (
                      <tr key={resourceSchedule._id}>
                        <td>{resourceSchedule.name || '-'}</td>
                        <td>{resourceSchedule.type || '-'}</td>
                        <td>{resourceSchedule.frequency || '-'}</td>
                        <td>{resourceSchedule.lastMaintenanceDate ? new Date(resourceSchedule.lastMaintenanceDate).toLocaleDateString() : '-'}</td>
                        <td>{resourceSchedule.nextMaintenanceDate ? new Date(resourceSchedule.nextMaintenanceDate).toLocaleDateString() : '-'}</td>
                        <td>{resourceSchedule.note || '-'}</td>
                        <td>{resourceSchedule.purchaseCost || '-'}</td>
                        <td>{resourceSchedule.annualMaintenanceCost || '-'}</td>
                        <td>{resourceSchedule.depreciationCost || '-'}</td>
                        <td>{resourceSchedule.operatingCost || '-'}</td>
                        <td>{calculateTotal(resourceSchedule).toFixed(2)}</td>
                        <td>
                          <Button
                            variant="light"
                            style={{ backgroundColor: '#90EE90', color: 'black' }}
                            onClick={() => handleUpdate(resourceSchedule._id)}
                            className="me-2"
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            style={{ backgroundColor: '#FF6347', color: 'white' }}
                            onClick={() => deleteResource(resourceSchedule._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button variant="primary"  style={{backgroundColor : 'red'}} onClick={generatePDF} className="mb-4">
              Generate PDF
            </Button>

              </div>
            ) : (
              <p>No resources found.</p>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Shedule;
