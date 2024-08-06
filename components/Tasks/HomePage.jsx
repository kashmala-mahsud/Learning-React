import React, { useState, useEffect, useCallback } from 'react';
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
  const [filteredNfts, setFilteredNfts] = useState([]);
  const [formValues, setFormValues] = useState({
    image: null,
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
  const [searchNfts, setSearchNfts] = useState('');
  const [imagePreview, setImagePreview]= useState(null);
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setNfts(response.data);
        setFilteredNfts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setFetchError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handleClose = () => {
    setShow(false);
    setFormValues({
      image: null,
      title: '',
      rank: '',
      author: '',
      price_eth: '',
      price_usd: ''
    });
    setImagePreview(null); //clear image preview
    setErrors({});
    setEditingNft(null);
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormValues({ ...formValues, image: files[0] });
      //create a URL for the selected  image file

      const previewUrl= URL.createObjectURL(files[0]);
      setImagePreview(previewUrl)
      // OR
      //const reader= new FileReader();
      // reader.onloadend=()=>{
      //   setImagePreview(reader.result);
      // }
      // reader.readAsDataURL(files[0]);
      


    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formValues.image && !editingNft) formErrors.image = "Image is required";
    if (!formValues.title) formErrors.title = "Title is required";
    if (!formValues.rank) formErrors.rank = "Rank is required";
    if (!formValues.author) formErrors.author = "Author is required";
    if (!formValues.price_eth) formErrors.price_eth = "Price (ETH) is required";
    if (!formValues.price_usd) formErrors.price_usd = "Price (USD) is required";
    return formErrors;
  };

  const resetState = () => {
    setModalLoading(false);
    handleClose();
  };

  const handleSaveChanges = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setModalLoading(true);
  
      const formData = new FormData();
      formData.append('title', formValues.title);
      formData.append('rank', formValues.rank);
      formData.append('author', formValues.author);
      formData.append('price_eth', formValues.price_eth);
      formData.append('price_usd', formValues.price_usd);
      if(formValues.image){
        formData.append('image', formValues.image);
      }
      const axiosConfig={
        headers:{
          "content-Type":"application/json"
        }
      }
  
      console.log('Form Data:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

  
      if(editingNft){
        axios.put(`${apiUrl}/${editingNft.id}`, formData, axiosConfig
        ) 
        .then(response => {
          const updatedNft={
            ...response.data, image: URL.createObjectURL(formValues.image)
          }
            const updatedNfts =  nfts.map(nft=>nft.id === editingNft.id ? updatedNft : nft)
            setNfts(updatedNfts);
            setFilteredNfts(updatedNfts);
            setToastMessage('NFT updated successfully!'); 
          })
          .catch(error => {
              setToastMessage("Error updating NFT");
            })
            
          .finally(() => {
            resetState();
          });
      } else {
      axios.post(apiUrl, formData, axiosConfig)
      .then((response) => {
        const newNft= {
          ...response.data, image:URL.createObjectURL(formValues.image)
        }
        setNfts([...nfts, newNft]);
        setFilteredNfts([...nfts, newNft])
        setToastMessage("NFT added successfully");
      }).catch((err) => {
        setToastMessage("Error adding NFT")      }).finally(()=>{
          resetState()
        })
    }
  }
  else{
    setErrors(formErrors);
  }};

  const handleEdit = (nft) => {
    setEditingNft(nft);
    setImagePreview(nft.image); // Set the preview to the existing image URL
    setFormValues({
      ...nft,
      image: null // Reset image to avoid re-upload
    });
    setShow(true);
  };

  const handleDelete = (id) => {
    axios.delete(`${apiUrl}/${id}`)
      .then(() => {
        const updatedNfts = nfts.filter(nft => nft.id !== id);
        setNfts(updatedNfts);
        setFilteredNfts(updatedNfts);
        setToastMessage('NFT deleted successfully!');
      })
      .catch(error => {
        setToastMessage('Error deleting NFT');
      });
  };

  const handleSearchChange = (e) => {
    setSearchNfts(e.target.value);
    debounceFilterNfts(e.target.value);
  };

  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const filterNfts = (term) => {
    if (term) {
      const filtered = nfts.filter(nft =>
        nft.title.toLowerCase().includes(term.toLowerCase()) ||
        nft.rank.toLowerCase().includes(term.toLowerCase()) ||
        nft.author.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredNfts(filtered);
    } else {
      setFilteredNfts(nfts);
    }
  };

  const debounceFilterNfts = useCallback(debounce(filterNfts, 50), [nfts]);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        + Add / Edit NFT
      </Button>
      <Form.Control
        type='text'
        placeholder='Search NFTs'
        onChange={handleSearchChange}
        value={searchNfts}
        className='mt-3'
      />
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
                name="image"
                onChange={handleChange}
                isInvalid={!!errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {errors.image}
              </Form.Control.Feedback>
              {imagePreview && (<img 
              src={imagePreview}
            alt="imagePreview"
          style={{width:"100%", marginTop:"10px"}}/>)}
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
            {modalLoading && (
              <Spinner animation="border" />
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            {editingNft ? 'Save Changes' : 'Add NFT'}
          </Button>
        </Modal.Footer>
      </Modal>
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
      {loading ? (
        <Spinner animation="border" />
      ) : fetchError ? (
        <div>{fetchError}</div>
      ) : (
        <div className="nft-cards-container">
          {filteredNfts.map((nft) => (
            <NftCards
              key={nft.id}
              nft={nft}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default HomePage;