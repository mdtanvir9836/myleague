 // frontend/src/components/LeagueTable.js
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const TableComponent = () => {
  const [leagues, setLeagues] = useState([{}]);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [currentLeague, setCurrentLeague] = useState({ id: '', title: '', description: '', owner: '' });
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [isVal, setVal] = useState();

  useEffect(() => {
    fetchLeagues();
  }, []);

  const fetchLeagues = async () => {
    try {
        const result = await axios.get('http://localhost:4000/show');
        console.log(result.data.datashow);
        setLeagues(result.data.datashow);
    } catch (error) {
        console.log(error.message);
    }

  };

  const handleShow = () => {
    // setCurrentLeague(league);
    setVal(0)
    setShowModal(true);
  };
  const handleShow1 = (id) => {
    // setCurrentLeague(league);
    setId(id)
    setVal(1)
    setShowModal1(true);
  };
const handleUpdate=async()=>{
    try {
        if(isVal)
            {
        const result = await axios.put(`http://localhost:4000/update/${id}`,{currentLeague});
    fetchLeagues();
    handleClose1()
    setCurrentLeague({title:"",description:"",owner:""})
            }
            else{
      await axios.post('http://localhost:4000/insert', {currentLeague});
    fetchLeagues();
    handleClose()
    setCurrentLeague({title:"",description:"",owner:""})
            }
    } catch (error) {
        console.log(error.message);
    }
}
  const handleClose = () => setShowModal(false);
  const handleClose1 = () => setShowModal1(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentLeague({ ...currentLeague, [name]: value });
  };

//   const handleSave = async () => {
//     // if (currentLeague.id) {
//     //   await axios.put(`http://localhost:4000/league/${currentLeague.id}`, currentLeague);
//     // } else {
//       await axios.post('http://localhost:4000/insert', {currentLeague});
    
//     fetchLeagues();
//     handleClose();
//   };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/delete/${id}`);
    fetchLeagues();
  };

  const handleInvite = async (leagueId) => {
    // Email validation and invitation logic
    // This example assumes you have an endpoint to handle invitations
    try {
        setEmail("")
        const data=prompt("Enter email")
        console.log(data);
        // setEmail(data)
        // console.log(email);
        if(data)
            {
        if (/\S+@\S+\.\S+/.test(data)) {
            //   const league = leagues.find(l => l._id === leagueId);
                // league.members.push(email);
                console.log(email);
                await axios.put(`http://localhost:4000/invite/${leagueId}`,{data});
                fetchLeagues();
            setEmail('');
            } else {
            setEmail('');
              alert('Invalid email');
            }
        }
    } catch (error) {
        console.log(error.message);
    }
  };

  return (
    <div>
      <Button onClick={() => handleShow()}>Create League</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Members</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leagues&&leagues.map(league => (
            <tr key={league._id}>
              <td>{league._id}</td>
              <td>{league.league_title}</td>
              <td>{league.league_description}</td>
              <td>{league.members&&league.members.join(', ')}</td>
              <td>{league.owner}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow1(league._id)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(league._id)}>Delete</Button>
                <Button onClick={() =>handleInvite(league._id)}>Invite Friend</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentLeague.id ? 'Edit League' : 'Create League'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentLeague.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={currentLeague.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Owner</Form.Label>
              <Form.Control
                type="text"
                name="owner"
                value={currentLeague.owner}
                onChange={handleChange}
              />
              </Form.Group>
              </Form>
              </Modal.Body>
              <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>{currentLeague.id ? 'Edit League' : 'Create League'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentLeague.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={currentLeague.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Owner</Form.Label>
              <Form.Control
                type="text"
                name="owner"
                value={currentLeague.owner}
                onChange={handleChange}
              />
              </Form.Group>
              </Form>
              </Modal.Body>
              <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default TableComponent;
