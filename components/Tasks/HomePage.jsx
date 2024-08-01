import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';
import NftCards from './NftsCards';

const apiUrl = 'http://localhost:4000/nfts';

function HomePage() {
  const [show, setShow] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [formValues, setFormValues] = useState({
    image: '',
    title: '',
    rank: '',
    author: '',
    price_eth: '',
    price_usd: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [editingNft, setEditingNft] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setNfts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setFetchError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const resetState = () => {
    setFormValues({
      image: '',
      title: '',
      rank: '',
      author: '',
      price_eth: '',
      price_usd: ''
    });
    setErrors({});
    setEditingNft(null);
    setModalLoading(false);
    setShow(false);
  };

  const handleClose = () => resetState();

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues({ ...formValues, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formValues.image) formErrors.image = "Image is required";
    if (!formValues.title) formErrors.title = "Title is required";
    if (!formValues.rank) formErrors.rank = "Rank is required";
    if (!formValues.author) formErrors.author = "Author is required";
    if (!formValues.price_eth) formErrors.price_eth = "Price (ETH) is required";
    if (!formValues.price_usd) formErrors.price_usd = "Price (USD) is required";
    return formErrors;
  };

  const handleSaveChanges = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setModalLoading(true);
      if (editingNft) {
        axios.put(`${apiUrl}/${editingNft.id}`, formValues)
          .then(response => {
            const updatedNfts = nfts.map(nft => nft.id === editingNft.id ? response.data : nft);
            setNfts(updatedNfts);
            setToastMessage('NFT updated successfully!');
          })
          .catch(error => {
            setToastMessage('Error updating NFT');
          })
          .finally(() => resetState());
      } else {
        axios.post(apiUrl, formValues)
          .then(response => {
            setNfts([...nfts, response.data]);
            setToastMessage('NFT added successfully!');
          })
          .catch(error => {
            setToastMessage('Error adding NFT');
          })
          .finally(() => resetState());
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handleEdit = (nft) => {
    setEditingNft(nft);
    setFormValues(nft);
    setShow(true);
  };

  const handleDelete = (id) => {
    axios.delete(`${apiUrl}/${id}`)
      .then(() => {
        setNfts(nfts.filter(nft => nft.id !== id));
        setToastMessage('NFT deleted successfully!');
      })
      .catch(error => {
        setToastMessage('Error deleting NFT');
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        + Add/Edit NFT
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingNft ? 'Edit NFT' : 'Add NFT'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter Title"
                value={formValues.title}
                onChange={handleChange}
                isInvalid={!!errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rank</Form.Label>
              <Form.Control
                type="text"
                name="rank"
                placeholder="Enter Rank"
                value={formValues.rank}
                onChange={handleChange}
                isInvalid={!!errors.rank}
              />
              <Form.Control.Feedback type="invalid">
                {errors.rank}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                placeholder="Enter Author"
                value={formValues.author}
                onChange={handleChange}
                isInvalid={!!errors.author}
              />
              <Form.Control.Feedback type="invalid">
                {errors.author}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (ETH)</Form.Label>
              <Form.Control
                type="number"
                name="price_eth"
                placeholder="Enter Price in ETH"
                value={formValues.price_eth}
                onChange={handleChange}
                isInvalid={!!errors.price_eth}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price_eth}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (USD)</Form.Label>
              <Form.Control
                type="number"
                name="price_usd"
                placeholder="Enter Price in USD"
                value={formValues.price_usd}
                onChange={handleChange}
                isInvalid={!!errors.price_usd}
              />
              <Form.Control.Feedback type="invalid">
                {errors.price_usd}
              </Form.Control.Feedback>
            </Form.Group>
            {modalLoading && <Spinner animation="border" />}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {loading ? (
        <Spinner animation="border" />
      ) : fetchError ? (
        <div>{fetchError}</div>
      ) : (
        <div className="nft-cards-container">
          {nfts.map((nft) => (
            <NftCards
              key={nft.id}
              nft={nft}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {toastMessage && (
        <Toast
          onClose={() => setToastMessage(null)}
          show={!!toastMessage}
          delay={3000}
          autohide
          style={{ position: 'fixed', bottom: 20, right: 20 }}
        >
          <Toast.Header>
            <strong className="mr-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      )}
    </>
  );
}
export default HomePage;